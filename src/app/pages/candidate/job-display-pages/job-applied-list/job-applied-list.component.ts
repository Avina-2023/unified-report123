import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}
@Component({
  selector: 'app-job-applied-list',
  templateUrl: './job-applied-list.component.html',
  styleUrls: ['./job-applied-list.component.scss'],
})
export class JobAppliedListComponent implements OnInit {
  public pageNumber: any = 1;
  public itemsPerPage: any = 5;
  public total: any;
  public totallength: any;
  public appliedjobs: any;
  public appliedlenghth: any;
  public url = 'Applied Jobs';
  resultShow: any;
  // public suburl="Dashboard";
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.resultShow = length
    this.appliedJobList();
  }
  some(pages) {
    let { pageindex, length } = pages;
    this.pageNumber = pages.value;
    this.appliedJobList();
  }
  appliedJobList() {
    const email = localStorage.getItem('email');
    var objDetails = {};
    objDetails = {
      pageNumber: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      email: email,
      isApplied: true,
      sort: 's',
      specialization: 's',
    };
    this.apiService.candidateJoblist(objDetails).subscribe((res: any) => {
      if (res.success) {
        this.appliedjobs = res.data;
        this.totallength = this.appliedjobs.length;
        // console.log( this.totallength,'app');
        this.total = Math.ceil(res.totalCount / this.itemsPerPage);
      } else {
        this.toastr.warning('Connection failed, Please try again.');
      }
    });
  }
}
