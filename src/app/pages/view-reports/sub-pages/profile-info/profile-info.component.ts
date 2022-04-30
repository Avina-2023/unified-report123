import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingService } from 'src/app/services/loading.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from '../../../../services/api.service';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  @Output() driveName: EventEmitter<any> = new EventEmitter<any>();
  @Output() driveUserEmail: EventEmitter<any> = new EventEmitter<any>();
  driveUserdata = [];
  personalInfo: any;
  driveselectedValue: any;
  driveList: any;
  driveListMain:any
  isaccess: any;
  selectDriveName: string;
  selectScheduleName:string;
  sticky: boolean = false;
  subscription: Subscription;
  menuPosition: number = 164;
  totalCount: any;
  driveUser: any;
  selectedMail: any;
  userCount = 1;
  prevbtn: boolean = false;
  orgdetails: any;
  orgId: any;
  scheduleType: any;
  rowIndex:any;
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private appConfig: AppConfigService,
    private _loading: LoadingService,
  ) {
  }

  ngOnInit(): void {
    this.getPersonalInfo();
    this.orgdetails = JSON.parse(this.appConfig.getLocalStorage('role'));
    this.orgId = this.orgdetails[0].orgId;
    this.isaccess = this.appConfig.isComingFromMicroCert();
    this.getRoute();
  

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
    this.driveListMain =  this.getAllReportsData?.driveDetails ? this.getUniqueListBy(this.getAllReportsData?.driveDetails,'main_drivename')  : ''                
    this.driveList = this.getAllReportsData?.driveDetails ? this.getUniqueListBy(this.getAllReportsData?.driveDetails,'drivename')  : '' 
    this.driveselectedValue = this.driveList && this.driveList[0] ? this.driveList[0].drivename : '';
    this.selectDriveName = this.driveList &&  this.driveList[0] ? this.driveList[0].main_drivename :  this.getAllReportsData && this.getAllReportsData?.BehavioralAssessment ?   this.getAllReportsData?.BehavioralAssessment[0]?.main_drivename : '';
    this.scheduleType = this.getAllReportsData && this.getAllReportsData?.BehavioralAssessment ?  this.getAllReportsData?.BehavioralAssessment[0]?.testtype : '' ;
    this.selectScheduleName = this.getAllReportsData && this.getAllReportsData?.BehavioralAssessment ? this.getAllReportsData?.BehavioralAssessment[0]?.drivename : '';
    this.emitdriveNametoParent();
    if(this.driveList){
      this.getDriveUser(this.driveList && this.driveList[0].main_drivename ? this.driveList[0].main_drivename : this.selectScheduleName ,this.selectedMail ? this.selectedMail : '');
    }

    this.personalInfo = {};
    this.personalInfo.firstname = this.getAllReportsData?.firstname;
    this.personalInfo.lastname = this.getAllReportsData?.lastname;
    this.personalInfo.DOB = this.getAllReportsData?.DOB;
    this.personalInfo.fathername = this.getAllReportsData?.fathername;
    this.personalInfo.mobile = this.getAllReportsData?.mobile;
    this.personalInfo.gender = this.getAllReportsData?.gender;
    this.personalInfo.email = this.getAllReportsData?.email;
    this.personalInfo.qrCodeURL = this.getAllReportsData?.qrCodeURL;
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

  driveChange(e) {
    this._loading.setLoading(true, 'loader');
    setTimeout(() => {
      this._loading.setLoading(false, 'loader');
    }, 300);
    this.driveselectedValue = e.value;
    // this.getDriveUser(this.driveselectedValue,this.selectedMail ? this.selectedMail : '');
    this.emitdriveNametoParent();
  }

  emitdriveNametoParent() {
    this.driveName.emit(this.driveselectedValue);
  }

  getDriveUser(drive, email) {
    let data;
    if(this.orgdetails && this.orgdetails.roles && this.orgdetails.roles[0].roleCode == 'OADM'){
      data = {
        driveName: drive ? drive : this.driveselectedValue,
        email: email ? email : '',
        orgId: this.orgId ? this.orgId : '',
      };
    }else{
      data = {
        driveName: drive ? drive : this.driveselectedValue,
        email: email ? email : '',
      };
    }
    this.ApiService.getDriveBaisedUser(data).subscribe((data: any) => {
      if(data.success){
        this.totalCount = data.noOfCandidates;
        this.driveUserdata = data.data;
        this.driveUserdata =   this.getUniqueListBy(this.driveUserdata,'email')
      }else{
          
      }

    });
  }

  // getting Unique list of mail to perform next and prve
      getUniqueListBy(arr, key) {
          return [...new Map(arr.map(item => [item[key], item])).values()]
      }

  nextUser() {
    this.userCount = this.userCount + 1;
    let index = this.driveUserdata.findIndex((data) => data.email == this.selectedMail);
    let expectedIndex = index != -1 ? index + 1 : null;
    let nextMail = this.driveUserdata[expectedIndex].email;
    this.appConfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS,nextMail);
  }

  prevUser() {
    if (this.userCount != 1) {
      this.userCount = this.userCount - 1;
      let index = this.driveUserdata.findIndex(
        (data) => data.email == this.selectedMail
      );
      let expectedIndex = index != -1 ? index - 1 : null;
      let prevMail = this.driveUserdata[expectedIndex].email;
      this.appConfig.routeNavigationWithParam(
        APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS,
        prevMail
      );
    } else {
      this.prevbtn = true;
    }
  }
}
