import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, SimpleChange, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service'
import { environment } from 'src/environments/environment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.scss']
})
export class JobDashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // public date:any;
  public year: any;
  public email: any
  public candidateDahboard: any;
  public jobsAvailable: any;
  public jobApplied: any;
  public profileView: any;
  public shortlisted: any;
  public ChartData: any = [];
  public objDetails: any;
  public allyears = [
    { year: new Date().getFullYear() },
    { year: new Date().getFullYear() - 1 },
    { year: new Date().getFullYear() - 2 },
  ];
  constructor(private apiService: ApiService, private appConfig: AppConfigService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#26BBEF', '#FF9A78', '#10E596', '#FDBC64']
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      fill: {
        opacity: 1,
        colors: ['#26BBEF', '#FF9A78', '#10E596', '#FDBC64']
      },
    };
  }
  ngOnInit(): void {
    this.getCandidateDashBoard("")
  }

  // candidate Dashboard Barchart
  getCandidateDashBoard(e) {
    let year
    if (e.value) {
      year = e.value
    }
    else {
      year = this.appConfig.getCurrentYear()
    }
    this.email = localStorage.getItem('email')
    this.objDetails = {};
    if (Object.keys(this.objDetails).length === 0) {
      Object.assign(this.objDetails, { "year": year, "email": this.email });
    }
    this.apiService.candidateDashboard(this.objDetails).subscribe((res: any) => {
      if (res.success) {
        this.candidateDahboard = res.data
        this.jobsAvailable = this.candidateDahboard.jobAvailableCount
        this.jobApplied = this.candidateDahboard.jobAppliedCount;
        this.profileView = this.candidateDahboard.profileViewedCount;
        this.shortlisted = this.candidateDahboard.shortlistedCount;
        this.ChartData = res.data.series;
        this.chartOptions.series.push(this.ChartData)
      }
    })
  }

  gotoProfile(){
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiService.encryptnew(emailval,environment.cryptoEncryptionKey))
    window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
  }
}
