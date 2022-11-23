import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../utils/app-config.service';
import { APP_CONSTANTS } from '../utils/app-constants.service';

@Component({
  selector: 'app-staticpage',
  templateUrl: './staticpage.component.html',
  styleUrls: ['./staticpage.component.scss']
})
export class StaticpageComponent implements OnInit {

  constructor(private appconfig: AppConfigService) { }

  ngOnInit(): void {
    if(this.appconfig.getLocalStorage('token')){
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.HOME);
    }else if(this.appconfig.getLocalStorage('c_token')){
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.DASHBOARD);
    }else{
      window.location.href = "/about/index.html";
    }

  }
}
