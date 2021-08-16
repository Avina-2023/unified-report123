import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'; //in your component
import _ from 'lodash';
import { VgAPI, VgFullscreenAPI } from 'ngx-videogular';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-assessment-info',
  templateUrl: './assessment-info.component.html',
  styleUrls: ['./assessment-info.component.scss']
})
export class AssessmentInfoComponent implements OnInit, OnChanges {
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
  userInfo: {};
  playVideoList = [];

  constructor(public matDialog: MatDialog,private toastr: ToastrService, private ApiService: ApiService, ) { }

  ngOnInit(): void {
    this.getAssessmentInfo();
  }

  ngOnChanges() {
    this.getAssessmentInfo();
  }

  getAssessmentInfo() {
    if (this.getAllReportsData && this.getAllReportsData.driveDetails && this.getAllReportsData.driveDetails.length > 0 && this.getAllReportsData.selectedDriveName) {
      const assessmentDrive = this.getAllReportsData.driveDetails.find((x => x.drivename == this.getAllReportsData.selectedDriveName))
      this.assessmentsList = assessmentDrive.assessments;
      this.assessmentsList && this.assessmentsList.length > 0 ? this.covertToPercentage() : '';
    }
  }

  covertToPercentage() {
    this.assessmentsList.forEach(element => {
      if (element.score && element.maxscore) {
        let score = Number(element.score) / Number(element.maxscore) * 100;
        let percentage = Number.isInteger(score) ? score : score.toFixed(2);
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
      this.ApiService.getProctorVideo(data).subscribe((response: any)=> {
            response.data.forEach((data) => {
                var i =0
                filter = [];
                data.attach.forEach((iterator) => {
                  if(iterator.mimetype.includes('video')){
                    this.playVideoList.push({
                      id:iterator.id,
                      filename:iterator.filename,
                      poster:iterator.id,
                      src: 'https://proctoring.southeastasia.cloudapp.azure.com/api/storage/'+iterator.id+'?token='+response.token,
                    })
                  this.playlist.push({
                    id:iterator.id,
                    filename:iterator.filename,
                    poster:iterator.id,
                    src: 'https://proctoring.southeastasia.cloudapp.azure.com/api/storage/'+iterator.id+'?token='+response.token,
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
    
    questionview (templateRef: TemplateRef<any>,assessment) {
    this.matDialog.open(templateRef, {
      width: '90%',
      height: '85%',
      // closeOnNavigation: true,
      disableClose: true,
      panelClass: 'question_dialog'
    }); 
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
      testname: assessmentname,
    }
    this.ApiService.getSectionWiseDetails(data).subscribe((response: any)=> {
      if(response.data.length > 0) {
        this.listOfSections = response.data;
      }else {
        this.toastr.error('No data available for the specified assessment');
      }
    })
  }


  // getProctoringVideo(){

  // }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false
  };

  public barChartLabels = ['b1', 'b2', 'b3', 'c1', 'c2'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {data: [0, 28, 8, 0, 5], label: 'Remote'} 
    
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#ff5253' }
  ]

}
