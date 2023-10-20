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
import { log } from 'console';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


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

  approveStatus: any;
  alldata: any;
  pendingcountvalue: any;
  approvecountvalue: any;
  inprogresscountvalue: any;
  rejectedcountvalue: any;
  allcountvalue: any;
  totalPages: number;
  selectedPageSize: number = 10;
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

  pageArray: number[] = [1];
  isPrevButtonDisabled: boolean = false;
  isNextButtonDisabled: boolean = false;
  pageNumberInput: any;



  constructor(
    private ApiService: ApiService,
    private toastr: ToastrService,
    private sendData: SentDataToOtherComp,
    private appconfig: AppConfigService,
    public router: Router,
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
    this.sendData
      .getMessage()
      .subscribe((data: { data: string; value: any }) => {
        if (data.data == 'grid-refresh') {
          console.log('inside');
          this.refresh();
        }
      });
  }

  tabledata() {
    
    this.columnDefs = [
      {
        headerName: 'S.No',
        field: '_id',
        minWidth: 90,
        suppressColumnsToolPanel: true,
        filter: false,
        cellRenderer: function (params) {
          return params.rowIndex + 1;
        },
        sortable: false,
      },
      {
        headerName: 'Company Name',
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
        tooltipField: 'company',
      },
      {
        headerName: 'Job Role',
        field: 'jobRole',
        minWidth: 235,
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
        tooltipField: 'jobRole',
      },
      
      // {
      //   headerName: 'Job Location',
      //   field: 'address',
      //   minWidth: 175,
      //   filter: 'agTextColumnFilter',
      //   chartDataType: 'category',
      //   aggFunc: 'sum',
      //   filterParams: {
      //     suppressAndOrCondition: true,
      //     filterOptions: ['contains'],
      //   },
      //   cellRenderer: (params) => {
      //     if (
      //       params.value &&
      //       params.value != undefined &&
      //       params.value != null &&
      //       params.value != ''
      //     ) {
      //       this.FormateName = params.value;
      //       return this.titleCase(this.FormateName);
      //     } else {
      //       return '-';
      //     }
      //   },
      //   tooltipField: 'address',
      // },

      {
        headerName: 'Job Location',
        field: 'jobLocation',
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
            Array.isArray(params.value) &&
            params.value.length > 0
          ) {
            const locations = params.value.join(', ');
            return this.titleCase(locations);
          } else {
            return '-';
          }
        },
        tooltipField: 'jobLocation',
      }, 

      // {
      //   headerName: 'Degree',
      //   field: 'education',
      //   minWidth: 235,
      //   filter: 'agTextColumnFilter',
      //   chartDataType: 'category',
      //   aggFunc: 'sum',
      //   filterParams: {
      //     suppressAndOrCondition: true,
      //     filterOptions: ['contains'],
      //   },
      //   cellRenderer: (params) => {
      //     if (
      //       params.value &&
      //       params.value != undefined &&
      //       params.value != null &&
      //       params.value != ''
      //     ) {
      //       this.FormateName = params.value;
      //       return this.FormateName;
      //     } else {
      //       return '-';
      //     }
      //   },
      //   tooltipField: 'education',
      // },

      {
        headerName: 'Degree',
        field: 'education',
        minWidth: 200,
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
            Array.isArray(params.value) &&
            params.value.length > 0
          ) {
            const degrees = params.value.join(', ');
            return degrees;
          } else {
            return '-';
          }
        },
        tooltipField: 'education',
      },
      {
        headerName: 'Job Type',
        field: 'jobType',
        minWidth: 135,
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
        tooltipField: 'jobType',
      },

      {
        headerName: 'Year Of Passout',
        field: 'yearofPassout',
        minWidth: 165,
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
            Array.isArray(params.value) &&
            params.value.length > 0
          ) {
            const degrees = params.value.join(', ');
            return degrees;
          } else {
            return '-';
          }
        },
        tooltipField: 'yearofPassout',
      },

      // {
      //   headerName: 'Year Of Passout',
      //   field: 'yearofPassout',
      //   minWidth: 165,
      //   filter: 'agTextColumnFilter',
      //   chartDataType: 'category',
      //   aggFunc: 'sum',
      //   filterParams: {
      //     suppressAndOrCondition: true,
      //     filterOptions: ['contains'],
      //   },
      //   cellRenderer: (params) => {
      //     if (
      //       params.value &&
      //       Array.isArray(params.value) &&
      //       params.value.length > 0
      //     ) {
      //       const years = params.value.join(', ');
      //       return years;
      //     } else if (params.value === null) {
      //       return 'N/A';
      //     } else {
      //       return 'Any Year';
      //     }
      //   },
      //   tooltipField: 'yearofPassout',
      // },

      
      {
        headerName: 'Last Date To Apply',
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
      },
      {
        headerName: 'Status',
        field: 'approveStatus',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellClassRules: {
          'green-cell': (params) => params.value === 'approved',
          'red-cell': (params) => params.value === 'rejected',
          'blue-cell': (params) => params.value === 'pending',
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
        tooltipValueGetter: (params) => {
          if (params.value && params.value !== undefined
            && params.value !== null && params.value !== '') {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return '-';
          }
        },
        // tooltipField: 'approveStatus',
      },
      {
        headerName: 'Actions',
        field: '',
        minWidth: 150,
        cellRenderer: 'moreOptions',
        //  onCellClicked: this.sendJobData(),
        suppressColumnsToolPanel: true,
        filter: false,
        // pinned: 'right',
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
      minWidth: 220,
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
        let apiData: any = params;
        apiData.request.filterModel['jobCategoryId'] = {
          filterType: 'text',
          type : "contains",
          filter :"64cc8cbd112e2bb777bc92fb"
        };
        this.partnerEnquirieAgGridSubscription = this.ApiService.getAGgridViewOpenJob(apiData.request).subscribe(
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
              this.alldata = data1;
              console.log(this.alldata,'alldata');
              console.log(this.alldata.data,'alldata.data');
              console.log(this.alldata.data.length,'alldata.data.length');
              
              this.approvecountvalue = this.alldata.totalCount.approvedCount || 0;
              this.pendingcountvalue = this.alldata.totalCount.pendingCount || 0;
              this.rejectedcountvalue = this.alldata.totalCount.rejectedCount || 0;
              this.allcountvalue = this.alldata.totalCount.totalCount || 0;
              
              if (this.partnerListAgData.length > 0) {
                this.pageRowCount = data1 && data1.totalCount ? data1.totalCount : 0; 
                // console.log(this.pageRowCount,'pageRowCount');
                this.totalPages = Math.ceil(this.pageRowCount / this.selectedPageSize);
                this.gridApi.hideOverlay();
                params.success({
                  rowData: this.partnerListAgData,
                  // rowCount: this.allcountvalue,
                   rowCount: this.alldata.data.length,
                });
                // localStorage.setItem('partnerListAgData', JSON.stringify(this.partnerListAgData));
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
              rowData: this.partnerListAgData,
              rowCount: this.pageRowCount,
            });
          }
        );
        this.gridApi.hideOverlay();
      },
    };
  }

  // getAggridJoblist() {
  //   // debugger;
  //   return {
  //     getRows: (params) => {
  //       let apiData: any = params;
  //       apiData.request.filterModel['jobCategoryId'] = {
  //         filterType: 'text',
  //         type : "contains",
  //         filter :"64cc8cbd112e2bb777bc92fb"
  //       };
  //       this.partnerEnquirieAgGridSubscription = this.ApiService.getAGgridViewOpenJob(
  //         apiData.request
  //       ).subscribe(
  //         (data1: any) => {
  //           if (data1.success == false) {
  //             params.fail();
  //             params.success({
  //               rowData: [],
  //               rowCount: 0,
  //             });
  //             this.totalPages = 1;
  //             this.gridApi.showNoRowsOverlay();
  //           } else {
  //             this.partnerListAgData = data1 && data1.data ? data1.data : [];
  //             console.log(this.partnerListAgData, 'partnerListAgData');
  //             this.alldata = data1;

  //             this.approvecountvalue = this.alldata.totalCount.approvedCount || 0;
  //             this.pendingcountvalue = this.alldata.totalCount.pendingCount || 0;
  //             this.rejectedcountvalue = this.alldata.totalCount.rejectedCount || 0;
  //             this.allcountvalue = this.alldata.totalCount.totalCount || 0;
  //             console.log(this.alldata, 'dataaaaa');

  //             if (this.partnerListAgData.length > 0) {
  //               this.pageRowCount =
  //                 data1 && data1.totalCount ? data1.totalCount : 0;
  //               this.totalPages = Math.ceil(
  //                 this.pageRowCount / this.selectedPageSize
  //               );
  //               console.log(this.totalPages);
  //               this.gridApi.hideOverlay();
  //               params.success({
  //                 rowData: this.partnerListAgData,
  //                 // rowCount: this.partnerListAgData.length,
  //                 rowCount: this.allcountvalue,
  //               });
  //             } else {
  //               params.success({
  //                 rowData: this.partnerListAgData,
  //                 rowCount: 0,
  //               });
  //               this.totalPages = 1;
  //               this.gridApi.showNoRowsOverlay();
  //             }
  //           }
  //           this.paginationCounter();
  //         },
  //         (err) => {
  //           params.fail();
  //           params.success({
  //             rowData: this.partnerListAgData,
  //             rowCount: this.pageRowCount,
  //           });
  //         }
  //       );
  //       this.gridApi.hideOverlay();
  //     },
  //   };
  // }

  // paginationCounter(){
  //   this.totalPages = Math.ceil(this.pageRowCount/this.selectedPageSize)
  //   this.pageArray = Array.from(Array(this.totalPages).keys());
  //   this.isPrevButtonDisabled = this.pageArray[0] === 0;
  //   this.isNextButtonDisabled = false;
  // }

  // onPageSizeChanged() {
  //   this.paginationCounter();
  //   this.gridApi.paginationSetPageSize(this.selectedPageSize);
  // }

  // onBtPageGo(pageNumber: number) {
  //   if (this.pageNumberInput && this.pageNumberInput <= this.totalPages) {
  //     this.gridApi.paginationGoToPage(pageNumber - 1);
  //   } else {
  //     console.log('Invalid page number');
  //   }
  // }

  // onBtPrevPage() {
  //   this.gridApi.paginationGoToPreviousPage();
  // }

  // gotoPage(i) {
  //   this.gridApi.paginationGoToPage(i);
  //   this.isPrevButtonDisabled = i === 0;
  //   if (i === this.pageArray.length - 1) {
  //     this.isNextButtonDisabled = true; 
  //   } else {
  //     this.isNextButtonDisabled = false;
  //   } 
  // }
  
  // onBtNextPage() {
  //   this.gridApi.paginationGoToNextPage();
  // }

  // isPageGoButtonDisabled(): boolean {
  //   return this.totalPages <= 1;
  // }
  

  getalldata(partnerListAgData){
    this.appconfig.setLocalStorage('openJobData',JSON.stringify(partnerListAgData));
  }
  
  refresh() {
    this.gridApi.refreshServerSideStore({ purge: true });
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
      approveStatus: {
        filterType: 'text',
        type: 'contains',
        filter: '',
      },
    };
    if (index == 1) {
      statusmodel.approveStatus.filter = 'approved';
    } else if (index == 2) {
      statusmodel.approveStatus.filter = 'pending';
    } else if (index == 3) {
      statusmodel.approveStatus.filter = 'rejected';
    } 
    this.gridApi.setFilterModel(statusmodel);
  }

  
}
