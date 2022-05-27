import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-info-and-test-count',
  templateUrl: './test-info-and-test-count.component.html',
  styleUrls: ['./test-info-and-test-count.component.scss']
})
export class TestInfoAndTestCountComponent implements OnInit {
  @Input() getTestNameList;
  @Input() getCardDetails;
  selectedTest:any;
  TimeTakenMins: number;
  timeTakenSec: number;
  constructor() { }

  ngOnInit(): void {
    this.selectedTest = this.getTestNameList && this.getTestNameList[0].testName;
  }


  selectedTestName(testName,index){
    this.selectedTest = testName
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
