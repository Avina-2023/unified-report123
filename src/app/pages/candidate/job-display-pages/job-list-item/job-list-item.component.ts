import { Component, Input, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { log } from 'console';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';


@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss'],
})
export class JobListItemComponent implements OnInit, AfterViewInit {
  public isActive: boolean = true;
  public isDisabled: boolean = true;
  public totalco: any;
  public currentdate: any = new Date();
  @Input() data: any;
  @Input() savedButton = false;
  @Input() showApplied = false;
  @ViewChild('externalApply', {static: false}) extApply: TemplateRef<any>;

  public totallength: any;
  public total: any;
  sampleContent = [];
  blobToken = environment.blobToken;
  productionUrl =
  environment.SKILL_EDGE_URL == 'https://skilledge.lntedutech.com'? true : false;
  joblist: any;
  applyJobs: boolean;
  saveJobs: boolean;
  resultShow: any;
  jobs = [
    { jobType: 'Contract' },
    { jobType: 'Parttime' },
    { jobType: 'Full Time' },
    // Add more job types as needed
  ];
  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    public router: Router,
    private appconfig: AppConfigService,
    private mdDialog: MatDialog,
  ) {}
  ngOnInit(): void {

    if (this.router.routerState.snapshot.url == APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBSAPPLIED) {
      this.applyJobs = true;
    }
    else {
      this.applyJobs = false;
    }
    if (this.router.routerState.snapshot.url == APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBSSAVED) {
      this.saveJobs = true;
    }
    else {
      this.saveJobs = false;
    }
    this.resultShow = this.data.length;
    console.log(this.data, 'outputdata');

    this.currentdate = this.currentdate.toISOString();

  }

  isInternshipApplied(): boolean {
    return this.router.url.includes('Internships');
  }
  apply(item) {
    var obj = {
      jobId: item.jobId,
      email: localStorage.getItem('email'),
      companyId: item.companyId,
      patner: item.partnerLabel,
      link: item.applyLink,
      jobDetails: {
        education: item.education,
        specialization: item.specialization,
        yearofPassout: item.yearofPassout,
        eligibilityCriteria: item.eligibilityCriteria,
      },
    };
    this.apiservice.savedJobs(obj).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message);
        item.isApplied = true;
      } else {
        this.toastr.warning(res.message);
      }
    });
  }

  handleApplyButtonClick(item) {
    if (item.partnerLabel === 'Skill Exchange Partner') {
      this.apply(item);

    } else {
      // window.open(item.applyLink, '_blank');
      this.openExternalApplyDialog(item);
      this.appconfig.setLocalStorage('savedJobData', JSON.stringify(item));
    }
  }


  openExternalApplyDialog(item) {
    const dialogRef = this.mdDialog.open(this.extApply, {
      width: '50%',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  redirectToApplyLink() {
    const dataItem = JSON.parse(localStorage.getItem('savedJobData'));
     window.open(dataItem.applyLink, '_blank');  //open link in different tab
  }



  bookMarkIcon(item) {
    item.isSelected = !item.isSelected;
    let jobParams: any = {
      email: localStorage.getItem('email'),
      jobId: item.jobId,
    };
    this.apiservice.saveJobsDashboard(jobParams).subscribe((res: any) => {
      if (res.success) {
        this.totalco = res.totalCount;
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
 getColor(jobType: string): string {
    switch (jobType) {
      case 'Contract':
        return '#700353';
      case 'Parttime':
        return '#4C1C00';

      default:
        return '#56B35A'; // Default color
    }
  }

 getBackgroundColor(jobType: string): string {
    switch (jobType) {
      case 'Contract':
        return '#70035329';
      case 'Parttime':
        return '#4C1C0029';

      default:
        return '#56B35A29'; // Default background color
    }
  }

 gotojob(item) {
    let extras: NavigationExtras = { state: { itemData: item } };
    this.appconfig.setLocalStorage('jobDesc', JSON.stringify(item));
    this.router.navigateByUrl(
      APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION,
      extras
    );
  }

  ngAfterViewInit() { }
  getDaysAgo(createdOn: Date): string {
    const today = new Date();
    const differenceInSeconds = Math.floor((today.getTime() - new Date(createdOn).getTime()) / 1000);
       if (differenceInSeconds < 60) {
         return 'just now';
        }
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
       if (differenceInMinutes < 60) {
         return `${differenceInMinutes} ${differenceInMinutes === 1 ? 'min' : 'mins'} ago`;
        }
    const differenceInHours = Math.floor(differenceInMinutes / 60);
       if (differenceInHours < 24) {
         return `${differenceInHours} ${differenceInHours === 1 ? 'hour' : 'hours'} ago`;
        }
    const differenceInDays = Math.floor(differenceInHours / 24);
       if (differenceInDays <= 30) {
         return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`;
        }
         return '30+ days ago';
   }

}
