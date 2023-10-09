import { Component, OnInit } from '@angular/core'; 
import { ColDef, GridApi } from 'ag-grid-community';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { ActionButtonViewJobsComponent } from './action-button-viewJobs/action-button-viewJobs.component';
import { Subscription } from 'rxjs';

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
  public masterDetail;
  public rowSelection = 'multiple';
  public columnDefsmini;
  public rowModelType;
  public rowData: any[] | null = [1, 2];
  public gridColumnApi: any;
  public serverSideStoreType;
  public defaultColDef: ColDef;
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 320,
  };
  selectedRow: any[];
  cacheBlockSize: any = 1000;
  dynclass: string = 'navyblue';
  active: number = 0;
  icncolor: string = '#1B4E9B';
  tabs: any = [
    { title: 'All' },
    { title: 'Approved' },
    { title: 'Pending' },
    { title: 'Rejected' },
  ];
  columnDefs: any = [];
  filteredRowData: any[];
  FormateName: any;
  subscription: Subscription;
  driveAgGridSubscription: Subscription;
  jobId: String = '';
  totalPages: number;
  alldata: any;
  candidateList: any = [];
  pageRowCount = 0;
  selectedPageSize: number = 10;
  pageArray: number[] = [1];
  public overlayNoRowsTemplate = ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';
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
 
  constructor(
    private ApiService: ApiService,
  ) { }

  ngOnInit() {
    this.getAggridJoblist();
  }

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
          if (
            params.value &&
            params.value !== undefined &&
            params.value !== null &&
            params.value !== ''
          ) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return '-';
          }
        },
        tooltipValueGetter: (params) => {
          if (
            params.value &&
            params.value !== undefined &&
            params.value !== null &&
            params.value !== ''
          ) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } else {
            return '-';
          }
        },
        cellStyle: (params) => {
          return {
            'text-decoration': 'underline',
            color: 'blue',
            cursor: 'pointer',
          };
        },
      },
      {
        headerName: 'Status',
        field: 'jobStatus',
        minWidth: 195,
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
            params.value &&  params.value !== undefined &&
            params.value !== null && params.value !== ''
          ) { 
            return params.value === 'awaitingReview' ? 'Awaiting Review' : this.titleCase(params.value);
          } else {
            return '-';
          }
        },
        tooltipValueGetter: (params) => {
          if ( params.value && params.value !== undefined 
            && params.value !== null && params.value !== ''
          ) { 
            return params.value === 'awaitingReview' ? 'Awaiting Review' : this.titleCase(params.value);
          } else {
            return '-';
          }
        },
      },
      {
        headerName: 'Applied Date', 
        field: 'appliedDate', 
        minWidth: 135,
        valueFormatter: function (params){
          return moment(params.value).format('DD-MM-yy'); 
        }, 
        tooltipValueGetter: function (params){
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
        minWidth: 150,
        cellRenderer: 'moreOptions',
        //  onCellClicked: this.sendJobData(),
        suppressColumnsToolPanel: true,
        filter: false,
        pinned: 'right',
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setDatasource();
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
              this.totalPages = 1;
              this.gridApi.showNoRowsOverlay();
            } else {
              this.candidateList = data1 && data1.data ? data1.data : [];
              console.log(this.candidateList, 'candidateList');
              this.alldata = data1;

              // this.shortlitcountvalue = this.alldata.Shortlisted || 0;
              // this.awaitingcountvalue = this.alldata.awaitingReview || 0;
              // this.rejectedcountvalue = this.alldata.Rejected || 0;
              // this.allcountvalue = this.alldata.totalCount || 0;
              // this.inprogresscountvalue = this.alldata['In Progress'] || 0;

              console.log(this.alldata, 'dataaaaa');
              //this.displayData = JSON.stringify(this.alldata);

              if (this.candidateList.length > 0) {
                this.pageRowCount =
                  data1 && data1.totalCount ? data1.totalCount : 0;
                this.totalPages = Math.ceil(
                  this.pageRowCount / this.selectedPageSize
                );
                console.log(this.totalPages);
                this.gridApi.hideOverlay();
                params.success({
                  rowData: this.candidateList,
                  rowCount: this.candidateList.length,
                });
              } else {
                params.success({
                  rowData: this.candidateList,
                  rowCount: 0,
                });
                this.totalPages = 1;
                this.gridApi.showNoRowsOverlay();
              }
            }
            this.paginationCounter();
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

  paginationCounter(){
    this.totalPages = Math.ceil(this.pageRowCount/this.selectedPageSize)
    this.pageArray = Array.from(Array(this.totalPages).keys());
  }

  onPageSizeChanged() {
    this.paginationCounter();
    this.gridApi.paginationSetPageSize(this.selectedPageSize);
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
