import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overall-Report-details-card',
  templateUrl: './overall-Report-details-card.component.html',
  styleUrls: ['./overall-Report-details-card.component.scss']
})
export class OverallReportDetailsCardComponent implements OnInit {

  // @Input() tinycardLabel = 'Input data needed';
  // @Input() tinycardCount = '--';
  @Input() borderColor: string = '#DC3545';
  @Input() registrationCountColor: string = '#DC3545';
  @Input() cardName: string = 'Registrations'; 
  @Input() backgroundColor: string = '#DC354514'; 
  @Input() totalCount: number = 0;
  @Input() subCount1: number = 0;
  @Input() subCount2: number = 0;
  @Input() subCount3: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
