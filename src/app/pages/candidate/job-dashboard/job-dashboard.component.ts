import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  public ChartjobAvailableCount: any;
  public allyears: any = { year: ['2022', '2021', '2020'] }

  constructor(private apiService: ApiService, private appConfig: AppConfigService) {
    this.chartOptions = {
      series: [
        {
          name: "Jobs Available",
          data: [44, 55, 1, 57, 56, 61, 58, 63, 60, 98, 1, 66]
        },
        {
          name: "Jobs Applied",
          data: [76, 85, 101, 1, 4, 98, 87, 98, 105, 91, 114, 94]
        },
        {
          name: "Profile Viewed",
          data: [35, 41, 36, 34, 53, 1, 26, 45, 48, 52, 53, 41]
        },
        {
          name: "Shortlisted",
          data: [1, 6, 6, 5, 2, 3, 6, 88, 8, 2, 3, 1]
        }
      ],
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
      // yaxis: {
      //   title: {
      //     text: "$ (thousands)"
      //   }
      // },
      fill: {
        opacity: 1,
        colors: ['#26BBEF', '#FF9A78', '#10E596', '#FDBC64']
      },
      // tooltip: {
      //   y: {
      //     formatter: function(val) {
      //       return "$ " + val + " thousands";
      //     }
      //   }
      // }
    };
  }
  ngOnInit(): void {
    console.log(this.allyears)
    this.getCandidateDashBoard()
  }

  getCandidateDashBoard() {
    this.year = this.appConfig.getCurrentYear()
    this.email = 'deenabandhutekarla@gmail.com'
    const obj: any = {};
    if (Object.keys(obj).length === 0) {
      Object.assign(obj, { "year": this.year, "email": this.email });
    }
    this.apiService.candidateDashboard(obj).subscribe((res: any) => {
      if (res.success) {
        this.candidateDahboard = res.data
        this.jobsAvailable = this.candidateDahboard.jobAvailableCount
        this.jobApplied = this.candidateDahboard.jobAppliedCount;
        this.profileView = this.candidateDahboard.profileViewedCount;
        this.shortlisted = this.candidateDahboard.shortlistedCount;
        for (let i = 0; i < res.data.chatList.length; i++) {
          const element = res.data.chatList[i]
          // this.ChartjobAvailableCount=element.totalAvailableCount
          // console.log('h',this.ChartjobAvailableCount)
          this.chartOptions.series.push(element.totalAvailableCount);
          this.chartOptions.series.push(element.jobAppliedCount);
          this.chartOptions.series.push(element.profileViewedCount);
          this.chartOptions.series.push(element.shortlistedCount);
        }
      }
    })
  }
}
