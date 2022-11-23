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
    { value: '0', year: '2022' },
    { value: '1', year: '2021' },
    { value: '2', year: '2020' },
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
    this.getCandidateDashBoard()
  }


  // Based on selct year dashboard data 

  selectYear(e) {
    if (e.value == 0) {
      this.getCandidateDashBoard()
    }
    else if (e.value == 1) {
      this.year = this.appConfig.getCurrentYear() - 1
      this.email = localStorage.getItem('email')
      const obj1 = {};
      if (Object.keys(obj1).length === 0) {
        Object.assign(obj1, { "year": this.year, "email": this.email });
      }
      this.apiService.candidateDashboard(obj1).subscribe((res: any) => {
        if (res.success) {
          this.ChartData = res.data.series;
          this.chartOptions.series.push(this.ChartData)
          console.log(this.ChartData)
        }
      })
    }
    else if (e.value == 2) {
      this.year = this.appConfig.getCurrentYear() - 2
      this.email = localStorage.getItem('email')
      const obj1 = {};
      if (Object.keys(obj1).length === 0) {
        Object.assign(obj1, { "year": this.year, "email": this.email });
      }
      this.apiService.candidateDashboard(obj1).subscribe((res: any) => {
        if (res.success) {
          this.ChartData = res.data.series;
          this.chartOptions.series.push(this.ChartData)
          console.log(this.ChartData)
        }
      })
    }
  }


// candidate Dashboard Barchart   


  getCandidateDashBoard() {
    this.year = this.appConfig.getCurrentYear()
    this.email = localStorage.getItem('email')
    this.objDetails = {};
    if (Object.keys(this.objDetails).length === 0) {
      Object.assign(this.objDetails, { "year": this.year, "email": this.email });
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
}
