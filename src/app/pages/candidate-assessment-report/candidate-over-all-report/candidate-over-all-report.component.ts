import { Component, ErrorHandler, OnInit } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private ApiService: ApiService,private toast: ToastrService,) { }

  ngOnInit(): void {
    this.getUserProfileSummary();
    this.getTestName();
    this.getTestSummaryCard();
    this.getSectionAnalysis();
    this.getTopicAnalysis();
    this.getTaxonomyAnalysis();
    this.getComplexityAnalysis();
    this.getTimeSpentAnalysis();
  }


  getUserProfileSummary(){
    let data = {
      "driveId": "943",
      "email": "venkat.s1@gmail.com"
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
      "driveId": "943",
      "email": "venkat.s1@gmail.com"
    }

    this.ApiService.getTestDetails(data).subscribe((res:any)=>{
      if(res.success){
          this.getTestNameList = res ? res.data : '';
      }else{
        this.toast.warning(res.message);
      }
    })
  }

  getTestSummaryCard(){
    let data = {
      "driveId":"943",
      "testName":"Java Microservices Test",
      "email":"venkat.s1@gmail.com"
  }

  this.ApiService.getTestSummaryCard(data).subscribe((res:any)=>{
    if(res.success){
        this.getCardDetails = res ? res.data[0] : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }

  getSectionAnalysis(){
    let data = {
      "driveId":"943",
      "testName":"Java Microservices Test",
      "email":"venkat.s1@gmail.com"
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
    let data = {
      "driveId":"943",
      "testName":"Java Microservices Test",
      "email":"venkat.s1@gmail.com"
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
    let data = {
      "driveId":"943",
      "testName":"Java Microservices Test",
      "email":"venkat.s1@gmail.com"
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
    let data = {
      "driveId":"943",
      "testName":"Java Microservices Test",
      "email":"venkat.s1@gmail.com"
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
    let data = {
      "driveId":"943",
      "testName":"Java Microservices Test",
      "email":"venkat.s1@gmail.com"
  }

  this.ApiService.getTimeSpentAnalysis(data).subscribe((res:any)=>{
    if(res.success){
        this.getTimeSpentDetails = res ? res.data : '';
    }else{
      this.toast.warning(res.message);
    }
  })
  }



  

}
