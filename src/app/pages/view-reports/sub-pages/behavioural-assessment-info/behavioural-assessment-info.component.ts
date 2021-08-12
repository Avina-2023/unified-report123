import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'; //in your component
import _ from 'lodash';
import { VgAPI, VgFullscreenAPI } from 'ngx-videogular';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
import { Label, Color } from 'ng2-charts';
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
  userInfo: { assessmentName: any; assessmentDate: any; candidateName: any; };
  metrics: any;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false
  };

  public barChartLabels = ['b1',
    'b2',
    'b3',
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'm1',
    'm2',
    'n1',
    's1',
    's2',];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [];
  public barChartColors: Color[] = [
    { backgroundColor: '#ff5253' }
  ]
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

  open(assessment){
    const dialogRef = this.matDialog.open(this.matDialogRef1, {
      width: '200vh',
      height: '600px',
      autoFocus: false,
      closeOnNavigation: true,
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
      this.ApiService.getProctorVideo(data).subscribe((response: any)=> {
            response.data.forEach((data,i) => {
              let filter = [];
                this.proctoringData = data.attach;
                this.metrics = data.metadata.metrics;
                for (const key in this.metrics) {
                  if (Object.prototype.hasOwnProperty.call(this.metrics, key)) {
                  }
                  filter.push(this.metrics[key])
                
                }
             

                data.attach.forEach(iterator => {
                  if(iterator.mimetype.includes('video')){
                  this.playlist.push({
                    id:iterator.id,
                    filename:iterator.filename,
                    poster:iterator.id,
                    src: 'https://proctoring.southeastasia.cloudapp.azure.com/api/storage/'+iterator.id+'?token='+response.token,
                  })
                }
              });
              this.barChartData = this.barChartData + i;
              this.barChartData.push({data: filter ? filter : '', label: 'Data 1'});
            });

            
           this.currentItem =  this.playlist[this.currentIndex];
           console.log(this.barChartData,'filterfilter')

          //  this.getMiniVideos(this.proctoringData);
      })
  }
                    // console.log( this.barChartData,' this.barChartData')
           
               

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




}
