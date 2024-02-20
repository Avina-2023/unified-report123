import { createViewChild } from '@angular/compiler/src/core';
import { Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
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
  @ViewChild('decip') decip: ChartComponent;
  @Input() item :any;
  heatdata:any = [];
  context: CanvasRenderingContext2D;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          data: [{
            x:" ",
            y:0
          }]
        }
      ],
      chart: {
        height: 400,
        type: "treemap",
        toolbar:{
          show:false
        }
      },
      
      // title: {
      //   text: "Basic Treemap"
      // },
      plotOptions:{
        treemap:{
          enableShades: true,
          colorScale:{
            inverse:false,
            ranges:[
              {
                from: 0,
                to: 0,
                color: "#004684",
              }
            ],

          }
        }
      }
    };


   }

  ngOnInit(): void {
// this.disciplineeChart()
  }

  ngOnChanges(changes: SimpleChange) {
    // console.log(changes)
    if (changes['item']?.currentValue) {
        this.heatdata = changes['item']?.currentValue
        this.disciplineeChart()
    }
}



  disciplineeChart(){

    // this.heatdata = this.item
    // this.heatdata[0].x = "Computer Science/IT"
    this.heatdata.splice(0, 1)
    let maxval = Math.max(...this.item.map(o => o.y))
    this.chartOptions.series[0].data=this.heatdata
    this.chartOptions.plotOptions.treemap.colorScale.ranges[0].to = maxval;
    // this.heatdata.forEach(element => {
    //   if( element.name && element.name != null)
    //   // this.chartOptions.series[0].data.push(element)
    // });
    // console.log(this.item)
    this.decip.updateSeries(this.chartOptions.series)
    // this.decip.plotOptions.treemap.colorScale.ranges[0].to = maxval;
  }
}
