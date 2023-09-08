import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss']
})
export class CandidateSearchComponent implements OnInit {

  @ViewChild('moreItems', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('mobFilter', { static: false }) mobDialogRef: TemplateRef<any>;
  blobtoken:string = environment.blobToken;
  selectedOption: string = 'all';
  commonSearch: string = 'all';
  candidatedetails: any[] = [];
  candidatelist: any;
  public total: any;
  public totallength: any;
  public pageNumber: any = 1;
  public itemsPerPage: any = 100;
  filter_info = { data: [] };
  filterObj:any = {};
  selectedValues: any[] = [];
  highLevelEducationSpecification: string | undefined;
  educations: any[] = [];
  item = {
    savedStatus: false,
    customClass: '',
  };
  sampleContent = [];
  allStatesData: any;
  stateData: any = [];
  state: any;
  stateObj: any;
  searchInput: any;
  buttonClicked: any;
  filterItems: any;
  constructor(
    public router: Router,
    private apiservice: ApiService,
    private appconfig: AppConfigService,
    public dialog: MatDialog,

  ) { }

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
    this.getAllStates();
  }

  dashboard() {
    this.router.navigate(['/auth/dashboard/dashboard']);
  }
  toviewprofile(candidateData) {
    this.appconfig.setLocalStorage('C_Candidate_status', JSON.stringify(candidateData));
    this.router.navigateByUrl('/auth/drive/viewCandidateProfilebyEmployer?from=CS');
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
    this.getcandidatedetails();

    // else {
    //   this.getcandidatedetails();
    // }
  }

  getAllStates(){
    this.apiservice.getallStates().subscribe((data:any)=>{
      this.stateData = data[0];
      console.log(this.stateData,'states'); 
    })
  }

  getStateNameById(stateId: string): string {
    const state = this.stateData.find((item) => item.id === stateId);
    return state ? state.name : 'unKnown';
  }

  getcandidatedetails() {
    this.filterObj.commonSearch =  this.selectedOption
    const objDetails = {
      pageNumber: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      filter: this.filterObj,
      
    };
    this.apiservice.getallCandidateDetails(objDetails).subscribe((response: any) => {
      if (response.success) {
        this.candidatelist = response.data;
        console.log(this.candidatelist, 'cadidatedata');
        console.log(response, 'response');
        this.totallength = response.totalCount;
        console.log(this.totallength, 'totallength');
        this.total = Math.ceil(this.totallength / this.itemsPerPage);
        // this.total = 3;
        console.log(this.total, 'totalvalue');
       
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

  filterRemoval(data, filterKey, isMaster?) {
    if (
      this.filterObj.hasOwnProperty(filterKey) &&
      this.filterObj[filterKey].includes(isMaster ? data.id : data.name)
    ) {
      if (this.filterObj[filterKey].length > 1) {
        this.filterObj[filterKey] = this.filterObj[filterKey].filter((item) => {
          if (isMaster) {
            return item !== data.id;
          } else {
            return item !== data.name;
          }
        });
      } else {
        delete this.filterObj[filterKey];
      }
    }
  }

  some(pages) {
    let { pageindex, length } = pages;
    this.pageNumber = pages.value;
    this.getcandidatedetails();
  }

  checkboxChecked(event, data, filterKey, isMaster, from?: any) {
    if (event?.checked) {
      data.is_checked = true;
      data.isMaster = isMaster;
      data.key = filterKey;
      this.pageNumber = 1; //pagination

      this.selectedValues.push(data);
      if (this.filterObj.hasOwnProperty(filterKey)) {
        if (isMaster) {
          this.filterObj[filterKey].push(data.id);
        } else {
          this.filterObj[filterKey].push(data.name);
        }
      } else {
        if (isMaster) {
          this.filterObj[filterKey] = [data.id];
        } else {
          this.filterObj[filterKey] = [data.name];
        }
      }
    } else {
      data.is_checked = false;
      this.selectedValues = this.selectedValues.filter((item) => {
        if (isMaster) {
          return item.id !== data.id;
        } else {
          return item.name !== data.name;
        }
      });
      this.filterRemoval(data, filterKey, isMaster);
      // console.log(this.filterObj);
    }
    if (from == 'direct') {
       this.getcandidatedetails();
    }
  }

  textsearch() {
    this.buttonClicked.next();
  }

  openDialog(displayValue) {
    this.filterItems = displayValue;
    this.dialog.open(this.matDialogRef, {
      panelClass: 'spec_desk_dialog',
    });
  }

  getTooltipText(education: any): string {
    const date = new Date(education.end_date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return `${education.specification ? education.specification + (education.discipline ? ' ' + education.discipline : '') :
      education.discipline ? education.discipline : education.level } - ${formattedDate}`;
  }

  
  
}
