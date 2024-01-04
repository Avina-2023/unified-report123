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
  
  REQUESTS = [
    {sno: '01', employerName: 'HR Name_1', designation: 'HR' , email: 'johnsmith@xyz.com', mbNo:' +00 9871237645'},
    {sno: '01', employerName: 'HR Name_1', designation: 'HR' , email: 'johnsmith@xyz.com', mbNo:' +00 9871237645'},
    
  ];
  dataSource = new MatTableDataSource(this.REQUESTS);
  columnsToDisplay = ['sno', 'employerName', 'designation', 'email', 'mbNo', ];
  // @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  // displayedColumns: string[] = [
  //   'sno',
  //   'img',
  //   'employerName',
  //   'industryType',
  //   'spocName',
  //   'spocEmail',
  // ];
  // dataSource = new MatTableDataSource<any>([]);
  // tableEmpty: Boolean = false;
  // emptyData = new MatTableDataSource([{ empty: 'row' }]);
  // toastr: any;
  // ApiService: any;
  data:any;
  status: string;
  getAGgrid: any;
  partnerListAgData: any;
  params:any;
  gridApi: any;
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private ApiService: ApiService ,
    private appconfig: AppConfigService,
  ) { }
  @ViewChild('matDialog', { static: false }) matDialog: TemplateRef<any>;
  MatDialog(){
  
    const dialogRef = this.dialog.open(this.matDialog, {
      width: '2200px',
      height: '545px',
      panelClass: 'matDialog',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  instructionClose() {
    this.dialog.closeAll();
 }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    params.value
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
 
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
}
