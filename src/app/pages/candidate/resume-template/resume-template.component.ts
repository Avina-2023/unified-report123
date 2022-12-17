import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import * as moment from "moment";



@Component({
  selector: 'app-resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.scss']
})
export class ResumeTemplateComponent implements OnInit {
  candidate: any;
  username = localStorage.getItem('name')
  constructor(private router:Router,private appConfig: AppConfigService,) { }

  ngOnInit() {
    this.getInfo();
  }

  gotoResumePage(){
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.RESUMEBUILDER);
  }

  getInfo(){
    this.candidate = JSON.parse(localStorage.getItem('candidateProfile'));
     this.candidate.education_details.educations.sort((a, b) => 
      new Date(b.year_of_passing).getFullYear() - new Date(a.year_of_passing).getFullYear()
    );
    this.candidate.experience_details.employments.sort((a, b) => 
      new Date(b.duration_to).getFullYear() - new Date(a.duration_to).getFullYear()
    );
     this.candidate.experience_details.intern.sort((a, b) => 
      new Date(b.to_date).getFullYear() - new Date(a.to_date).getFullYear()
    );
  }

  datediff(from,to){
    const startDate = moment(from);
    const endDate = moment(to);
    let difference = endDate.diff(startDate ,'months') + ' ' +'months';
    return difference;
    
  }
  

}
