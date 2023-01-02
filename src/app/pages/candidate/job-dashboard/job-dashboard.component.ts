import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, SimpleChange, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.scss'],
})
export class JobDashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // public date:any;
  public year: any;
  public email: any;
  public username: any;
  public candidateDahboard: any;
  public jobsAvailable: any;
  public jobApplied: any;
  public profileView: any;
  public shortlisted: any;
  public ChartData: any = [];
  public objDetails: any;
  public Details: any;
  public profilepercentage: any;
  public userstate: any;
  public usercountry: any;
  public usercity: any;
  blobToken = environment.blobToken;
  profileImage = ""
  productionUrl = environment.SKILL_EDGE_URL == "https://skillexchange.lntedutech.com"?true:false;
  public allyears = [];
  constructor(
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private msgData : SentDataToOtherComp
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#26BBEF', '#FF9A78', '#10E596', '#FDBC64'],
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#26BBEF', '#FF9A78', '#10E596'],
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      fill: {
        opacity: 1,
        colors: ['#26BBEF', '#FF9A78', '#10E596'],
      },
    };

    this.yearOption()
  }
  ngOnInit(): void {
    this.getCandidateDashBoard('');
    this.username = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.CandidateDetails();
  }

  yearOption(){
    var date1 = new Date().getFullYear();
    var date2 = new Date().getFullYear() - 1;
    var date3 = new Date().getFullYear() - 2;
    var yearArray = [];
    if(date1 >= 2022 ){
      yearArray.push({year:date1})
    }
    if(date2 >= 2022 ){
      yearArray.push({year:date2})
    }
    if(date3 >= 2022){
      yearArray.push({year:date3})
    }
   this.allyears = yearArray;
  }

  // candidate Dashboard Barchart
  getCandidateDashBoard(e) {
    let year;
    if (e.value) {
      year = e.value;
    } else {
      year = this.appConfig.getCurrentYear();
    }
    this.email = localStorage.getItem('email');
    this.objDetails = {};
    if (Object.keys(this.objDetails).length === 0) {
      Object.assign(this.objDetails, { year: year, email: this.email });
    }
    this.apiService
      .candidateDashboard(this.objDetails)
      .subscribe((res: any) => {
        if (res.success) {
          this.candidateDahboard = res.data;
          this.jobsAvailable = this.candidateDahboard.jobAvailableCount;
          this.jobApplied = this.candidateDahboard.jobAppliedCount;
          this.profileView = this.candidateDahboard.profileViewedCount;
          this.shortlisted = this.candidateDahboard.shortlistedCount;
          this.ChartData = res.data.series;
          this.chartOptions.series.push(this.ChartData);
        }
      });
  }
  CandidateDetails() {
    var obj = {};
    obj = {
      email: this.apiService.encryptnew(
        this.email,
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        this.Details = res.data;
        this.profileImage = this.Details.personal_details.profileImage;
        this.msgData.sendMessage("profileImage",this.profileImage)
        if (this.profileImage && this.productionUrl == true) {
          this.appConfig.setLocalStorage('profileImage',this.profileImage + environment.blobToken);
          this.profileImage = this.profileImage + environment.blobToken
        } else if (this.profileImage && this.productionUrl == false) {
          this.appConfig.setLocalStorage('profileImage',this.profileImage);
          this.profileImage = this.profileImage

        }
        this.appConfig.setLocalStorage('candidateProfile',JSON.stringify(this.Details));
        this.profilepercentage = Math.ceil(this.Details.profilePercentage);
        this.appConfig.setLocalStorage('profilePercentage', this.profilepercentage);
        this.usercity = this.Details.permanentaddress.permanent_city;
        this.userstate = this.Details.permanentaddress.permanent_state;
        this.usercountry = this.Details.permanentaddress.permanent_country;
      }
    });
  }

  gotoProfile(){
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiService.encryptnew(emailval,environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email);
  }
}
