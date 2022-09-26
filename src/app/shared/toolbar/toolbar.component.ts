import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../utils/app-constants.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  showFiller = false;
  check = "userlist";
  roles:any;
  orgdetails:any;
  roleCode:any;
  sidebarOpen;
  menuIconToggle: boolean;
  sideBar : [{
    name: 'menu1',
    icon: '/assets/images/skillMaster/userlisticon.svg'
  },{
    name: 'menu2',
    icon:'/assets/images/skillMaster/skillmastericon.svg'
  }
]
  
  constructor(private appconfig: AppConfigService,private router: Router) { 
    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    if(this.router.url == '/auth/reports/userlist'){
      this.check='userlist';
    }else{
      this.check='skillmaster';
    }
  }

  ngOnInit(): void {
    this.sidebarOpen = true;
  //  this.check = this.appconfig.getLocalStorage('navMenu') ? this.appconfig.getLocalStorage('navMenu') : 'userlist';
  }

  sidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  validateClick(value) {
   // this.appconfig.setLocalStorage('navMenu',value);
    this.check = value;

    if (value == "userlist") {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.USERLIST);
    } else if (value == "skillmaster") {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.SKILLMASTER.SKILLMASTERLIST);
    }
  }

  changeIcon() {
    this.menuIconToggle = !this.menuIconToggle;
    }

}
