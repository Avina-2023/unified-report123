import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overall-Report-minicard-details',
  templateUrl: './overall-Report-minicard-details.component.html',
  styleUrls: ['./overall-Report-minicard-details.component.scss']
})
export class OverallReportMinicardDetailsComponent implements OnInit {

  @Input() cardTitle: string = 'Registrations'; 
  @Input() minitotalCount: number = 0;
  @Input() minisubCount1: number = 0;
  @Input() minisubCount2: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
