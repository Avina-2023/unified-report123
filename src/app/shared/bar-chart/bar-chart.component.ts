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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  // Charts module initializtion
  canvas: any;
  ctx: any;
  @ViewChild('myChart', {static: false}) private chartContainer: ElementRef;
  @Input('chartType') type: any;
  @Input('values') chartValues: any;
  @Input('labels') chartLabels: any;
  @Input('orientation') orient: any;
  // Charts module initializtion end

  // ngx charts start
  @Input() chartData: any;
  @Input() unSorted: any;
  indexNum: any = 0;
  single: any;

  view: any[] = [200, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Competency Score';
  showYAxisLabel = false;
  yAxisLabel = 'Competency Score';

  colorScheme = {
    domain: ["#FF8C00", "#0085B6" , "#9DBC5B" , "#28B59A", "#03B8CB"]
  };

  // ngx charts end

  constructor() {
  }

  ngOnInit() {
    this.single = this.chartData;
  }

  ngAfterViewInit() {
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

  onSelect(event) {

  }

  chartsModule() {
    this.canvas = this.chartContainer.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    let chartdata:any = {
      labels: this.chartLabels,
      datasets: [{
        label: 'Skill Score',
        data: this.chartValues,
        backgroundColor: ['#c84656', '#dfbd3f', '#68d886', '#95c923', '#fec623'],
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
        yAxes: [{
          gridLines: {
            display: false,
          },
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
        }],
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
