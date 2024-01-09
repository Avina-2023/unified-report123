import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.scss']
})
export class CandidateHomeComponent implements OnInit {
  joblist: any;
  filterObj: any = {};
  sortData = 'Recently Posted';
  pageNumber: any = 1;
  itemsPerPage: any = 3;
  microLearnCourses: any;
  title: any;
  Details: any;
  candidateEmail: any;
  candidateName: any;
  profileImage: any;
  city: any;
  getAllStates: any;
  form_domicile_state: any;
  updatedCitySubscription: any;
  allPresentCityList: any;
  form_present_city: any;
  form_present_state: any;
  profilePercent: any;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) {
    this.getCandidateDetails();
  }

  ngOnInit(): void {
    this.getJobList();
    this.getCourses();
    //this.fetchNewsArticle();
  }


  getJobList() {
    let params: any =
    {
      "pageNumber": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "filter": this.filterObj,
      "sort": this.sortData,
      "specialization": "Computer Science Engineering",
      "email": this.appConfig.getLocalStorage("email"),
      "isApplied":false
      // "isSelected":false
    }
    this.apiService.joblistingDashboard(params).subscribe((response: any) => {
      if (response.success) {
        this.joblist = response.data;
        console.log(response.data, 'job details');
        this.title = this.joblist?.jobTitle;
      }
    });
  }

  getCourses(){
    let params: any =
    {
    "domainId": "all",
    "size": 3,
    "pagenumber": 0,
    "records": "",
    "search": "",
    "courseOrigin": "microLearn"
    }

    this.apiService.getLearningCourses(params).subscribe((response: any) => {
      if (response.success) {
        this.microLearnCourses = response.data;
        console.log(this.microLearnCourses, 'course details');
        this.title = this.microLearnCourses?.areaName;
      }
    });
  }

  // fetchNewsArticle() {
  //   this.apiService.getNewsArticle().subscribe((response:any) => {
  //       // Handle the data received from the API
  //       console.log(response, 'newsroom data');
  //     },
  //     (error) => {
  //       // Handle errors
  //       console.error('Error fetching news article:', error);
  //     }
  //   );
  // }


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
        this.getStateAPI(this.Details);
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

  gotoJob(data: any) {
    let userId = this.Details?.userId;
    let enc_email = encodeURIComponent(this.apiService.encryptnew(userId, environment.cryptoEncryptionKey));
    let url = '/externallogin?extId=' + enc_email + '&jobid=' + data;
    // Open the link in a new tab
    window.open(url, '_blank');
  }

  gotoCourses() {
    let microKey = this.Details?.privateKey;
    let microUrl = environment.MICROLEARN_URL + '?key=' + microKey
    window.open(microUrl, '_blank');
  }
  
  



}
