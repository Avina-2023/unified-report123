import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-candidatedash',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  isExpanded = false
  sideNavMode: MatDrawerMode = 'over'
  isShowing: boolean = false;
  routelinks = APP_CONSTANTS.ENDPOINTS
  candidateName = localStorage.getItem('name')
  constructor(public router:Router, private apiservice:ApiService,private appConfig: AppConfigService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {

      }
    })
  }

  ngOnInit() {

  }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  logout(){
    this.apiservice.logout();
  }
  gotoProfile(){
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiservice.encryptnew(emailval,environment.cryptoEncryptionKey))
    window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
  }
}
