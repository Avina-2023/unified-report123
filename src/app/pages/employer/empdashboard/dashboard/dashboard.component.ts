import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions, Colors } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import {AppConfigService} from 'src/app/utils/app-config.service'
import { environment } from 'src/environments/environment';

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
  profileCompletion:any;
  labels:any;
  color:any;
  graduactionData:any
  disciplineData:any
  degreeData:any
  roles: any;
  orgdetails: any;
  roleCode: any;
  demography: any;
  totalstrength:any;
  totalstrengthtwo:string;
  public centerText: String = "Center Text";



  constructor(private apiService:ApiService,private toaster:ToastrService,private appConfig:AppConfigService) { }

  ngOnInit(): void {
    this.roles = this.appConfig.getLocalStorage('role') ? this.appConfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    this.getEmpDashBoard()
    this.getEmployerDetails()
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

  public doughnutChartColors: Colors[] = [{
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
  ngAfterViewInit() {
// this.doughnutChartPlugins
  }



// char1



  // progress bar chart 2
  doughnutChartLabelstwo: Label[] = [];
  doughnutChartDatatwo: MultiDataSet = [];
  public doughnutChartColorstwo: Colors[] = [{
    backgroundColor:
      [
        'rgba(255, 183, 77, 1)', // female
        "rgba(255, 87, 34, 1)", // male
        'rgba(96, 125, 139, 1)',  //others
      ],

  }
];
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
  getEmpDashBoard(){
    this.dashBoardDetails=[];
        this.apiService.empdashboard().subscribe((result:any)=>{
              if(result.success){
                this.dashBoardDetails=result.data
                this.graduactionData=this.dashBoardDetails[0].levelDetails
                this.disciplineData=this.dashBoardDetails[0].disciplineDetails.sort((a, b) => b.y - a.y).slice(0,15)
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

  getEmployerDetails() {
    var obj = {
      userId: this.apiService.encryptnew(
        localStorage.getItem('email'),
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.getEmployerDetails(obj).subscribe((result: any) => {
      if (result.success) {
        console.log(result)
        this.username = result.data.firstName;
        this.profileCompletion = result.data.profileCompletion;
      } else {
        console.log("failed to load employer details")
      }
    })
  }



  //  emp role only show this function


}
