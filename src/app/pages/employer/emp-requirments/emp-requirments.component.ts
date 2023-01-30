import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import{ APP_CONSTANTS} from 'src/app/utils/app-constants.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatSort,Sort } from '@angular/material/sort';
import { Timer } from 'ag-grid-community';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';

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
  public total:any;

  public defaultRowPerPage = 5;
  public startRow:any = 0;
  public endRow:any = this.defaultRowPerPage;
  public pageNumber: any = 1;
  public itemsPerPage: any = 1;
  public totallength:any
  range :FormGroup;
  routerlink=APP_CONSTANTS.ENDPOINTS
  //dateVal  = lastDatetoApply();
  searchData: string = '';
  close: string = '';
  getViewlist : any;
  today = new Date();
  params:any;
  sortData: any = [
    'Active',
    'Pending',
    'Approved',
    'Open',
    'Yet to Open',
    'Closed',
    'Rejected',
    'Expired',
  ];

  companyId = localStorage.getItem('companyId');
  currentJobID = localStorage.getItem('currentJobID');
  filterModel = { "startRow":this.startRow,"endRow":this.endRow,
    "filterModel":{
    "companyId": {
      "filterType":"text",
      "type": "contains",
      "filter":this.companyId,
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
    private msgData : SentDataToOtherComp
  ) {

  }
  sortbystatusArray: any = [
    'Active',
    'Pending',
    'Approved',
    'Open',
    'Yet to Open',
    'Closed',
    'Rejected',
    'Expired',
  ];
  sortByStatus = [];
  ngOnInit() {

    this.fetchData();

  }


  //  jobReqData = [
  //   {
  //     _id: '63872bb6161fdff764177fc8',

  //     jobId: '70031',

  //     overview: '-',

  //     companyEmail: 'amaprivatelimited@dispostable.com',

  //     description: [
  //       {
  //         item: 'Maintenance of Airfield Ground Lighting.',
  //       },

  //       {
  //         item: 'Supervising , Monitoring & Executing daily maintenance activities of Airfield Ground Lighting works',
  //       },
  //     ],

  //     requirement: [
  //       {
  //         item: 'Contrary to popular belief, Lorem Ipsum is not simply random text ',
  //       },
  //     ],

  //     about:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'",

  //     companyLogo:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/9381671353887826-Group 23127.png',

  //     bannerImage:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/7546963426512168-image_processing20220710-22159-1nd6kj9.png',

  //     company: 'AMA Private Limited',

  //     jobTitle: 'Engineer',

  //     division: 'Software Engineering',

  //     jobFamily: 'Manufacturing',

  //     education: ['B.Tech.'],

  //     ctc: '2,50,000 - 4,00,000 P.A.',

  //     address: 'India - Delhi',

  //     postedDate: 'Posted On 20 Nov, 2022',

  //     jobRole: 'Software Developer',


  //     jobDepartment1:['Computer Science'],

  //     jobDepartment2:'IT',


  //     jobLocation: ['chennai'],

  //     jobType: 'Full-Time',

  //     yearofPassout: ['2022 Passed Out'],

  //     driveDate: 'IT',

  //     eligibilityCriteria: [
  //       {
  //         percentage: 60,

  //         type: 'All',

  //         backlog: false,
  //       },
  //     ],

  //     applicationCloses: ' Application closes on:',

  //     lastDatetoApply: ' Nov 22, 2022 12:20 pm',

  //     additionalInformation: [],

  //     skillSet: ['Electrical', 'Electronics'],

  //     specialization: ['Electrical'],

  //     isActive: 'Active',

  //     createdOn: '2022-11-30T05:52:09.627Z',

  //     updatedOn: '2022-11-07T05:52:09.627Z',

  //     candidatesAppliedCount: 'Applied (12,000)',

  //     settingsMenu: 'Settings',
  //   },

  //   {
  //     _id: '63872bb6161fdff764177fc9',

  //     jobId: '70032',

  //     overview: '-',

  //     companyEmail: 'Bankzone@dispostable.com',

  //     description: [
  //       {
  //         item: "Handle Customer'S Inbound And Outbound Calls. Solving Queries, Telling Them About Products / Offers / Services.",
  //       },
  //     ],

  //     requirement: [
  //       {
  //         item: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
  //       },
  //     ],

  //     abo: "Bank zone is a New Born Baby zone – a one stop solution for all financial needs. The zone offers all kinds of financial needs in a very quicker process being its greater strength andspecialty. Like you get to know your health status in one scan your verification would be done in one scan documents. ALL BANKS UNDER 'ONE ROOF' is another added specialty offering financial services to all segment of customer (self-salaried) is its concenteredspecialty.",

  //     companyLogo:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/9381671353887826-Group 23127.png',

  //     bannerImage:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/7546963426512168-image_processing20220710-22159-1nd6kj9.png',

  //     company: 'Bankzone',

  //     education: ['B.Sc.'],

  //     ctc: '2,50,000 - 4,00,000 P.A.',

  //     postedDate: 'Posted On 20 Nov, 2022',

  //     jobRole: 'Junior Programmer',

  //     jobDepartment1: 'IT/Computer Science',

  //     jobDepartment2:[''],

  //     jobLocation: ['Chennai'],

  //     jobType: 'Full Time',

  //     yearofPassout: ['2022 Passed Out'],

  //     driveDate: '',

  //     eligibilityCriteria: [
  //       {
  //         percentage: 60,

  //         type: 'All',

  //         backlog: false,
  //       },
  //     ],

  //     applicationCloses: ' Application closes on:',

  //     lastDatetoApply: 'Nov 22, 2022 12:20 pm',

  //     additionalInformation: [],

  //     skillSet: ['Communication'],

  //     specialization: ['Electrical'],

  //     isActive: 'Pending',

  //     candidatesAppliedCount: 'Applied (12,000)',

  //     settingsMenu: 'Settings',
  //   },

  //   {
  //     _id: '63872bb6161fdff764177fc8',

  //     jobId: '70031',

  //     overview: '-',

  //     companyEmail: 'amaprivatelimited@dispostable.com',

  //     description: [
  //       {
  //         item: 'Maintenance of Airfield Ground Lighting.',
  //       },

  //       {
  //         item: 'Supervising , Monitoring & Executing daily maintenance activities of Airfield Ground Lighting works',
  //       },
  //     ],

  //     requirement: [
  //       {
  //         item: 'Contrary to popular belief, Lorem Ipsum is not simply random text ',
  //       },
  //     ],

  //     abo: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'",

  //     companyLogo:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/9381671353887826-Group 23127.png',

  //     bannerImage:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/7546963426512168-image_processing20220710-22159-1nd6kj9.png',

  //     company: 'AMA Private Limited',

  //     jobTitle: 'Engineer',

  //     division: 'Software Engineering',

  //     jobFamily: 'Manufacturing',

  //     education: ['B.Com.'],

  //     ctc: '2,50,000 - 4,00,000 P.A.',

  //     address: 'India - Delhi',

  //     postedDate: 'Posted On 20 Nov, 2022',

  //     jobRole: 'Web Developer',

  //     jobDepartment1: 'Civil',

  //     jobDepartment2:'Electrical',

  //     jobType: 'Full-Time',

  //     yearofPassout: ['2022 Passed Out'],

  //     driveDate: '',

  //     eligibilityCriteria: [
  //       {
  //         percentage: 60,

  //         type: 'All',

  //         backlog: false,
  //       },
  //     ],

  //     applicationCloses: ' Application closes on:',

  //     lastDatetoApply: ' Nov 22, 2022 12:20 pm',

  //     additionalInformation: [],

  //     skillSet: ['Electrical', 'Electronics'],

  //     specialization: ['Electrical'],

  //     isActive: 'Closed',

  //     createdOn: '2022-11-30T05:52:09.627Z',

  //     updatedOn: '2022-11-07T05:52:09.627Z',

  //     candidatesAppliedCount: 'Applied (12,000)',

  //     settingsMenu: 'Settings',
  //   },
  //   {
  //     _id: '63872bb6161fdff764177fc8',

  //     jobId: '70031',

  //     overview: '-',

  //     companyEmail: 'amaprivatelimited@dispostable.com',

  //     description: [
  //       {
  //         item: 'Maintenance of Airfield Ground Lighting.',
  //       },

  //       {
  //         item: 'Supervising , Monitoring & Executing daily maintenance activities of Airfield Ground Lighting works',
  //       },
  //     ],

  //     requirement: [
  //       {
  //         item: 'Contrary to popular belief, Lorem Ipsum is not simply random text ',
  //       },
  //     ],

  //     abo: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'",

  //     companyLogo:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/9381671353887826-Group 23127.png',

  //     bannerImage:
  //       'https://microcertstg.blob.core.windows.net/container1/employerDetails/7546963426512168-image_processing20220710-22159-1nd6kj9.png',

  //     company: 'AMA Private Limited',

  //     jobTitle: 'Engineer',

  //     division: 'Software Engineering',

  //     jobFamily: 'Manufacturing',

  //     education: ['Diploma.'],

  //     ctc: '2,50,000 - 4,00,000 P.A.',

  //     address: 'India - Delhi',

  //     postedDate: 'Posted On 21 Nov, 2022',

  //     jobRole: 'Application Developer',

  //     jobDepartment1: 'Accounts',

  //     jobDepartment2:'Finance',

  //     jobLocation: ['chennai'],

  //     jobType: 'Full-Time',

  //     yearofPassout: ['2022 Passed Out'],

  //     driveDate: '',

  //     eligibilityCriteria: [
  //       {
  //         percentage: 60,

  //         type: 'All',

  //         backlog: false,
  //       },
  //     ],

  //     applicationCloses: ' Application closes on:',

  //     lastDatetoApply: ' Nov 22, 2022 12:20 pm',

  //     additionalInformation: [],

  //     skillSet: ['Electrical', 'Electronics'],

  //     specialization: ['Electrical'],

  //     isActive: 'Expired',

  //     createdOn: '2022-11-30T05:52:09.627Z',

  //     updatedOn: '2022-11-07T05:52:09.627Z',

  //     candidatesAppliedCount: 'Applied (12,000)',

  //     settingsMenu: 'Settings',
  //   },
  // ];

applyFilter(filtervalue:string){
  clearTimeout(this.timerval)
  this.timerval = setTimeout(() => {
    this.jobReqData.filter=filtervalue.trim().toLowerCase()
    console.log (filtervalue);
    this.searchList()
  }, 500);
}

viewjobpagenator(){}

viewApplication(jobId){
  this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.VIEWCANDIDATE);
  this.appConfig.setLocalStorage("currentJobID",jobId)
}
some(pages){
  this.filterModel.startRow= (( pages.value-1)*this.defaultRowPerPage)
  this.filterModel.endRow = ( (pages.value)*this.defaultRowPerPage)
  // let {pageindex,length} = pages
  // this.pageNumber=pages.value;
  this.getReqData()
}
  getReqData() {
      this.http.viewjobRequirments(this.filterModel).subscribe((response:any)=> {
        if (response.success) {
          this.jobReqData = response.data;

       this.totallength = response.totalCount.count;
       this.total = Math.ceil(response.totalCount.count/this.defaultRowPerPage);
       this.jobReqData.forEach(element => {
        this.sampleContent.push(element.overview);

      });
        } else {
          this.toastr.warning('Connection failed, Please try again.');
    }
      //  this.total = response.totalCount.count / this.defaultRowPerPage
   })
 }

searchList(){
  this.filterModel.filterModel["jobRole"] = {
    "filterType": "text",
    "type": "contains",
    "filter": this.searchData
};
  this.getReqData()
}

clearSearch(){
  this.searchData  ='';
  delete this.filterModel.filterModel["jobRole"]
  this.getReqData()
}

dateChange(){
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
  console.log(this.sortDate,'hii');
this.getReqData()
}
clearDate(){
  this.sortDate ='';
  this.startDate ='';
  this.endDate ='';
  delete this.filterModel.filterModel["lastDatetoApply"]
  this.getReqData()
}

sortChange(){
  this.filterModel.filterModel["status"] = {
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
fetchData(){

  this.http.viewjobRequirments(this.filterModel).subscribe((response: any) => {
    if (response.success == false) {
      this.toastr.warning('Connection failed, Please try again.');
    } else {
        var Timeoffset = (new Date()).getTimezoneOffset() * 60000;
      response.data.forEach(element => {
        // element.lastDatetoApply = new Date(element.lastDatetoApply).toLocaleString();
        element.lastDatetoApply = (new Date(new Date(new Date(element.lastDatetoApply)).getTime() - Timeoffset).toISOString().slice(0, -1));    
        // console.log( element.lastDatetoApply,'kkk');

      });
      this.jobReqData = response.data;
      this.totallength = this.jobReqData.length
      this.total = Math.ceil(response.totalCount.count/this.defaultRowPerPage);

      // this.total = response.totalCount.count / this.itemsPerPage
    }
  }, (err) => {
    this.toastr.warning('Connection failed, Please try again.');
  });
}

timeout(callback, ms) {
  var timer ;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(callback.bind(this, ...args), ms || 0)
  };
}

}
