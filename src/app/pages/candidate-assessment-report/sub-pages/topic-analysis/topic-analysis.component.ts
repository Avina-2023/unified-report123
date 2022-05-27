import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topic-analysis',
  templateUrl: './topic-analysis.component.html',
  styleUrls: ['./topic-analysis.component.scss']
})
export class TopicAnalysisComponent implements OnInit {
@Input()getTopAnalysisDetails;
  TimeTakenMins: number;
  timeTakenSec: number;
  constructor() { }

  ngOnInit(): void {
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
