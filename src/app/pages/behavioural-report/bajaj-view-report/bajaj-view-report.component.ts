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
  getBehaviourReportAPISubscription: Subscription;
  getAllBasicData: any;
  emailId: any;
  highestEducation: any;
  BARvalue= [2,3,5,6,7,9];
  continouslyValue = 2;
  continouslyValueTwo :boolean = true;
  continouslyValueThree :boolean = true;
  continouslyValueFive :boolean = true;
  continouslyValueSix :boolean = true;
  continouslyValueSeven :boolean = true;
  continouslyValueNine :boolean = true;
  benchMarkScore = [
    {score:"1-2-3",label:"DEVELOPMENT SCOPE",color:"red"},
    {score:"4-5-6-7",label:"LESS INCLINED",color:"orange"},
    {score:"8-9-10",label:"MORE INCLINED",color:"green"},
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
      this.continouslyValueTwo = true
      this.continouslyValueThree  = false;
   this.continouslyValueFive  = false;
   this.continouslyValueSix  = false;
   this.continouslyValueSeven  = false;
   this.continouslyValueNine  = false;
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
        email: data
      };
    this.emailId= data;
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
    this.getBehaviourReportAPISubscription ? this.getBehaviourReportAPISubscription.unsubscribe() : '';
  }


  downloadreport(val){
    console.log(val,'val');
    
    if(val){
      this.isPdfdownable = val;
      this.sendData.sendMessage(true,'');
    }else{
      this.isPdfdownable = false;
      this.sendData.sendMessage(false,'');
    }
 
    
  }
}
