import {
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-time-spent-analysis',
  templateUrl: './time-spent-analysis.component.html',
  styleUrls: ['./time-spent-analysis.component.scss'],
})
export class TimeSpentAnalysisComponent implements OnInit, OnChanges {
  chart: any;
  @Input() getTimeSpentDetails;
  TimeTakenMins: number;
  timeTakenSec: any;
  selectedIndex: number = null;
  //Main Pie Chart
  public doughnutChartLabels: Label[] = [];
  public doughnutChartLabelsSub: Label[] = [];
  public doughnutChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
    },
  ];
  public doughnutChartDataSub: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
    },
  ];
  showLegend = false;
  showLegendSubChart = false;
  chartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  // Second Pie Chart
  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  chartOptionsSub = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      }
    },
  
  };
  subChartArr: any;
  timeTakenSec2: any;
  TimeTakenMins2: number;

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.getMainChart();
  }

  selectedTimeChart(overall,index,time) {
    this.getTimetaken1(time)
    this.selectedIndex = index;
    let newLabels = [];
    let colorcodes = ['#7AC169', '#C15D5D', '#D3D3D4'];
    let newColorcodes = [];
    let newPercentage = [];
    if (overall && overall.levelData) {
      this.subChartArr = overall.levelData;
      overall.levelData.forEach((element) => {
        for (const key in element) {
          if (element[key] == true) {
            newLabels.push(key);
            key == 'correct'
              ? newColorcodes.push(colorcodes[0])
              : key == 'Incorrect'
              ? newColorcodes.push(colorcodes[1])
              : newColorcodes.push(colorcodes[2]);
            newPercentage.push(element.percentage);
          }
        }
      });
    }

    this.doughnutChartLabelsSub = newLabels;
    this.doughnutChartDataSub = [
      { data: newPercentage, backgroundColor: newColorcodes },
    ];
  }

  getMainChart() {
    let formArray = [];
    this.subChartArr = [];
    this.doughnutChartData = [];
    if (this.getTimeSpentDetails && this.getTimeSpentDetails.complexityData) {
      this.getTimeSpentDetails.complexityData.forEach((element) => {
        if (element.complexity == 'Low') {
          formArray[0] = element;
          formArray[0].color = '#90C8FA';
        } else if (element.complexity == 'Medium') {
          formArray[1] = element;
          formArray[1].color = '#4B91F4';
        } else {
          formArray[2] = element;
          formArray[2].color = '#22538C';
        }
      });
    }

    this.timeSpentOuterChart(formArray);
    this.getTimeSpentDetails.complexityData = formArray;
    this.selectedTimeChart(this.getTimeSpentDetails.complexityData[0],0,this.getTimeSpentDetails.complexityData[0].timetaken);
  }

  timeSpentOuterChart(data) {
    let colorCode = [];
    let chartdata = [];
    data.forEach((element) => {
      colorCode.push(element.color);
      this.doughnutChartLabels.push(element.complexity);
      chartdata.push(element.percentage);
      this.doughnutChartData = [
        { data: chartdata, backgroundColor: colorCode },
      ];
    });
  }

  getTimetaken(takenTime) {
    if (takenTime) {
      let convertTime1 = takenTime.toString();
      let SplitTime1 = convertTime1.split(/([.])/);
      this.TimeTakenMins = parseInt(SplitTime1[0]);
      let sec = '0.' + SplitTime1[2];
      let conIntoSec = parseFloat(sec) * 60;
      this.timeTakenSec = conIntoSec.toFixed(0);
    } else {
      this.TimeTakenMins = 0;
      this.timeTakenSec = 0;
    }
  }

  getTimetaken1(takenTime) {
    if (takenTime) {
      let convertTime12 = takenTime.toString();
      let SplitTime12 = convertTime12.split(/([.])/);
      this.TimeTakenMins2 = parseInt(SplitTime12[0]);
      let sec = '0.' + SplitTime12[2];
      let conIntoSec = parseFloat(sec) * 60;
      this.timeTakenSec2 = conIntoSec.toFixed(0);
    } else {
      this.TimeTakenMins2 = 0;
      this.timeTakenSec2 = 0;
    }
  }
}
