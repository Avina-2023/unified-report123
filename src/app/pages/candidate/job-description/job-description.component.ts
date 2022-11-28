import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog,  } from '@angular/material/dialog';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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

  jobList = 
  [{
		'jobRole': 'Software Developer',
		'company': 'CGI',
		'companyLogo': 'https://www.freepnglogos.com/uploads/logo-3d-png/3d-company-logos-design-logo-online-2.png',
    'location': 'Chennai',
    'jobOverview':'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'jobDescription': [
	{
	"item": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text"
	}
	],
    'jobRequirements': [
	{
	"item": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text"
	}
	],
    'about': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
		'jobTitle': 'Associate',
    'jobType': 'Full Time',
    'specialization': ["Computer Science", "IT"],
    'yearofPassout': '2022',
    'division': 'Manufacturing',
    'keyskills': '["java", "python","Visual Studio", "ASP.Net","Agile Scrum","UI Development"]',
		'education': ['B.Tech','B.Tech'],
		'jobtype': 'Full Time',
    'lastDatetoApply': '2022-11-06T05:52:09.627Z',
	'postedDate': '28-11-2022',
		'isSelected': false
	}
	];

  constructor(
    private skillexService:ApiService,
    private appConfig: AppConfigService,
    private mdDialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.descriptionData = this.router.events.pipe(
    //   filter(e => e instanceof NavigationStart),
    //   map(() => {
    //     const currentState = this.router.getCurrentNavigation();
    //     console.log(currentState.extras.state)
    //     return currentState.extras.state;
    //   })
    // );

    // this.getpageData();
    this.getRoute()
  }

  getRoute() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => {
        const currentState = this.router.getCurrentNavigation();
        console.log(currentState.extras.state)
        return currentState.extras.state;
      })
    );
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
  applyJob(){
    let param =
    {
      "email":this.appConfig.getLocalStorage('email'),
      "jobId":"34567"
    }
    // this.skillexService.submitJobForm(param).subscribe((jobdata:any) => {

    //   if(jobdata.success){
    //     this.appConfig.success(jobdata.message);
    //     this.openDialog('success')
    //   }else{
    //     if(jobdata.message =="Profile not filled"){
    //       this.openDialog('fail')
    //     }else{
    //       this.appConfig.error(jobdata.message);
    //     }
    //   }
    // });

    }


}
