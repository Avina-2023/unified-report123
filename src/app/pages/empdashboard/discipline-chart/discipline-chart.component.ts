import { createViewChild } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};
@Component({
  selector: 'app-discipline-chart',
  templateUrl: './discipline-chart.component.html',
  styleUrls: ['./discipline-chart.component.scss']
})

export class DisciplineChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  context: CanvasRenderingContext2D;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          data: [
            {
              x: "New Delhi",
              y: 218
            },
            {
              x: "Kolkata",
              y: 149
            },
            {
              x: "Mumbai",
              y: 184
            },
            {
              x: "Ahmedabad",
              y: 55
            },
            {
              x: "Bangaluru",
              y: 84
            },
            {
              x: "Pune",
              y: 31
            },
            {
              x: "Chennai",
              y: 70
            },
            {
              x: "Jaipur",
              y: 30
            },
            {
              x: "Surat",
              y: 44
            },
            {
              x: "Hyderabad",
              y: 68
            },
            {
              x: "Lucknow",
              y: 28
            },
            {
              x: "Indore",
              y: 19
            },
            {
              x: "Kanpur",
              y: 29
            }
          ]
        }
      ],

      chart: {
        height: 350,
        type: "treemap"
      },
      title: {
        text: "Basic Treemap"
      }
    };


   }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.context = this.myCanvas.nativeElement.getContext('2d');
  }



}
