import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { APP_CONSTANTS } from './../../../utils/app-constants.service';
import { AppConfigService } from './../../../utils/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-view-overall-reports',
  templateUrl: './view-overall-reports.component.html',
  styleUrls: ['./view-overall-reports.component.scss'],
})
export class ViewOverallReportsComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  getAllReportsData: any;
  driveName: any;
  isaccess: any;
  subscription: Subscription;
  emailId: any;
//   sticky = false;
//   menuPosition: number = 88;
//   @HostListener('window:scroll', ['$event'])
//  handleScroll(){
//     const windowScroll = window.pageYOffset;
//     if(windowScroll >= this.menuPosition){
//       console.log('in')
//     this.sticky = true;
//     this.sendData.sendMessage(this.sticky);
//     } else {
//     this.sticky = false;
//      this.sendData.sendMessage(this.sticky);
//     }
//     }
  constructor(
    private toastr: ToastrService,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private route: ActivatedRoute,
    private sendData: SentDataToOtherComp,
  ) {
    this.sendData.sendMessage(true);
  }


  ngOnInit(): void {
    this.getRoute();
    this.isaccess = this.appconfig.isComingFromMicroCert();
    // setTimeout(() => {
    //   debugger;
    //    this.menuPosition = this.stickyMenu?.nativeElement?.offsetTop ? this.stickyMenu?.nativeElement?.offsetTop : 88;
    // }, 1000);
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        let email = param.params.id
          ? this.ApiService.decrypt(param.params.id)
          : param.params.id;
        this.getReports(email);
      }
    });
  }

  onBack() {
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.USERLIST);
  }
  goToBehavioural() {
    this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.BEHAVIOUR_MODULE.BEHAVIOUR_REPORT, this.ApiService.encrypt(this.emailId));
  }

  getReports(data) {
    let driveId = this.appconfig.getSessionStorage('driveInfo');
    let assessmentId = this.appconfig.getSessionStorage('assessmentId');
    const apiData = {
      email: data,
      driveId:driveId,
      assessmentId:assessmentId
    };
    this.emailId = data;
    this.ApiService.getReportsDataAPI(apiData).subscribe((response: any) => {
      if (response && response.success) {
        this.getAllReportsData = response.data && response.data[0] ? response.data[0] : null;
      } else {
        this.toastr.error('No Reports Available');
        this.getAllReportsData = [];
      }
    });
  }

  getSelectedDriveName(e) {
    if (this.getAllReportsData) {
      this.getAllReportsData.selectedDriveName = e;
      this.driveName = e;
    }
  }

  getDriveBaisedUser($event){
    if($event){
      this.getReports($event);
    }
 
  }
}
