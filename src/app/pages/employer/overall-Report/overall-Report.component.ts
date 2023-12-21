import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { ApiService } from 'src/app/services/api.service';
import {AppConfigService} from 'src/app/utils/app-config.service'
import { environment } from 'src/environments/environment';
// import { ChartComponent } from "ng-apexcharts";
// import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";


// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
// };
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-overall-Report',
  templateUrl: './overall-Report.component.html',
  styleUrls: ['./overall-Report.component.scss']
})

export class OverallReportComponent implements OnInit {
  overallreportdata: any;
  colorconfig = [
    {
      color: '#DC3545',
      bgcolor: '#DC354514'
    },
    {
      color: '#007BFF',
      bgcolor: '#007BFF14'
    },
    {
      color: '#FFC107',
      bgcolor: '#FFC10714'
    },
    {
      color: '#7388A9',
      bgcolor: '#4CAF5014'
    }
  ]

  // progress bar chart 1
  public options: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: false
      }
    },

    cutoutPercentage: 70
  }

  public doughnutChartColors: Colors[] = [{
    backgroundColor:
      [
        '#2862FF',
        '#5289C9',
        '#EB4A8A',
        '#FF6A81',
      ],

  }
  ];

  doughnutChartLabels: Label[] = ['Skill Profiles Filled', 'Open Job Views', 'Internship Applications', 'Job Applications'];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';

  constructor(private apiService: ApiService, private appConfig: AppConfigService) {

  }

  async ngOnInit() {
    this.getOverAllReport();
  }

  getOverAllReport() {
    this.apiService.getOverAllReport(data).subscribe((response: any) => {
      if (response.success) {
        this.overallreportdata = response.data
        let chartData = [
          this.overallreportdata.eduTechReport.skillProfileCount,
          this.overallreportdata.eduTechReport.openJobViewCount,
          this.overallreportdata.eduTechReport.internshipApplicationCount,
          this.overallreportdata.eduTechReport.jobApplicationCount
        ]
        this.doughnutChartData.push(chartData);
        console.log(this.overallreportdata, 'overallreportdata');
      }
    })
  }

}
