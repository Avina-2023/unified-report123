import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-info',
  templateUrl: './assessment-info.component.html',
  styleUrls: ['./assessment-info.component.scss']
})
export class AssessmentInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  colorCode = 'Good';
  iconBase = 'like';
  constructor() { }

  ngOnInit(): void {
    console.log('child assessmentinfor component', this.getAllReportsData);
    
  }

  ngOnChanges() {
    console.log('child onchange assessmentinfor component', this.getAllReportsData);
  }
}
