import { Component, OnInit } from '@angular/core';
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
  constructor(private ApiService: ApiService,private toast: ToastrService,) { }

  ngOnInit(): void {
    this.getUserProfileSummary();
    this.getTestName();
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

}
