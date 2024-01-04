import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-candidatedash',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  @ViewChild('confirmDialog', { static: false }) matDialogRef: TemplateRef<any>;
  isExpanded = false
  sideNavMode: MatDrawerMode = 'over'
  isShowing: boolean = false;
  routelinks = APP_CONSTANTS.ENDPOINTS
  candidateName = localStorage.getItem('name')
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;
  profileimge: any ="";
  constructor(
    public router:Router, 
    private apiservice:ApiService, 
    private appconfig:AppConfigService, 
    private msgData : SentDataToOtherComp, 
    public dialog: MatDialog,
    ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {

      }
    })
  }

  ngOnInit() {
    this.profileimge = this.appconfig.getLocalStorage('profileImage');
    this.msgData.getMessage().subscribe((data)=>{
      if(data.data=='profileImage'&& data.value !="" && data.value != undefined){
        if (data.value && this.productionUrl == true) {
          this.profileimge=data.value + environment.blobToken
        } else if (data.value && this.productionUrl == false) {
          this.profileimge=data.value
        }
      }
    })
  }

  
  // ngOnChanges(){
  //   this.profileimge = this.appconfig.getLocalStorage('profileImage');

  // }


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
    this.dialog.open(this.matDialogRef, {
      disableClose: true
			// panelClass: 'spec_desk_dialog'
		});
  }
  confirm(value){
    if(value){
    this.dialog.closeAll()
    this.apiservice.logout();
    }else{
    this.dialog.closeAll()
    }
  }

  gotoProfile(){
    let emailval = this.appconfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiservice.encryptnew(emailval,environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email);

  }
    gotoDashboard(){
      this.router.navigate(['/candidateview/dashboard'])
    }
  }

