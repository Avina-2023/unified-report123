import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

@Component({
  selector: 'app-candidate-details-card',
  templateUrl: './candidate-details-card.component.html',
  styleUrls: ['./candidate-details-card.component.scss'],
})
export class CandidateDetailsCardComponent implements OnInit {
  candidatedetails: any[];
  candidatelist: any;
  public total: any;
  public totallength: any;
  public pageNumber: any = 1;
  public itemsPerPage: any = 5;
  filter_info = { data: [] };
  filterObj = {};
  selectedValues: any[] = [];

  constructor(
    public router: Router,
    private apiservice: ApiService,
    private appconfig: AppConfigService
  ) {}

  ngOnInit() {
    this.getcandidatedetails();
    this.getJobFilter();
  }

  dashboard() {
    this.router.navigate(['/auth/dashboard/dashboard']);
  }
  toviewprofile() {
    this.router.navigate(['/auth/drive/viewCandidateProfilebyEmployer']);
  }
  some(pages) {
    let { pageindex, length } = pages;
    this.pageNumber = pages.value;
    this.getcandidatedetails();
  }

  // getcandidatedetails(){
  //   let params: any ={
  //     "pageNumber": this.pageNumber,
  //     "itemsPerPage": this.itemsPerPage,
  //   }
  //   this.apiservice.getallCandidateDetails(params).subscribe((response:any)=>{
  //     if(response.success){
  //       this.candidatelist = response.data
  //       console.log(this.candidatelist,'canidatedata');
  //       // this.totallength =this.candidatelist.length
  //       // this.total = Math.ceil(response.totalCount/this.itemsPerPage);
  //       this.totallength = response.totalCount;
  //       this.total = Math.ceil(response.totalCount/this.itemsPerPage);
  //     }
  //   })
  // }

  getcandidatedetails() {
    var objDetails = {};
    objDetails = {
      pageNumber: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
    };
    // let params: any ={
    //   "pageNumber": this.pageNumber,
    //   "itemsPerPage": this.itemsPerPage,
    // }
    this.apiservice
      .getallCandidateDetails(objDetails)
      .subscribe((response: any) => {
        if (response.success) {
          this.candidatelist = response.data;
          console.log(this.candidatelist, 'canidatedata');
          this.totallength = response.totalCount;
          this.total = Math.ceil(response.totalCount / this.itemsPerPage);
        }
      });
  }

  getJobFilter() {
    let filterparams: any = {};
    this.apiservice.jobfilterDashboard(filterparams).subscribe((res: any) => {
      if (res.success) {
        this.filter_info = res;
      }
    });
  }

  clearFilters(response) {
    response.forEach((element) => {
      element.subContent.forEach((item) => {
        item.is_checked = false;
      });
    });
    this.selectedValues.splice(0);
    this.filterObj = {};
    this.getcandidatedetails();
  }

  closeSelectedValues(data, index) {
    data.is_checked = false;
    this.selectedValues.splice(index, 1);
    this.filterRemoval(data, data.key);
    //console.log(this.filterObj);
    this.getcandidatedetails();
  }

  
  filterRemoval(data, filterKey) {
    if (
      this.filterObj.hasOwnProperty(filterKey) &&
      this.filterObj[filterKey].includes(data.name)
    ) {
      if (this.filterObj[filterKey].length > 1) {
        this.filterObj[filterKey] = this.filterObj[filterKey].filter(
          (item) => item != data.name
        );
      } else {
        delete this.filterObj[filterKey];
      }
    }
  }
}
