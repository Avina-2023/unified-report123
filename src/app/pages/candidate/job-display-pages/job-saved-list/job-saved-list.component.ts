import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-saved-list',
  templateUrl: './job-saved-list.component.html',
  styleUrls: ['./job-saved-list.component.scss']
})
export class JobSavedListComponent implements OnInit {

  constructor() { }
  savedjobs:any  = [{
    'jobtitle': 'Developer',
    'companyname': 'CGI',
    'companyimage': 'https://th.bing.com/th/id/OIP.2RFYnlpATodcawtlDkFNdgHaDe?w=345&h=164&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Computer Science','Science'],
    'education': 'B.Tech',
    'location': 'Chennai',
    'jobtype': 'Full Time',
    'saved' : 'true'
  },
  {
    'jobtitle': ' Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.QsIcm-Plhh1XTltDTSf3fwHaDi?w=336&h=167&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved' : 'false'
  },
  {
    'jobtitle': 'Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved' : 'true'
  }
  ,
  {
    'jobtitle': 'Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Chennai',
    'jobtype': 'Full Time',
    'saved' : 'true'
  },
  {
    'jobtitle': 'Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved' : 'false'
  },
  {
    'jobtitle': 'Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved' : 'true'
  },
  {
    'jobtitle': 'Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved' : 'false'
  },
  {
    'jobtitle': 'Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved' : 'true'
  }
  ];
  ngOnInit() {
  }

}