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
import { Subscription } from 'rxjs';
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
  activePartnerCount= 0;
  inActivePartnerCount=0;
  pendingCount=0;
  searchData: string = '';
  fromDate: Date;
  toDate: Date;
  totalPages: number = 1;
  //aggrid
  data:any;
  // rowData: any;

  columnDefs: any = [];
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public rowModelType;
  public gridColumnApi;
  public serverSideStoreType;
  public defaultColDef: ColDef;
  public columnDefsmini;
  selectedRow: any[];
  public masterDetail;
  public rowSelection = 'multiple';
  cacheBlockSize: any = 10;
  // partnerlistdata: any;
  public rowData: any[] | null = [];
  paginationPageSize: number;
  partnerListAgGridSubscription: Subscription;
  partnerListAgData:  any = [];
  pageRowCount = 0;
  pagination: boolean;
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 320,
  };
  public overlayNoRowsTemplate =
  ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';
  sideBar = {

    toolPanels: [

    {id: 'filters',

    labelDefault: 'Filters',

    labelKey: 'filters',

    iconKey: 'filter',

    toolPanel: 'agFiltersToolPanel',

    }

    ], defaultToolPanel: ''

  };
  partnerListStatusData: any;
  FormateName: any;
  // defaultColDef: {
  //   // editable: true,
  //   sortable: boolean; resizable: boolean; filter: boolean; flex: number; minWidth: number;
  // };
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
    // this.getAGgrid();

 this.ApiService.partnersubject.subscribe((result:boolean) =>{
  if (result){
    this.getAGgrid();
    //
    this.gridApi.paginationGoToFirstPage();
    this.gridApi.refreshServerSideStore({ purge: true });

    // this.gridApi.paginationGoToCurrentPage();
  }

 })

  }


  arrayofData: any = [];
  // Ag Grid Secction
refresh(){
  this.gridApi.refreshServerSideStore({ purge: true });
}
  tabledata() {
    this.columnDefs = [
      { headerName: 'S.No', field: '_id', minWidth: 85 , filter: false,
    cellRenderer: function(params){
      return params.rowIndex +1;
    },
    sortable: false,
    },
      { headerName: 'Employer Name', field: 'company', minWidth: 170,
      filter: 'agTextColumnFilter',
      chartDataType: 'category',
      aggFunc: 'sum',
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      },
      tooltipField: 'company',
      cellRenderer: (params) => {
        if (params.value && params.value != undefined && params.value != null && params.value !="") {
          this.FormateName = params.value;
          return this.titleCase(this.FormateName);
        } else {
          return "-";
        }
      },

     },

    //   { headerName: '', field: 'companyImgURL', minWidth: 100,
    //    suppressColumnsToolPanel: true,
    //   filter: false,
    //   cellRenderer: function(params){
    //     let val = encodeURI(params.value);
    //     return `<img width="30px" height"22px" src=${val} alt="">`;
    //   }
    // },
      { headerName: 'Industry Type', field: 'industryType', minWidth: 200,
      filter: 'agTextColumnFilter',
      chartDataType: 'category',
      aggFunc: 'sum',
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      },
      cellRenderer: (params) => {
        if (params.value && params.value != undefined && params.value != null && params.value !="") {
          this.FormateName = params.value;
          return this.titleCase(this.FormateName);
        } else {
          return "-";
        }
      },
      tooltipField: 'industryType',
    },
      { headerName: 'SPOC Name', field: 'firstName', minWidth: 170,
      filter: 'agTextColumnFilter',
      chartDataType: 'category',
      aggFunc: 'sum',
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      },
      tooltipField: 'firstName',
    },
      { headerName: 'SPOC Email', field: 'email', minWidth: 250,
      filter: 'agTextColumnFilter',
      chartDataType: 'category',
      aggFunc: 'sum',
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      },
      tooltipField: 'email',
      cellRenderer: (params) => {
        if (params.value && params.value != undefined && params.value != null && params.value !="") {
          this.FormateName = params.value;
          return this.titleCase(this.FormateName);
        } else {
          return "-";
        }
      },
     },
      { headerName: 'Created Date', field: 'createdAt', minWidth: 150,
      maxWidth: 170,

      valueFormatter: function (params) {
          return moment(params.value).format('MMM D, yy');
      },

      //   return moment(data.value).format('L');
      // },
    // cellRenderer: (data)=>{
    //   return moment(data.createdAt).format('MM/DD/YYYY HH:mm')
    // },
    filter: 'agDateColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'greaterThan', 'inRange'],
        },
        // tooltipField: 'createdAt',
    },
      { headerName: 'Status',
      field: 'isActive',
      minWidth: 100 ,
      filter: false,

      cellRenderer: (data: any) => {
      //  debugger;

          if (data.value == false ) {
            if (data.data.isApproved == false){
              return  '<div class="status-button"><button mat-button disabled class="pending-button">Pending</button></div>';
            } else {
              return'<div class="status-button"><button mat-button disabled class="inactive-button">Inactive</button></div>';
            }
          } else if (data.value == true ) {
            return'<div class="status-button"><button mat-button disabled class="active-button">Active</button></div>';
          }
         else {
          return '';}
    }

    },
      { headerName: '', field: '', minWidth: 75 ,
      cellRenderer: 'moreOptions',
      suppressColumnsToolPanel: true,
      filter: false,
    }
    ];
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.pagination = true;
    this.paginationPageSize = 10;
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 190,
      // enableFilter: true,
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var datasource = this.getAGgrid();
    params.api.setServerSideDatasource(datasource);
  }
  // getAGgrid() {
  //   let data = '';
  //   this.ApiService.getAGgridPatnerList(data).subscribe((Response: any) => {
  //     if (Response.success) {
  //       this.partnerlistdata = Response.data;
  //     } else {
  //       alert('failed');
  //     }
  //   });
  // }
  getAGgrid(){
    return {
      getRows: (params) => {
        let apiData: any = params;
       apiData.request.filterModel["createdBy"]= { filterType: 'nin', values: ['UapAdmin'] };
       var isApproved =
       this.status == 'active' ? true : this.status == 'inActive' ? false : '-';
     if (this.status == 'pending') {
      apiData.request.filterModel["isApproved"] ={
        filterType: 'set',
        values: [false],
      }
      apiData.request.filterModel["isActive"] ={
        filterType: 'set',
        values: [false],
      }
     } else if (isApproved != '-') {
      apiData.request.filterModel["isApproved"] ={
        filterType: 'set',
        values: [true],
      }
      apiData.request.filterModel["isActive"] ={
        filterType: 'set',
        values: [isApproved],
      }
    }else{
      delete apiData.request.filterModel["isApproved"]
     delete apiData.request.filterModel["isActive"]
    }
        this.partnerListAgGridSubscription = this.ApiService.getAGgridPatnerList(apiData.request).subscribe((data1: any) => {
          // console.log(data1);

          if (data1.success == false) {
            params.fail();
            params.success({
              rowData: [],
              rowCount: 0,
        });
        this.gridApi.showNoRowsOverlay();
      }else {
this.partnerListAgData = data1 && data1.data ? data1.data : [];
if (this.partnerListAgData.length > 0) {
  this.pageRowCount = data1 && data1.totalCount ? data1.totalCount : 0;
  this.gridApi.hideOverlay();
  params.success({
    rowData: this.partnerListAgData,
    rowCount: this.pageRowCount
  });

  // this.gridApi.selectAllFiltered()
  // this.gridApi.selectAll();
} else {
  params.success({
    rowData: this.partnerListAgData,
    rowCount: 0
  });
  this.gridApi.showNoRowsOverlay();
}
}
},(err) => {
  params.fail();
  params.success({
    rowData: [],
    rowCount: 0,
  });
});
  this.gridApi.hideOverlay();
  // this.gridApi.showNoRowsOverlay();
}

  }
}

titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
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
          this.activePartnerCount = partnerListDash.data.activeCount;
          this.inActivePartnerCount = partnerListDash.data.inActiveCount;
          this.pendingCount = partnerListDash.data.pendingCount;
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


          // partnerList.data.forEach((element, index) => {
          //   element.sno = index + 1;
          // });
          // this.dataSource.data = partnerList.data;
          // this.totalPartnerCount = partnerList.totalCount;
          // this.totalPages = Math.ceil(this.totalPartnerCount / 5);
          // this.dataSource.paginator = this.paginator;
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
