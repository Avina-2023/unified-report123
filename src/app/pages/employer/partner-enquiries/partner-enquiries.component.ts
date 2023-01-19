import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';
import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { Subscription } from 'rxjs';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import * as moment from 'moment';

@Component({
  selector: 'app-partner-enquiries',
  templateUrl: './partner-enquiries.component.html',
  styleUrls: ['./partner-enquiries.component.scss'],
})
export class PartnerEnquiriesComponent implements OnInit {

  columnDefs: any = [];
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public rowModelType;
  public gridColumnApi;
  public serverSideStoreType;
  public defaultColDef: ColDef;
  // public columnDefsmini;
  selectedRow: any[];
  public masterDetail;
  public rowSelection = 'multiple';
  cacheBlockSize: any = 10;
  public rowData: any[] | null = [];
  paginationPageSize: number;
  partnerListAgGridSubscription: Subscription;
  partnerListAgData:  any = [];
  pageRowCount = 0;
  pagination: boolean;

  FormateName: any;
  FormateLastName: any;
  partnerList: any = [];

  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 320,
  };
  public overlayNoRowsTemplate =
  ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';
  partnerEnquirieAgGridSubscription: Subscription;
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  displayedColumns: string[] = [
    'sno',
    'name',
    'designation',
    'company',
    'email',
    'mobile',
    'registeredDate',
  ];
  dataSource = new MatTableDataSource<any>([]);
  emptyData = new MatTableDataSource([{ empty: 'row' }]);

  totalPartnerCount: number;
  searchData: string = '';
  constructor(
    private ApiService: ApiService,

    private toastr: ToastrService,
    private appconfig: AppConfigService,
    private sendData: SentDataToOtherComp
  ) {

  }

  ngOnInit(): void {
    this.tabledata();
    // this.autoSizeAll(false);
    // var data = {"filterModel":{"createdBy":{"filterType":"set","values":["UapAdmin"]}}}
    // this.fetchData(data);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchList() {
    if (this.searchData != '') {
      var val = this.searchData.toLowerCase();
      var filter = { $regex: val, $options: 'i' };
      var data = {
        filterModel: {
          $or: {
            filterType: 'or',
            values: [{ company: filter }, { designation: filter }],
          },
          createdBy: { filterType: 'set', values: ['UapAdmin'] },
        },
      };
      this.fetchData(data);
    } else {
      this.toastr.warning('No data found');
    }
  }

  clearSearch() {
    this.searchData = '';
    var data = {
      filterModel: { createdBy: { filterType: 'set', values: ['UapAdmin'] } },
    };
    this.fetchData(data);
  }

  tabledata() {
    this.columnDefs = [
      {
        headerName: 'S.No',
        field: '_id',
        minWidth: 85,
        suppressColumnsToolPanel: true,
        filter: false,
        cellRenderer: function (params) {
          return params.rowIndex + 1;
        },
        sortable: false,
      },
      {
        headerName: 'Name',
        field: 'firstName',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        // cellRenderer: (params) => {
        //   if (params.value && params.value != undefined && params.value != null && params.value != "" && params.data.lastName != undefined && params.data.lastName !=  "") {
        //     this.FormateName = params.value + params.data.lastName   ;
        //     return this.FormateName;
        //   } else
        //   if(params.value && params.value != undefined && params.value != null && params.value != "" && params.data.lastName == undefined || params.data.lastName == "" ){
        //     this.FormateName = params.value;
        //     return this.FormateName;
        //   }
        //   {
        //     return "-";
        //   }
        // },
        cellRenderer: (params) => {
          if (
            params.value &&
            params.value != undefined &&
            params.value != null &&
            params.value != ''
          ) {
            this.FormateName = params.value;
            if (
              params.data.lastName != undefined &&
              params.data.lastName != ''
            ) {
              this.FormateLastName = params.data.lastName;
              return this.FormateName + this.FormateLastName;
            } else {
              return this.FormateName;
            }
          } else {
            return '-';
          }
        },
        tooltipField: 'firstName',
      },
      {
        headerName: 'Designation',
        field: 'designation',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellRenderer: (params) => {
          if (
            params.value &&
            params.value != undefined &&
            params.value != null &&
            params.value != ''
          ) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return '-';
          }
        },
        tooltipField: 'designation',
      },
      {
        headerName: 'Company',
        field: 'company',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellRenderer: (params) => {
          if (
            params.value &&
            params.value != undefined &&
            params.value != null &&
            params.value != ''
          ) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return '-';
          }
        },
        tooltipField: 'company',
      },
      {
        headerName: 'Email',
        field: 'email',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellRenderer: (params) => {
          if (
            params.value &&
            params.value != undefined &&
            params.value != null &&
            params.value != ''
          ) {
            this.FormateName = params.value;
            return this.FormateName;
          } else {
            return '-';
          }
        },
        tooltipField: 'email',
      },
      {
        headerName: 'Mobile',
        field: 'mobile',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellRenderer: (params) => {
          if (
            params.value &&
            params.value != undefined &&
            params.value != null &&
            params.value != ''
          ) {
            this.FormateName = params.value;
            return this.FormateName;
          } else {
            return '-';
          }
        },
        tooltipField: 'mobile',
      },
      {
        headerName: 'Registered Date',
        field: 'createdAt',
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
      },
    ];
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.pagination = true;
    this.paginationPageSize = 10;
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
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
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
        console.log(params,'hii');
        let apiData: any = params;
        apiData.request.filterModel['createdBy'] = {
          filterType: 'set',
          values: ['UapAdmin'],
        };
        apiData.request.type = "partnerEnquiries";
        this.partnerEnquirieAgGridSubscription = this.ApiService.partnerList(
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
            } else {
              this.partnerListAgData = data1 && data1.data ? data1.data : [];
              if (this.partnerListAgData.length > 0) {
                this.pageRowCount =
                  data1 && data1.totalCount ? data1.totalCount : 0;
                this.gridApi.hideOverlay();
                params.success({
                  rowData: this.partnerListAgData,
                  rowCount: this.pageRowCount,
                });
              } else {
                params.success({
                  rowData: this.partnerListAgData,
                  rowCount: 0,
                });
                this.gridApi.showNoRowsOverlay();
              }
            }
          },
          (err) => {
            params.fail();
            params.success({
              rowData: [],
              rowCount: 0,
            });
          }
        );
        this.gridApi.hideOverlay();
      },
    };
  }
  fetchData(data: any) {
    data.type = 'partnerEnquiries';
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
        }
      },
      (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      }
    );
  }
}
