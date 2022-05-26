import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-info-and-test-count',
  templateUrl: './test-info-and-test-count.component.html',
  styleUrls: ['./test-info-and-test-count.component.scss']
})
export class TestInfoAndTestCountComponent implements OnInit {
  @Input() getTestNameList;
  selectedTest:any;
  constructor() { }

  ngOnInit(): void {
    this.selectedTest = this.getTestNameList && this.getTestNameList[0].testName;
  }


  selectedTestName(testName,index){
    this.selectedTest = testName
    console.log(testName,index)
    console.log(this.selectedTest,'selectedTest')
  }

}
