import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-info',
  templateUrl: './assessment-info.component.html',
  styleUrls: ['./assessment-info.component.scss']
})
export class AssessmentInfoComponent implements OnInit {

  colorCode = 'Good';
  constructor() { }

  ngOnInit(): void {
  }

}
