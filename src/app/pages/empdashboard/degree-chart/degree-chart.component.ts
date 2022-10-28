import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-degree-chart',
  templateUrl: './degree-chart.component.html',
  styleUrls: ['./degree-chart.component.scss']
})
export class DegreeChartComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    legend:{
      display:false 
    },
    scales : {
      yAxes: [{
        ticks: {
          max : 10,
          min : 0,
          // stepSize:1,
        },  
      }],
      xAxes: [{
          ticks: {
              display: true
          }
        }],
    },
  };
  public barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  bardata = [];
  public barChartData: any = [
  { 
    data:[], 
    // borderWidth: 0.5,
    // barPercentage:0.5,
    hoverBackgroundColor:'rgba(27, 78, 155, 1)',
    backgroundColor:'rgba(27, 78, 155, 1)',
    borderColor:'rgba(27, 78, 155, 1)',
    // hoverBorderColor:'rgba(27, 78, 155, 1)',
    barThickness: 30,
    // radius:10,
    borderRadius:25,

    },   
  ];
  constructor( private apiservice:ApiService) { }
  ngOnInit(){
    this.degreeChart()
  }
  degreeChart(){
    this.apiservice.candidatedashboard().subscribe((result:any)=>{
      for (let i = 0; i < result.data[0].levelDetails.length; i++) {
        const element = result.data[0].levelDetails[i];
        this.barChartLabels.push(element.name);
        this.bardata.push(element.total)
        this.barChartData = [
          {
            data: this.bardata,
            backgroundColor: ['rgba(27, 78, 155, 1)'],
            hoverBackgroundColor:['rgba(27, 78, 155, 1)'],
            barThickness: 30,
            borderRadius: 25
          }
        ]; 
      }
    })
  }
}
