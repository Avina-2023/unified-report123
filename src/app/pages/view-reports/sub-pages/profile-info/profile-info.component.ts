import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { multicast } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from '../../../../services/api.service';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  @Output() driveName:EventEmitter<any> =new EventEmitter<any>();
  @Output() driveUserEmail:EventEmitter<any> =new EventEmitter<any>();
  sampledata = []
  personalInfo: any;
  driveselectedValue: any;
  driveList: any;
  isaccess:any;
  selectDriveName: string;
  sticky:boolean=false;
  subscription: Subscription;
  menuPosition: number = 164;
  totalCount: any;
  driveUser: any;
  selectedMail: any;
  userCount = 1;
  prevbtn: boolean = false;
  @HostListener('window:scroll', ['$event'])
 handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.menuPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    }
  constructor(  private route: ActivatedRoute,private ApiService: ApiService,private appConfig: AppConfigService,private _loading: LoadingService,  private sendData: SentDataToOtherComp, ) { 
     this.selectDriveName = sessionStorage.getItem('schedulename');
  }

  ngOnInit(): void {
    this.getPersonalInfo();
    this.isaccess = this.appConfig.isComingFromMicroCert();
    this.getRoute();
    this.getDriveUser(this.selectDriveName, this.selectedMail ? this.selectedMail : '')
  }

  ngOnChanges() {
    this.getPersonalInfo();
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        this.selectedMail = param.params.id;
       
      }
    });
  }

  getPersonalInfo() {
    this.driveList = this.getAllReportsData?.driveDetails;

    this.driveselectedValue = this.selectDriveName ? this.selectDriveName : this.driveList[0].drivename;
    // do not remove
    // this.driveList && this.driveList.length > 0 ? this.driveList[0].drivename : null
    this.emitdriveNametoParent();
    
    this.personalInfo ={};
    this.personalInfo.firstname = this.getAllReportsData?.firstname;
    this.personalInfo.lastname = this.getAllReportsData?.lastname;
    this.personalInfo.DOB = this.getAllReportsData?.DOB;
    this.personalInfo.fathername = this.getAllReportsData?.fathername;
    this.personalInfo.mobile = this.getAllReportsData?.mobile;
    this.personalInfo.gender = this.getAllReportsData?.gender;
    this.personalInfo.email = this.getAllReportsData?.email;
    this.personalInfo.address = this.getContactAddress('address');
    this.personalInfo.city = this.getContactAddress('city');
    this.personalInfo.institute = this.getLastEducationValue('institute');
    this.personalInfo.specialization = this.getLastEducationValue('specialization');
    this.personalInfo.branch = this.getLastEducationValue('branch');
    this.personalInfo.passedOut = this.getLastEducationValue('passedOut');
    this.personalInfo.percentage = this.getLastEducationValue('percentage');
  }

  getContactAddress(val) {
    let address = this.getAllReportsData && this.getAllReportsData.presentAddress ? this.getAllReportsData.presentAddress : null
    if (address && address.line1 != '') {
      let currAddress = address.line1 + ', ' + address.line2 + ', ' + address.state + ', ' + address.city + ', ' + address.pincode
      let city = address.state && address.city ? address.state + ', ' + address.city : '';
      return val == 'address' ? currAddress : city;
    }
    return null
  }

  getLastEducationValue(getvalue) {
    let EducationValues = this.getAllReportsData && this.getAllReportsData.educationalDetails ? this.getAllReportsData.educationalDetails : [];
    if (EducationValues && EducationValues.length > 0) {
      let findLastIndex = EducationValues.length -1;
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

  driveChange(e) {
    this._loading.setLoading(true, 'loader');
    setTimeout(() => {
      this._loading.setLoading(false, 'loader');
    }, 300);
    this.driveselectedValue = e.value;
    this.emitdriveNametoParent();
  }

  emitdriveNametoParent() {
    this.driveName.emit(this.driveselectedValue);
   
  }

  getDriveUser(drive,email){

    let data = {
      driveName:drive,
      email:  email ? email : ''

    }
    this.ApiService.getDriveBaisedUser(data).subscribe((data:any)=>{
        this.totalCount = data.noOfCandidates;
        this.sampledata = data.data;
    })
  }

  nextUser(){
    this.userCount = this.userCount + 1;
    let index = this.sampledata.findIndex((data => data.email == this.selectedMail));
    let expectedIndex = index != -1 ? (index + 1) : null;
      let nextMail = this.sampledata[expectedIndex].email;
      this.appConfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS, nextMail);
   
    
   
  }

  prevUser(){
    if(this.userCount != 1){
      this.userCount = this.userCount - 1;
      let index = this.sampledata.findIndex((data => data.email == this.selectedMail));
      let expectedIndex = index != -1 ? (index - 1) : null;
        let prevMail = this.sampledata[expectedIndex].email;
        this.appConfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS, prevMail)
    }else{
          this.prevbtn = true;
    }
    
    
  }
}