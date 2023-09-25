import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
@Component({ 
  selector: 'app-drive-settings', 
  templateUrl: './drive-settings.component.html', 
  styleUrls: ['./drive-settings.component.scss'] 
}) 
export class DriveSettingsComponent implements OnInit { 
  jobDetailsdata: any;
  valueone: any;
  // jobData: any;
  constructor(
    public router: Router,
    private appconfig: AppConfigService,
  ) { }
  ngOnInit(): void { 
    this.getJobDetails();
    // this.jobData = this.appconfig.jobData;
  } 
  getJobDetails() {
    this.jobDetailsdata = this.appconfig.getLocalStorage('currentJobData');
    this.valueone = JSON.parse(this.jobDetailsdata);
    console.log(this.valueone,'jobdataaaaaaa');
  } 
  dashboard() {
    this.router.navigate(['/auth/partner/jobrequirment']);
  } 
} 
