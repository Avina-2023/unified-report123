import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { multicast } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from '../../../../services/api.service';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  @Output() driveName:EventEmitter<any> =new EventEmitter<any>();
  personalInfo: any;
  driveselectedValue: any;
  driveList: any;
  isaccess:any;
  selectDriveName: string;
  sticky:boolean=false;
  subscription: Subscription;
  menuPosition: number = 164;
  totalCount: any;
  @HostListener('window:scroll', ['$event'])
 handleScroll(){
    const windowScroll = window.pageYOffset;
    console.log(windowScroll)
    if(windowScroll >= this.menuPosition){
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    }
  constructor(private ApiService: ApiService,private appConfig: AppConfigService,private _loading: LoadingService,  private sendData: SentDataToOtherComp, ) { 
     this.selectDriveName = sessionStorage.getItem('schedulename');
    //  this.subscription = this.sendData.getMessage().subscribe(message => {
    //   this.sticky = message;
    // });
  }

  ngOnInit(): void {
    this.getPersonalInfo();
    this.isaccess = this.appConfig.isComingFromMicroCert();
   
  }

  ngOnChanges() {
    this.getPersonalInfo();
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
    // this.getDriveUser(this.driveselectedValue, this.personalInfo.email);
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
    this.getDriveUser(this.driveselectedValue, this.getAllReportsData ? this.getAllReportsData?.email : '')
  }

  getDriveUser(drive,email){
    let data = {
      driveName:drive,
      email:  email ? email : ''

    }
    this.ApiService.getDriveBaisedUser(data).subscribe((data:any)=>{
        console.log(data,'res data')
        this.totalCount = data.noOfCandidates;
    })
  }
}