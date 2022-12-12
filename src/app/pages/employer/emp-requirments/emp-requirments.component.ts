import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-emp-requirments',
  templateUrl: './emp-requirments.component.html',
  styleUrls: ['./emp-requirments.component.scss'],
})
export class EmpRequirmentsComponent implements OnInit {
  // range = new ({
  //   start: new FormControl,
  //   end: new FormControl,
  //   searchData :string ='';
  //   fromDate : Date;
  //   toDate :Date;
  // });
  dateVal  = new Date();
  searchData: string = '';
  close: string = '';
  getViewlist : any;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  dateRange = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 13)),
    end: new FormControl(new Date(this.year, this.month, 16)),
  });
  jobReqData: any;

  constructor(
    private http: ApiService,
  ) {}
  sortbystatusArray: any = [
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
    this.getReqData();
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

  getReqData() {
    let data= '';
      this.http.viewjobRequirments(data).subscribe((response:any)=> {
       this.jobReqData = response.data;
       console.log(this.jobReqData);


  })
}
}
