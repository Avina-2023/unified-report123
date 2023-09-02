import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
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
  selectedOption: string = 'all';
  commonSearch: string = 'all';
  candidatedetails: any[] = [];
  candidatelist: any;
  public total: any;
  public totallength: any;
  public pageNumber: any = 1;
  public itemsPerPage: any = 100;
  filter_info = { data: [] };
  filterObj = {};
  selectedValues: any[] = [];
  highLevelEducationSpecification: string | undefined;
  educations: any[] = [];
  item = {
    savedStatus: false,
    customClass: '',
  };
  constructor(
    public router: Router,
    private apiservice: ApiService,
    private appconfig: AppConfigService
  ) {}

  ngOnInit(): void {
    const highLevelEducation = this.educations.find(
      (edu) => edu.is_highLevelEdu === true
    );

    if (highLevelEducation) {
      this.highLevelEducationSpecification = highLevelEducation.specification;
    }

    this.getcandidatedetails();
    this.getcandidateFilter();
    this.filterCandidates();
  }

  dashboard() {
    this.router.navigate(['/auth/dashboard/dashboard']);
  }
  toviewprofile(candidateData) {
    this.appconfig.setLocalStorage("C_Candidate_status", JSON.stringify(candidateData));
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
  filterCandidates() {
    if (this.selectedOption === 'saved') {
      this.getcandidatedetails();
    }
    // else {
    //   this.getcandidatedetails();
    // }
  }

  getcandidatedetails() {
    var objDetails = {};
    objDetails = {
      pageNumber: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
    };

    //
    // let params: any ={
    //   "pageNumber": this.pageNumber,
    //   "itemsPerPage": this.itemsPerPage,
    // }
    //

    this.apiservice
      .getallCandidateDetails(objDetails)
      .subscribe((response: any) => {
        if (response.success) {
          this.candidatelist = response.data;
          console.log(this.candidatelist, 'canidatedata');
          this.totallength = this.candidatelist.length;
          console.log(this.totallength);

          this.total = Math.ceil(response.totalCount / this.itemsPerPage);
        }
      });
  }

  // clickSave() {
  //   let savecanparams: any = {
  //     // email: 'gokul47@dispostable.com',
  //     email: this.appconfig.getLocalStorage('email'),
  //     savedStatus: true,
  //   };
  //   this.apiservice.getsaveCandidate(savecanparams).subscribe((res: any) => {

  // if (res.success && item.isSelected) {
  //   this.toaster.success('Job Saved Successfully!');
  // } else {
  //   this.toaster.success('Job UnSaved Successfully!');
  // }

  //   });
  // }
  // clickSave(candidate: any) {
  //   const savecanparams: any = {
  //     email: this.appconfig.getLocalStorage('email'),
  //     savedStatus: !candidate.isSaved, // Toggle the savedStatus
  //   };

  //   this.apiservice.getsaveCandidate(savecanparams).subscribe((res: any) => {
  //     // Update the isSaved property based on the response
  //     candidate.isSaved = !candidate.isSaved;
  //   });
  // }
  clickSave(candidate: any) {
    const savecanparams: any = {
      // email: this.appconfig.getLocalStorage('email'),
      email: candidate.email,
      savedStatus: !candidate.savedStatus,
    };

    this.apiservice.getsaveCandidate(savecanparams).subscribe((res: any) => {
      candidate.savedStatus = !candidate.savedStatus;
      candidate.customClass = candidate.savedStatus ? 'view-prof:hover' : '';
    });
  }

  getcandidateFilter() {
    let filterparams: any = {};
    this.apiservice.candidateFilter(filterparams).subscribe((res: any) => {
      if (res.success) {
        this.filter_info = res;
        console.log(this.filter_info);
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
