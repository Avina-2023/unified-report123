import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions, Colors } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import {AppConfigService} from '../../../utils/app-config.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // discipline:any
  showFiller = false;
  dashBoardDetails:any;
  doughnutChartDisplayFirst:any;
  username:any;
  labels:any;

  graduactionData:any
  disciplineData:any
  degreeData:any
  roles: any;
  orgdetails: any;
  roleCode: any;
  demography: any;

  constructor(private apiService:ApiService,private toaster:ToastrService,private appConfig:AppConfigService) { }

  ngOnInit(): void {
    this.roles = this.appConfig.getLocalStorage('role') ? this.appConfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    this.username = localStorage.getItem('firstName')
    this.getCandidateDashBoard()
  }
  profile(){
  this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.PROFILE)
}
// progress bar chart 1
public options: ChartOptions = {
  responsive: true,
  layout: {
    padding: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }
  },
  legend: {
    display: false,
  },
  plugins: {
    datalabels: {
      display: false
    }
  },
  cutoutPercentage: 70
}

  public doughnutChartColors: Colors[] = [
    {
      backgroundColor:
        [
          'rgba(96, 125, 139, 1)',
          'rgba(255, 183, 77, 1)',
          'rgba(38, 193, 246, 1)',
          "rgba(255, 87, 34, 1)",
        ],

    }
  ];
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw(chart) {
      const ctx = chart.ctx;
      var txt2 = '250,488';
      var txt1 = 'Total Candidates';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      const fontSizeToUse = 12;
      ctx.font = fontSizeToUse + 'px Arial';
      ctx.fillStyle = 'black';
      // Draw text in center
      ctx.fillText(txt2, centerX, centerY - 10);
      var fontSizeToUse1 = 10;
      ctx.font = fontSizeToUse1 + 'px Arial';
      ctx.fillText(txt1, centerX, centerY + 10);
    }
  }]

// char1



  // progress bar chart 2
  doughnutChartLabelstwo: Label[] = [];
  doughnutChartDatatwo: MultiDataSet = [];
  doughnutChartTypetwo: ChartType = 'doughnut';
  public options2: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
    cutoutPercentage: 80
  }

 //dashboard
  getCandidateDashBoard(){
    this.dashBoardDetails=[];
        this.apiService.candidatedashboard().subscribe((result:any)=>{
              if(result.success){
                this.dashBoardDetails=result.data
                this.graduactionData=this.dashBoardDetails[0].levelDetails
                this.disciplineData=this.dashBoardDetails[0].disciplineDetails
                this.degreeData=this.dashBoardDetails[0].specializationDetails
                this.demography = this.dashBoardDetails[0].stateDetails;

                for (let i = 0; i < result.data[0].genderDetails.length; i++) {
                  const element = result.data[0].genderDetails[i];
                  this.doughnutChartLabelstwo.push(element.gender)
                  this.doughnutChartDatatwo.push(element.total)
                }
                for (let j = 0; j < result.data[0].yearDetails.length; j++) {
                  const chart2 = result.data[0].yearDetails[j];
                  this.doughnutChartLabels.push(chart2.year)
                  this.doughnutChartData.push(chart2.total)
                }
              }else{
                this.toaster.error(result.message)
              }
        })
  }



  //  emp role only show this function






}
