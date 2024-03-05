import { Component,Renderer2,HostListener ,NgZone, OnInit, TemplateRef, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core';
// import { MatDialog,  } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute, NavigationStart, Router,NavigationExtras } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],

})
export class JobDescriptionComponent implements OnInit {
  @ViewChild('scrollerHead') scrollerHead!: ElementRef;
  jobId: any;
  jobViewsCount: any;
  pageNumber: any;
  itemsPerPage: any;
  isScrollerHeadVisible: any;
  // checkScroll: any;

  transform(value: string): any {
    return value.trim()
  }
  jobDescription: any;
  @ViewChild('incompleteProfile', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('eligiblity', { static: false }) eligiblitypop: TemplateRef<any>;
  @ViewChild('successApply', { static: false }) applySuccess: TemplateRef<any>;
  @ViewChild('externalApply', { static: false }) extApply: TemplateRef<any>;
  @Pipe({
    name: 'trim',
    pure: false
  })
  candidateDetails: any;
  storedCandidateDetails: any;
  dialogData: any;
  descriptionData: any;
  joblist = [];
  searchInput: string = '';
  filterObj: any = {};
  sortData = '';
  // jobDetails: any;
  jobDetails: any = { isSelected: false, jobId: null };
  item: any;
  blobToken = environment.blobToken
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com" ? true : false;
  jobs = [
    { jobType: 'Contract' },
    { jobType: 'Parttime' },
    { jobType: 'Full Time' },
    // Add more job types as needed
  ];

  constructor(
    private skillexService: ApiService,
    private apiservice: ApiService,
    private toaster: ToastrService,
    private appConfig: AppConfigService,
    private appconfig: AppConfigService,
    private mdDialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private dialog: MatDialog
  ) { }

  // ngOnInit(): void {
  //   this.candidateData();
  //   this.getRoute()
  //   this.jobViewCount();
  //   this.getJobsList();
  //   // this.checkScroll();
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.jobId = this.appConfig.base64Decryption(params.get('id'));
    })
    this.candidateData();
    this.getRoute();
    this.jobViewCount();
    this.getJobsList();
    //   // this.checkScroll();

    window.addEventListener('scroll', this.onWindowScroll.bind(this));

    const isSelected = localStorage.getItem('isSelected');
    if (isSelected) {
      this.jobDetails.isSelected = JSON.parse(isSelected);
    }

    const appliedJobDetailsString = localStorage.getItem('appliedJob');
    if (appliedJobDetailsString) {
      const appliedJobDetails = JSON.parse(appliedJobDetailsString);
      if (appliedJobDetails.jobId === this.jobDetails.jobId && appliedJobDetails.companyId === this.jobDetails.companyId) {
        this.jobDetails.isApplied = true;
      }
    }
  }
    ngOnDestroy(): void {
    // Remove scroll event listener when the component is destroyed to prevent memory leaks
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }
  candidateData() {
    this.candidateDetails = localStorage.getItem('candidateProfile');
    this.storedCandidateDetails = JSON.parse(this.candidateDetails);
    // console.log(this.storedCandidateDetails, 'can');
    // this.specified = this.candidateDetails.education_details.educations[2].discipline;
    // let educationyear = JSON.parse(this.candidateDetails);
    // this.useryop = educationyear?.education_details?.educations[ educationyear.education_details.educations.length - 1 ]?.year_of_passing;
    // this.yopdate = new Date(this.useryop);
    // this.useryopyear = this.yopdate.getFullYear();
    // this.removeduplicate2 = this.useryopyear.toString();
    // console.log(this.useryopyear, 'useryop1');
    // return this.useryopyear;
  }
  // Helper function to check if two arrays are equal
  arraysEqual(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
  getRoute() {
    let jobParams = {
      "jobId": this.jobId,
      "email": this.appConfig.getLocalStorage('email')
    }
    this.skillexService.getJobDetail(jobParams).subscribe((result: any) =>{
        if(result.success){
          this.jobDetails = result.data;
        }else{
          this.toaster.error(result.message)
        }
    })
    // this.jobDetails = JSON.parse(this.appConfig.getLocalStorage('jobDesc'))
    // console.log(this.jobDetails, 'job details');
    // console.log(this.jobDetails.workType, 'workTypeeeeeee');
  }

  openDialog(dialogval) {
    this.dialogData = this.mdDialog.open(dialogval, {
      width: '500px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      // panelClass: 'popupModalContainerForMessage'
    });
  }

  gotopage() {
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.skillexService.encryptnew(emailval, environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL + '/externallogin?extId=' + enc_email);

    this.dialogData.close();
  }

  getpageData() {
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
        if (res.data != undefined && res.data) {
          this.toaster.success("Job saved successfully");
        } else {
          this.toaster.success("Job removed successfully");
        }
        this.jobDetails.isSelected = !this.jobDetails.isSelected;
        // Save the isSelected state to localStorage
        localStorage.setItem('isSelected', JSON.stringify(this.jobDetails.isSelected));
      } else {
        this.toaster.warning("Connection failed");
      }
    });
  }
  // applyJob(){
  //   let obj =
  //   {
  //     email:this.appConfig.getLocalStorage('email'),
  //     jobId:this.jobDetails.jobId,
  //     companyId:this.jobDetails.companyId,
  //     jobDetails:{
  //       education:this.jobDetails.education,
  //       specialization:this.jobDetails.specialization,
  //       yearofPassout:this.jobDetails.yearofPassout,
  //       eligibilityCriteria:this.jobDetails.eligibilityCriteria
  //     }
  //   }
  //     this.skillexService.savedJobs(obj).subscribe((res: any) => {
  //       if (res.success) {
  //         // this.toaster.success(res.message);
  //         this.openDialog(this.applySuccess)
  //         this.jobDetails.isApplied= !this.jobDetails.isApplied;
  //       } else {
  //         // this.toaster.warning(res.message);
  //         if(res.message == "Please complete your profile to apply for this job")
  //         {this.openDialog(this.matDialogRef)}
  //         if(res.message == "You are not eligible to apply for this job."){
  //           this.openDialog(this.eligiblitypop)
  //         }
  //       }
  //     });
  //   }
  applyJob() {
    let obj =
    {
      email: this.appConfig.getLocalStorage('email'),
      jobId: this.jobDetails.jobId,
      companyId: this.jobDetails.companyId,
      jobDetails: {
        education: this.jobDetails.education,
        specialization: this.jobDetails.specialization,
        yearofPassout: this.jobDetails.yearofPassout,
        eligibilityCriteria: this.jobDetails.eligibilityCriteria,
        noofBacklog: this.jobDetails.noofBacklog,
        gender: this.jobDetails.gender
      }
    }


    this.skillexService.savedJobs(obj).subscribe((res: any) => {
      if (res.success) {
        this.openDialog(this.applySuccess);

        // Store applied job details in local storage
        const appliedJobDetails = {
          jobId: this.jobDetails.jobId,
          companyId: this.jobDetails.companyId
        };
        localStorage.setItem('appliedJob', JSON.stringify(appliedJobDetails));

        this.jobDetails.isApplied = !this.jobDetails.isApplied;
      } else {
        // Handle other cases
        if (res.message == "Please complete your profile to apply for this job") { this.openDialog(this.matDialogRef) }
        if (res.message == "You are not eligible to apply for this job.") { this.openDialog(this.eligiblitypop) }
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

  //   getJobsList() {
  //      let params: any = {
  //      pageNumber: 1,
  //      itemsPerPage: 3,
  //      filter: this.filterObj,
  //      sort: 'defaultSort',
  //      specialization: 'Computer Science Engineering',
  //      email: this.appConfig.getLocalStorage('email'),
  //      };

  //     this.skillexService.joblistingDashboard(params).subscribe((response: any) => {
  //       if (response.success) {
  //         this.joblist = response.data;
  //          console.log(this.joblist, 'joblist');
  //       }
  //     });
  // }
getJobsList() {
    const candidateDiscipline = this.candidateDetails?.education_details?.educations[length-1]?.discipline;

    let params: any = {
      pageNumber: 1,
      itemsPerPage: 3,
      filter: this.filterObj,
      sort: 'defaultSort',
      specialization: candidateDiscipline || 'DefaultSpecialization',
      email: this.appconfig.getLocalStorage('email'),
    };

    this.apiservice.joblistingDashboard(params).subscribe((response: any) => {
      if (response.success) {
        this.joblist = response.data;
        // console.log(this.joblist, 'joblist');
      }
    });
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
      window.open(this.jobDetails.applyLink, '_blank');//open link in different tab
      this.dialog.closeAll();
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
  // getDaysAgo(createdOn: Date): string {
  //   const today = new Date();
  //   const differenceInMilliseconds = today.getTime() - new Date(createdOn).getTime();
  //   const differenceInDays = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));

  //   return `${differenceInDays} days ago`;
  // }
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

 gotojob(item) {
    let extras: NavigationExtras = { state: { itemData: item } };
   this.appconfig.setLocalStorage('jobDesc', JSON.stringify(item));
   this.jobDetails = JSON.parse(this.appConfig.getLocalStorage('jobDesc'))

    //   this.router.navigateByUrl(
    //     APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION,
    //     extras
    //  );
    //  location.reload();
  //  this.getRoute();
  }

onWindowScroll() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const triggerPosition = 20;
  if (scrollPosition > triggerPosition) {
    this.showScrollerHead();
  } else {
    this.hideScrollerHead();
  }
}
showScrollerHead() {
  this.scrollerHead.nativeElement.classList.add('visible');
}

hideScrollerHead() {
  this.scrollerHead.nativeElement.classList.remove('visible');
}

}
