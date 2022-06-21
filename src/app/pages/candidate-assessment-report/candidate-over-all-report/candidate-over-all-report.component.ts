import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from './../../../services/api.service';
@Component({
  selector: 'app-candidate-over-all-report',
  templateUrl: './candidate-over-all-report.component.html',
  styleUrls: ['./candidate-over-all-report.component.scss']
})
export class CandidateOverAllReportComponent implements OnInit {
  getCandidateProfile: any;
  getTestNameList:any;
  getCardDetails:any;
  getSectionAnalysisDetails:any;
  getTopAnalysisDetails:any;
  getTaxonomyDetails:any;
  getComplexityDetails: any;
  getTimeSpentDetails: any;
  driveId: any;
  email: any;
  TestName: any;
  constructor(private ApiService: ApiService,private toast: ToastrService, private appConig : AppConfigService) { }

  ngOnInit(): void {
    this.driveId = this.appConig.getSessionStorage('driveInfo') ? this.appConig.getSessionStorage('driveInfo') : '';
    this.email = this.appConig.getSessionStorage('email') ? this.appConig.getSessionStorage('email') : '';
    if(this.driveId &&  this.email){
      this.getUserProfileSummary();
      this.getTestName();
    }else{
      this.toast.warning('Please try after sometime')
    }
  }


  getUserProfileSummary(){
    let data = {
      "driveId": this.driveId,
      "email":  this.email
    }
      this.ApiService.getTestSummary(data).subscribe((res:any)=>{
        if(res.success){
            this.getCandidateProfile = res ? res.data[0] : '';
        }else{
          this.toast.warning(res.message);
        }
      })
  }

  getTestName(){
    let data = {
      "driveId": this.driveId,
      "email":  this.email
    }

    this.ApiService.getTestDetails(data).subscribe((res:any)=>{
      if(res.success){
          this.getTestNameList = res ? res.data : '';
          this.TestName = res ? res.data[0].testName:'';
          if(this.TestName){
            this.getTestSummaryCard();
            // this.getSectionAnalysis();
            // this.getTopicAnalysis();
            // this.getTaxonomyAnalysis();
            // this.getComplexityAnalysis();
            // this.getTimeSpentAnalysis();
          }
      }else{
        this.toast.warning(res.message);
      }
    })
  }

  getTestSummaryCard(){
    this.getCardDetails = [];
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.TestName,
  }

  this.ApiService.getTestSummaryCard(data).subscribe((res:any)=>{
    this.getCardDetails = [];
    if(res.success){
        this.getCardDetails = res ? res.data[0] : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }

  getSectionAnalysis(){
    this.getSectionAnalysisDetails = [];
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.TestName,
  }

  this.ApiService.getSectionAnalysis(data).subscribe((res:any)=>{
    if(res.success){
        this.getSectionAnalysisDetails = res ? res.data : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }

  getTopicAnalysis(){
    this.getTopAnalysisDetails = [];
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.TestName,
  }

  this.ApiService.getTopicAnalysis(data).subscribe((res:any)=>{
    if(res.success){
        this.getTopAnalysisDetails = res ? res.data : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }

  getTaxonomyAnalysis(){
    this.getTaxonomyDetails = []
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.TestName,
  }

  this.ApiService.getTaxonomyAnalysis(data).subscribe((res:any)=>{
    if(res.success){
        this.getTaxonomyDetails = res ? res.data : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }

  getComplexityAnalysis(){
    this.getComplexityDetails = [];
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.TestName,
  }

  this.ApiService.getComplexityAnalysisForTest(data).subscribe((res:any)=>{
    if(res.success){
        this.getComplexityDetails = res ? res.data[0] : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }


  getTimeSpentAnalysis(){
    this.getTimeSpentDetails = [];
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.TestName,
  }

  this.ApiService.getTimeSpentAnalysis(data).subscribe((res:any)=>{
    if(res.success){
        this.getTimeSpentDetails = res ? res.data : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }

  getSelectedTestName($event){
    this.TestName = $event;
    if($event){
      this.getTestSummaryCard();
      this.getSectionAnalysis();
      this.getTopicAnalysis();
      this.getTaxonomyAnalysis();
      this.getComplexityAnalysis();
      this.getTimeSpentAnalysis();
    }
  }
}
