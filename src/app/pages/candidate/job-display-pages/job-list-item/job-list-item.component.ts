import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss'],
})
export class JobListItemComponent implements OnInit, AfterViewInit {
  public isActive: boolean = true;
  public isDisabled: boolean = true;
  public currentdate: any = new Date();
  @Input() data: any;
  @Input() savedButton = false;
  @Input() showApplied = false;
  blobToken = environment.blobToken;
  productionUrl =
    environment.SKILL_EDGE_URL == 'https://skilledge.lntedutech.com'
      ? true
      : false;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router: Router
  ) {}
  ngOnInit() {
    this.currentdate = this.currentdate.toISOString();
  }
  apply(item) {
    var obj = {};
    obj = {
      jobId: item.jobId,
      email: localStorage.getItem('email'),
      companyId: item.companyId,
      jobDetails: {
        education: item.education,
        specialization: item.specialization,
        yearofPassout: item.yearofPassout,
        eligibilityCriteria: item.eligibilityCriteria,
      },
    };
    this.apiService.savedJobs(obj).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        item.isApplied = true;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  bookMarkIcon(item) {
    item.isSelected = !item.isSelected;
    let jobParams: any = {
      email: localStorage.getItem('email'),
      jobId: item.jobId,
    };
    this.apiService.saveJobsDashboard(jobParams).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  ngAfterViewInit() {}
}
