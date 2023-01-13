import { E, H } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  isExpanded: boolean;
  name: string;
  text: string;
  roles:any;
  orgdetails:any;
  roleCode:any;
  menuIconToggle: boolean;
  menuIconToggle1:boolean;
  driveIconToggle: boolean;
  check = "empdashboard";
  constructor(private appconfig: AppConfigService,public router:Router, public dialog: MatDialog, private loaded: LoadingService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.navBarSelector()
      }
    })
    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    this.navBarSelector()
  }

  navBarSelector() {
    switch (this.router.url) {
      case '/auth/employer/dashboard':
        this.check = 'empdashboard';
        break;
      case '/auth/employer/drive/managedrive':
        this.driveIconToggle = true
        this.check = 'managedrive';
        break;

      case '/auth/partner/addpartner':
        this.menuIconToggle = true
        this.check = 'addpartner';
        break;
      case '/auth/partner/partnerlist':
        this.menuIconToggle = true
        this.check = 'partnerlist';
        break;
      case '/auth/partner/partnerenquiry':
        this.menuIconToggle = true
        this.check = 'partnerenquiries';
        break;
      case '/auth/dashboard/profile':
        this.check = 'empprofile';
        break; 
      case '/auth/partner/jobrequirment/work':
        this.menuIconToggle = true
        this.check = 'emprequirments';
        break;
      case '/auth/drive/managedrive':
        this.check = 'managedrive';
        this.driveIconToggle = true;
        break; 
      default:
        this.check = 'empdashboard';
        break;
    }
  }

  ngOnInit(): void {
    this.sideBar()
  }
  validateClick(value) {
    this.check = value;
    if (value == "empdashboard") {
      this.menuIconToggle = false;
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.HOME);
    } else if (value == "partnerlist") {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.HOME);
    }
   }
   hiring(value){
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER)
   }
   drive(value){
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.MANAGEDRIVE)
   }
   manage(value){
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERLIST)
   }
   partners(value){
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERENQUIRY)
   }
   logout(){
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/home']);
   }
   uploadpostrequirement(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.UPLOADREQUIRMENT)
  }
   work(value:any){
    // this.loaded.setLoading();
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT)
  }

   profile(value){
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.PROFILE)
   }

   sideBar(){
    if((this.roleCode =='SADM' && 'ISADM')){
      this.isExpanded = true
    }
    else{
      this.isExpanded = false
    }
   }
   changeIcon() {
    this.menuIconToggle = !this.menuIconToggle;
    }
    changedriveIcon(){
      this.driveIconToggle = !this.driveIconToggle;
    }




}
