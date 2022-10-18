import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions, Colors } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  public doughnutChartColors: Colors[] = [
    {
      backgroundColor:
        [
          'rgba(96, 125, 139, 1)',
          'rgba(255, 183, 77, 1)',
          'rgba(38, 193, 246, 1)',
          "rgba(255, 87, 34, 1)",
        ],

    }
  ];
  doughnutChartData: MultiDataSet = [
    [15, 45, 20, 23],
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw(chart) {
      const ctx = chart.ctx;
      var txt2 = '250,488';
      var txt1 = 'Total Candidates';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      const fontSizeToUse = 12;
      ctx.font = fontSizeToUse + 'px Arial';
      ctx.fillStyle = 'black';
      // Draw text in center
      ctx.fillText(txt2, centerX, centerY - 10);
      var fontSizeToUse1 = 10;
      ctx.font = fontSizeToUse1 + 'px Arial';
      ctx.fillText(txt1, centerX, centerY + 10);
    }
  }]
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
  constructor() { }

  ngOnInit(): void {
  }


  // profile circle

}
