import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions, Colors } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import {AppConfigService} from '../../../utils/app-config.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showFiller = false;
  text1 = 'hlo'
  dashBoardDetails:any;
  username:any;
  constructor(private apiService:ApiService,private toaster:ToastrService,private appConfig:AppConfigService) { }

  ngOnInit(): void {
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
  doughnutChartLabels: Label[] = ['2021', '2022', '2023','All Others'];
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
  doughnutChartData: MultiDataSet = [
    [15, 45, 20, 23],
  ];
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
  // progress bar chart 2
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
              }else{
                this.toaster.error(result.message)
              }
        })
  }

  // profile circle

}
