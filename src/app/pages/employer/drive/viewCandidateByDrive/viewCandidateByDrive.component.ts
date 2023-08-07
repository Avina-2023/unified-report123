import { Component, OnInit, NgModule } from '@angular/core';
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
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ActionButtonsComponent } from './actionButtons/actionButtons.component';
import { param } from 'jquery';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
interface Tab {
  title: string;
  items: string[]
}
@Component({
  selector: 'app-viewCandidateByDrive',
  templateUrl: './viewCandidateByDrive.component.html',
  styleUrls: ['./viewCandidateByDrive.component.scss'],
})
export class ViewCandidateByDriveComponent implements OnInit {
  tabs: any = [
    { title: 'All', items: ['Item 1', 'Item 2', 'Item 3'] },
    { title: 'Awaiting Review', items: ['Item 4', 'Item 5', 'Item 9'] },
    { title: 'In Progress', items: ['Item 6', 'Item 7', 'Item 8'] },
    { title: 'Rejected', items: ['Item 6', 'Item 7', 'Item 8', 'Item 9'] },
    { title: 'Shortlisted', items: ['Item 6', 'Item 7', 'Item 8', 'Item 9'] },
  ];
  routerlink = APP_CONSTANTS.ENDPOINTS;
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
  jobId: String = '';
  subscription: Subscription;
  rowData1: any;
  cacheBlockSize: any = 1000;
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
  selectedTab: any;
  filteredColumnDefs: any;
  filteredRowData: any[];
  statusdata: any;
  email: any;
  jobStatus: any;
  jobData: any;
  jobDetailsdata: any;
  jobdatata: any;
  valueone: any;
  dynclass: string = 'navyblue';
  active: number = 0;
icncolor:string ='#1B4E9B';
  alldata: any;
  displayData: string;
  awaitingcountvalue:any;
  shortlitcountvalue:any;
  inprogresscountvalue:any;
  rejectedcountvalue:any;
  allcountvalue: any;
  pageNumberInput: any;
  pageNumber: number = 1;
  currentPage: number;
  constructor(
    private ApiService: ApiService,
    private toastr: ToastrService,
    private appconfig: AppConfigService,
    private sendData: SentDataToOtherComp,
    public router: Router,
    private activeroute: ActivatedRoute,
    private global_validators: GlobalValidatorService,
  ) {
    this.jobId = this.appconfig.getLocalStorage('currentJobID');
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
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
      },
      frameworkComponents: {
        moreOptions: ActionButtonsComponent,
      },
    };
  }

  ngOnInit(): void {
    this.autoSizeAll(false);
    // this.filterData();
    this.jobData = this.appconfig.jobData;
    this.tabledata();
    this.getJobDetails();
    this.getAggridJoblist();

    this.sendData
      .getMessage()
      .subscribe((data: { data: string; value: any }) => {
        if (data.data == 'grid-refresh') {
          console.log('inside');
          this.refresh();
        }
      });
  }

  ngOnDestroy() {
    this.appconfig.clearLocalStorageOne('currentJobID');
  }
  arrayofData: any = [];

  // Ag Grid Section

  // sendJobData(){
  // this.sendData.sendMessage("jobData",this.jobData)
  // console.log(this.jobData)
  // }
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
        headerName: 'Name',
        field: 'studentName',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellRenderer: (params) => {
          if (params.value && params.value !== undefined 
            && params.value !== null && params.value !== '') {
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
        cellStyle: (params) => {
          return {
            'text-decoration': 'underline',
            'color': 'blue', 
            'cursor':'pointer',
          };
        },
      },        
      {
        headerName: 'Status',
        field: 'jobStatus',
        minWidth: 175,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains'],
        },
        cellClassRules: {
         'yellow-cell': (params) => params.value === 'awaitingReview',
          'green-cell': (params) => params.value === 'Shortlisted',
          'red-cell': (params) => params.value === 'Rejected',
          'blue-cell': (params) => params.value === 'In Progress',
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
        tooltipField: 'jobStatus',

       //   cellStyle: params => {
       //     if (params.value === 'awaitingReview') {
       //         return {borderRadius: '5px', color: '#fff', backgroundColor: 'green'};
       //     }
       //     return null;
       // },

      }, 
      {
        headerName: 'Qualification',
        field: 'degree',
        minWidth: 140,
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
            return params.value;
          } else {
            return '-';
          }
        },
        tooltipField: 'degree',
      },
      {
         headerName: 'Year of Passout',
         field: 'yearOfPassing',
         minWidth: 180,
         filter: 'agNumberColumnFilter',
         chartDataType: 'series',
         filterParams: {
           suppressAndOrCondition: true,
           filterOptions: [
             'equals',
             'lessThan',
             'lessThanOrEqual',
             'greaterThan',
             'greaterThanOrEqual',
             'inRange',
           ],
         },
         cellRenderer: (params) => {
           if (
             params.value &&
             params.value != undefined &&
             params.value != null &&
             params.value != ''
           ) {
             return params.value;
           } else {
             return '-';
           }
         },
         tooltipField: 'yearOfPassing',
      },
      {
       headerName: 'Trained by L&T EduTech',
       field: 'trainedStatus',
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
           params.value != undefined &&
           params.value != null &&
           params.value != ''
         ) {
           return params.value;
         } else {
           return '-';
         }
       },
       tooltipField: 'trainedStatus',
      },
      {
        headerName: 'Assessed by L&T EduTech',
        field: 'assessedStatus',
        minWidth: 210,
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains' ],
        },
        cellRenderer: (params) => {
          if (
            params.value &&
            params.value != undefined &&
            params.value != null &&
            params.value != ''
          ) {
            return params.value;
          } else {
            return '-';
          }
        },
        tooltipField: 'assessedStatus',
      },
      {
        headerName: 'Applied Date',
        field: 'appliedDate',
        minWidth: 175,
        valueFormatter: function (params) {
          return moment(params.value).format('DD-MM-yy');
        },
        tooltipValueGetter: function (params) {
          return moment(params.value).format('DD-MM-yy').toString();
        },
        filter: 'agDateColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'greaterThan', 'inRange'],
        },
        // tooltipField: 'appliedDate',
      },
      
      { 
       headerName: 'Actions',
       field: '',
      minWidth: 225 ,
      cellRenderer: 'moreOptions',
     //  onCellClicked: this.sendJobData(),
      suppressColumnsToolPanel: true,
      filter: false,
    }
   
    ];
   
  }
  exportCSV() {
    this.gridApi.exportDataAsCsv({
      columnKeys: [
        'email',
        'studentName',
        'studentLastName',
        'gender',
        'collegeName',
        'level',
        'degree',
        'department',
        'yearOfPassing',
        'percentage',
        'mobile',
        'motherTongue',
        'permanentState',
        'permanentCity',
        'presentState',
        'presentCity',
      ],
    });
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
    this.setDatasource();
  }

  setDatasource() {
    var datasource = this.getAggridJoblist();
    this.gridApi.setServerSideDatasource(datasource);
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
            } else {
              this.candidateList = data1 && data1.data ? data1.data : [];
              console.log(this.candidateList, 'candidateList');
              this.alldata = data1;
              // this.alldata = data1;

              // working

              // this.shortlitcountvalue = this.alldata.Shortlisted ? this.alldata.Shortlisted ?? 0 : this.shortlitcountvalue;
              // this.awaitingcountvalue = this.alldata.awaitingReview ? this.alldata.awaitingReview ?? 0 : this.awaitingcountvalue;
              // this.rejectedcountvalue = this.alldata.Rejected ? this.alldata.Rejected : this.rejectedcountvalue;
              // this.allcountvalue = this.alldata.totalCount ? this.alldata.totalCount : this.allcountvalue
              // this.inprogresscountvalue = this.alldata['In Progress'] ? this.alldata['In Progress'] : this.inprogresscountvalue
             
             
              this.shortlitcountvalue = this.alldata.Shortlisted ? this.alldata.Shortlisted : this.shortlitcountvalue ?? 0;
              this.awaitingcountvalue = this.alldata.awaitingReview ? this.alldata.awaitingReview : this.awaitingcountvalue ?? 0;
              this.rejectedcountvalue = this.alldata.Rejected ? this.alldata.Rejected : this.rejectedcountvalue ?? 0;
              this.allcountvalue = this.alldata.totalCount ? this.alldata.totalCount : this.allcountvalue ?? 0;
              this.inprogresscountvalue = this.alldata['In Progress'] ? this.alldata['In Progress'] : this.inprogresscountvalue ?? 0;


             

              console.log(this.alldata,'dataaaaa');
                //this.displayData = JSON.stringify(this.alldata);
          
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
              rowCount: this.pageRowCount,
            });
          }
        );
        this.gridApi.hideOverlay();
      },
    };
  }

  formatData(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    if (
      this.gridColumnApi &&
      this.gridColumnApi.getAllColumns != undefined &&
      this.gridColumnApi.getAllColumns().length
    ) {
      this.gridColumnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    }
  }

  dashboard() {
    this.router.navigate(['/auth/partner/jobrequirment']);
  }

  // onTabChange(event: MatTabChange) {
  //   this.selectedTab = event.tab.textLabel;
  //   this.filterData();
  // }

  // filterData() {
  //   if (this.selectedTab === 'All') {
  //     // this.filteredColumnDefs = this.columnDefs;
  //     this.filteredRowData = this.rowData;
  //   } else {
  //     // this.filteredColumnDefs = this.columnDefs;
  //     this.filteredRowData = this.rowData.filter(item => item.status === this.selectedTab);
  //   }
  // }

  refresh() {
    this.gridApi.refreshServerSideStore({ purge: true });
  }

  getJobDetails() {
    this.jobDetailsdata = this.appconfig.getLocalStorage('currentJobData');
    this.valueone = JSON.parse(this.jobDetailsdata);
  }
  onTabChange(index: number) {
    const pall = ['navyblue', 'yellow', 'lightblue', 'red', 'green'];
    const icn = ['#1B4E9B', '#FFB74D', '#27BBEE', '#EF2917', ' #49AE31'];
    console.log('Selected tab index:' + index);
    this.dynclass = pall[index];
    this.icncolor = icn[index];
    this.active = index;
    console.log(index,"MYINDEX VALUE")
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
    if(index == 1) {
      statusmodel.jobStatus.filter = 'awaitingReview';
    }else if(index == 2){
      statusmodel.jobStatus.filter = 'In Progress';
    }else if(index == 3){
      statusmodel.jobStatus.filter = 'rejected';
    }else if(index == 4){
      statusmodel.jobStatus.filter = 'Shortlisted';
     
    }
    this.gridApi.setFilterModel(statusmodel);
  }
  
  onCellClicked(event: any): void {
    if (event.colDef.field === 'studentName') {
      this.router.navigate(['/auth/drive/viewCandidateProfilebyEmployer']);
    }
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  onBtPageGo(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.gridApi.paginationGetTotalPages()) {
      this.gridApi.paginationGoToPage(pageNumber - 1);
    } else {
      console.log('Invalid page number');
    }
  }
  
  // onBtPageGo(pageNumber: string) {
  //   const isValidNumber = this.global_validators.numberOnly();
    
  //   if (!isValidNumber) {
  //     console.log('Invalid input. Please enter a valid number.');
  //     return;
  //   }
    
  //   const parsedNumber = parseInt(pageNumber, 10);
    
  //   if (parsedNumber >= 1 && parsedNumber <= this.gridApi.paginationGetTotalPages()) {
  //     this.gridApi.paginationGoToPage(parsedNumber - 1);
  //   } else {
  //     console.log('Invalid page number');
  //   }
  // }
  

}
