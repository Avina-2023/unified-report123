import { Component, Input, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { log } from 'console';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    environment.SKILL_EDGE_URL == 'https://skilledge.lntedutech.com'
      ? true
      : false;
  joblist: any; 
  resultShow: any; 

  constructor( 
    private apiservice: ApiService, 
    private toastr: ToastrService, 
    public router: Router, 
    private appconfig: AppConfigService, 
    private mdDialog: MatDialog,
  ) {}
  ngOnInit():void {  
    this.resultShow = this.data.length 
    this.currentdate = this.currentdate.toISOString(); 
    
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

  ngAfterViewInit() {}
}
