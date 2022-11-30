import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog,  } from '@angular/material/dialog';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
  jobDescription: any;
  @ViewChild('incompleteProfile',{static: false}) matDialogRef: TemplateRef<any>;
  @ViewChild('successApply',{static: false}) applySuccess: TemplateRef<any>;

  dialogData: any;
  descriptionData: any;
  jobDetails:any;
item: any;

  constructor(
    private skillexService:ApiService,
    private toaster:ToastrService,
    private appConfig: AppConfigService,
    private mdDialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRoute()
  }

  getRoute() {
    this.jobDetails = window.history.state;
    console.log(this.jobDetails);
  }

  openDialog(verify){
   this.dialogData =  this.mdDialog.open((verify=='success'?this.applySuccess:this.matDialogRef), {
      width: '500px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForMessage'
    });
  }

  gotopage(navpoint){
    if(navpoint == 'apply'){
      // this.appConfig.routeNavigation(CONSTANT.ENDPOINTS.JOB.JOBDESCRIPTION);
    }else{
      // this.appConfig.routeNavigation('/profile/candidate/');
    }
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
        console.log(res)
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
      jobDetails:{
        education:this.jobDetails.education,
        specialization:this.jobDetails.specialization,
        yearofPassout:this.jobDetails.yearofPassout,
        eligiblityCriteria:this.jobDetails.eligiblityCriteria
      }
    }
      this.skillexService.savedJobs(obj).subscribe((res: any) => {
        if (res.success) {
          this.toaster.success(res.message);
          this.jobDetails.isApplied= !this.jobDetails.isApplied;
        } else {
          this.toaster.warning(res.message);
        }
      });

    }


}
