import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  @ViewChild('filter', {static: false}) login: TemplateRef<any>;
  @ViewChild('register', {static: false}) register: TemplateRef<any>;
  @ViewChild('jobseekers', {static: false}) jobseekers: TemplateRef<any>;
  showAvatar = false;
  sectiondialogRef: any;
  baseUrl= environment.OFFCAMPUSDRIVE
  campusUrl:any = environment.CAMPUS_URL;
  SKILL_PROFILE_URL:any = environment.SKILL_PROFILE_URL;
  constructor(public appConfig: AppConfigService,private matDialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
  }


  NavtoLogin(){
    this.openUserFormDialog();
    // this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
  }
  candidateProfileLogin(){
    window.open (this.SKILL_PROFILE_URL,'profile_redir')
  }

  NavtoRegister(){
    this.openregisterDialog();
  }

  NavtoJobSeekers(){
    this.openJobSeekersxDialog()
  }

  // NavtoCampus(){
  // window.open(this.baseUrl, '_blank');
  // }

  openJobSeekersxDialog(){
    this.sectiondialogRef = this.matDialog.open(this.jobseekers, {
      width: '908px',
      height: '524px',
      panelClass: 'loginpopover',

    });
  }

  openUserFormDialog() {
    this.sectiondialogRef = this.matDialog.open(this.login, {
      width: '908px',
      height: '524px',
      panelClass: 'loginpopover',

    });
  }


  openregisterDialog() {
    this.sectiondialogRef = this.matDialog.open(this.register, {
      width: '908px',
      height: '524px',
      panelClass: 'loginpopover',

    });
  }

}
