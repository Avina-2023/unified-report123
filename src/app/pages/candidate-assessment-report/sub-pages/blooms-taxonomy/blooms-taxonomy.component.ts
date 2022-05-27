import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blooms-taxonomy',
  templateUrl: './blooms-taxonomy.component.html',
  styleUrls: ['./blooms-taxonomy.component.scss']
})
export class BloomsTaxonomyComponent implements OnInit {
  @Input()getTaxonomyDetails;
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
