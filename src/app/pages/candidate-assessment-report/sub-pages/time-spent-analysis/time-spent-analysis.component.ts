import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-time-spent-analysis',
  templateUrl: './time-spent-analysis.component.html',
  styleUrls: ['./time-spent-analysis.component.scss']
})
export class TimeSpentAnalysisComponent implements OnInit {
  chart: any;
  @Input()getTimeSpentDetails;
  TimeTakenMins: number;
  timeTakenSec: number;

  //Main Pie Chart
  public doughnutChartLabels: Label[] = [];
  // public doughnutChartData: any[] = [];
  public doughnutChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [],
    }
  ];
  showLegend = false;
  chartOptions = {
    responsive: true
  };



  // Second Pie Chart
  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];

  chartOptions1 = {
    responsive: true
  };


  constructor() { }

  ngOnInit(): void {
    this.getMainChart()

  }



  getMainChart(){
    let formArray = [];
    this.getTimeSpentDetails.complexityData.forEach(element => {
            if(element.complexity == 'Low'){
                formArray[0] = element;
                formArray[0].color = '#90C8FA'
            }else if (element.complexity == 'Medium'){
              formArray[1] = element;
              formArray[1].color = '#4B91F4'
            }else{
              formArray[2] = element;
              formArray[2].color = '#22538C'
            }
       });
       this.timeSpentOuterChart(formArray)
  }

    timeSpentOuterChart(data){
      let colorCode = [];
      let chartdata = []
      data.forEach(element => {
        colorCode.push(element.color)
        this.doughnutChartLabels.push(element.complexity)
        chartdata.push(element.percentage)
        this.doughnutChartData = [{data: chartdata,backgroundColor: colorCode}];
        });
    }

  
  getTimetaken(takenTime){
    if(takenTime){
      let convertTime1 = takenTime.toString();
      let SplitTime1 = convertTime1.split(/([.])/);
      this.TimeTakenMins = parseInt(SplitTime1[0]);
      this.timeTakenSec = parseInt(SplitTime1[2]);
    }else {
      this.TimeTakenMins = 0;
      this.timeTakenSec = 0;
    }
  }

}