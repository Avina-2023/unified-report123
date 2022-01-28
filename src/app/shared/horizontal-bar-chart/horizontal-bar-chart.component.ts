import { AfterViewInit, Input } from "@angular/core";
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  //ng-chart-2 start
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartPlugins = [pluginDataLabels];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{

      }],
      xAxes: [{
        ticks: {
          max : 100,
          min : 0,
          stepSize:40,
        }
 
        }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        }
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  // public chartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
      hoverBackgroundColor:[],
      barThickness: 25,
    }
  ];

  barChartData1 =[];

  //ng-chart-2 end

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
@Output() selectedArea:EventEmitter<any> =new EventEmitter<any>();
@Input() chartData: any;
@Input() domains: any;
@Input() hideControls: any;
indexNum: any = 1;
single: any;
view: any[] = [480, 450];

// options
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = false;
showXAxisLabel = false;
barPadding = 12;
xAxisLabel = 'Skill Score';
showYAxisLabel = false;
yAxisLabel = 'Skill Score';
colorScheme = {
  domain: []
};
yAxisTicks = [0, 40, 80, 100];
// ngx charts end

  constructor() {

  }
  async ngOnInit() {
    if (this.hideControls) {
      this.yAxisTicks = [0, 10];
    }
    await this.getSkillData();
    this.calculateWidthAndHeight();
    this.setColorDomain();
  }

  async ngOnChanges() {
    await 
    // this.getSkillData();
    this.calculateWidthAndHeight();
    this.setColorDomain();
  }

  setColorDomain() {
    this.colorScheme.domain = this.domains;
  }

  getSkillData() {
    this.single = [];
    let colorCode = [];
    this.chartData.forEach(element => {
      // console.log(element,'asfdads')
      // console.log(element)
      if (element) {
        let ele = {
          name: element.skillname,
          value: element.score,
          id: element.skillID,
          color: element.areaColor
        }
        colorCode.push(element.areaColor);
        this.single.push(ele);
        this.barChartLabels.push(element.skillname ? element.skillname : '')
        this.barChartData1.push(element.score ? element.score : '')
        this.barChartData = [
          {
            data: this.barChartData1,
            backgroundColor: colorCode,
            hoverBackgroundColor:colorCode,
            barThickness: 25,
          }
        ];
      }
    });
    this.colorScheme.domain = colorCode;
  }

  ngAfterViewInit() {
  }


  calculateWidthAndHeight() {

    if (this.single && this.single.length <= 1) {
      return this.view = [480, 75];
     }
    if (this.single && this.single.length <= 2) {
      return this.view = [480, 100];
     }
    if (this.single && this.single.length <= 3) {
     return this.view = [480, 120];
    }
    if (this.single && this.single.length <= 5) {
      return this.view = [480, 190];
    }
    if (this.single && this.single.length <= 7) {
      return this.view = [480, 262];
    }
    if (this.single && this.single.length <= 9) {
      return this.view = [480, 334];
    }
    if (this.single && this.single.length <= 11) {
      return this.view = [480, 406];
    }
  }

  onSelect(event) {
    this.selectedArea.emit(event);
  }


  chartClicked(e): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        let  data = {
            name : label,
            value: value,
            label: label
        }
        this.selectedArea.emit(data);
      }
    }
  }


  sorting(data) {
    // console.log(data)
    let sortingArray = this.single;
    this.single = [];
    data = data > 2 ? 1 : data;
    if (data == 1) {
      this.indexNum = data;
      sortingArray.sort(function(a, b) {
        return Number(a.value) < Number(b.value) ? -1 : 1;
      });
      let colorCode = this.domains;
      sortingArray.forEach(element => {
        // console.log(element)
        // colorCode.push(this.domains);
        this.single.push(element);
      });
      this.colorScheme.domain = colorCode;
    }
    else if (data == 2) {
      this.indexNum = data;
      sortingArray.sort(function(a, b) {
        return Number(a.value) > Number(b.value) ? -1 : 1;
      });
      let colorCode = this.domains;
      sortingArray.forEach(element => {
        // colorCode.push(element.color);
        this.single.push(element);
      });
      this.colorScheme.domain = colorCode;
    } else {
      this.indexNum = 0;
      this.getSkillData();
    }
  }

}
