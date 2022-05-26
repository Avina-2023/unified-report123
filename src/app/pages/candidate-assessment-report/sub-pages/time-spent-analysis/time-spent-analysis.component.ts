import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-time-spent-analysis',
  templateUrl: './time-spent-analysis.component.html',
  styleUrls: ['./time-spent-analysis.component.scss']
})
export class TimeSpentAnalysisComponent implements OnInit {
  chart: any;
  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Data1','Data2'],
        datasets: [
          { 
            data: [55,45],
            backgroundColor: ['#22538C','#91C8FA'],
            fill: false
          },
        ]
      },
      options: {
        cutoutPercentage: 60,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        },
        elements: {
        
        },
      }
    });
  }

}
