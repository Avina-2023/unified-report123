import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resumeTemplate1',
  templateUrl: './resumeTemplate1.component.html',
  styleUrls: ['./resumeTemplate1.component.scss']
})
export class ResumeTemplate1Component implements OnInit {
  candidate: any;
  username = localStorage.getItem('name')
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;
  profileImage = "";
  constructor() { }

  ngOnInit() {
    this.getInfo()
  }


  getInfo() {
    this.candidate = JSON.parse(localStorage.getItem('candidateProfile'));
    if (this.candidate?.personal_details?.profileImage && this.productionUrl == true) {
      this.profileImage = this.candidate?.personal_details?.profileImage + environment.blobToken
    } else if (this.candidate?.personal_details?.profileImage && this.productionUrl == false) {
      this.profileImage = this.candidate?.personal_details?.profileImage
    }
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
