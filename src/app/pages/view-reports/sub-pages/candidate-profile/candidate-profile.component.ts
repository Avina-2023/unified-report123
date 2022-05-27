import { Component, OnInit, Input, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { AppConfigService } from "src/app/utils/app-config.service";
import { APP_CONSTANTS } from "src/app/utils/app-constants.service";

@Component({
  selector: "app-candidate-profile",
  templateUrl: "./candidate-profile.component.html",
  styleUrls: ["./candidate-profile.component.scss"]
})

export class CandidateProfileComponent implements OnInit {
  
  @Input() getAllReportsData;
  @ViewChild('viewImg', {static: false}) viewImg: TemplateRef<any>;
  selectedURL: any;
  blobkey = environment.blobKey;
  profilePic: any;
  personalInfo: any;
  selectedMail: any;
  totalCount: any;
  driveUserdata = [];
  userCount = 0;
  isaccess: any;
  sticky: boolean = false;
  prevbtn: boolean = false;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private ApiService: ApiService,
    private appConfig: AppConfigService,
    ) { 

  }

  ngOnInit() {
    this.getDocInfo();
    this.getRoute();
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  ngOnChanges() {
    this.getDocInfo();
    this.getPersonalInfo();
  }

  getDocInfo() {
    this.profilePic = this.getAllReportsData && this.getAllReportsData.profileImage ? this.getAllReportsData.profileImage : '/assets/images/NotSpecified.svg';
  }

  profileDialog(group, templateRef: TemplateRef<any>) {
    this.selectedURL = group + this.blobkey;
    this.dialog.open(templateRef, {
      panelClass: 'uploadInProgress',
      // height: '80%',
      // width: '35%',
      disableClose: false 
    });
  }
  openDialog(group, templateRef: TemplateRef<any>) {
    if (group.type && group.type.includes('image/')) {
      this.selectedURL = group['url'] + this.blobkey;
      this.dialog.open(this.viewImg, {
        panelClass: 'uploadInProgress',
        // height: '80%',
        // width: '35%',
        disableClose: false });
    }
  }
  closeDialog() {
    this.dialog.closeAll();
  }

  getPersonalInfo() {
    this.personalInfo = {};
    this.personalInfo.firstname = this.getAllReportsData?.firstname;
    this.personalInfo.mobile = this.getAllReportsData?.mobile;
    this.personalInfo.email = this.getAllReportsData?.email;
    this.personalInfo.qrCodeURL = this.getAllReportsData?.qrCodeURL;
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        this.selectedMail = param.params.id;
          this.getDriveUser();

      }
    });
  }
  getDriveUser() {
    const FilterData = localStorage.getItem('FilterData');
    let requestFilterData = JSON.parse(FilterData);
    this.ApiService.getcandidateList(requestFilterData).subscribe((data: any) => {
      if(data.success){
        this.totalCount = data.total_count;
        this.driveUserdata = data.data;
        this.userCount = this.driveUserdata.findIndex((data:any) => data.email == this.selectedMail);
      }
    });
  }

  
  nextUser() {
    let expectedIndex = this.userCount != -1 ? this.userCount + 1 : null;
    let nextMail = this.driveUserdata[expectedIndex].email;
    this.appConfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS,nextMail);
  }

  prevUser() {
    if (this.userCount != 0) {
      this.userCount = this.driveUserdata.findIndex(
        (data) => data.email == this.selectedMail
      );
      let expectedIndex = this.userCount != -1 ? this.userCount - 1 : null;
      let prevMail = this.driveUserdata[expectedIndex].email;
      this.appConfig.routeNavigationWithParam(
        APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS,
        prevMail
      );
    } else {
      this.prevbtn = true;
    }
  }

  convertIntoINDFormate(count){
    return count.toLocaleString('en-IN')
 }
}
