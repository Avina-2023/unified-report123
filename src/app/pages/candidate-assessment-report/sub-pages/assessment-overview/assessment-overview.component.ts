import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss']
})
export class AssessmentOverviewComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartOptions = {
    responsive: true,
    circumference: Math.PI,
    rotation : Math.PI,
    cutoutPercentage : 90, // precent
    layout: {
      padding: {
        left: 50,
        right:50
      }
    },  

    plugins: {
      datalabels: {
        align: 'start',
        anchor: 'start',
        offset: 10,
        formatter: function(value, context) {
          var i = context.dataIndex;
          var len = context.dataset.data.length - 1;
          if(i == len){
            return null;
          }
          return '     Total duration '+ value+' m';
        }
      }
    },
    legend: {
      display: false
  },
  tooltips: {
      enabled: false
  }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartData: ChartDataSets[] = [
    {
      data: [40,190],
      backgroundColor: [ "#6665DD",
      "#F0D691",
      ],
    }
  ];

  public barChartLegend = false;
  constructor() { }

  ngOnInit(): void {
  }

}
