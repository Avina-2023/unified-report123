import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { ColDef, GridApi, ValueGetterParams } from 'ag-grid-community';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';
import { MoreOptionsComponent } from './more-options/more-options.component';
import { E } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss'],
})
export class PartnerListComponent implements OnInit {
  @ViewChild('mynation', { static: false }) paginator: MatPaginator;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  pagesize = 5;
  status = 'all';
  displayedColumns: string[] = [
    'sno',
    'img',
    'employerName',
    'industryType',
    'spocName',
    'spocEmail',
    'createdDate',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  tableEmpty: Boolean = false;
  emptyData = new MatTableDataSource([{ empty: 'row' }]);
  totalPartnerCount: number;
  dashboard_cards: any;

  searchData: string = '';
  fromDate: Date;
  toDate: Date;
  totalPages: number = 1;
  //aggrid
  data:any;
  rowData: any;
  public sideBar = 'filters';
  public gridColumnApi: any;
  columnDefs: any = [];
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public rowModelType;
  public serverSideStoreType;
  selectedRow: any[];
  partnerlistdata: any;
  paginationPageSize: number;
  
  constructor(
    private ApiService: ApiService ,
    private appconfig: AppConfigService,
    private toastr: ToastrService,

  ) 
  {
    var data = {
      filterModel: { createdBy: { filterType: 'nin', values: ['UapAdmin'] } },
    };
   
    this.fetchData(data);
    this.fetchDashboardData();
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
    },
      frameworkComponents: {
        moreOptions: MoreOptionsComponent,
      },
     

    };
  }

  ngOnInit(): void {
   
    this.tabledata();
    this.getAGgrid();
 this.ApiService.partnersubject.subscribe((result:boolean) =>{
  if (result){
    this.getAGgrid()
  }
  
 })
    
  }
  
  
  arrayofData: any = [];
  // Ag Grid Secction

  tabledata() {

    // console.log(this.partnerlistdata);
    this.columnDefs = [
      { headerName: 'S.No', field: '_id', minWidth: 85 ,
    cellRenderer: function(params){
      return params.rowIndex +1;
    }
    },
      { headerName: 'Employer Name', field: 'company', minWidth: 170 },
      { headerName: '', field: 'companyImgURL', minWidth: 50,
      cellRenderer: function(params){
        let val = encodeURI(params.value);
        return `<img width="30px" height"22px" src=${val}>`;
      }
    },
      { headerName: 'Industry Type', field: 'industryType', minWidth: 200 },
      { headerName: 'SPOC Name', field: 'firstName', minWidth: 170 },
      { headerName: 'SPOC Email', field: 'email', minWidth: 250 },
      { headerName: 'Created Date', field: 'createdAt', minWidth: 150,
    cellRenderer: (data)=>{
      return moment(data.createdAt).format('MMM d, y')
    }
    },
      { headerName: 'Status', 
      field: 'isActive',
      minWidth: 100 ,
     
      cellRenderer: (data: any) => {
          if (data.value == false ) {
            if (data.data.isApproved == false){
              return  '<button mat-button disabled class="pending-button">Pending</button>';
            } else {
              return'<button mat-button disabled class="inactive-button">Inactive</button>';
            }
          } else if (data.value == true ) {
            return'<button mat-button disabled class="active-button">Active</button>';
          }
         else {
          return '';}  
    }
    
    },
      { headerName: '', field: '', minWidth: 75 ,
      cellRenderer: 'moreOptions'
    }
    ];
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.paginationPageSize = 10;
    this.defaultColDef = {
      editable: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 190,
    };
  }
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  onGridReady(params: any) {
    this.gridApi = params.api;
    var datasource = this.getAGgrid();
    params.api.setServerSideDatasource(datasource);
  }
  getAGgrid() {
    
    let data = '';
    this.ApiService.getAGgridPatnerList(data).subscribe((Response: any) => {
      if (Response.success) {
        this.partnerlistdata = Response.data;
        
      } else {
        alert('failed');
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  selectStatus() {
    var isApproved =
      this.status == 'active' ? true : this.status == 'inActive' ? false : '-';
    let data: any = {
      filterModel: { createdBy: { filterType: 'nin', values: ['UapAdmin'] } },
    };
    if (this.status == 'pending') {
      data = {
        filterModel: {
          isApproved: {
            filterType: 'set',
            values: [false],
          },
          isActive: {
            filterType: 'set',
            values: [false],
          },
          createdBy: { filterType: 'nin', values: ['UapAdmin'] },
        },
      };
    } else if (isApproved != '-') {
      data = {
        filterModel: {
          isActive: {
            filterType: 'set',
            values: [isApproved],
          },
          isApproved: {
            filterType: 'set',
            values: [true],
          },
          createdBy: { filterType: 'nin', values: ['UapAdmin'] },
        },
      };
    }
    this.fetchData(data);
  }

  fetchDashboardData() {
    this.ApiService.partnerListDashboard().subscribe(
      (partnerListDash: any) => {
        if (partnerListDash.success == false) {
          this.toastr.warning('Connection failed, Please try again.');
        } else {
          this.dashboard_cards = partnerListDash.data;
          // this.activePartnerCount = partnerListDash.data.activeCount;
          // this.inActivePartnerCount = partnerListDash.data.inActiveCount;
          // this.pendingCount = partnerListDash.data.pendingCount;
        }
      },
      (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      }
    );
  }

  fetchData(data: any) {
    this.ApiService.partnerList(data).subscribe(
      (partnerList: any) => {
        if (partnerList.success == false) {
          this.toastr.warning('Connection failed, Please try again.');
        } else {
          partnerList.data.forEach((element, index) => {
            element.sno = index + 1;
          });
          this.dataSource.data = partnerList.data;
          this.totalPartnerCount = partnerList.totalCount;
          this.totalPages = Math.ceil(this.totalPartnerCount / 5);
          this.dataSource.paginator = this.paginator;
          // this.paginator.firstPage();
        }
      },
      (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      }
    );
  }

  // updateStatus(isActive, isApproved, email, userId, firstName) {
  //   this.ApiService.updatePartnerStatus({
  //     isApproved: isApproved,
  //     isActive: isActive,
  //     email: email,
  //     userId: userId,
  //     firstName: firstName,
  //   }).subscribe(
  //     (partnerList: any) => {
  //       if (partnerList.success == false) {
  //         this.toastr.warning('Connection failed, Please try again.');
  //       } else {
  //         this.selectStatus();
  //         this.toastr.success('Status updated Successfully');
  //       }
  //     },
  //     (err) => {
  //       this.toastr.warning('Connection failed, Please try again.');
  //     }
  //   );
  // }

  // updatePartner(email) {
  //   this.appconfig.routeNavigationWithParam(
  //     APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER,
  //     { email: this.ApiService.encrypt(email) }
  //   );
  // }

  searchList() {
    if (
      this.fromDate == undefined &&
      this.toDate == undefined &&
      this.searchData == ''
    ) {
      this.toastr.warning('No data found');
    } else {
      if (this.fromDate == undefined && this.toDate == undefined) {
        this.searchOption();
      } else if (this.fromDate != undefined && this.toDate != undefined) {
        if (this.fromDate <= this.toDate) {
          this.searchOption();
        } else {
          this.toastr.warning(
            'To date must be greater than or equal to from date'
          );
        }
      } else {
        this.toastr.warning('Please enter from and to date');
      }
    }
  }

  clearSearch() {
    this.searchData = '';
    this.fromDate = null;
    this.toDate = null;
    this.selectStatus();
  }

  searchOption() {
    var val = this.searchData.toLowerCase();
    var filter = { $regex: val, $options: 'i' };
    var isApproved =
      this.status == 'active' ? true : this.status == 'inActive' ? false : '-';
    let data: any = {
      filterModel: {
        createdBy: { filterType: 'nin', values: ['UapAdmin'] },
        $or: {
          filterType: 'or',
          values: [{ company: filter }, { industryType: filter }],
        },
      },
    };
    if (this.status == 'pending') {
      data = {
        filterModel: {
          isApproved: {
            filterType: 'set',
            values: [false],
          },
          isActive: {
            filterType: 'set',
            values: [false],
          },
          createdBy: { filterType: 'nin', values: ['UapAdmin'] },
          $or: {
            filterType: 'or',
            values: [{ company: filter }, { industryType: filter }],
          },
        },
      };
    } else if (isApproved != '-') {
      data = {
        filterModel: {
          isActive: {
            filterType: 'set',
            values: [isApproved],
          },
          isApproved: {
            filterType: 'set',
            values: [true],
          },
          createdBy: { filterType: 'nin', values: ['UapAdmin'] },
          $or: {
            filterType: 'or',
            values: [{ company: filter }, { industryType: filter }],
          },
        },
      };
    }
    if (this.fromDate != undefined && this.toDate != undefined) {
      data.filterModel.createdAt = {
        filterType: 'date',
        type: 'inRange',
        dateFrom: this.fromDate,
        dateTo: this.toDate,
      };
    }
    this.fetchData(data);
  }
 
}
