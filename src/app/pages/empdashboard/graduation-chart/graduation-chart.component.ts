import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";
import "../rounded-corners"
@Component({
  selector: 'app-graduation-chart',
  templateUrl: './graduation-chart.component.html',
  styleUrls: ['./graduation-chart.component.scss']
})
export class GraduationChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    scales: {
      yAxes: [   
        {
          gridLines:{
               borderDash:[8,4],
          },
          stacked: true  
        }
      ],
      xAxes: [   
        {
          gridLines:{
          display:false
        },
          stacked: false  
        }
      ],
    },
    legend:{
      display:false 
    },
    responsive: true,
    barRoundness: 0.2,
    
  };
  public barChartLabels: Label[] = ["UG", "PG", "Diploma","CA","CS","ICWA"];
  public barChartType: ChartType = "roundedBar" as ChartType;
  public barChartLegend = true;
  public barChartPlugins = [];
  public colors: Color[] = [
    {
      backgroundColor: "rgba(251, 99, 64, 1)",
      borderColor: "rgba(251, 99, 64, 1)",
      hoverBackgroundColor: "rgba(251, 99, 64, 1)",
      hoverBorderColor: "rgba(251, 99, 64, 1)"
    }
  ];
  

  public barChartData: ChartDataSets[] = [
    { data: [65, 30, 20]},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
