import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {

  showAvatar = false;
  constructor(public appConfig: AppConfigService,) { }

  ngOnInit(): void {
  }


  NavtoLogin(){
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
  }

}
