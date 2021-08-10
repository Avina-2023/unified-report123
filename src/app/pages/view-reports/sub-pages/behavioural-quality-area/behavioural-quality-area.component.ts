import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-behavioural-quality-area',
  templateUrl: './behavioural-quality-area.component.html',
  styleUrls: ['./behavioural-quality-area.component.scss']
})
export class BehaviouralQualityAreaComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  getAreaofDevelopment: any;
  areatoimprove: any
  constructor() { }

  ngOnInit(): void {
    this.getStrengthAndWeakness();
  }

  ngOnChanges() {
    this.getStrengthAndWeakness();
  }

  getStrengthAndWeakness() {
    if (this.getAllReportsData && this.getAllReportsData.psychometricContent && this.getAllReportsData.psychometricContent.length > 0) {
      this.getAreaofDevelopment = this.getAllReportsData.psychometricContent;
    } else {
      this.getAreaofDevelopment = [];
    }
  }

}
