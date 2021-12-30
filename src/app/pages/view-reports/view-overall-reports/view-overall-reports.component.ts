import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { APP_CONSTANTS } from './../../../utils/app-constants.service';
import { AppConfigService } from './../../../utils/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
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
    const apiData = {
      email: data,
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
}
