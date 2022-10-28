import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-degree-chart',
  templateUrl: './degree-chart.component.html',
  styleUrls: ['./degree-chart.component.scss']
})
export class DegreeChartComponent implements OnInit {
  @Input() item;
  barChartOptions: ChartOptions = {
    responsive: true,
    legend:{
      display:false 
    },
    scales : {
      yAxes: [{
        ticks: {
          // max : 5000,
          // min : 0,
          // stepSize:1,
          display: true
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
  constructor() { }
  ngOnInit(){
    this.degreeChart()
 
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.degreeChart()
    }, 5000);
  }
  degreeChart(){
      for (let i = 0; i < this.item.length; i++) {
        const element = this.item[i];
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
  }
}
