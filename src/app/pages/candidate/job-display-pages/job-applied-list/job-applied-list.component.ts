import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationValue } from '../../candidateCommons/common-paginator/common-paginator.component'
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}
@Component({
  selector: 'app-job-applied-list',
  templateUrl: './job-applied-list.component.html',
  styleUrls: ['./job-applied-list.component.scss']
})
export class JobAppliedListComponent implements OnInit {
  public pagination = { page: 1,  };
  
  pageSize: 5
  constructor() { }
  appliedjobs: any = [{
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://th.bing.com/th/id/OIP.2RFYnlpATodcawtlDkFNdgHaDe?w=345&h=164&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Computer Science', 'Science'],
    'education': 'B.Tech',
    'location': 'Chennai',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.QsIcm-Plhh1XTltDTSf3fwHaDi?w=336&h=167&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  }
    ,
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Chennai',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'CGI',
    'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Mechanical'],
    'education': 'B.Tech',
    'location': 'Maharashtra',
    'jobtype': 'Full Time',
    'saved': 'false'
  },
  {
    'jobtitle': 'Software Developer',
    'companyname': 'L&T Construction',
    'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
    'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
    'specialization': ['Information Technology'],
    'education': 'B.Tech',
    'location': 'Bangalore',
    'jobtype': 'Full Time',
    'saved': 'true'
  },
  
  ];
  ngOnInit() {
    // this.paginationControl.valueChanges.subscribe(this.onPageChange.bind(this));
    console.log(this.visibleItems)
   
  }
  public readonly paginationControl = new FormControl(this.pagination);

  private readonly items = this.appliedjobs
  // private readonly items = Array.from(Array(20).keys(), (item) => item + 1);

  public visibleItems: PaginatedResponse<number> = {
    items: this.items.slice(0, 5),
    total: this.items.length,
  };
  public onPageChange(page: number): void {
    const startIndex = (page - 1) * this.pageSize;
    const items = this.items.slice(
      startIndex,
      startIndex + this.pageSize
    );
    this.visibleItems = { items, total: this.items.length };
  }
}
