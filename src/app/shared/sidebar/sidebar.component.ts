import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isExpanded: boolean;
  name: string;
  text: string;
  roles:any;
  orgdetails:any;
  roleCode:any;
  menuIconToggle: boolean;
  check = "empdashboard";
  constructor(private appconfig: AppConfigService,public router:Router) {
    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    
    switch (this.router.url) {
      case '/auth/employer/dashboard':
        this.check = 'empdashboard';
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
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.HOME);
    } else if (value == "partnerlist") {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.HOME);
    }
   }
   hiring(value){
    this.check = value;
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER)
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
    this.router.navigate(['/static']);
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



}
