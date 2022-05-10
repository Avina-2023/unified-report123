
import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType,Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-candidate-skills',
  templateUrl: './candidate-skills.component.html',
  styleUrls: ['./candidate-skills.component.scss']
})
export class CandidateSkillsComponent implements OnInit {
  @Input() getAllReportsData;
  barChartPlugins:any
  candidateSkills:any = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartOptions: any = {
    responsive: true,
    layout: {
      padding: {
        left: 230,
        right:25,
      }
    },

    scales : {
      yAxes: [{
          ticks: {
            callback: (label: any) => {
              label = label.trim();
              label = label.toLowerCase();
              const str2 = label.charAt(0).toUpperCase() + label.slice(1);
              return str2 && str2.length > 25 ? str2.substr(0, 25) + '...' : str2;
            },
            mirror: true,
            padding: 200,
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
          size: 14,
        },
        
      }
    }


  };
  public barChartData:any = [
    { data: [], backgroundColor: [],hoverBackgroundColor:[],borderRadius:15},

  ];
  public barChartLabels: string[] = [];
  selectedMail: any;
  noCard: boolean = true;
  top3jobs: any = [];
  jobFitGap: any = [];
  barChartValue: any = [];
  barChartColorCode: any=[];
  personalInfo: any;
  isJobFit: any;
  isaccess: any;
  top7Jobs: any = [];
  constructor(private route: ActivatedRoute,private apiService: ApiService,private appConfig: AppConfigService,) {
    this.barChartBorder();
   }

  ngOnInit(): void {
    this.isaccess = this.appConfig.isComingFromMicroCert();
    this.getRoute();
      // this.getPersonalInfo();
  }

  // ngOnChanges() {
  //   this.getPersonalInfo();
  // }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        this.selectedMail = param.params.id;
        // if(this.isaccess){
          this.getCandidateData(this.selectedMail);
        // }

      }
    });
  }



  getCandidateData(email){
    this.candidateSkills = [];
    this.top3jobs = [];
    this.jobFitGap = [];
    this.top7Jobs = [];
    let data = {
      email : email ? email : ''
    }
    this.apiService.getCandidateSkills(data).subscribe((results:any)=>{
      if(results.success){
        this.candidateSkills = results && results.data ? results.data[0] : '';
        this.top3jobs =  this.candidateSkills && this.candidateSkills.jobrole.slice(0, 3);
        this.top7Jobs =  this.candidateSkills && this.candidateSkills.jobrole.slice(3, 10);
        this.isJobFit = results && results.jobRecommended;
        if(this.isJobFit){
          this.formateBarChartData();
        }

      }else{
          this.candidateSkills = [];
          this.top3jobs = [];
          this.jobFitGap = [];
      }
    })
  }



   formateBarChartData(){
    this.barChartData = [{
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: [],
      // barThickness: 0

    }]
    this.jobFitGap = [];
    this.barChartLabels = [];
    this.barChartValue = [];
    this.barChartColorCode = [];
    this.top7Jobs.forEach(element => {
      this.barChartLabels.push(element.jobname);
      this.barChartValue.push(element.calculationScore);
      this.barChartColorCode.push(element.colorCode);
      if(this.barChartLabels.length > 10){
        this.barChartData = [
          {
            data: this.barChartValue,
            backgroundColor:this.barChartColorCode,
            hoverBackgroundColor:this.barChartColorCode,
          }
        ];
      }else{
        this.barChartData = [
          {
            data: this.barChartValue,
            backgroundColor:this.barChartColorCode,
            hoverBackgroundColor:this.barChartColorCode,
            barThickness: 40,
          }
        ];
      }
     });
   }


   barChartBorder(){
    Chart['elements'].Rectangle.prototype.draw = function () {
      var ctx = this._chart.ctx;
      var vm = this._view;
      var left, right, top, bottom, signX, signY, borderSkipped, radius;
      var borderWidth = vm.borderWidth;
      
      // Set Radius Here
      // If radius is large enough to cause drawing errors a max radius is imposed
      var cornerRadius = 20;

        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left ? 1 : -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';

      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
      if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize ? barSize : borderWidth;
        var halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
        var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
        var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
        var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;

      // Corner points, from bottom-left to bottom-right clockwise
      // | 1 2 |
      // | 0 3 |
      var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
      ];

      // Find first (starting) corner with fallback to 'bottom'
      var borders = ['bottom', 'left', 'top', 'right'];
      var startCorner = borders.indexOf(borderSkipped, 0);
      if (startCorner === -1) {
        startCorner = 0;
      }

      function cornerAt(index) {
        return corners[(startCorner + index) % 4];
      }

      // Draw rectangle from 'startCorner'
      var corner = cornerAt(0);
      var width, height, x, y, nextCorner, nextCornerId
      var x_tl, x_tr, y_tl, y_tr;
      var x_bl, x_br, y_bl, y_br;
      ctx.moveTo(corner[0], corner[1]);

      for (var i = 1; i < 4; i++) {
        corner = cornerAt(i);
        nextCornerId = i + 1;
        if (nextCornerId == 4) {
          nextCornerId = 0
        }

        nextCorner = cornerAt(nextCornerId);

        width = corners[2][0] - corners[1][0];
        height = corners[0][1] - corners[1][1];
        x = corners[1][0];
        y = corners[1][1];
        radius = cornerRadius;

        // Fix radius being too large        
        if (radius > Math.abs(height) / 2) {
          radius = Math.floor(Math.abs(height) / 2);
        }
        if (radius > Math.abs(width) / 2) {
          radius = Math.floor(Math.abs(width) / 2);
        }
        ctx.moveTo(x, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x, y + height);
      }
      ctx.fill();
      if (borderWidth) {
        ctx.stroke();
      }
    };
   }

  //  getPersonalInfo() {
  //   this.personalInfo = {};
  //   this.personalInfo.firstname = this.getAllReportsData?.firstname;
  //   this.personalInfo.lastname = this.getAllReportsData?.lastname;
  //   this.personalInfo.DOB = this.getAllReportsData?.DOB;
  //   this.personalInfo.fathername = this.getAllReportsData?.fathername;
  //   this.personalInfo.mobile = this.getAllReportsData?.mobile;
  //   this.personalInfo.gender = this.getAllReportsData?.gender;
  //   this.personalInfo.email = this.getAllReportsData?.email;
  //   this.personalInfo.qrCodeURL = this.getAllReportsData?.qrCodeURL;
  //   this.personalInfo.campusVerified = this.getAllReportsData?.campusVerified;
  //   this.personalInfo.address = this.getContactAddress('address');
  //   this.personalInfo.city = this.getContactAddress('city');
  //   this.personalInfo.institute = this.getLastEducationValue('institute');
  //   this.personalInfo.specialization = this.getLastEducationValue('specialization');
  //   this.personalInfo.branch = this.getLastEducationValue('branch');
  //   this.personalInfo.passedOut = this.getLastEducationValue('passedOut');
  //   this.personalInfo.percentage = this.getLastEducationValue('percentage');
  // }

  // getContactAddress(val) {
  //   let address =
  //     this.getAllReportsData && this.getAllReportsData.presentAddress
  //       ? this.getAllReportsData.presentAddress
  //       : null;
  //   if (address && address.line1 != '') {
  //     let currAddress =
  //       address.line1 +
  //       ', ' +
  //       address.line2 +
  //       ', ' +
  //       address.state +
  //       ', ' +
  //       address.city +
  //       ', ' +
  //       address.pincode;
  //     let city =
  //       address.state && address.city
  //         ? address.state + ', ' + address.city
  //         : '';
  //     return val == 'address' ? currAddress : city;
  //   }
  //   return null;
  // }

  // getLastEducationValue(getvalue) {
  //   let EducationValues =
  //     this.getAllReportsData && this.getAllReportsData.educationalDetails
  //       ? this.getAllReportsData.educationalDetails
  //       : [];
  //   if (EducationValues && EducationValues.length > 0) {
  //     let findLastIndex = EducationValues.length - 1;
  //     let lastEducationValue = EducationValues[findLastIndex];
  //     let institute = lastEducationValue.institute;
  //     let specialization = lastEducationValue.specialization;
  //     let branch = lastEducationValue.branch;
  //     let passedOut = lastEducationValue.passedout;
  //     let percentage = lastEducationValue.percentage;
  //     if (getvalue == 'institute') {
  //       return institute;
  //     }
  //     if (getvalue == 'specialization') {
  //       return specialization;
  //     }
  //     if (getvalue == 'branch') {
  //       return branch;
  //     }
  //     if (getvalue == 'passedOut') {
  //       return passedOut;
  //     }
  //     if (getvalue == 'percentage') {
  //       return percentage;
  //     }
  //   }
  //   return null;
  // }

}
