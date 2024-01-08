import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-candidate-profile-overview',
  templateUrl: './candidate-profile-overview.component.html',
  styleUrls: ['./candidate-profile-overview.component.scss']
})
export class CandidateProfileOverviewComponent implements OnInit {
  Details: any;
  candidateEmail: any;
  candidateName: any;
  profileImage: any;
  city: any;
  profilePercent: any;
  getAllStates: any;
  form_domicile_state: any;
  form_present_state: any;
  updatedCitySubscription: any;
  allPresentCityList: any;
  form_present_city: any;
  profileSummary: any;
  skills: any;
  education: any;
  workExperience: any;
  internStatus: any;
  workStatus: any;
  secretKey = "(!@#Passcode!@#)";
  userId: any;
  myLearningData: any;
  filterObj: any = {};
  appliedJobData: any;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) {
    this.getCandidateDetails();
   }

  ngOnInit(): void {
    this.getJobList();
  }


  getCandidateDetails() {
    var obj = {};
    const userEmail = localStorage.getItem('email');
    obj = {
      email: this.apiService.encryptnew(
        userEmail,
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        this.Details = res.data;
        console.log(this.Details, 'Candidate Data');
        this.candidateEmail = this.Details?.email;
        this.candidateName = this.Details?.personal_details?.name;
        this.profileImage = this.Details?.personal_details?.profileImage;
        this.city = this.Details?.contact_details?.permanent_city;
        this.profilePercent = this.Details?.profilePercentage;
        this.profileSummary = this.Details?.document_details?.preWrittenPhrase;
        this.skills = this.Details?.experience_details?.skills;
        this.education = this.Details?.education_details?.educations;
       this.workExperience = this.Details?.experience_details;
       this.internStatus = this.workExperience?.is_intern_status;
       this.workStatus = this.workExperience?.is_anywork_exp;
       this.userId = this.Details?.userId;
       this.getLearningData(this.userId);
        this.getStateAPI(this.Details);
      }
    });
  }


  getLearningData(userId:any){
   // const userEmail = localStorage.getItem('email');
    let enc_userid = CryptoJS.AES.encrypt(userId.toLowerCase().trim(), this.secretKey.trim()).toString();
    let apidata = {
      userId : enc_userid
    }
    //console.log(apidata, 'apidata');

    this.apiService.getLearningStatus(apidata).subscribe((response: any) => {
      if (response.success) {
        this.myLearningData = response.data;
        console.log(this.myLearningData, 'learningdata');
        
        
      }
    });
    
  }


  getStateAPI(data:any){
   this.Details = data;
   console.log( this.Details, 'candidatedata');
   const countryData = {
    country_id: '101',
  };
  this.apiService.getallStates().subscribe(
    (data: any) => {
      this.getAllStates = data[0];
      this.getAllStates.forEach((element) => {
        if (element.id == this.Details?.contact_details?.present_state) {
          this.form_domicile_state = element.name;
          this.getCityName(
            element.id,
            this.Details?.contact_details?.preset_city
          );
        }
        if (element.id == this.Details?.contact_details?.present_state) {
          this.form_present_state = element.name;
          //console.log(this.form_present_state, 'stateName');
        }
      });
    },
    (err) => {}
  );
  }

  getCityName(id, cityId) {
    const ApiData = {
      state_id: id,
    };
    let city;
    this.updatedCitySubscription = this.apiService.districtList(ApiData).subscribe((datas: any) => {
          this.allPresentCityList = datas.data;  
          datas.data.forEach((element) => { 
            if (element.id == cityId) { 
              this.form_present_city = element.name; 
              //  return element.name;
              //console.log(this.form_present_city, 'cityname');
              
            }
          });
        }, 
        (err) => { 
          console.log(err);
        }
      );
  }


  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'suspend':
      case 'incomplete':
        return 'In Progress';
      case 'start':
        return 'Not Yet Started';
      default:
        return '';
    }
  }


  
 getJobList() {
    let params: any =
    {
      "pageNumber": 1,
      "itemsPerPage": 3,
      //"filter": this.filterObj,
      "sort": 'Recently Posted',
      "specialization": "Computer Science Engineering",
      "email": this.appConfig.getLocalStorage("email"),
      "isApplied":true
    }
    this.apiService.joblistingDashboard(params).subscribe((response: any) => {
      if (response.success) {
        this.appliedJobData = response.data;
        console.log(this.appliedJobData, 'Applied Job Details');
      }
    });
  }


  gotoProfile() {
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiService.encryptnew(emailval, environment.cryptoEncryptionKey))
    window.location.assign(environment.SKILL_PROFILE_URL + '/externallogin?extId=' + enc_email);
  }




}
