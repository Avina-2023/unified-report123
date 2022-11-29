import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss'],
})
export class JobListItemComponent implements OnInit ,AfterViewInit {
  public isActive: boolean = true;
  public isDisabled: boolean = true;
  @Input() data: any;
  @Input() savedButton = false;
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    public router:Router
  ) {}
  ngOnInit() {}
  apply(item) {
    var obj = {};
    obj = {
      jobId: item.jobId,
      email: localStorage.getItem('email'),
    };
    this.apiService.saveJobsDashboard(obj).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success('successfully applied');
      } else {
        this.toastr.warning('Connection failed, Please try again.');
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
        this.toastr.success('successfully applied');
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      } else {
        this.toastr.warning('Connection failed, Please try again.');
      }
    });
  }

  ngAfterViewInit() {

  }
}
