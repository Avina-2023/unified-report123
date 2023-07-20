import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';


@Component({
  selector: 'app-candidate-details-card',
  templateUrl: './candidate-details-card.component.html',
  styleUrls: ['./candidate-details-card.component.scss']
})
export class CandidateDetailsCardComponent implements OnInit {
  candidatedetails: any[];
  candidatelist: any;

  constructor(
    public router:Router,
    private apiservice: ApiService,
    private appconfig: AppConfigService,
  ) { }

  ngOnInit() {
    this.getcandidatedetails()
  }

  dashboard(){
    this.router.navigate(['/auth/dashboard/dashboard'])
  }

  getcandidatedetails(){
    let params: any ={}
    this.apiservice.getallCandidateDetails(params).subscribe((response:any)=>{
      if(response.success){
        this.candidatelist = response.data
        console.log(this.candidatelist,'canidatedata'); 
      }
    })
  }
  
}
