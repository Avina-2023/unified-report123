import { Component, Input, OnInit } from '@angular/core';

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
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];

  // Second Pie Chart
  public doughnutChartLabels1: string[] = [];
  public doughnutChartData1: number[] = [];
  showLegend = false;
  chartOptions = {
    responsive: true
  };


  constructor() { }

  ngOnInit(): void {
    this.getMainChart()

  }



  getMainChart(){
    this.getTimeSpentDetails.complexityData.forEach(element => {
         this.doughnutChartLabels.push(element.complexity)
         this.doughnutChartData.push(element.percentage)
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
