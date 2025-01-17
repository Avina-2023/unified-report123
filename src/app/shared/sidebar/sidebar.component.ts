import { E, H } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { log } from 'console';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  isExpanded: boolean;
  isnotShowing: boolean = true;
  name: string;
  text: string;
  roles: any;
  orgdetails: any;
  roleCode: any;
  menuIconToggle: boolean;
  menuIconToggle1: boolean;
  driveIconToggle: boolean;
  jobIconToggle: boolean;
  check = 'empdashboard';
  constructor(
    private appconfig: AppConfigService,
    public router: Router,
    public dialog: MatDialog,
    private loaded: LoadingService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navBarSelector();
      }
    });
    this.roles = this.appconfig.getLocalStorage('role')
      ? this.appconfig.getLocalStorage('role')
      : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode =
      this.orgdetails &&
      this.orgdetails[0].roles &&
      this.orgdetails[0].roles[0].roleCode;
    this.navBarSelector();
  }

  navBarSelector() {
    switch (this.router.url) {
      case '/auth/employer/dashboard':
        this.check = 'empdashboard';
        break;
      case '/auth/employer/drive/managedrive':
        this.driveIconToggle = true;
        this.check = 'managedrive';
        break;
      case '/auth/partner/addpartner':
        this.menuIconToggle = true;
        this.check = 'addpartner';
        break;
      case '/auth/partner/partnerlist':
        this.menuIconToggle = true;
        this.check = 'partnerlist';
        break;
      case '/auth/partner/partnerenquiry':
        this.menuIconToggle = true;
        this.check = 'partnerenquiries';
        break;
      case '/auth/dashboard/profile':
        this.check = 'empprofile';
        break;
      case '/auth/partner/uploadpostrequirment':
        this.menuIconToggle = true;
        this.check = 'empPost';
        break;
      case '/auth/partner/jobrequirment':
        this.menuIconToggle = true;
        this.check = 'empView';
        break;
      case '/auth/drive/candidatelist':
        this.menuIconToggle = true;
        this.check = 'Viewcandidatelist';
        break;
      case '/auth/drive/drivesettings':
        this.menuIconToggle = true;
        this.check = 'driveSettings';
        break;
      case '/auth/drive/viewCandidateProfilebyEmployer':
        this.menuIconToggle = true;
        this.check = 'viewProfilebyEmployer';
        break;
      case '/auth/drive/managedrive':
        this.check = 'managedrive';
        this.driveIconToggle = true;
        break;
      case '/auth/dashboard/candidatesearch':
        this.check = 'empcandidatesearch';
        break;
      case '/auth/overall-reports':
        this.check = 'overallReports';
        break;
      default:
        this.check = 'empdashboard';
        break;
    }
  }

  // mouseenter() {
  //   if (!this.isExpanded) {
  //     this.isnotShowing = false;
  //   }
  // }

  // mouseleave() {
  //   if (!this.isExpanded) {
  //     this.isnotShowing = true;
  //   }
  // }

  mouseenter() {
    if (!this.isExpanded) {
      this.isnotShowing = false;
      // console.log('mouse entered');
    }
    if(this.isExpanded){
      this.isnotShowing = false;
      // console.log('mouse entered');
    }
  }
  mouseleave() {
    if (!this.isExpanded) {
      this.isnotShowing = true;
    }
    if(this.isExpanded){
      this.isnotShowing = true;
      // console.log('mouse left');
    }
  }

  ngOnInit(): void {
    this.sideBar();
  }
  validateClick(value) {
    this.check = value;
    if (value == 'empdashboard') {
      this.menuIconToggle = false;
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.HOME);
    } else if (value == 'partnerlist') {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.HOME);
    } else if (value == 'overallreport') { 
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.OVERALLREPORTS.HOME);
    }
  }
  hiring(value) {
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER);
  }
  addjobs(value) {
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDOPENJOBS);
  }
  viewjobs(value) {
    this.check = value;
    this.appconfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.PARTNER.VIEWOPENJOBS
    );
  }
  drive(value) {
    this.check = value;
    this.appconfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.MANAGEDRIVE
    );
  }
  manage(value) {
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERLIST);
  }
  partners(value) {
    this.check = value;
    this.appconfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERENQUIRY
    );
  }
  logout() {
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/home']);
  }
  uploadpostrequirement(value) {
    this.check = value;
    this.appconfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.PARTNER.UPLOADREQUIRMENT
    );
    console.log(this.check);
  }
  work(value) {
    // this.loaded.setLoading();
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
    console.log(this.check);
  }

  profile(value) {
    this.check = value;
    this.appconfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.PROFILE
    );
  }

  candidatesearch(value) {
    this.check = value;
    this.appconfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.CANDIDATESEARCH
    );
  }

  sideBar() {
    if (this.roleCode == 'SADM' && 'ISADM') {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }
  changeIcon() {
    this.menuIconToggle = !this.menuIconToggle;
  }
  changedriveIcon() {
    this.driveIconToggle = !this.driveIconToggle;
  }
  changeJobIcon() {
    this.jobIconToggle = !this.jobIconToggle;
  }
}
