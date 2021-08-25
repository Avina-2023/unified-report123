import { AfterViewInit, Input, OnChanges } from "@angular/core";
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit {
  // Charts module initializtion
  canvas: any;
  ctx: any;
  @ViewChild('myChart', {static: false}) private chartContainer: ElementRef;
  @Input('chartType') type: any;
  @Input('values') chartValues: any;
  @Input('labels') chartLabels: any;
  @Input('orientation') orient: any;
  @Input('hideControls') hideControls: any;
  // Charts module initializtion end

  // ngx charts start
  @Output() competencyId:EventEmitter<any> =new EventEmitter<any>();
  @Input() chartData: any;
  @Input() domains: any;
  indexNum: any = 1;
  single: any;
  view: any[] = [500, 360];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Percentage';
  xAxisLabel = 'Competencies';
  barPadding = 26;
  yAxisTicks = [0, 40, 80, 100];
  horiTicks = [0, 100]
  colorScheme = {
    domain: ["#FF8C00", "#0085B6" , "#9DBC5B" , "#28B59A", "#03B8CB"]
  };

  // ngx charts end

  constructor() {
  }

  async ngOnInit() {
    await this.getCompetencyData();
    // this.setColorDomain();
    if (this.hideControls) {
      this.yAxisLabel = '';
      // this.yAxisTicks = [];
      this.barPadding = 20;
    }
  }

  async ngOnChanges() {
    await this.getCompetencyData();
    // this.setColorDomain();
  }

  setColorDomain() {
    this.colorScheme.domain = this.domains;
  }

  getCompetencyData() {
    this.single = [];
    let colorCode = [];
    this.chartData.forEach(element => {
      if (element) {
        let ele = {
          name: element.competencyname ? element.competencyname : '',
          value: element.score ? element.score : '',
          id: element.competencyId ? element.competencyId : '',
          color: element.areaColor ? element.areaColor : ''
        }
        colorCode.push(element.areaColor);
        this.single.push(ele);
      }
    });
    this.colorScheme.domain = colorCode;
    this.hideControls ? this.calculateWidthAndHeight() : this.addEmptyData(this.chartData);
  }

  ngAfterViewInit() {
  }

  calculateWidthAndHeight() {
    if (this.single && this.single.length <= 1) {
      return this.view = [480, 110];
     }
    if (this.single && this.single.length <= 2) {
      return this.view = [480, 150];
     }
    if (this.single && this.single.length <= 3) {
     return this.view = [480, 200];
    }
    if (this.single && this.single.length <= 5) {
      return this.view = [480, 250];
    }
    if (this.single && this.single.length <= 7) {
      return this.view = [480, 300];
    }
    if (this.single && this.single.length <= 9) {
      return this.view = [480, 350];
    }
    if (this.single && this.single.length <= 11) {
      return this.view = [480, 450];
    }
  }


  addSpaces(i, name) {
    for (let index = 0; index < i; index++) {
      name = name + ' ';
    }
    return name;
  }
  addEmptyData(data) {
    let expectedLength = 7;
    let chartLength = data.length;
    for (let index = data.length; index < expectedLength; index++) {
      let name = '';
      name = this.addSpaces(index, name);
      let emptyObj = {
        name: name,
        value: '',
        id: ''
      };
      this.single.push(emptyObj);
    }
  }

  sorting(data) {
    let sortingArray = this.single;
    this.single = [];
    data = data > 2 ? 1 : data;

    if (data == 1) {
      this.indexNum = data;
      sortingArray.sort(function(a, b) {
        if (a.value && b.value) {
          return Number(a.value) < Number(b.value) ? -1 : 1;
        }
      });
      let colorCode = [];
      sortingArray.forEach(element => {
        colorCode.push(element.areaColor ? element.areaColor : element.color);
        this.single.push(element);
      });
      this.colorScheme.domain = colorCode;
    }
    else if (data == 2) {
      this.indexNum = data;
      sortingArray.sort(function(a, b) {
        if (a.value && b.value) {
          return Number(a.value) > Number(b.value) ? -1 : 1;
        }
      });
      let colorCode = [];
      sortingArray.forEach(element => {
        colorCode.push(element.areaColor ? element.areaColor : element.color);
        this.single.push(element);
      });
      this.colorScheme.domain = colorCode;
    } else {
      // this.indexNum = 1;
      // this.ngOnInit();
    }
  }

  reset(){
     this.indexNum = 1;
      this.ngOnInit();
  }

  onSelect(event) {
    this.getSelectedCompetencyIdByName(event.name, event.value);
  }

  getSelectedCompetencyIdByName(name, value) {
    const selectedId = this.chartData.find((data)=> {
      if (data.competencyname == name && data.score == value) {
        return data;
      }
    });
    this.emitCompetencyId(selectedId.competencyname ? selectedId.competencyname : '');
  }
  emitCompetencyId(id) {
    this.competencyId.emit(id);
  }
}

