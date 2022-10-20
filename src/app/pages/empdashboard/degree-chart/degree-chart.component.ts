import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-degree-chart',
  templateUrl: './degree-chart.component.html',
  styleUrls: ['./degree-chart.component.scss']
})
export class DegreeChartComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['B. Tech', 'Diploma', 'BE', 'M. Tech', 'B.Com', '-', 'ME','B.Sc','Others','MBA','BBA','BE','B. Arch','Mech...','All Ot...'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
  
    { data: [4355, 4355, 3355, 4255, 2355,1355,1155,1155, 1355, 0,1000,2100,1500,4900,3920],
      
    borderWidth: 0.5,
    barPercentage:0.5,
    hoverBackgroundColor:'rgba(27, 78, 155, 1)',
    backgroundColor:'rgba(27, 78, 155, 1)',
    borderColor:'rgba(27, 78, 155, 1)',
    hoverBorderColor:'rgba(27, 78, 155, 1)',
    barThickness: 30,
    radius:10,
    datalabels: {
      display: false
  },
    },   
  ];
  constructor() { }
  ngOnInit(): void {
  }

}
