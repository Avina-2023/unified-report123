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
import { Chart } from 'chart.js';

@Component({
  selector: 'app-overall-Report',
  templateUrl: './overall-Report.component.html',
  styleUrls: ['./overall-Report.component.scss']
})

export class OverallReportComponent implements OnInit {
  chart: any;
  // @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
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
  chartLabels: string[];
  chartColors: string[];

  constructor(
    private apiService:ApiService,
    private appConfig:AppConfigService
  ) { 

    // this.chartOptions = {
    //   series: [44, 55, 13, 43, 22],
    //   chart: {
    //     type: "donut"
    //   },
    //   labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: {
    //         // dataLabels: {
    //         //   enabled: false,
    //         // },
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };

  }

  ngOnInit() {
    this.getOverAllReport();
    this.chartLabels = ['Data1', 'Data2', 'Data3', 'Data4'];
    this.chartColors = ['#EB4A8A', '#FF6A81', '#5289C9', '#2862FF'];

    const dataValues = [55, 45, 25, 65];
    const sumData = dataValues.reduce((acc, value) => acc + value, 0);

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: this.chartColors,
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
          legend: {
          display: false,
          // position: 'bottom',
        },
        tooltips: {
          enabled: true,
        },   
        cutoutPercentage: 75, 
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    Chart.pluginService.register({
      beforeDraw: (chart: Chart) => {
        const width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        
        const totalText = 'Total ';
        const percentageText = `${sumData}`;
        const totalWidth = ctx.measureText(totalText).width;
        
        const textX = Math.round((width - totalWidth) / 2);
        const textYTotal = height / 2  + 20; 
        const textYPercentage = height / 2 - 7; 
        
        const fontSizeTotal = (height / 130).toFixed(2);
        ctx.font = `${fontSizeTotal}em sans-serif`;
        ctx.fillStyle = '#B3B8BD';
        ctx.fillText(totalText, textX, textYTotal);
        
        const fontSizePercentage = (height / 114).toFixed(2);
        ctx.font = `${fontSizePercentage}em sans-serif`;
        ctx.fillStyle = 'black'; 
        ctx.fillText(percentageText, textX, textYPercentage);
        
        ctx.save();
      },
    });

  }

  getOverAllReport(){
    this.apiService.getOverAllReport(data).subscribe((response: any) => {
      if (response.success){
        this.overallreportdata = response.data
        console.log(this.overallreportdata,'overallreportdata');
      }
    })
  }

}
