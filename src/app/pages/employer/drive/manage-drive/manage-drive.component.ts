import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PopUpCellRendererComponent } from './pop-up-cell-renderer/pop-up-cell-renderer.component';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-drive',
  templateUrl: './manage-drive.component.html',
  styleUrls: ['./manage-drive.component.scss'],
})
export class ManageDriveComponent implements OnInit {
  // getdataag: any;
  columnDefs: any = [];
  data: any;
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public masterDetail;
  public rowSelection = 'multiple';
  public columnDefsmini;
  public rowModelType;
  public rowData: any[] | null = [1, 2];
  public gridColumnApi: any;
  public serverSideStoreType;
  public defaultColDef: ColDef;
  rowData1: any;
  cacheBlockSize: any = 10;
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 320,
  };
  public overlayNoRowsTemplate =
  ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';
  lastDatetoApply: string;
  selectedRow: any[];
  manageDriveAgData:any = [];
  pageRowCount = 0;
  paginationPageSize: number;
  driveAgGridSubscription: Subscription;
  blobtoken: string = environment.blobToken;
  pagination: boolean;
  sideBar = {
    toolPanels: [
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
    defaultToolPanel: '',
  };
  drive_cards: any;
  expire_cards: any;
  reject_cards: any;
  pending_cards: any;
  active_cards: any;
  closed_cards: any;
  FormateName: any;

  constructor(
    private ApiService: ApiService,
    private toastr: ToastrService,
    private appconfig: AppConfigService,
    private sendData: SentDataToOtherComp
  ) {
    this.serverSideStoreType = 'partial';
    this.rowModelType = 'serverSide';
    this.defaultColDef = {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      filter: true,
      // enableFilter: true,
      minWidth: 220,
      // sideBar: 'filter',
    };
    this.getManageDriveDashBoard(this.data);
    this.gridOptions = <GridOptions>{
      frameworkComponents: {
        popUpRender: PopUpCellRendererComponent,
      },
    };
  }

  ngOnInit(): void {
    this.tabledata();
    this.autoSizeAll(false);
    this.sendData
    .getMessage()
    .subscribe((data: { data: string; value: any }) => {
      if (data.data == 'grid-refresh') {
        console.log('inside');
        this.refresh();
        this.getManageDriveDashBoard(data);
      }
    });
  }
  arrayofData: any = [];



  refresh() {
    this.gridApi.refreshServerSideStore({ purge: true });
  }


  // Ag Grid Section


  tabledata() {
    this.columnDefs = [
      {
        headerName: 'S.No',
        field: 'id',
        minWidth: 85,
        suppressColumnsToolPanel: true,
        filter: false,
        cellRenderer: function (params) {
          return params.rowIndex + 1;
        },
        sortable: false,
      },
      {
        headerName: '',
        field: 'companyLogo',
        width: 55,
        sortable: false,
        minWidth: 100,
        suppressColumnsToolPanel: true,
        filter: false,
        cellRenderer: function (params) {
          let val = encodeURI(params.value);
          return `<img width="30px" height"22px" src=${val}>`;
        },
      },
      { headerName: 'Company Name', field: 'company', minWidth: 175,
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
      tooltipField: 'company',
     },
      { headerName: 'Drive No.', field: 'jobId', minWidth: 120,
      filter: 'agTextColumnFilter',
      chartDataType: 'category',
      aggFunc: 'sum',
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['contains']
      },
      // cellRenderer: (params) => {
      //   if (params.value && params.value != undefined && params.value != null && params.value !="") {
      //     this.FormateName = params.value;
      //     return this.titleCase(this.FormateName);
      //   } else {
      //     return "-";
      //   }
      // },
      tooltipField: 'jobId',
    },
      { headerName: 'Job Title', field: 'jobTitle', minWidth: 180,
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
      tooltipField: 'jobTitle',
    }, {
        headerName: 'Candidates Applied',
        field: 'candidatesAppliedCount',
        minWidth: 180,
        cellStyle: { textAlign: 'center' },
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            return params.value;
          } else {
            return 0;
          }
        },
        tooltipField: 'candidatesAppliedCount',
      },
      {
        headerName: 'Offer Released',
        field: 'offerReleased',
        minWidth: 150,
        cellStyle: { textAlign: 'center' },
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            return params.value;
          } else {
            return 0;
          }
        },
        tooltipField: 'offerReleased',
      },
      {
        headerName: 'Last Date to Apply',
        field: 'lastDatetoApply',
        minWidth: 180,
        filter: 'agDateColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'greaterThan', 'inRange'],
        },
        valueFormatter: function (params) {
          return moment(params.value).format('MMM D, yy');
      },
        // cellRenderer: (params) => {
        //   if (params.value && params.value != undefined && params.value != null && params.value !="") {
        //     this.FormateName = params.value;
        //     return this.titleCase(this.FormateName);
        //   } else {
        //     return "-";
        //   }
        // },
        // tooltipField: 'lastDatetoApply',

      },
      // {
      //   headerName: 'Status',
      //   field: 'status',
      //   minWidth: 120,
      //   // filter: false,
      //   filter: 'agTextColumnFilter',
      //   chartDataType: 'category',
      //   aggFunc: 'sum',
      //   filterParams: {
      //     suppressAndOrCondition: true,
      //     filterOptions: ['contains']
      //   },
      //   cellStyle: { textAlign: 'center' },
      //   cellRenderer: function (params) {
      //     if (params.value === 'Active') {
      //       return '<div class="status-button"><button mat-button disabled class="active-button">Active</button></div>';
      //     }
      //     if (params.value === 'Pending') {
      //       return '<div class="status-button"><button mat-button disabled class="pending-button">Pending</button></div>';
      //     }
      //     if (params.value === 'Expired') {
      //       return '<div class="status-button"><button mat-button disabled class="expired-button">Expired</button></div>';
      //     }
      //     if (params.value === 'Closed') {
      //       return '<div class="status-button"><button mat-button disabled class="closed-button">Closed</button></div>';
      //     }
      //     if (params.value === 'Rejected') {
      //       return '<div class="status-button"><button mat-button disabled class="rejected-button">Rejected</button></div>';
      //     }
      //   },

      // },


      {
        headerName: 'Status',
        field: 'approveStatus',
        minWidth: 120,
        // filter: false,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellStyle: { textAlign: 'center' },
        cellRenderer: function (params) {
          if (params.value === 'approved') {
            return '<div class="status-button"><button mat-button disabled class="active-button">Active</button></div>';
          }
          if (params.value === 'pending') {
            return '<div class="status-button"><button mat-button disabled class="pending-button">Pending</button></div>';
          }
          if (params.value === 'expired') {
            return '<div class="status-button"><button mat-button disabled class="expired-button">Expired</button></div>';
          }
          if (params.value === 'closed') {
            return '<div class="status-button"><button mat-button disabled class="closed-button">Closed</button></div>';
          }
          if (params.value === 'rejected') {
            return '<div class="status-button"><button mat-button disabled class="rejected-button">Rejected</button></div>';
          }
        },

      },


      {
        headerName: '',
        field: 'action',
        cellRenderer: 'popUpRender',
        maxWidth: 80,
        suppressColumnsToolPanel: true,
        filter: false,
      },
    ];

  }

  async onSelectionChanged(event) {
    var rowData = event.api.getSelectedNodes();
    var ids = [];
    await rowData.forEach((elem) => {
      ids.push(elem.data._id);
    });
    this.selectedRow = ids;
  }
  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var datasource = this.getAggridJoblist();
    params.api.setServerSideDatasource(datasource);
  }

  getAggridJoblist(){
    // debugger;
    return {
      getRows: (params) => {
        let apiData: any = params;
        apiData.request.filterModel['jobCategoryId'] = {
          filterType: 'text',
          type: "contains",
          filter :"64cc8ce4112e2bb777bcbef5"
        };
        this.driveAgGridSubscription = this.ApiService.getAGgridData(
          apiData.request
        ).subscribe(
          (data1: any) => {

            if (data1.success == false) {
              params.fail();
              params.success({
                rowData: [],
                rowCount: 0,
              });
              this.gridApi.showNoRowsOverlay();
            }
            else {
              this.manageDriveAgData = data1 && data1.data ? data1.data : [];
              if (this.manageDriveAgData.length > 0) {
                this.pageRowCount =
                  data1 && data1.totalCount.count ? data1.totalCount.count : 0;
                this.gridApi.hideOverlay();
                params.success({
                  rowData: this.manageDriveAgData,
                  rowCount: this.pageRowCount,
                });
                // this.gridApi.selectAllFiltered();
                // this.gridApi.selectAll();
              } else {
                params.success({
                  rowData: this.manageDriveAgData,
                  rowCount: 0,
                });
                this.gridApi.showNoRowsOverlay();
              }
            }
          },
          (err) => {
            params.fail();
            params.success({
              rowData:  this.manageDriveAgData,
              rowCount: this.pageRowCount
            });
          }
        );
        this.gridApi.hideOverlay();
        // this.gridApi.showNoRowsOverlay();
      },
    };
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    if (this.gridColumnApi && this.gridColumnApi.getAllColumns != undefined && this.gridColumnApi.getAllColumns().length) {
      this.gridColumnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    }
  }

  //   let data = '';
  //   this.ApiService.getAGgridData(data).subscribe((response: any) => {
  //     if (response.success) {
  //       this.getdataag = response.data;
  //     } else {
  //       alert('failed');
  //     }
  //     // console.log(this.getdataag,'aggrid');
  //   });
  // }
  //   getAggridJoblist(){
  //     return {
  //       getRows: (params) => {
  //         let apiData: any = params;
  //         this.driveAggridDataSubscription = this.ApiService.getAGgridData(apiData.request).subscribe((data1: any) => {
  //           console.log('',data1);

  //           if (data1.success == false) {
  //             params.fail();
  //             params.success({
  //               rowData: [],
  //               rowCount: 0,
  //         });
  //         this.gridApi.showNoRowsOverlay();
  //       }else {
  // this.manageDriveAgData = data1 && data1.data ? data1.data : [];
  // if (this.manageDriveAgData.length > 0) {
  //   this.pageRowCount = data1 && data1.data.length ? data1.data.length : 0;
  //   this.gridApi.hideOverlay();
  //   params.success({
  //     rowData: this.manageDriveAgData,
  //     rowCount: this.pageRowCount
  //   });
  //   this.gridApi.selectAllFiltered()
  //   this.gridApi.selectAll();
  // } else {
  //   params.success({
  //     rowData: this.manageDriveAgData,
  //     rowCount: 0
  //   });
  //   this.gridApi.showNoRowsOverlay();
  // }
  // }
  // },(err) => {
  //   params.fail();
  //   params.success({
  //     rowData: [],
  //     rowCount: 0,
  //   });
  // });
  //   this.gridApi.hideOverlay();
  //   this.gridApi.showNoRowsOverlay();
  // }
  //   }
  // }

  /*getManageDriveDashBoard(data: any) {
    this.ApiService.getDriveCardData(data).subscribe(
      (driveCardData: any) => {
        if (driveCardData.success == false) {
          this.toastr.warning('Connection failed, Please try again.');
        } else {
          console.log(driveCardData, 'drivedatacount');
          this.drive_cards = driveCardData.totalCount.count;
          this.active_cards = driveCardData.totalCount.activeCount;
          this.expire_cards = driveCardData.totalCount.expireCount;
          this.reject_cards = driveCardData.totalCount.rejectCount;
          this.pending_cards = driveCardData.totalCount.pendingCount;
          this.closed_cards = driveCardData.totalCount.closedCount;
        }
      },
      (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      }
    );
  }*/


  getManageDriveDashBoard(data: any) {
    let requestData = {
      filterModel: {
        jobCategoryId: {
          filterType: 'text',
          type: 'contains',
          filter: '64cc8ce4112e2bb777bcbef5'
        }
      }
    };
    this.ApiService.getDriveCardData(requestData).subscribe(
      (driveCardData: any) => {
        if (driveCardData.success == false) {
          this.toastr.warning('Connection failed, Please try again.');
        } else {
          console.log(driveCardData, 'drivedatacount');
          this.drive_cards = driveCardData.totalCount.count;
          this.active_cards = driveCardData.totalCount.activeCount;
          this.expire_cards = driveCardData.totalCount.expireCount;
          this.reject_cards = driveCardData.totalCount.rejectCount;
          this.pending_cards = driveCardData.totalCount.pendingCount;
          this.closed_cards = driveCardData.totalCount.closedCount;
        }
      },
      (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      }
    );
  }




}
