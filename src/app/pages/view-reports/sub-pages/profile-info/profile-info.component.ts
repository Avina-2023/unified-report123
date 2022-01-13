import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { multicast } from 'rxjs/operators';
import { AppConfigService } from 'src/app/utils/app-config.service';

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
  constructor(private appConfig: AppConfigService,) { 
     this.selectDriveName = sessionStorage.getItem('schedulename');
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

    this.driveselectedValue = this.selectDriveName ? this.selectDriveName : null;
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
      let city = address.state + ', ' + address.city;
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
    this.driveselectedValue = e.value;
    this.emitdriveNametoParent();
  }

  emitdriveNametoParent() {
    this.driveName.emit(this.driveselectedValue);
  }
}
