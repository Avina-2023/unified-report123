import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-analysis',
  templateUrl: './section-analysis.component.html',
  styleUrls: ['./section-analysis.component.scss']
})
export class SectionAnalysisComponent implements OnInit {
@Input()getSectionAnalysisDetails;
  TimeTakenMins: number;
  timeTakenSec: any;
  constructor() { }

  ngOnInit(): void {
  }


  getTimetaken(takenTime){
    if(takenTime){
      let convertTime1 = takenTime.toString();
      let SplitTime1 = convertTime1.split(/([.])/);
      this.TimeTakenMins = parseInt(SplitTime1[0]);
      let sec = '0.' + SplitTime1[2];
      let conIntoSec = parseFloat(sec) * 60;
      this.timeTakenSec = conIntoSec.toFixed(0);
    }else {
      this.TimeTakenMins = 0;
      this.timeTakenSec = 0;
    }
  }

}
