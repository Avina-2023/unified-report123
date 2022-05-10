import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'; //in your component
import _ from 'lodash';
import { VgAPI, VgFullscreenAPI } from 'ngx-videogular';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
// import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-assessment-info',
  templateUrl: './assessment-info.component.html',
  styleUrls: ['./assessment-info.component.scss']
})
export class AssessmentInfoComponent implements OnInit, OnChanges {
  proctor_url = environment.PROCTOR_URL;
  @Input() getAllReportsData;
  @Input() driveName;
  @ViewChild('sourceVideo',{static: false}) video: TemplateRef<any>;
  // @ViewChild('matDialog', {static: false}) matDialogRef: TemplateRef<any>;
  @ViewChild('matDialog1', {static: false}) matDialogRef1: TemplateRef<any>;
  @ViewChild('selectDrive', {static: false}) selectDrive: TemplateRef<any>;
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
  userInfo: {};
  playVideoList = [];
  inboundClick = false;
  showErrormsg = false;
  isaccess:any;

  constructor(private appConfig: AppConfigService,private http: HttpClient ,public matDialog: MatDialog,private toastr: ToastrService, private ApiService: ApiService, ) {


  }



  ngOnInit(): void {
    this.getAssessmentInfo();
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  ngOnChanges() {
    this.getAssessmentInfo();
  }

  getAssessmentInfo() {
    if (this.getAllReportsData && this.getAllReportsData.driveDetails && this.getAllReportsData.driveDetails.length > 0 && this.getAllReportsData.selectedDriveName) {
      const assessmentDrive = this.getAllReportsData.driveDetails.find((x => x.drivename == this.getAllReportsData.selectedDriveName))
      this.assessmentsList = assessmentDrive ? assessmentDrive.assessments : '' ;
      this.assessmentsList && this.assessmentsList.length > 0 ? this.covertToPercentage() : '';
    }
  }

  covertToPercentage() {
    this.assessmentsList.forEach(element => {
      
      if (element.score >=0 && element.maxscore) {
        let score = element.score / element.maxscore * 100;
        const percentage = score ? score : score.toFixed(2);
        element.percentageScore = percentage;
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
    return '-';
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
    } else {
      this.TimeTakerMins = 0;
      this.timeTakerSec = 0;
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
    }else {
      this.TimeTakenMins = 0;
      this.timeTakenSec = 0;
    }
  }

  open(assessment){
    const dialogRef = this.matDialog.open(this.matDialogRef1, {
      width: '95%',
      height: '600px',
      autoFocus: false,
      closeOnNavigation: true,
    });

    this.userInfo = {
      assessmentName: assessment.assessmentname,
      assessmentDate: assessment.assessmentdate,
      candidateName : this.getAllReportsData.firstname
    }

    this.getVideoFiles(assessment.roomId);
  }

  driveSelect() {
    const dialogRef = this.matDialog.open(this.selectDrive, {
      width: '500px',
      height: '400px',
      autoFocus: false,
      closeOnNavigation: true,
      panelClass: 'selectDriveSchedule'
    });
  }
  driveClose() {
    this.matDialog.closeAll();
  }

  closeBox() {
    this.matDialog.closeAll();
  }

  getVideoFiles(roomId){
    let data = {
      limit: 20,
      count: 1,
      filterType:"event",
      roomId: roomId
      }
      let filter = [];
      this.playlist = [];
      this.playVideoList = [];
      this.currentItem = [];
      this.ApiService.getProctorVideo(data).subscribe((response: any)=> {
        if(response.data){
          this.showErrormsg = false;
          response.data.forEach((data) => {
            var i = 0
            filter = [];
            data.attach.forEach((iterator) => {
              if(iterator.mimetype.includes('video')){
                this.playVideoList.push({
                  id:iterator.id,
                  filename:iterator.filename,
                  poster:iterator.id,
                  src: this.proctor_url+iterator.id+'?token='+response.token,
                })
              this.playlist.push({
                id:iterator.id,
                filename:iterator.filename,
                poster:iterator.id,
                src: this.proctor_url+iterator.id+'?token='+response.token,
              })
              i++;
            }
          });
          for (const key in data.metadata.metrics) {
            if (Object.prototype.hasOwnProperty.call(data.metadata.metrics, key)) {
            }
            filter.push({key: key,value:data.metadata.metrics[key]});
          }
          this.playVideoList.push({chart:filter});
        });
       this.currentItem =  this.playlist[this.currentIndex];
        }else {
          this.showErrormsg = true;
        }

      })
  }

  // getMiniVideos(data){
  //   for (const iterator of data) {
  //     if(iterator.filename == 'webcam.jpg'){
  //         this.playlist.imgUrl = iterator.id;
  //     }
  //   }
  // }

  nextVideo() {
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.playlist[this.currentIndex];
    this.playVideo();
  }

  playVideo() {
    var vid = <HTMLVideoElement> document.getElementById("myVideo");
    vid.load();
    vid.play();
  }

    questionview (assessment) {
    this.sectionData = {
      assessmentName: assessment.assessmentname,
      assessmentDate: assessment.assessmentdate,
      candidateName : this.getAllReportsData.firstname
    }
    this.getSectionsData(assessment.assessmentname);
  }


  getSectionsData(assessmentname){
    this.listOfSections = [];
    let data = {
      email:   this.getAllReportsData.email,
      testname: assessmentname ? assessmentname : '' ,
    }
    this.ApiService.getSectionWiseDetails(data).subscribe((response: any)=> {
      if(response.data.length > 0) {
        this.listOfSections = response.data;
        this.listOfSections[0].testName = assessmentname;
      }else {
        this.toastr.error('No data available for the specified assessment');
      }
    })
  }
}
