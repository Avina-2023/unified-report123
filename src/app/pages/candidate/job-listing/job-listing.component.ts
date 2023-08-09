import { ApiService } from 'src/app/services/api.service';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
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
  grid2Selected = false;
  partnerLabel: string | undefined;
  private buttonClicked = new Subject<string>();
  constructor(
    public dialog: MatDialog,
    private apiservice: ApiService,
    private appconfig: AppConfigService,
    public router: Router,
    private toaster: ToastrService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  url = 'jobs';
  ngOnInit() {
    this.getJobList();
    this.getJobFilter();
    this.candidateData();
    this.enabledisable();
    this.partnerLabel = 'Skill Exchange Partner';
    this.debouncefn();
  }

  debouncefn() {
    const buttonClickedDebounced = this.buttonClicked.pipe(debounceTime(200));
    buttonClickedDebounced.subscribe((itemId: string) =>
      //The actual action that should be performed on click
      {
        this.getJobList();
      }
    );
  }

  customalert() {
    this.toaster.error('Job Requirment does not match your profile', null, {
      positionClass: 'toast-top-center',
    });
  }
  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
  }

  toggleGrid2() {
    this.grid2Selected = !this.grid2Selected;
  }
  candidateData() {
    this.candidateDetails = localStorage.getItem('candidateProfile');

    let educationyear = JSON.parse(this.candidateDetails);
    // this.useryop = educationyear?.education_details?.educations[0]?.year_of_passing;
    this.useryop =
      educationyear?.education_details?.educations[
        educationyear.education_details.educations.length - 1
      ]?.year_of_passing;
    // console.log( educationyear?.education_details?.educations[educationyear.education_details.educations.length - 1]?.year_of_passing , 'YOP')
    // console.log(educationyear,'details2')
    this.yopdate = new Date(this.useryop);
    this.useryopyear = this.yopdate.getFullYear();
    this.removeduplicate2 = this.useryopyear.toString();
    console.log(this.useryopyear, 'useryop1');
    return this.useryopyear;
  }

  // getJobList() {
  //   // this.filter.textSearch = searchInput;
  //   let params: any = {
  //     pageNumber: this.pageNumber,
  //     itemsPerPage: this.itemsPerPage,
  //     filter: this.filterObj,
  //     sort: this.sortData,
  //     specialization: 'Computer Science Engineering',
  //     email: this.appconfig.getLocalStorage('email'),
  //     // "isApplied":false,
  //     // "isSelected":false
  //   };

  //   this.apiservice.joblistingDashboard(params).subscribe((response: any) => {
  //     if (response.success) {
  //       this.joblist = response.data;

  //       console.log(this.joblist, 'jobdata');

  //       // this.joblist?.forEach((element)=>{
  //       // 	element?.yearofPassout?.forEach((element)=>{
  //       // 		if(element == this.useryopyear){
  //       // 			this.common.push(element);
  //       // 		}
  //       // 	})
  //       // 	return this.common;
  //       // })

  //       //  this.removeduplicate = this.common.filter((item,index)=>{
  //       // 	return this.common.indexOf(item) === index

  //       // })
  //       // this.removeduplicate1 = this.removeduplicate.toString()
  //       // console.log("unique",this.removeduplicate1);

  //       // console.log(this.common,'common')

  //       this.totallength = response.totalCount;
  //       this.total = Math.ceil(response.totalCount / this.itemsPerPage);
  //       // console.log(this.total)
  //       this.joblist.forEach((element) => {
  //         this.sampleContent.push(element.overview);
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
    let params: any = {
      pageNumber: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      // filter: {
      //   textSearch: this.searchInput,
      // },
      filter: this.filterObj,
      sort: this.sortData,
      specialization: 'Computer Science Engineering',
      email: this.appconfig.getLocalStorage('email'),
    };

    this.apiservice.joblistingDashboard(params).subscribe((response: any) => {
      if (response.success) {
        this.joblist = response.data;
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

  jobyop() {
    // this.yop?.forEach((element,i) => {
    // 	console.log(element,'element');
    // 	if(element == this.useryopyear){
    // 	this.jobDisable = true
    // 	console.log(this.jobDisable,'jobDisable1');
    // 	}
    // 	else {
    // 		this.jobDisable = false
    // 		console.log(this.jobDisable,'jobDisable1');
    // 	}
    // })
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

  checkboxChecked(event, data, filterKey, from?: any) {
    if (event?.checked) {
      data.is_checked = true;
      data.key = filterKey;
      this.selectedValues.push(data);
      //console.log(this.selectedValues);
      // this.getJobList();
      if (this.filterObj.hasOwnProperty(filterKey)) {
        this.filterObj[filterKey].push(data.name);
        //console.log(this.filterObj[filterKey]);
        // console.log('if');
        // console.log(this.filterObj);
      } else {
        this.filterObj[filterKey] = [data.name];
        // console.log('else');
        // console.log(this.filterObj);
      }
    } else {
      data.is_checked = false;
      this.selectedValues = this.selectedValues.filter(
        (item) => item.name !== data.name
      );
      this.filterRemoval(data, filterKey);
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
    this.filterRemoval(data, data.key);
    //console.log(this.filterObj);
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
    item.isSelected = !item.isSelected;

    let jobParams: any = {
      email: this.appconfig.getLocalStorage('email'),
      jobId: item.jobId,
    };
    this.apiservice.saveJobsDashboard(jobParams).subscribe((res: any) => {
      if (res.success) {
        // console.log('jobs', res)
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
}
