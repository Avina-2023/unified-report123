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
  check = "empdashboard";
  constructor(private appconfig: AppConfigService,public router:Router) {
    if(this.router.url == 'auth/dashboard/dashboard'){
      this.check='empdashboard';
    }else{
      this.check='partner';
    }
   }

  ngOnInit(): void {
  }



  // notification list 

  notificationlist: any = [
    {
      name: 'Head1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc lectus risus, accumsan vel orci a, suscipit cursus diam.',
    },
    {
      name: 'Head2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc lectus risus, accumsan vel orci a, suscipit cursus diam.',
    },
    {
      name: 'Head3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc lectus risus, accumsan vel orci a, suscipit cursus diam.',
    },
  ];

  notification() {
  }

  validateClick(value) {
    this.check = value;

    if (value == "empdashboard") {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.HOME);
    } else if (value == "partner") {
      this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER);
    }
   }
   hiring(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER)
   }








}
