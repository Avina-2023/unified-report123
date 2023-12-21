import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatSort, Sort } from '@angular/material/sort';
import { Timer } from 'ag-grid-community';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { environment } from 'src/environments/environment';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}
@Component({
  selector: 'app-emp-requirments',
  templateUrl: './emp-requirments.component.html',
  styleUrls: ['./emp-requirments.component.scss'],
})
export class EmpRequirmentsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  sampleContent = [];
  timerval: NodeJS.Timeout;
  rangeFilter(date: Date): boolean {
    return date.getDate() > 0;
  }
  public total: any;

  public defaultRowPerPage = 5;
  public startRow: any = 0;
  public endRow: any = this.defaultRowPerPage;
  public pageNumber: any = 1;
  public itemsPerPage: any = 1;
  public totallength: any
  range: FormGroup;
  routerlink = APP_CONSTANTS.ENDPOINTS
  // dateVal  = lastDatetoApply();
  searchData: string = '';
  close: string = '';
  getViewlist: any;
  today = new Date();
  ISOStringDate = new Date().toISOString();
  params: any;
  sortData: any = [
    'All',
    'Active',
    'Pending',
    'Approved',
    'Open',
    'Yet to Open',
    'Closed',
    'Rejected',
    'Expired',
  ];
  blobToken = environment.blobToken
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com" ? true : false;

  companyId = localStorage.getItem('companyId');
  currentJobID = localStorage.getItem('currentJobID');
  filterModel = {
    "startRow": this.startRow, "endRow": this.endRow,
    "filterModel": {
      "companyId": {
        "filterType": "text",
        "type": "contains",
        "filter": this.companyId,
      }
    },

  };
  month = this.today.getMonth();
  year = this.today.getFullYear();
  dateRange = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 13)),
    end: new FormControl(new Date(this.year, this.month, 16)),
  });
  // lastDatetoApply:any;
  jobReqData: any;
  dataSource: any;
  sortDate: any;
  startDate: any;
  endDate: any;
  constructor(
    private http: ApiService,
    private toastr: ToastrService,
    private appConfig: AppConfigService,
    private sendData: SentDataToOtherComp
  ) {

  }
  // sortbystatusArray: any = [
  //   'Active',
  //   'Pending',
  //   'Approved',
  //   'Open',
  //   'Yet to Open',
  //   'Closed',
  //   'Rejected',
  //   'Expired',
  // ];

  sortbystatusArray: any = [
    {
      "statusName": "All",
      "statusValue": ""
    },
    {
      "statusName": "Active",
      "statusValue": "approved"
    },
    {
      "statusName": "Pending",
      "statusValue": "pending"
    },
    {
      "statusName": "Open",
      "statusValue": "open"
    },
    {
      "statusName": "Yet to Open",
      "statusValue": "yettoopen"
    },
    {
      "statusName": "Closed",
      "statusValue": "closed"
    },
    {
      "statusName": "Rejected",
      "statusValue": "rejected"
    },
    {
      "statusName": "Expired",
      "statusValue": "expired"
    }
  ];


  sortByStatus = [];
  ngOnInit() {
    this.fetchData();
  }

  applyFilter(filtervalue: string) {
    clearTimeout(this.timerval)
    this.timerval = setTimeout(() => {
      this.jobReqData.filter = filtervalue.trim().toLowerCase()
      console.log(filtervalue);
      this.searchList()
    }, 500);
  }

  viewjobpagenator() { }

  viewApplication(jobdata) {
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.VIEWCANDIDATE);
    this.appConfig.setLocalStorage("currentJobID", jobdata.jobId)
    this.appConfig.setLocalStorage('currentJobData', JSON.stringify(jobdata));
    this.sendData.sendMessage_Dyn("jobData", jobdata, this.sendData.jobData_Subject);
  }

  viewSettings(jobdata) {
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.DRIVESETTINGS)
    this.appConfig.setLocalStorage("currentJobID", jobdata.jobId)
    this.appConfig.setLocalStorage('currentJobData', JSON.stringify(jobdata));
    this.sendData.sendMessage_Dyn("jobData", jobdata, this.sendData.jobData_Subject);
  }
  some(pages) {
    this.filterModel.startRow = ((pages.value - 1) * this.defaultRowPerPage)
    this.filterModel.endRow = ((pages.value) * this.defaultRowPerPage)
    // let {pageindex,length} = pages
    // this.pageNumber=pages.value;
    this.getReqData()
  }

  getDate(date: string) {
    //date = '2018-01-30T00:02:14.637Z';
    return new Date(date);
  }
  getReqData() {
    this.http.viewjobRequirments(this.filterModel).subscribe((response: any) => {
      if (response.success) {
        this.jobReqData = response.data;

        this.totallength = response.totalCount.count;
        this.total = Math.ceil(response.totalCount.count / this.defaultRowPerPage);
        this.jobReqData.forEach(element => {
          this.sampleContent.push(element.overview);

        });
      } else {
        this.toastr.warning('Connection failed, Please try again.');
      }
      //  this.total = response.totalCount.count / this.defaultRowPerPage
    })
  }

  searchList() {
    this.filterModel.filterModel["jobRole"] = {
      "filterType": "text",
      "type": "contains",
      "filter": this.searchData
    };
    this.getReqData()
  }

  clearSearch() {
    this.searchData = '';
    delete this.filterModel.filterModel["jobRole"]
    this.getReqData()
  }

  dateChange() {
    //     var Timeoffset = (new Date()).getTimezoneOffset() * 60000;
    // var startDate = (new Date(new Date(new Date(this.startDate)).getTime() - Timeoffset).toISOString().slice(0, -1));
    // var endDate = (new Date(new Date(new Date(this.endDate)).getTime() - Timeoffset).toISOString().slice(0, -1));
    //    

    this.filterModel.filterModel["lastDatetoApply"] = {
      "dateFrom": this.startDate,
      "dateTo": this.endDate,
      "filterType": "date",
      "type": "inRange",
      "filter": this.sortDate
    };
    console.log(this.sortDate, 'hii');
    this.getReqData()
  }
  clearDate() {
    this.sortDate = '';
    this.startDate = '';
    this.endDate = '';
    delete this.filterModel.filterModel["lastDatetoApply"]
    this.getReqData()
  }

  sortChange() {
    this.filterModel.filterModel["approveStatus"] = {
      "filterType": "text",
      "type": "contains",
      "filter": this.sortData
    };
    this.getReqData()
    // this.applyFilter(event.value);
    //   // const sortState: Sort = {active:this.sortbystatusArray,direction:'asc' };
    //   // this.sort.active = sortState.active;
    //   // this.sort.direction = sortState.direction;
    //   // this.sort.sortChange.emit(sortState);
    //   // this.getReqData()
    // }
  }
  fetchData() {

    this.http.viewjobRequirments(this.filterModel).subscribe((response: any) => {
      if (response.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.jobReqData = response.data;
        console.log(this.jobReqData, 'jobdata');
        this.totallength = this.jobReqData.length
        this.total = Math.ceil(response.totalCount.count / this.defaultRowPerPage);
        // this.total = response.totalCount.count / this.itemsPerPage
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  timeout(callback, ms) {
    var timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(callback.bind(this, ...args), ms || 0)
    };
  }

}
