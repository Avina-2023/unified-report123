import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-behavioural-landing-page',
  templateUrl: './behavioural-landing-page.component.html',
  styleUrls: ['./behavioural-landing-page.component.scss']
})
export class BehaviouralLandingPageComponent implements OnInit, OnDestroy {
// Doughnut
public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData: MultiDataSet = [
  [350, 450, 100]
];
public doughnutChartType: ChartType = 'doughnut';
  ReportSnapshotColor = [
    {
      name: 'thoughtFactor'
    },

  ]
  getAllBehaviourData: any;
  getBehaviourReportAPISubscription: Subscription;
  getAllBasicData: any;
  emailId: any;
  highestEducation: any;
  strenthAreas = [
    {img:'/assets/images/Recpectiveness.svg',color:'green'},
    {img:'/assets/images/creative.svg',color:'green'},
    {img:'/assets/images/adaptablity.svg',color:'red'},
    {img:'/assets/images/Teamwork.svg',color:'red'},
  ];
  benchMarkScore = [
    {score:"1-2",label:"DEVELOPMENT SCOPE",color:"red"},
    {score:"3-4-5",label:"LESS INCLINED",color:"yellow"},
    {score:"6-7-8",label:"MORE INCLINED",color:"orange"},
    {score:"9-10",label:"STRENGTH",color:"green"}
  ];
  constructor(
    private toastr: ToastrService,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRoute();
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        let email = param.params.id
          ? this.ApiService.decrypt(param.params.id)
          : param.params.id;
        this.getBehaviouralReportData(email);
      }
    });
  }

  getBehaviouralReportData(data) {
      const apiData = {
        email: 'ronald-devnath@lntecc.com'
      };
    this.emailId= data;
     this.getBehaviourReportAPISubscription = this.ApiService.getBehaviourReport(apiData).subscribe((response: any) => {
      console.log('res', response);
      if (response && response.success && response.data) {
          this.getAllBehaviourData = response.data.data ? response.data.data : null;
          this.getAllBasicData = response.data.basicDetails ? response.data.basicDetails : null;
          this.highestEducation = this.getAllBasicData && this.getAllBasicData.education ? this.getAllBasicData.education : [];
          if (this.highestEducation.length > 0) {
            let i = this.highestEducation.length - 1;
            this.highestEducation = this.highestEducation[i];
          }
        } else {
          this.toastr.error('No Reports Available');
          this.getAllBasicData = null;
          this.getAllBehaviourData = null;
        }
      }, (err)=> {
        console.log('err', err);
        this.getAllBasicData = null;
        this.getAllBehaviourData = null;
    });
  }

  momentForm(date) {
    if (date) {
      const split = moment(date).format('DD/MM/YYYY');
      return split;
    }
  }
  openBenchmarkInfo(templateRef: TemplateRef<any>){
    this.dialog.open(templateRef, {
      width: "450px",
      height: "80%",
      position: { right: "0px", bottom: "0px"},
      panelClass: "filterModalbox",
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  ngOnDestroy() {
    this.getBehaviourReportAPISubscription ? this.getBehaviourReportAPISubscription.unsubscribe() : '';
  }
}
