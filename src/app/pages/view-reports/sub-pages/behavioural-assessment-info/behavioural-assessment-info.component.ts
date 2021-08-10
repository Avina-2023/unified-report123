import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'; //in your component
import _ from 'lodash';
import { VgAPI, VgFullscreenAPI } from 'ngx-videogular';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-behavioural-assessment-info',
  templateUrl: './behavioural-assessment-info.component.html',
  styleUrls: ['./behavioural-assessment-info.component.scss']
})

export class BehaviouralAssessmentInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  @Input() driveName;
  @ViewChild('sourceVideo',{static: false}) video: TemplateRef<any>;
  // @ViewChild('matDialog', {static: false}) matDialogRef: TemplateRef<any>;
  @ViewChild('matDialog1', {static: false}) matDialogRef1: TemplateRef<any>;
  assessmentsList: any;
  colorCode = 'Good';
  iconBase = 'like';
  timeTaker: number;
  TimeTakerMins: number;
  timeTakerSec: any;
  TimeTakenMins: number;
  timeTakenSec: any;
  correct = true;
  proctoringData: any;

  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  currentIndex = 0;
  currentItem:any = [];
  playlist:any = [];
  sectionData: {};
  listOfSections: any;

  constructor(public matDialog: MatDialog,private toastr: ToastrService, private ApiService: ApiService, ) { }

  ngOnInit(): void {
    this.getAssessmentInfo();

  }

  ngOnChanges() {
    this.getAssessmentInfo();
  }

  getAssessmentInfo() {
    if (this.getAllReportsData && this.getAllReportsData.BehavioralAssessment && this.getAllReportsData.BehavioralAssessment.length > 0) {
      this.assessmentsList = this.getAllReportsData.BehavioralAssessment;
      this.assessmentsList && this.assessmentsList.length > 0 ? this.covertToPercentage() : '';
    }
  }

  covertToPercentage() {
    this.assessmentsList.forEach(element => {
      if (element.score && element.maxscore) {
        let score = Number(element.score) / Number(element.maxscore) * 100;
        let percentage = Number.isInteger(score) ? score : score.toFixed(2);
        element.percentageScore = percentage;
      } else {
        element.percentageScore = 0;
      }
    });
  }

  getCredibility(score) {
    if (score < 40) {
      return 'Weak';
    }
    if (score >=40 && score < 80) {
      return 'Average';
    }
    if (score >=80 && score < 90) {
      return 'Good';
    }
    if (score >=90) {
      return 'Excellent';
    }
    return null;
  }

  momentForm(date) {
    if (date) {
      const split = moment(date).format('LLL');
      return split;
    }
  }

  getTimetaker(time){
    if(time){
      let convertTime = time.toString();
      let SplitTime = convertTime.split(/([.])/);
      this.TimeTakerMins = parseInt(SplitTime[0]);
      let sec = '0.' + SplitTime[2];
      let conIntoSec = parseFloat(sec) * 60;
      this.timeTakerSec = conIntoSec.toFixed(0);
    }
  }

  getTimetaken(takenTime){
    if(takenTime){
      let convertTime1 = takenTime.toString();
      let SplitTime1 = convertTime1.split(/([.])/);
      this.TimeTakenMins = parseInt(SplitTime1[0]);
      let sec = '0.' + SplitTime1[2];
      let conIntoSec1 = parseFloat(sec) * 60;
      this.timeTakenSec = conIntoSec1.toFixed(0);
    }
  }

  open(){
    const dialogRef = this.matDialog.open(this.matDialogRef1, {
      width: '200vh',
      height: '600px',
      autoFocus: false,
      closeOnNavigation: true,
    });
  }

  closeBox() {
    this.matDialog.closeAll();
  }

}
