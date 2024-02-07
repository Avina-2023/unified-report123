import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-job-saved-list',
  templateUrl: './job-saved-list.component.html',
  styleUrls: ['./job-saved-list.component.scss'],
})
export class JobSavedListComponent implements OnInit {
  public pageNumber: any = 1;
  public itemsPerPage: any = 500;
  public savedjobs: any;
  public totallength: any;
  public total: any;
  filterObj: any = {};
  url = 'Saved Jobs';
  constructor(
    private apiService: ApiService, 
    private toastr: ToastrService,
    public router: Router,
    ) {}
  ngOnInit() {
    this.savedJobList();
  }
  some(pages) {
    let { pageindex, length } = pages;
    this.pageNumber = pages.value;
    this.savedJobList();
  }

  savedJobList() {
    const email = localStorage.getItem('email');
    if (this.router.routerState.snapshot.url == APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBSSAVED) {
      this.filterObj.workType = ['Jobs'];
    }
    else if (this.router.routerState.snapshot.url == APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.INTERNSHIPSAVED) {
      this.filterObj.workType = ['Internships'];
    }
    var objDetails = {};
    objDetails = {
      pageNumber: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      filter: this.filterObj,
      email: email,
      isSelected: true,
      sort: 's',
      specialization: 's',
    };
    this.apiService.candidateJoblist(objDetails).subscribe((res: any) => {
      this.savedjobs = res.data;
      if (res.success) {
        this.savedjobs = res.data;
        this.totallength = this.savedjobs.length;
        this.total = Math.ceil(res.totalCount / this.itemsPerPage);
      } else {
        this.toastr.warning('Connection failed, Please try again.');
      }
    });
  }
}
