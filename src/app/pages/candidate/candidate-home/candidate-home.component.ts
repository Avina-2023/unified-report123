import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';

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

  constructor(
    public router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) {
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
        console.log(this.microLearnCourses, 'job details');
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



}
