import { AgChartOptions } from 'ag-charts-community';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-candidate-skills',
  templateUrl: './candidate-skills.component.html',
  styleUrls: ['./candidate-skills.component.scss']
})
export class CandidateSkillsComponent implements OnInit {
  barChartPlugins:any
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,

    layout: {
      padding: {
        left: 230,
        right:25,
      }
    },  

    scales : {
      yAxes: [{
        // display:true,
          ticks: {
            callback: (label: any) => {
              return label.length > 20 ? label.substr(0, 20) + '...' : label;
            },
            mirror: true,
            padding: 140,   //140
            fontSize:16,
          },
      }],
      xAxes: [{
        
        ticks: {
          max : 100,
          min : 0,
          stepSize:10,
         
        }
 
        }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        }
      }
    }

    
  };
  public barChartData: ChartDataSets[] = [
    { data: [23,12,56,27,43,89,41]},

  ];
  public barChartLabels: string[] = ['Hydraulics', 'Water Resources', 'Technician','Site Management','python','Java','Angular'];
  constructor() {
  
   }

  ngOnInit(): void {
  }

}
