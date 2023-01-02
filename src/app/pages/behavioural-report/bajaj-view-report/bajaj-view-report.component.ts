import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-bajaj-view-report',
  templateUrl: './bajaj-view-report.component.html',
  styleUrls: ['./bajaj-view-report.component.scss']
})
export class BajajViewReportComponent implements OnInit, AfterViewInit, OnDestroy {
  getAllBehaviourData: any;
  getBajaBehaviourReportAPISubscription: Subscription;
  getAllBasicData: any;
  emailId: any;
  highestEducation: any;
  skillSelected=0;
  BARvalue = [
    {
      score: '1',
      Value1: true,
    },
    {
      score: '2',
      Value2: false,
    },
    {
      score: '3',
      Value4: false,
    },
    {
      score: '4',
      Value4: false,
    },
    {
      score: '5',
      Value5: true, 
    },
    {
      score: '6',
      Value6: false,
    },
    {
      score: '7',
      Value7: false,
    },
    {
      score: '8',
      Value8: false,
    },
    {
      score: '9',
      Value9: true,
    },
    {
      score: '10',
      Value10: false,
    },

  ];
  continouslyValue = 2;
  continouslyValueTwo :boolean = false;
  continouslyValueThree :boolean = false;
  continouslyValueFive :boolean = false;
  continouslyValueSix :boolean = false;
  continouslyValueSeven :boolean = false;
  continouslyValueNine :boolean = false;
  benchMarkScore = [
    {score:"1-2-3",label:"LOW",color:"red"},
    {score:"4-5-6-7",label:"AVERAGE",color:"orange"},
    {score:"8-9-10",label:"HIGH",color:"green"},
  ];
  bgColorInput:string = '#85BD44';
  doughnutValue:number = 4;
  tabIndex:number = 0;
  getAllBehaviourAPIDetails: any;
  apiSuccess = true;
  isaccess: any;
  isPdfdownable = false;
  constructor(
    private sendData: SentDataToOtherComp,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _loading: LoadingService,
  ) { }

  ngOnInit(): void {
    this.getRoute();
    this.isaccess = this.appconfig.isComingFromMicroCert();
    // this.continously()
  }
  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
 
  continously(){
    if(this.continouslyValue==2){
      this.continouslyValueTwo = ! this.continouslyValueTwo ;
      this.continouslyValueThree  =  ! this.continouslyValueThree;
   this.continouslyValueFive  =  ! this.continouslyValueFive;
   this.continouslyValueSix  =  ! this.continouslyValueSix;
   this.continouslyValueSeven  =  ! this.continouslyValueSeven;
   this.continouslyValueNine  =  ! this.continouslyValueNine;
    }
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      
      if (param && param.params && param.params.id) {
        let email = param.params.id ? this.ApiService.decrypt(param.params.id) : param.params.id;
        this.getBehaviouralReportData(email);
      }
    });
  }
  skillChange(index){
    this.skillSelected=index;
    console.log( this.skillSelected)
  }
  
  tabChanged(event) {
    this.tabIndex = event.index;

    switch(this.tabIndex) {
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
        reportId : "R2"
      };
    this.emailId= data;
     this.getBajaBehaviourReportAPISubscription = this.ApiService.getBehaviourReport(apiData).subscribe((response: any) => {
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
      }, (err)=> {
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
    this.getBajaBehaviourReportAPISubscription ? this.getBajaBehaviourReportAPISubscription.unsubscribe() : '';
  }


  downloadreport(val){
    // console.log(val,'val');
    
    if(val){
      this.isPdfdownable = val;
      this.sendData.sendMessage(true,'');
    }else{
      this.isPdfdownable = false;
      this.sendData.sendMessage(false,'');
    }
 
    
  }
}
