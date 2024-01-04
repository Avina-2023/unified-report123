import { Component,Renderer2,HostListener ,NgZone, OnInit, TemplateRef, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core';
// import { MatDialog,  } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
  jobViewsCount: any;

  transform(value: string): any {
    return value.trim()
  }
  jobDescription: any;
  @ViewChild('incompleteProfile',{static: false}) matDialogRef: TemplateRef<any>;
  @ViewChild('eligiblity',{static: false}) eligiblitypop: TemplateRef<any>;
  @ViewChild('successApply',{static: false}) applySuccess: TemplateRef<any>;
  @ViewChild('externalApply', {static: false}) extApply: TemplateRef<any>;
  @Pipe({
    name: 'trim',
    pure: false
 })

  dialogData: any;
  descriptionData: any;
  jobDetails:any;
  item: any;
  blobToken = environment.blobToken
	productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;
  jobs = [
    { jobType: 'Contract' },
    { jobType: 'Parttime' },
    { jobType: 'Full Time' },
    // Add more job types as needed
  ];
  constructor(
    private skillexService:ApiService,
    private toaster:ToastrService,
    private appConfig: AppConfigService,
    private mdDialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,

  ) { }
  ngOnInit(): void {
    this.getRoute()
    this.jobViewCount();
  }

  getRoute() {
    this.jobDetails = JSON.parse(this.appConfig.getLocalStorage('jobDesc'))
      // console.log(this.jobDetails, 'job details');
      // console.log(this.jobDetails.workType, 'workTypeeeeeee');
  }

  openDialog(dialogval){
   this.dialogData =  this.mdDialog.open(dialogval, {
      width: '500px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      // panelClass: 'popupModalContainerForMessage'
    });
  }

  gotopage(){
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.skillexService.encryptnew(emailval,environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email);

    this.dialogData.close();
  }

  getpageData(){
    // this.skillexService.getJobDetail({"jobId":"34567"}).subscribe((jobdata:any) => {
    //   if(jobdata.success){
    //     this.jobDescription = jobdata.data
    //   }else{
    //     this.appConfig.error(jobdata.message);
    //   }
    // });
  }

  saved() {
    let jobParams: any = {
      email: localStorage.getItem('email'),
      jobId: this.jobDetails.jobId,
    };
    this.skillexService.saveJobsDashboard(jobParams).subscribe((res: any) => {
      if (res.success) {
        // console.log(res)
        if(res && res.data !=undefined && res.data  ){
          this.toaster.success("Job saved successfully");
        }else{
          this.toaster.success("Job removed successfully");
        }
        this.jobDetails.isSelected= !this.jobDetails.isSelected;
      } else {
        this.toaster.warning("Connection failed");
      }
    });
  }

  applyJob(){
    let obj =
    {
      email:this.appConfig.getLocalStorage('email'),
      jobId:this.jobDetails.jobId,
      companyId:this.jobDetails.companyId,
      jobDetails:{
        education:this.jobDetails.education,
        specialization:this.jobDetails.specialization,
        yearofPassout:this.jobDetails.yearofPassout,
        eligibilityCriteria:this.jobDetails.eligibilityCriteria
      }
    }
      this.skillexService.savedJobs(obj).subscribe((res: any) => {
        if (res.success) {
          // this.toaster.success(res.message);
          this.openDialog(this.applySuccess)
          this.jobDetails.isApplied= !this.jobDetails.isApplied;
        } else {
          // this.toaster.warning(res.message);
          if(res.message == "Please complete your profile to apply for this job")
          {this.openDialog(this.matDialogRef)}
          if(res.message == "You are not eligible to apply for this job."){
            this.openDialog(this.eligiblitypop)
          }
        }
      });
    }

    jobViewCount(){
      let obj = {
        email: this.appConfig.getLocalStorage('email'),
        jobId: this.jobDetails.jobId
      }
      this.skillexService.getAppliedcount(obj).subscribe((response: any) => {
        if(response.success){
          this.jobViewsCount = response.data;
        }
      })
    }

    handleButtonClick() {
      if (this.jobDetails.partnerLabel === 'Skill Exchange Partner') {
        this.applyJob();
      } else {
        this.openExternalApplyDialog();
        //  this.jobViewCount();
      }
    }

    openExternalApplyDialog() {
      const dialogRef = this.mdDialog.open(this.extApply, {
        width: '466px',
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
      //  this.jobViewCount();
    }

    redirectToApplyLink() {
      window.open(this.jobDetails.applyLink, '_blank');  //open link in different tab
      // window.location.href = this.jobDetails.applyLink; //open link in same tab
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

  scrollToSection(sectionId: string): void {
   console.log(`Scrolling to section: ${sectionId}`);
    const element = this.el.nativeElement.querySelector(`#${sectionId}`);
   if (element) {
     element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
  getDaysAgo(createdOn: Date): string {
    const today = new Date();
    const differenceInMilliseconds = today.getTime() - new Date(createdOn).getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));

    return `${differenceInDays} days ago`;
  }
}
