import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  itemsPerPage: any = 7;
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

  qrScanner:any = [
    {
      "title": "Follow us on LinkedIn ",
      "imgurl" : "../../../../assets/images/LinkedIn-QR.png",
      "link": "http://www.linkedin.com/company/lnt-edutech"
    },
    {
      "title": "Follow us on Instagram ",
      "imgurl" : "../../../../assets/images/Instagram-QR.png",
      "link": "http://www.instagram.com/lntedutech"
    },
    {
      "title": "Follow us on Facebook ",
      "imgurl" : "../../../../assets/images/Meta-QR.png",
      "link": "http://www.facebook.com/lntedutech"
    },
    {
      "title": "Follow us on Twitter ",
      "imgurl" : "../../../../assets/images/Twitter-QR.png",
      "link": "http://www.twitter.com/lntedutech"
    },
    {
      "title": "Follow us on Youtube",
      "imgurl" : "../../../../assets/images/YouTube-QR.png",
      "link": "http://www.youtube.com/@lntedutech"
    }
  ]
  combinedList: any[];
  imageUrls = [
    '../../../../assets/images/job-profile1.png',
    '../../../../assets/images/job-profile2.png',
    '../../../../assets/images/job-profile3.png',
    '../../../../assets/images/job-profile4.png',
    '../../../../assets/images/job-profile6.png',
    '../../../../assets/images/job-profile7.png',
    '../../../../assets/images/job-profile9.png',
    '../../../../assets/images/dash-bg-img.png',
    '../../../../assets/images/register.png',
  ];
  usedImageIndices: number[] = []; 
  colorIndex = 0;

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
    // this.getCombinedList();
  }

  getRandomImageUrl(): string {
    if (this.usedImageIndices.length === this.imageUrls.length) {
      this.usedImageIndices = [];
    }
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    } while (this.usedImageIndices.includes(randomIndex));
    this.usedImageIndices.push(randomIndex);
    return this.imageUrls[randomIndex];
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
        this.getCombinedList(); // Call getCombinedList after fetching joblist
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
        this.getCombinedList(); // Call getCombinedList after fetching microLearnCourses
      }
    });
  }
  
  getCombinedList() {
    this.combinedList = [];
    let jobIndex = 0;
    let courseIndex = 0;
    for (let i = 0; i < this.joblist?.length + this.microLearnCourses?.length; i++) {
      if (i % 4 === 3 && courseIndex < this.microLearnCourses.length) {
        this.combinedList.push({ type: 'course', data: this.microLearnCourses[courseIndex++] });
      } else if (jobIndex < this.joblist.length) {
        this.combinedList.push({ type: 'job', data: this.joblist[jobIndex++] });
      }
    }
    console.log('Combined List:', this.combinedList);
  }

  getSpecificColor(): string {
    const colors = ['#580052', '#644637', '#1b4e9b', '#3a5e64', '#400202'];

    const color = colors[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % colors.length;
    return color;
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
  
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 1000,
    navText: ["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    nav: false,
    center:false,
    autoHeight: false,
    autoWidth: false,
    responsive: {

      0: {
        items: 1,
        margin: 10
      },
      600: {
        items: 2,
        margin: 20
      },
      900: {
        items: 3,
        margin: 5
      }
     
    },
  }


  getBorderStyles(index: number): string {
    const borderStyles = ['3px solid red', '3px solid blue', '3px solid green', '3px solid yellow', '3px solid grey'];
    return borderStyles[index] || '1px solid black'; 
}


}
