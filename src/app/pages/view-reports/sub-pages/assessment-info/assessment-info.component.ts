import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-info',
  templateUrl: './assessment-info.component.html',
  styleUrls: ['./assessment-info.component.scss']
})
export class AssessmentInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  @Input() driveName;
  assessmentsList: any;
  colorCode = 'Good';
  iconBase = 'like';
  constructor() { }

  ngOnInit(): void {
    this.getAssessmentInfo();
  }

  ngOnChanges() {
    this.getAssessmentInfo();
  }

  getAssessmentInfo() {
    if (this.getAllReportsData && this.getAllReportsData.driveDetails && this.getAllReportsData.driveDetails.length > 0 && this.getAllReportsData.selectedDriveName) {
      const assessmentDrive = this.getAllReportsData.driveDetails.find((x => x.drivename == this.getAllReportsData.selectedDriveName))
      // console.log('Assess Info', assessmentDrive);    
      this.assessmentsList = assessmentDrive.assessments;
    }
  }

  getCredibility(score) {
    if (score < 50) {
      return 'Weak';
    }
    if (score >=50 && score < 75) {
      return 'Average';
    }
    if (score >=75) {
      return 'Good';
    }
    return null;
  }
}
