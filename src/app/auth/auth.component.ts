import { ApiService } from './../services/api.service';
import { AppConfigService } from './../utils/app-config.service';
import { APP_CONSTANTS } from './../utils/app-constants.service';
import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { SentDataToOtherComp } from '../services/sendDataToOtherComp.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('matDialog', { static: false }) matDialogRef: TemplateRef<any>;

  @ViewChild('sidenav') sidenav: MatSidenav;
  appConstant = APP_CONSTANTS.ENDPOINTS;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isaccess: boolean;
  userDetails: any;
  username: any;
  InAppReport:any;
  subscription: Subscription;
  orgdetails: any;
  orgLogo: any;
  orgName: any;
  checkRouter: string;
  roles: any;

  constructor(
    private appConfig: AppConfigService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private sendData: SentDataToOtherComp,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.checkRouter = this.router.url;
    this.roles = this.appConfig.getLocalStorage('role') ? this.appConfig.getLocalStorage('role') : '';
    this.subscription = this.sendData.getMessage().subscribe(message => {
      this.checkRouter = this.router.url;
      if(message){
        if(this.router.url == '/auth/reports/userlist'){
          this.InAppReport = true;
        }else{
          this.InAppReport = false;
        }
      }
    });
   }


   ngOnChange(){
    this.checkRouter = this.router.url;
   }

  ngOnInit(): void {
    this.userDetails  =   JSON.parse(sessionStorage.getItem('user'));
    if(this.userDetails){
      this.username = this.userDetails.attributes.firstName;
    }

    if(this.roles != 'undefined' && this.roles != null && this.roles != ''){
      this.orgdetails = this.roles ? JSON.parse(this.roles) : '';
      this.orgLogo = this.orgdetails[0].logoUrl;
      this.orgName = this.orgdetails[0].orgName;
    }
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  logout() {
    this.matDialogOpen();
  }

  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '500px'
    });
  }

  closeDialog(e) {

      this.dialog.closeAll();
      this.apiService.logout();
  
  }

  mouseenter() {
    if (!this.isExpanded) {
      // this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      // this.isShowing = false;
    }
  }

  navToUserlist(){
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.HOME);
  }


  navToDashboard(){
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.DASHBOARD);
  }


       /**
   * Listen and display the loading spinner.
   */

}
