import { Component, ContentChild, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { MatTableModule } from '@angular/material/table';
import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss']
})
export class MoreOptionsComponent implements ICellRendererAngularComp {
  
  // REQUESTS = [ 
  //   {sno: '01', employerName: 'HR Name_1', designation: 'HR' , email: 'johnsmith@xyz.com', mbNo:' +00 9871237645'}, 
  //   {sno: '01', employerName: 'HR Name_1', designation: 'HR' , email: 'johnsmith@xyz.com', mbNo:' +00 9871237645'}, 
  // ]; 
  // dataSource = new MatTableDataSource(this.REQUESTS);
  // columnsToDisplay = ['sno', 'employerName', 'designation', 'email', 'mbNo', ];

  hrContactDetails: any[] = []; 
  displayedColumns: string[] = ['hrName', 'hrdesignation', 'hrEmail', 'hrMobilenumber'];
  displayedColumnLabels: string[] = ['Name', 'Designation', 'Email', 'Mobile Number'];

  dataSource: MatTableDataSource<any>;

  headerColumns: string[] = ['serialNumber', ...this.displayedColumns];
  rowColumns: string[] = ['serialNumber', ...this.displayedColumns];

  data:any;
  status: string;
  getAGgrid: any;
  partnerListAgData: any;
  params:any;
  gridApi: any;
  empProfile: any[];
  getAllStates: any;
  Details: any;
  form_domicile_state: any;
  form_present_state: any;
  updatedCitySubscription: any;
  allPresentCityList: any;
  form_present_city: any;
  stateid: any;
  cityId: any;
  countryId: any;
  // dataSource: MatTableDataSource<unknown>;
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ApiService: ApiService ,
    private appconfig: AppConfigService,
  ) { }
  @ViewChild('matDialog', { static: false }) matDialog: TemplateRef<any>;
  MatDialog(){
  
    const dialogRef = this.dialog.open(this.matDialog, {
      maxWidth: '2000px',
      // width: '2200px',
      width: '1300px',
      height: '545px',
      panelClass: 'matDialog',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
    });
    this.empDetails()
  }
  instructionClose() {
    this.dialog.closeAll();
 }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    // console.log(this.params.data, 'params');
    params.value
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.empDetails()
  }

  updateStatus(isActive, isApproved, email, userId, firstName) {
    this.ApiService.updatePartnerStatus({
      isApproved: this.params.data.isApproved,
      isActive: this.params.data.isActive,
      email: this.params.data.email,
      userId: this.params.data.userId
    }).subscribe(
      (partnerList: any) => {
        if (partnerList.success == false) {
          this.toastr.warning('Connection failed, Please try again.');
        } else {
          this.ApiService.partnersubject.next(true)
          this.toastr.success('Status updated Successfully');
        }
      },
      (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      }
    );
  }
  
  updatePartner(email) {
    this.appconfig.routeNavigationWithParam(
      APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER,
      { email: this.ApiService.encrypt(this.params.data.email) }
    );
  }

  empDetails() {
    this.empProfile = [];
    var apiData = {
      "filterModel": {
        "email": {
          "filterType": "set",
          "values": [this.params.data.email]
        }
      }
    }
    this.ApiService.empProfileDetails(apiData).subscribe((result: any) => {
      if (result.success) {
        this.empProfile = result.data[0]
        const hrContactDetailsFromApi = result.data[0].detailedInformation?.hrContactDetails;
        this.dataSource = new MatTableDataSource(hrContactDetailsFromApi);
        //this.getStateAPI(this.empProfile);
        this.stateid = result.data[0].detailedInformation?.state;
        this.cityId = result.data[0].detailedInformation?.district;
        this.countryId = result.data[0].detailedInformation?.country;
        console.log(this.cityId, 'cityid');
        console.log(this.stateid, 'stateid');
        
        
      }
    })
    this.getStateAPI();
    this.getCityName();
  }

  getStateAPI() {
    const countryData = {
      country_id: this.countryId,
    };
    this.ApiService.getallStates().subscribe(
      (countryData: any) => {
        this.getAllStates = countryData[0];
        this.getAllStates.forEach((element) => {
          if (element.id == this.stateid) {
            this.form_present_state = element.name;
            console.log(this.form_present_state, 'statename');
        }
        });
      },
      (err) => { }
    );
  }

  getCityName() {
    const ApiData = {
        state_id: this.stateid,
    };
    this.updatedCitySubscription = this.ApiService.districtList(ApiData).subscribe(
        (datas: any) => {
            this.allPresentCityList = datas.data;
            console.log(this.allPresentCityList, 'citylist');
            this.allPresentCityList?.forEach((element) => {
              if (element.id == this.cityId) {
                  this.form_present_city = element.name;
                  console.log(this.form_present_city, 'cityname');
              }
          });
        },
        (err) => {
            console.log(err);
        }
    );
}

}
