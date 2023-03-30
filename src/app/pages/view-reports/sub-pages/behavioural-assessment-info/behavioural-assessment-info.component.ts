import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'; //in your component
import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
import { environment } from 'src/environments/environment.prod';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { ActivatedRoute } from '@angular/router';
// import { Timeline } from 'vis-timeline';
// import { DataSet } from 'vis-data';

// import { DataSet } from "vis-data/peer";
// import { Timeline } from "vis-timeline/peer";
// import "vis-timeline/styles/vis-timeline-graph2d.css";

@Component({
  selector: 'app-behavioural-assessment-info',
  templateUrl: './behavioural-assessment-info.component.html',
  styleUrls: ['./behavioural-assessment-info.component.scss']
})

export class BehaviouralAssessmentInfoComponent implements OnInit, OnChanges {
  proctor_url = environment.PROCTOR_URL;
  @Input() getAllReportsData;
  @Input() driveName;
  @Input() emailId;
  @ViewChild('sourceVideo',{static: false}) video: TemplateRef<any>;
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
  currentIndex = 0;
  currentItem:any = [];
  playlist:any = [];
  listOfSections: any;
  userInfo: { assessmentName: any; assessmentDate: any; candidateName: any; };
  playVideoList = []
  secValChart: any;
  isaccess:any;
  getAllBehaviourData: any;
  getBehaviourReportAPISubscription: Subscription;
  getAllBasicData: any;
  getAllBehaviourAPIDetails: any;
  apiSuccess = true;
  isPdfdownable = false;
  highestEducation: any;
  constructor(private route: ActivatedRoute,private sendData: SentDataToOtherComp,private appConfig: AppConfigService,public matDialog: MatDialog,private toastr: ToastrService, private ApiService: ApiService, ) {

  }

  ngOnInit(): void {
    this.getAssessmentInfo();
    this.isaccess = this.appConfig.isComingFromMicroCert();
      // this.getBehaviouralReportData(this.emailId ? this.emailId : '');
      this.route.paramMap.subscribe((param: any) => {
        if (param && param.params && param.params.id) {
          let email = param.params.id ? param.params.id : this.emailId
          this.getBehaviouralReportData(email);
        }
      });
   
    // const container = document.getElementById("visualization");
    // const items = new DataSet([
    //   { id: 1, content: "item 1", start: "2014-04-20" },
    //   { id: 2, content: "item 2", start: "2014-04-14" },
    //   { id: 3, content: "item 3", start: "2014-04-18" },
    //   { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
    //   { id: 5, content: "item 5", start: "2014-04-25" },
    //   { id: 6, content: "item 6", start: "2014-04-27", type: "point" }
    // ]);
    // const options = {};
    // const timeline = new Timeline(container, items, options);
  }

  viewBehaviouralReport() {
    this.appConfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.BEHAVIOUR_MODULE.BEHAVIOUR_REPORT, window.btoa(this.emailId));
  }
  
  viewBehaviouralReport1(){
    this.appConfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.BEHAVIOUR_MODULE.BEHAVIOUR_REPORT1, this.ApiService.encrypt(this.emailId));
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
    console.log(this.assessmentsList,'hiii');
    
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

  open(assessment){
    const dialogRef = this.matDialog.open(this.matDialogRef1, {
      width: '200vh',
      height: '600px',
      autoFocus: false,
      disableClose: false
    });
    this.userInfo = {
      assessmentName: assessment.testname,
      assessmentDate: assessment.testdate,
      candidateName : this.getAllReportsData.firstname
    }
    this.getVideoFiles(assessment.roomId);
  }

  getVideoFiles(roomId){
    let data = {
      limit: 20,
      count: 1,
      filterType:"event",
      roomId: roomId
      }
      let filter = [];
      this.ApiService.getProctorVideo(data).subscribe((response: any)=> {
            response.data.forEach((data) => {
                var i = 0;
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
                  i++
                }
              });
              for (const key in data.metadata.metrics) {
                if (Object.prototype.hasOwnProperty.call(data.metadata.metrics, key)) {
                }
                filter.push({key: key,value:data.metadata.metrics[key]})
              }
              this.playVideoList.push({chart:filter})
            });
           this.currentItem =  this.playlist[this.currentIndex]
      })
  }


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

  closeBox() {
    this.matDialog.closeAll();
  }

  getBehaviouralReportData(data) {
    const apiData = {
      email: data,
      reportId: "R1"
    };
  this.emailId= data;
   this.getBehaviourReportAPISubscription = this.ApiService.getBehaviourReport(apiData).subscribe((response: any) => {
    if (response && response.success && response.data) {
        this.apiSuccess = true;
        this.getAllBehaviourData = response.data.data ? response.data.data : null;
        this.getAllBehaviourAPIDetails = response.data ? response.data : null;
        this.getAllBasicData = response.data.basicDetails ? response.data.basicDetails : null;
        this.highestEducation = this.getAllBasicData && this.getAllBasicData.education ? this.getAllBasicData.education : [];
        if (this.highestEducation.length > 0) {
          let i = this.highestEducation.length - 1;
          this.highestEducation = this.highestEducation[i];
        }
      } else {
        this.apiSuccess = false;
        // this.toastr.error('No Reports Available');
        this.getAllBasicData = null;
        this.getAllBehaviourData = null;
        this.getAllBehaviourAPIDetails = null;
      }
    }, (err)=> {
      this.apiSuccess = false;
      this.getAllBasicData = null;
      this.getAllBehaviourData = null;
      this.getAllBehaviourAPIDetails = null;
});
}
ngOnDestroy() {
  this.getBehaviourReportAPISubscription ? this.getBehaviourReportAPISubscription.unsubscribe() : '';
}

downloadreport(val){
  if(val){
    this.isPdfdownable = val;
    this.sendData.sendMessage(true,'');
  }else{
    this.isPdfdownable = false;
    this.sendData.sendMessage(false,'');
  }

  
}
}

                // filter.push({
                //   id:  this.proctoringData[1].id,
                //   posterId: this.proctoringData[0].id,
                //   // poster: iterator.id,
                //   src: 'https://proctoring.southeastasia.cloudapp.azure.com/api/storage/'+this.proctoringData[0].id+'?token='+response.token,
                // })
                // getMiniVideos(data){
                //   for (const iterator of data) {
                //     if(iterator.filename == 'webcam.jpg'){
                //         this.playlist.imgUrl = iterator.id;
                //     }
                //   }
                // }
