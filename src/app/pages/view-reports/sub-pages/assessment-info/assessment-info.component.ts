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
  testJsonChart = [
    {
      "b1": 0,
      "b2": 3,
      "b3": 0,
      "c1": 0,
      "c2": 45,
      "c3": 0,
      "c4": 0,
      "c5": 100,
      "m1": 0,
      "m2": 7,
      "n1": 0,
      "s1": 0,
      "s2": 0
  },
  ]
  videoJson = [
    {
      "total": 10,
      "data": [
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b3b19c37d8c00226d1958"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3b19c37d8c00226d1959"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:10:01.347Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 3,
                      "b3": 0,
                      "c1": 0,
                      "c2": 45,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 7,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "c5",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b3b19c37d8c00226d1957"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b3addc37d8c00226d1956"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3ade50fe950021d25b66"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:09:00.921Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 100,
                      "b3": 0,
                      "c1": 0,
                      "c2": 75,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 52,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "b2",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b3adcc37d8c00226d1955"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b3aa1f1fbd20022dae78f"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3aa16958d70021fd8068"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:08:01.150Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 100,
                      "b3": 0,
                      "c1": 0,
                      "c2": 70,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 60,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "b2",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b3aa1f1fbd20022dae78e"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b3a6550fe950021d25b65"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3a656958d70021fd8066"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:07:01.208Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 100,
                      "b3": 0,
                      "c1": 0,
                      "c2": 5,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 5,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "b2",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b3a6550fe950021d25b64"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b3a29f1fbd20022dae78d"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3a296958d70021fd8062"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:06:01.096Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 17,
                      "b3": 0,
                      "c1": 0,
                      "c2": 60,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 42,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "c5",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b3a29f1fbd20022dae78c"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b39edc37d8c00226d1952"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b39f26958d70021fd8061"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:05:01.129Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 0,
                      "b3": 0,
                      "c1": 0,
                      "c2": 60,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 50,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "c5",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b39edc37d8c00226d1951"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b39b1f1fbd20022dae78b"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b39b2c37d8c00226d1950"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:04:01.155Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 0,
                      "b3": 0,
                      "c1": 0,
                      "c2": 30,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 40,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "c5",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b39b1f1fbd20022dae78a"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b39756958d70021fd805d"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3975f1fbd20022dae787"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:03:01.166Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 0,
                      "b3": 0,
                      "c1": 0,
                      "c2": 50,
                      "c3": 0,
                      "c4": 0,
                      "c5": 100,
                      "m1": 0,
                      "m2": 30,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "c5",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b39756958d70021fd805c"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b39396958d70021fd805a"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b3939f1fbd20022dae786"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:02:01.167Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 32,
                      "b3": 0,
                      "c1": 0,
                      "c2": 15,
                      "c3": 0,
                      "c4": 0,
                      "c5": 40,
                      "m1": 0,
                      "m2": 23,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "c5",
                  "threshold": 50,
                  "violated": false
              },
              "id": "5f6b39396958d70021fd8059"
          },
          {
              "type": "event",
              "attach": [
                  {
                      "filename": "webcam.jpg",
                      "mimetype": "image/jpeg",
                      "id": "5f6b38fd50fe950021d25b61"
                  },
                  {
                      "filename": "webcam.webm",
                      "mimetype": "video/x-matroska",
                      "id": "5f6b38fdf1fbd20022dae785"
                  }
              ],
              "room": "1f773ae3-78e4-4ad5-b4be-557f895b106d",
              "user": {
                  "role": "student",
                  "nickname": "taotesting2020september@mailinator.com",
                  "username": "GirijaLaktar",
                  "id": "GirijaLaktar"
              },
              "createdAt": "2020-09-23T12:01:01.214Z",
              "metadata": {
                  "metrics": {
                      "b1": 0,
                      "b2": 0,
                      "b3": 0,
                      "c1": 0,
                      "c2": 37,
                      "c3": 0,
                      "c4": 0,
                      "c5": 0,
                      "m1": 0,
                      "m2": 60,
                      "n1": 0,
                      "s1": 0,
                      "s2": 0
                  },
                  "peak": "m2",
                  "threshold": 50,
                  "violated": true
              },
              "id": "5f6b38fd50fe950021d25b60"
          }
      ]
  }
  ]
  proctoringData: any;

  api: VgAPI;
  fsAPI: VgFullscreenAPI;
  currentIndex = 0;
  currentItem:any = [];
  playlist:any = [];
  sectionData: {};
  listOfSections: any;
  userInfo: { assessmentName: any; assessmentDate: any; candidateName: any; };

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
    console.log(assessment)
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
      this.ApiService.getProctorVideo(data).subscribe((response: any)=> {
          let filter = [];
            response.data.forEach(data => {
                this.proctoringData = data.attach;
                filter.push({
                  id:  this.proctoringData[1].id,
                  posterId: this.proctoringData[0].id,
                  // poster: iterator.id,
                  src: 'https://proctoring.southeastasia.cloudapp.azure.com/api/storage/'+this.proctoringData[0].id+'?token='+response.token,
                })
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
            });
           this.currentItem =  this.playlist[this.currentIndex];
           this.getMiniVideos(this.proctoringData);
      })
  }

  getMiniVideos(data){
    for (const iterator of data) {
      if(iterator.filename == 'webcam.jpg'){
          this.playlist.imgUrl = iterator.id;
      }
    }
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
