import { AfterViewInit, Input } from "@angular/core";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {
  canvas: any;
  ctx: any;
  @ViewChild('myChart', {static: false}) private chartContainer: ElementRef;
  @Input('chartType') type: any;
  @Input('values') chartValues: any;
  @Input('labels') chartLabels: any;
  @Input('orientation') orient: any;

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = this.chartContainer.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    let chartdata:any = {
      labels: this.chartLabels,
      datasets: [{
        label: 'Skill Score',
        data: this.chartValues,
        backgroundColor: ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694'],
      borderWidth: 0,
      borderRadius:0
      }]
  }
  // this.type==="radar"?chartdata.datasets[0].fillColor = "rgba(255,10,13,255)":''
  
    let myChart = new Chart(this.ctx, {
    type: this.type,
    data:chartdata,
    options: {
      responsive: false,
      legend: {
        display: false
     },
      scales: {  
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      indexAxis: this.orient,
      scaleShowLabels : false
    },
  //   options: {
  //   indexAxis: this.orient,
  // }
    });
    
  
  }  

}
