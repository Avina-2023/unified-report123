import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss']
})
export class AssessmentOverviewComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() getCandidateProfile;
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'doughnut';
  public barChartData: ChartDataSets[] = [];
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    circumference: Math.PI,
    rotation : Math.PI,
    cutoutPercentage : 90, // precent
    layout: {
      padding: {
        left: 30,
        right:30
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
          return '';
          // Total duration '+ value+' m
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

  constructor() { 
  }

  ngOnInit(): void {
    if(this.getCandidateProfile){
      console.log(this.getCandidateProfile,'this.getCandidateProfile')
      const calDuration = (100 - parseInt(this.getCandidateProfile.timePercentage));
      this.barChartData.push({
        data:[100,calDuration],
        backgroundColor: [ "#6665DD","#F0D691"],
      })
    } 
  }
}
