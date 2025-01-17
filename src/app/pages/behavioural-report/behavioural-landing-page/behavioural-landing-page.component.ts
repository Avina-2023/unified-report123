import { Component, OnInit, OnDestroy, TemplateRef, Input, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-behavioural-landing-page',
  templateUrl: './behavioural-landing-page.component.html',
  styleUrls: ['./behavioural-landing-page.component.scss']
})
export class BehaviouralLandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  getAllBehaviourData: any;
  getBehaviourReportAPISubscription: Subscription;
  getAllBasicData: any;
  emailId: any;
  highestEducation: any;
  benchMarkScore = [
    { score: "1-2", label: "DEVELOPMENT SCOPE", color: "red" },
    { score: "3-4-5", label: "LESS INCLINED", color: "yellow" },
    { score: "6-7-8", label: "MORE INCLINED", color: "orange" },
    { score: "9-10", label: "STRENGTH", color: "green" }
  ];
  bgColorInput: string = '#85BD44';
  doughnutValue: number = 4;
  tabIndex: number = 0;
  getAllBehaviourAPIDetails: any;
  apiSuccess = true;
  isaccess: any;
  isPdfdownable = false;

  constructor(
    private toastr: ToastrService,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sendData: SentDataToOtherComp,
    private _loading: LoadingService,
  ) { }

  ngOnInit() {
    this.getRoute();
    this.isaccess = this.appconfig.isComingFromMicroCert();
  }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        // let email = param.params.id
        //   ? this.ApiService.decrypt(param.params.id)
        //   : param.params.id;
        let email = param.params.id ? param.params.id : '';
        let passingEmail = window.atob(email)
        this.getBehaviouralReportData(passingEmail);

      }
    });
  }

  tabChanged(event) {
    this.tabIndex = event.index;

    switch (this.tabIndex) {
      case 0:
        this.bgColorInput = '#85BD44';
        break;
      case 1:
        this.bgColorInput = '#547ABC';
        break;
      case 2:
        this.bgColorInput = '#FCBD33';
        break;
      case 3:
        this.bgColorInput = '#C45CDD';
        break;
      default:
        this.bgColorInput = '#C3C5CA';
        break;
    }

  }

  getBehaviouralReportData(data) {
    const apiData = {
      email: data,
      reportId: "R1"
    };
    this.emailId = data;
    this.getBehaviourReportAPISubscription = this.ApiService.getBehaviourReport(apiData).subscribe((response: any) => {
      if (response && response.success && response.data) {
        this.apiSuccess = true;
        this.getAllBehaviourData = response.data.data ? response.data.data : null;
        this.getAllBehaviourAPIDetails = response.data ? response.data : null;
        this.getAllBasicData = response.data.basicDetails ? response.data.basicDetails : null;
        this.highestEducation = this.getAllBasicData && this.getAllBasicData.education ? this.getAllBasicData.education : [];
        if (this.highestEducation.length > 0) {
          let i = this.highestEducation.length - 1;
          this.highestEducation = this.highestEducation[i];
        }
      } else {
        this.apiSuccess = false;
        // this.toastr.error('No Reports Available');
        this.getAllBasicData = null;
        this.getAllBehaviourData = null;
        this.getAllBehaviourAPIDetails = null;
      }
    }, (err) => {
      this.apiSuccess = false;
      this.getAllBasicData = null;
      this.getAllBehaviourData = null;
      this.getAllBehaviourAPIDetails = null;
    });
  }

  momentForm(date) {
    if (date) {
      const split = moment(date).format('DD/MM/YYYY');
      return split;
    }
  }
  openBenchmarkInfo(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      width: "450px",
      height: "80%",
      position: { right: "0px", bottom: "0px" },
      panelClass: "filterModalbox",
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  ngOnDestroy() {
    this.getBehaviourReportAPISubscription ? this.getBehaviourReportAPISubscription.unsubscribe() : '';
  }


  downloadreport(val) {
    if (val) {
      this.isPdfdownable = val;
      this.sendData.sendMessage(true, '');
    } else {
      this.isPdfdownable = false;
      this.sendData.sendMessage(false, '');
    }


  }
}
