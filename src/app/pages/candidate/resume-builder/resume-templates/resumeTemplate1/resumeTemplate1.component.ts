import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
// import { MessengerService } from './messenger.service';

@Component({
  selector: 'app-resumeTemplate1',
  templateUrl: './resumeTemplate1.component.html',
  styleUrls: ['./resumeTemplate1.component.scss'],
})
export class ResumeTemplate1Component implements OnInit {
  candidate: any;
  username = localStorage.getItem('name');
  productionUrl =
    environment.SKILL_EDGE_URL == 'https://skilledge.lntedutech.com'
      ? true
      : false;
  profileImage = '';
  candidateStatus: any;
  candidateDetails: any;
  constructor(
    private apiService: ApiService,
    private appConfig: AppConfigService // private messenger: MessengerService
  ) {}

  ngOnInit() {
    this.getInfo();
    this.fetchcandidatedetail();
    this.candidateDetails = JSON.parse(
      this.appConfig.getLocalStorage('Candidate_details')
    );
  }
  // fetchcandidatedetail() {
  //   const obj = {
  //     email: this.apiService.encryptnew(
  //       this.candidateDetails.email,
  //       environment.cryptoEncryptionKey
  //     ),
  //     // email: 'U2FsdGVkX1/cBGP1UHh22RLslHnqecvkHmmlRna1g7f4KlUvhR0LclSMbhtSRRFI',
  //     // email: "JSON.parse(localStorage.email('candidateProfile'))",
  //   };
  //   this.apiService.candidateDetails(obj).subscribe((response: any) => {
  //     if (response.success) {
  //       this.candidate = response.data;
  //       console.log(response.data, 'test');
  //     }
  //   });
  // }
  fetchcandidatedetail() {
    const storedEmail = localStorage.getItem('email'); // Retrieve the email from local storage

    if (storedEmail) {
      // Check if the email was found in local storage
      const obj = {
        email: this.apiService.encryptnew(
          storedEmail, // Use the retrieved email
          environment.cryptoEncryptionKey
        ),
      };

      this.apiService.candidateDetails(obj).subscribe((response: any) => {
        if (response.success) {
          this.candidate = response.data;
          console.log(response.data, 'test');
        }
      });
    } else {
      // Handle the case where the email is not found in local storage
      console.error('Email not found in local storage.');
    }
  }

  getInfo() {
    // this.candidate = JSON.parse(localStorage.getItem('candidateProfile'));
    // if (
    //   this.candidate?.personal_details?.profileImage &&
    //   this.productionUrl == true
    // ) {
    //   this.profileImage =
    //     this.candidate?.personal_details?.profileImage + environment.blobToken;
    // } else if (
    //   this.candidate?.personal_details?.profileImage &&
    //   this.productionUrl == false
    // ) {
    //   this.profileImage = this.candidate?.personal_details?.profileImage;
    // }
    // this.candidate.education_details.educations.sort(
    //   (a, b) =>
    //     new Date(b.year_of_passing).getFullYear() -
    //     new Date(a.year_of_passing).getFullYear()
    // );
    // this.candidate.experience_details.employments.sort(
    //   (a, b) =>
    //     new Date(b.duration_to).getFullYear() -
    //     new Date(a.duration_to).getFullYear()
    // );
    // this.candidate.experience_details.intern.sort(
    //   (a, b) =>
    //     new Date(b.to_date).getFullYear() - new Date(a.to_date).getFullYear()
    // );
  }

  datediff(from, to) {
    const startDate = moment(from);
    const endDate = moment(to);
    let difference = endDate.diff(startDate, 'months') + ' ' + 'months';
    return difference;
  }
}
