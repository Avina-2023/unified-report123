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
import { ActionButtonViewJobsComponent } from './action-button-viewJobs/action-button-viewJobs.component';


interface Tab {
  title: string;
  items: string[];
}
@Component({ 
  selector: 'app-view-jobs', 
  templateUrl: './view-jobs.component.html', 
  styleUrls: ['./view-jobs.component.scss'] 
})
export class ViewJobsComponent implements OnInit {

  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public defaultColDef: ColDef;
  public gridColumnApi;
  public rowModelType;
  public rowSelection = 'multiple';
  public serverSideStoreType;
  pagination: boolean;
  paginationPageSize: number;
  public masterDetail;
  cacheBlockSize: any = 10;


  dynclass: string = 'navyblue';
  active: number = 0;
  icncolor: string = '#1B4E9B';
  tabs: any = [
    { title: 'All' },
    { title: 'Approved' },
    { title: 'Pending' },
    { title: 'Rejected' },
  ];
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
  partnerListAgData:  any = [];
  pageRowCount = 0;
  public rowData: any[] | null = [];
  totalPartnerCount: number;
  columnDefs: any = [];
  FormateName: any;
  FormateLastName: any;
  partnerList: any = [];
  dataSource = new MatTableDataSource<any>([]);
  emptyData = new MatTableDataSource([{ empty: 'row' }]);

  constructor(
    private ApiService: ApiService,
    private toastr: ToastrService,
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
      frameworkComponents: {
        moreOptions: ActionButtonViewJobsComponent,
      },
    };
   }

  ngOnInit() {
    this.tabledata();
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
      // {
      //   headerName: 'Actions',
      //   field: '',
      //   minWidth: 150,
      //   cellRenderer: 'moreOptions',
      //   //  onCellClicked: this.sendJobData(),
      //   suppressColumnsToolPanel: true,
      //   filter: false,
      //   pinned: 'right',
      // },
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
              // console.log('data not found');
            } else {
              this.partnerListAgData = data1 && data1.data ? data1.data : [];
              // console.log('data found');
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

  onTabChange(index: number) {
    const pall = ['navyblue', 'green', 'lightblue', 'red'];
    const icn = ['#1B4E9B', '#49AE31', '#27BBEE', '#EF2917'];
    console.log('Selected tab index:' + index);
    this.dynclass = pall[index];
    this.icncolor = icn[index];
    this.active = index;
    console.log(index, 'MYINDEX VALUE');
    let statusmodel = { 
      jobStatus: {
        filterType: 'text',
        type: 'contains',
        filter: '',
      },
    };
    // if (index == 0) {
    //   statusmodel.jobStatus.filter = 'All';
    // }else
    if (index == 1) {
      statusmodel.jobStatus.filter = 'Approved';
    } else if (index == 2) {
      statusmodel.jobStatus.filter = 'Pending';
    } else if (index == 3) {
      statusmodel.jobStatus.filter = 'Rejected';
    } 
    // else if (index == 4) {
    //   statusmodel.jobStatus.filter = 'Shortlisted';
    // }
    this.gridApi.setFilterModel(statusmodel);
  }

}
