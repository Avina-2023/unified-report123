import { AfterViewInit, Input } from "@angular/core";
import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
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
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  // chart start
  canvas: any;
  ctx: any;
  @ViewChild('myChart', {static: false}) private chartContainer: ElementRef;
  @Input('chartType') type: any;
  @Input('values') chartValues: any;
  @Input('labels') chartLabels: any;
  @Input('orientation') orient: any;
// chart end

// ngx charts start
@Input() chartData: any;
@Input() unSorted: any;
indexNum: any = 0;

single: any;

view: any[] = [500, 325];

// options
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = false;
showXAxisLabel = false;
xAxisLabel = 'Skill Score';
showYAxisLabel = false;
yAxisLabel = 'Skill Score';

colorScheme = {
  domain: ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694']
};

// ngx charts end

  constructor() {

  }

  ngOnInit() {
    this.single = this.chartData;
    this.calculateWidthAndHeight();
  }

  ngOnChanges() {
    this.single = this.chartData;
    this.calculateWidthAndHeight();
  }

  ngAfterViewInit() {
  }  


  calculateWidthAndHeight() {
    if (this.chartData && this.chartData.length <= 3) {
     return this.view = [400, 110];
    }
    if (this.chartData && this.chartData.length <= 6) {
      return this.view = [400, 110];      
    }
    if (this.chartData && this.chartData.length <= 9) {
      return this.view = [400, 110];            
    }
    if (this.chartData && this.chartData.length <= 12) {
      return this.view = [400, 110];            
    }
    if (this.chartData && this.chartData.length <= 15) {
      return this.view = [400, 110];      
    }
  }

  onSelect(event) {
    console.log('event', event);
  }

  sorting(data) {
    this.single = [];
    let sortingArray = this.chartData;
    if (data == 1) {
      this.indexNum = data;
      sortingArray.sort(function(a, b) {
        return a.value < b.value ? -1 : 1;
      }); 
      sortingArray.forEach(element => {
        this.single.push(element);
      });
    } 
    else if (data == 2) {
      this.indexNum = data;
      sortingArray.sort(function(a, b) {
        return a.value > b.value ? -1 : 1;
      }); 
      sortingArray.forEach(element => {
        this.single.push(element);
      });
    } else {
      this.indexNum = 0
      sortingArray = this.unSorted;      
      sortingArray.forEach(element => {
        this.single.push(element);
      });      
    }
  }

  chartjs() {
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
