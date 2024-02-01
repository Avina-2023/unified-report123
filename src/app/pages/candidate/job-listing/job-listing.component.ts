import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Renderer2,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { I } from '@angular/cdk/keycodes';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss'],
})
export class JobListingComponent implements OnInit {
  message: string;
  public pageNumber: any = 1;
  public itemsPerPage: any = 6;
  public totallength: any;
  public total: any;
  @ViewChild('moreItems', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('mobFilter', { static: false }) mobDialogRef: TemplateRef<any>;
  sampleContent = [];
  title = 'edutech';
  education = ['B.Tech', 'B.Sc', 'B.Com', 'BE'];
  searchInput: string = '';
  joblist = [];
  // filter_info = any[];

  filter_info = { data: [] };
  filterItems: any;
  isMaster: any;
  selectedValues: any[] = [];
  data: any;
  filterObj: any = {};
  sortData = 'relevance';
  jobId: any = '';
  blobToken = environment.blobToken;
  productionUrl =
    environment.SKILL_EDGE_URL == 'https://skilledge.lntedutech.com'
      ? true
      : false;
  candidateDetails: any;
  useryop: any;
  yopdate: any;
  useryopyear: any;
  jobyopyear: any;
  yeararray: any;
  yop: any;
  jobDisable: boolean = false;
  jobyearofpassout: any;
  common = [];
  removeduplicate: any;
  removeduplicate1: any;
  removeduplicate2: any;
  activeButton: string = 'all';
  // grid2Selected = false;
  partnerLabel: string | undefined;
  private buttonClicked = new Subject<string>();
  workOption: any;
 jobs = [
    { jobType: 'Contract' },
    { jobType: 'Parttime' },
    { jobType: 'Full Time' },
    // Add more job types as needed
  ];
 item = {
    isSelected: false,
  };
  storedCandidateDetails: any;
  specified: any;
  selectedOption: string = 'relevance';
  showJobs: boolean;
  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private appconfig: AppConfigService,
    public router: Router,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  // url = 'Jobs';
  ngOnInit() {
    // window.location.reload();
    this.getJobList();
    this.getJobFilter();
    this.candidateData();
    this.enabledisable();
    this.partnerLabel = 'Skill Exchange Partner';
    this.debouncefn();
    // console.log(this.router.routerState.snapshot.url,'this.router.routerState.snapshot.url');
  
  }

  debouncefn() {
    const buttonClickedDebounced = this.buttonClicked.pipe(debounceTime(200));
    buttonClickedDebounced.subscribe((itemId: string) =>
      {
        this.getJobList();
      }
    );
  }

  customalert(item) {
    if (item.partnerLabel) {
      this.toaster.error('Job Requirement does not match your profile', null, {
        positionClass: 'toast-top-center',
      });
    } else {
      this.gotojob(item);
    }
  }

  // toggleGrid2() {
  //   this.grid2Selected = !this.grid2Selected;
  // }
  candidateData() {
    this.candidateDetails = localStorage.getItem('candidateProfile');
    this.storedCandidateDetails = JSON.parse(this.candidateDetails);
    console.log(this.storedCandidateDetails, 'can');
    // this.specified = this.candidateDetails.education_details.educations[2].discipline;
    let educationyear = JSON.parse(this.candidateDetails);
    this.useryop = educationyear?.education_details?.educations[ educationyear.education_details.educations.length - 1 ]?.year_of_passing;
    this.yopdate = new Date(this.useryop);
    this.useryopyear = this.yopdate.getFullYear();
    this.removeduplicate2 = this.useryopyear.toString();
    console.log(this.useryopyear, 'useryop1');
    return this.useryopyear;
  }

  // getJobList() {
  //   if (this.searchInput) {
  //     this.filterObj.textSearch = this.searchInput;
  //   }else {
  //     delete this.filterObj.textSearch;
  //   }
  //   let params: any = {
  //     pageNumber: this.pageNumber,
  //     itemsPerPage: this.itemsPerPage,
  //     // filter: {
  //     //   textSearch: this.searchInput,
  //     // },
  //     filter: this.filterObj,
  //     sort: this.sortData,
  //     specialization: 'Computer Science Engineering',
  //     email: this.appconfig.getLocalStorage('email'),
  //   };
  //   this.apiservice.joblistingDashboard(params).subscribe((response: any) => {
  //     if (response.success) {
  //       this.joblist = response.data;
  //       console.log(this.joblist, 'joblist');
  //       this.totallength = response.totalCount;
  //       this.total = Math.ceil(response.totalCount / this.itemsPerPage);
  //       this.joblist.forEach((element) => {
  //       this.sampleContent.push(element.overview);
  //       });
  //     }
  //   });
  // }

getJobList() {
  if (this.searchInput) {
    this.filterObj.textSearch = this.searchInput;
  } else {
    delete this.filterObj.textSearch;
  }
  // routing for jobs and internships
    if (this.router.routerState.snapshot.url == APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBLIST) {
      this.filterObj.workType = ['Jobs'];
    }
    else if (this.router.routerState.snapshot.url == APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.INTERNSHIPLIST) {
      this.filterObj.workType = ['Internships'];
    }
  console.log(this.candidateDetails);
  const candidateDiscipline = this.candidateDetails?.education_details?.educations[length-1]?.discipline;
  console.log(candidateDiscipline);

  let params: any = {
    pageNumber: this.pageNumber,
    itemsPerPage: this.itemsPerPage,
    filter: this.filterObj,
    sort: this.sortData,
    specialization: candidateDiscipline || 'DefaultSpecialization',
    email: this.appconfig.getLocalStorage('email'),
  };

  this.apiservice.joblistingDashboard(params).subscribe((response: any) => {
    if (response.success) {
      this.joblist = response.data;
      console.log(this.joblist, 'joblist');
      this.totallength = response.totalCount;
      this.total = Math.ceil(response.totalCount / this.itemsPerPage);
      this.joblist.forEach((element) => {
        this.sampleContent.push(element.overview);
      });
    }
  });
}

  enabledisable() {
    console.log(this.useryopyear);
  }


  openDialog(displayValue) {
    this.filterItems = displayValue;
    this.dialog.open(this.matDialogRef, {
      panelClass: 'spec_desk_dialog',
    });
  }

  mobDialog() {
    this.dialog.open(this.mobDialogRef);
    this.fil_elements(
      this.filter_info.data,
      this.filter_info.data[0].subContent,
      0,
      this.filter_info.data[0].key
    );
  }

  filterRemoval(data, filterKey, isMaster?) {
    if (
      this.filterObj.hasOwnProperty(filterKey) &&
      this.filterObj[filterKey].includes(isMaster ? data._id : data.name)
    ) {
      if (this.filterObj[filterKey].length > 1) {
        this.filterObj[filterKey] = this.filterObj[filterKey].filter((item) => {
          if (isMaster) {
            return item !== data._id;
          } else {
            return item !== data.name;
          }
        });
      } else {
        delete this.filterObj[filterKey];
      }
    }
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
          this.filterObj[filterKey].push(data._id);
        } else {
          this.filterObj[filterKey].push(data.name);
        }
      } else {
        if (isMaster) {
          this.filterObj[filterKey] = [data._id];
        } else {
          this.filterObj[filterKey] = [data.name];
        }
      }
    } else {
      data.is_checked = false;
      this.selectedValues = this.selectedValues.filter((item) => {
        if (isMaster) {
          return item._id !== data._id;
        } else {
          return item.name !== data.name;
        }
      });
      this.filterRemoval(data, filterKey, isMaster);
      // console.log(this.filterObj);
    }
    if (from == 'direct') {
      this.getJobList();
    }
  }

  textsearch() {
    this.buttonClicked.next();
  }

  applyfilter() {
    this.getJobList();
  }

  closeSelectedValues(data, index) {
    data.is_checked = false;
    this.selectedValues.splice(index, 1);
    this.filterRemoval(data, data.key, data.isMaster);
    this.getJobList();
  }

  fil_elements(data, subcontent, i, filterKey) {
    data.forEach((element, ind) => {
      if (ind == i) {
        element.active = true;
      } else {
        element.active = false;
      }
    });
    for (i = 0; i < subcontent.length; i++) {
      subcontent[i].key = filterKey;
    }
    this.filterItems = subcontent;
    // this.getJobList();
  }

  bookMarkIcon(item) {
    if (
      item.yearofPassout.includes(this.removeduplicate2) ||
      !item.partnerLabel
    ) {
      item.isSelected = !item.isSelected;
      const jobParams: any = {
        email: this.appconfig.getLocalStorage('email'),
        jobId: item.jobId,
      };
      this.apiservice.saveJobsDashboard(jobParams).subscribe((res: any) => {
        if (res.success && item.isSelected) {
          this.toaster.success('Job Saved Successfully!');
        } else {
          this.toaster.success('Job UnSaved Successfully!');
        }
      });
    }
  }

  clearFilters(response) {
    response.forEach((element) => {
      element.subContent.forEach((item) => {
        item.is_checked = false;
      });
    });
    this.selectedValues.splice(0);
    this.filterObj = {};
    this.getJobList();
  }

  // API Call
  some(pages) {
    let { pageindex, length } = pages;
    this.pageNumber = pages.value;
    // this.pageNumber=pages.length
    // console.log(pages)
    this.getJobList();
  }

  getJobFilter() {
    let filterparams: any = {};
    this.apiservice.jobfilterDashboard(filterparams).subscribe((res: any) => {
      if (res.success) {
        this.filter_info = res;
        // if (this.filter_info.data){
        // 	console.log('contains filter data')
        // }
      }
    });
  }

  gotojob(item) {
    // item.stopPropagation();
    let extras: NavigationExtras = { state: { itemData: item } };
    this.appconfig.setLocalStorage('jobDesc', JSON.stringify(item));
    this.router.navigateByUrl(
      APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION,
      extras
    );
  }

  dashboard() {
    this.router.navigate(['/candidateview/dashboard']);
  }

  // setActiveButton(workOption) {
  //   // this.activeButton = workOption;
  //   // this.filterObj.workType = [workOption];
  //   // this.getJobList();
  //   // console.log(workOption, 'worktyps');
  //   // if (workOption == 'Jobs') {
  //   //  this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBLIST);
  //   // }
  //   // else if (workOption == 'Internships') {
  //   // this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.INTERNSHIPLIST);
  //   // }


  // }
  //   setActiveButton(workOption: string) {
  //   this.activeButton = workOption;
  //   this.filterObj.workType = [workOption];

  //   if (workOption === 'Jobs') {
  //     this.filterObj = {};
  //     // Navigate to the Jobs URL
  //     this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBLIST);
  //   } else if (workOption === 'Internships') {
  //     // Navigate to the Internships URL
  //     this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.INTERNSHIPLIST);
  //   }

  //   this.getJobList();
  // }

 getColor(jobType: string): string {
    switch (jobType) {
      case 'Contract':
        return '#700353';
      case 'Parttime':
        return '#4C1C00';

      default:
        return '#56B35A'; // Default color
    }
  }

 getBackgroundColor(jobType: string): string {
    switch (jobType) {
      case 'Contract':
        return '#70035329';
      case 'Parttime':
        return '#4C1C0029';
      default:
        return '#56B35A29'; // Default background color
    }
  }
 toggleSave() {
    this.item.isSelected = !this.item.isSelected;
  }
  //  getDaysAgo(createdOn: Date): string {
  //   const today = new Date();
  //   const differenceInMilliseconds = today.getTime() - new Date(createdOn).getTime();
  //   const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));

  //   return `${differenceInDays} days ago`;
  // }
  getDaysAgo(createdOn: Date): string {
  const today = new Date();
  const differenceInSeconds = Math.floor((today.getTime() - new Date(createdOn).getTime()) / 1000);
  if (differenceInSeconds < 60) {
    return 'just now';
  }
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} ${differenceInMinutes === 1 ? 'min' : 'mins'} ago`;
  }
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} ${differenceInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays <= 30) {
    return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`;
  }
  return '30+ days ago';
}
}
