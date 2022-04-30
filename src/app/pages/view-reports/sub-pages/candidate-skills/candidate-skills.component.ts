
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-candidate-skills',
  templateUrl: './candidate-skills.component.html',
  styleUrls: ['./candidate-skills.component.scss']
})
export class CandidateSkillsComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  barChartPlugins:any
  candidateSkills:any = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 230,
        right:25,
      }
    },

    scales : {
      yAxes: [{
        // display:true,
          ticks: {
            callback: (label: any) => {
              return label.length > 20 ? label.substr(0, 20) + '...' : label;
            },
            mirror: true,
            padding: 140,
            fontSize:16,
          },
      }],
      xAxes: [{

        ticks: {
          max : 100,
          min : 0,
          stepSize:10,

        }

        }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        }
      }
    }


  };
  public barChartData: ChartDataSets[] = [
    { data: [], backgroundColor: [],hoverBackgroundColor:[],},

  ];
  public barChartLabels: string[] = [];
  selectedMail: any;
  noCard: boolean = true;
  top3jobs: any;
  jobFitGap: any;
  barChartValue: any = [];
  barChartColorCode: any=[];
  personalInfo: any;
  constructor( private route: ActivatedRoute,private apiService: ApiService,) {

   }

  ngOnInit(): void {
      this.getRoute();
      // this.getPersonalInfo();
  }

  ngOnChanges() {
    // this.getPersonalInfo();
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        this.selectedMail = param.params.id;
        this.getCandidateData(this.selectedMail);
      }
    });
  }



  getCandidateData(email){
    let data = {
      email : email ? email : ''
    }
    this.apiService.getCandidateSkills(data).subscribe((results:any)=>{
      if(results.success){
        this.candidateSkills = results && results.data ? results.data[0] : '';
        this.top3jobs =  this.candidateSkills.jobrole.slice(0, 3);
        this.formateBarChartData();
        this.noCard = true;
      }else{
          this.noCard = false;
      }
    })
  }



   formateBarChartData(){
    this.jobFitGap = this.candidateSkills.jobrole.splice(3);
    this.jobFitGap.forEach(element => {
      this.barChartLabels.push(element.jobname);
      this.barChartValue.push(element.calculationScore);
      this.barChartColorCode.push(element.colorCode);
      this.barChartData = [
        {
          data: this.barChartValue,
          backgroundColor:this.barChartColorCode,
          hoverBackgroundColor:this.barChartColorCode,
          barThickness: 30,
        }
      ];
     });
   }

   getPersonalInfo() {
    this.personalInfo = {};
    this.personalInfo.firstname = this.getAllReportsData?.firstname;
    this.personalInfo.lastname = this.getAllReportsData?.lastname;
    this.personalInfo.DOB = this.getAllReportsData?.DOB;
    this.personalInfo.fathername = this.getAllReportsData?.fathername;
    this.personalInfo.mobile = this.getAllReportsData?.mobile;
    this.personalInfo.gender = this.getAllReportsData?.gender;
    this.personalInfo.email = this.getAllReportsData?.email;
    this.personalInfo.qrCodeURL = this.getAllReportsData?.qrCodeURL;
    this.personalInfo.campusVerified = this.getAllReportsData?.campusVerified;
    this.personalInfo.address = this.getContactAddress('address');
    this.personalInfo.city = this.getContactAddress('city');
    this.personalInfo.institute = this.getLastEducationValue('institute');
    this.personalInfo.specialization = this.getLastEducationValue('specialization');
    this.personalInfo.branch = this.getLastEducationValue('branch');
    this.personalInfo.passedOut = this.getLastEducationValue('passedOut');
    this.personalInfo.percentage = this.getLastEducationValue('percentage');
  }

  getContactAddress(val) {
    let address =
      this.getAllReportsData && this.getAllReportsData.presentAddress
        ? this.getAllReportsData.presentAddress
        : null;
    if (address && address.line1 != '') {
      let currAddress =
        address.line1 +
        ', ' +
        address.line2 +
        ', ' +
        address.state +
        ', ' +
        address.city +
        ', ' +
        address.pincode;
      let city =
        address.state && address.city
          ? address.state + ', ' + address.city
          : '';
      return val == 'address' ? currAddress : city;
    }
    return null;
  }

  getLastEducationValue(getvalue) {
    let EducationValues =
      this.getAllReportsData && this.getAllReportsData.educationalDetails
        ? this.getAllReportsData.educationalDetails
        : [];
    if (EducationValues && EducationValues.length > 0) {
      let findLastIndex = EducationValues.length - 1;
      let lastEducationValue = EducationValues[findLastIndex];
      let institute = lastEducationValue.institute;
      let specialization = lastEducationValue.specialization;
      let branch = lastEducationValue.branch;
      let passedOut = lastEducationValue.passedout;
      let percentage = lastEducationValue.percentage;
      if (getvalue == 'institute') {
        return institute;
      }
      if (getvalue == 'specialization') {
        return specialization;
      }
      if (getvalue == 'branch') {
        return branch;
      }
      if (getvalue == 'passedOut') {
        return passedOut;
      }
      if (getvalue == 'percentage') {
        return percentage;
      }
    }
    return null;
  }

}
