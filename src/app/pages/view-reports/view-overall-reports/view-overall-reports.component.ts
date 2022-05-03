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
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-view-overall-reports',
  templateUrl: './view-overall-reports.component.html',
  styleUrls: ['./view-overall-reports.component.scss'],
})
export class ViewOverallReportsComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  getAllReportsData: any;
  candidateSkills:any;
  driveName: any;
  isaccess: any;
  subscription: Subscription;
  emailId: any;
  orgdetails:any;
  orgId: any;
  roleCode: any;
  jobRecommended = false;
  testTaken = false;
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
        this.getCandidateData(email);
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
    this.orgdetails = JSON.parse(this.appconfig.getLocalStorage('role'));
    this.orgId = this.orgdetails && this.orgdetails[0].orgId;
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    const apiData = {
      email: data,
      driveId:driveId,
      assessmentId:assessmentId,
      orgId: this.orgId ? this.orgId : '',
      roleCode : this.roleCode ? this.roleCode : ''
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

  getCandidateData(email){
    let data = {
      email : email ? email : ''
    }
    this.ApiService.getCandidateSkills(data).subscribe((results:any)=>{
      if(results.success){
        this.candidateSkills = results && results.data ? results.data[0] : '';
        this.jobRecommended = results && results.jobRecommended;
        this.testTaken = results && results.testTaken;
      }else{

      }
    })
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
