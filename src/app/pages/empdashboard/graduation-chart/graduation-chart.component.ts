import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";
import "../rounded-corners";
import { ApiService } from 'src/app/services/api.service'; 
@Component({
  selector: 'app-graduation-chart',
  templateUrl: './graduation-chart.component.html',
  styleUrls: ['./graduation-chart.component.scss']
})
export class GraduationChartComponent implements OnInit {
  bardata = [];
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
  public barChartLabels: Label[] = [];
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
    { data: []},
  ];
  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
    this.graduationChart()
  }

  graduationChart(){
    this.apiservice.candidatedashboard().subscribe((result:any)=>{
      for (let i = 0; i < result.data[0].specializationDetails.length; i++) {
        const element = result.data[0].specializationDetails[i]; 
        this.barChartLabels.push(element.name)
        this.bardata.push(element.total)
        this.barChartData = [
          {
            data: this.bardata,
            barThickness: 30,
          }
        ];
      }
    })
  }

}
