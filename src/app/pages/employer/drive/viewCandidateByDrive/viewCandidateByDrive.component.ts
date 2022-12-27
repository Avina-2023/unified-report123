import { Component, OnInit } from '@angular/core';
import { NONE_TYPE } from '@angular/compiler';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
@Component({
  selector: 'app-viewCandidateByDrive',
  templateUrl: './viewCandidateByDrive.component.html',
  styleUrls: ['./viewCandidateByDrive.component.scss']
})
export class ViewCandidateByDriveComponent implements OnInit {

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
  jobId: String = "";
  subscription: Subscription;
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
  candidateList: any = [];
  pageRowCount = 0;
  paginationPageSize: number;
  driveAgGridSubscription: Subscription;
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
    this.jobId = this.appconfig.getLocalStorage('currentJobID')
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

  }

  ngOnInit(): void {
    this.tabledata();
    this.autoSizeAll(false);
  }


  ngOnDestroy() {
    this.appconfig.clearLocalStorageOne('currentJobID')
  }
  arrayofData: any = [];

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
        headerName: 'Email', field: 'email', minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            this.FormateName = params.value;
            return this.FormateName;
          } else {
            return "-";
          }
        },
        tooltipField: 'email',
      },
      {
        headerName: 'Student Name', field: 'studentName', minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return "-";
          }
        },
        tooltipField: 'studentName',
      },
      {
        headerName: 'Degree', field: 'degree', minWidth: 120,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            return params.value;
          } else {
            return "-";
          }
        },
        tooltipField: 'degree',
      },
      {
        headerName: 'Department', field: 'department', minWidth: 180,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return "-";
          }
        },
        tooltipField: 'department',
      }, {
        headerName: 'Mobile', field: 'mobile', minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if (params.value && params.value != undefined && params.value != null && params.value != "") {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return "-";
          }
        },
        tooltipField: 'mobile',
      },
      {
        headerName: 'Year Of Passing',
        field: 'yearOfPassing',
        minWidth: 180,
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
            return "-";
          }
        },
        tooltipField: 'yearOfPassing',

      }, {
        headerName: 'Percentage',
        field: 'percentage',
        minWidth: 180,
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
        tooltipField: 'percentage',

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

  getAggridJoblist() {
    // debugger;
    return {
      getRows: (params) => {
        let apiData: any = params;
        apiData.request.jobId = this.jobId;
        this.driveAgGridSubscription = this.ApiService.getCandidateListByDeive(
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
              this.candidateList = data1 && data1.data ? data1.data : [];
              if (this.candidateList.length > 0) {
                this.pageRowCount =
                  data1 && data1.totalCount ? data1.totalCount : 0;
                this.gridApi.hideOverlay();
                params.success({
                  rowData: this.candidateList,
                  rowCount: this.pageRowCount,
                });
              } else {
                params.success({
                  rowData: this.candidateList,
                  rowCount: 0,
                });
                this.gridApi.showNoRowsOverlay();
              }
            }
          },
          (err) => {
            params.fail();
            params.success({
              rowData: this.candidateList,
              rowCount: this.pageRowCount
            });
          }
        );
        this.gridApi.hideOverlay();
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


}
