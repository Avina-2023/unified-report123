import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blooms-taxonomy',
  templateUrl: './blooms-taxonomy.component.html',
  styleUrls: ['./blooms-taxonomy.component.scss']
})
export class BloomsTaxonomyComponent implements OnInit {
  @Input()getTaxonomyDetails;
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
