import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { ApiService } from '../../../../services/api.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import _ from 'lodash';
import { AgChartThemeOverrides, ColDef, ColSpanParams, GridApi, IColumnToolPanel, SideBarDef } from '@ag-grid-enterprise/all-modules';
import * as moment from 'moment';


@Component({
  selector: 'app-hiring-report',
  templateUrl: './hiring-report.component.html',
  styleUrls: ['./hiring-report.component.scss']
})
export class HiringReportComponent implements OnInit {
  @ViewChild('sectionDetails', {static: false}) opensection: TemplateRef<any>;
  @ViewChild('filter', {static: false}) filter: TemplateRef<any>;
  
  subscription: Subscription;
  selectedOption:any;
  selectedOptions:any = [];
  customfilter:any = 'false';
  selectedFilterData: any = [] = [];
  // filter var
  from:any;
  to:any
  arr = [];
  selectedFilterTotalCount:any;

candidatereqdata:any = {
    Domain: [],
    Qualification: [],
    Gender:[],
  }
  // public gridApi;
  public gridColumnApi;
  private gridApi!: GridApi;
  public columnDefs;
  public columnDefsmini;
  public defaultColDef;
  public detailCellRendererParams;
  public rowModelType;
  public serverSideStoreType;
  public rowSelection;
  public masterDetail;
  public popupParent: HTMLElement = document.body;
  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      legend: {
        enabled: false,
        position: 'left',
      },
      paddingX: 120,
      paddingY: 20,
  },
  cartesian: {
    navigator: {
      enabled: true,
    },
  },
  };

  public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: false,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: false,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressExpandAll: true,
          suppressFilterSearch: true,
        },
      },
    ],
    defaultToolPanel: 'columns',
  };

  reportsData: any;
  userList: any = [];
  pageRowCount = 0;
  cacheBlockSize: any = 2500;
  candidateListSubscription: Subscription;
  sectiondialogRef: any;
  filterDef:any;
  rowData1: any;
  public rowData: any[] | null = [1, 2];
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 220,
  };
  isFilterOpen: any;

  FilterData = []
  filterTile: any[];
  firstChildVal: any;
   selectedarr: any;
  selectedItemsList: any;
  selectedKeyValue: any;
  filteredValues: any = {};
  selectedMenuIndex: any = 0;
  model: any;
  selectedFilterCount: any;
  isFilterRecords = false;
  CGPA: { };
  ShowFilterWithCount: any;
  userSelectedFiltervalue: any;
  filterIndex: any;
  filterIndexValue: any;
  SelectedFilterMainCount:any = [];
  FilteredRecords: any;
  Isspinner = false;

  demoimg = '/assets/images/Filter.svg'
  constructor(private apiService: ApiService,private sendData: SentDataToOtherComp, private matDialog: MatDialog,private appconfig: AppConfigService,private toastr: ToastrService, private ApiService: ApiService,) {      
    this.serverSideStoreType = 'partial';
    this.masterDetail = true;
    this.rowModelType = 'serverSide';
    this.defaultColDef = {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      filter: true,
      enableFilter:true,
      minWidth: 220,
      sideBar: 'filter',
    };

    this.subscription = this.sendData.getMessage().subscribe(message => {
      if(message.value == 'openFilter'){
        this.isFilterOpen = message.data;
        if(this.isFilterOpen){
          this.openFilter();
        }else {
        }
      }else {
        this.isFilterOpen = false;
      }

    });
  }

  ngOnInit(): void {
    let localFilterval = localStorage.getItem('filterItem');
    this.getFilter(localFilterval ? JSON.parse(localFilterval) : '','');
    this.SelectedFilterMainCount = localStorage.getItem('mainFilterCount') ? JSON.parse(localStorage.getItem('mainFilterCount')) :   localStorage.setItem('mainFilterCount','[]');;
    if(this.SelectedFilterMainCount && this.SelectedFilterMainCount.length > 0){
      this.isFilterRecords = true;
    }else{
      this.isFilterRecords = false;
    }
    this.ShowFilterWithCount = this.SelectedFilterMainCount;;
    this.tabledef();


  }

  ngOnDestroy() {
    this.candidateListSubscription ? this.candidateListSubscription.unsubscribe() : '';
  }

  showPivotSection() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.setPivotSectionVisible(false);
  }

  tabledef(){
    this.columnDefs =  [
      {
        headerName: 'Name',
        field: 'firstname',
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'firstname',
        // width: 100,
        cellRenderer: (params) => {
          // && params.data.display == true
          if(params.value){
            let FormateName = params.value;
            FormateName = FormateName.trim();
            FormateName = FormateName.toLowerCase();
            const Name = FormateName.charAt(0).toUpperCase() + FormateName.slice(1);
            return  Name;
          } if(params.value == undefined){
            return  '';
          }else {
            return '-';
          }
        }
      },
      {
        headerName: 'Email',
        field: 'email',
        filter: 'agTextColumnFilter',
        rowGroup: true, 
        hide: true,
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'email',
        cellRenderer: (params) => {
          if(params.data ){
            let FormateEmail = params.value;
            FormateEmail = FormateEmail.trim();
            FormateEmail = FormateEmail.toLowerCase();
            return '<span class="redColor">'+FormateEmail+'</span>' ;

            // return '<span style="cursor: pointer"><span class="profileAvatar"><img src="'+this.demoimg+'"></span> <span>'+params.value+'</span> </span>'
          } 
          if(params.value == undefined){
            return '';
          }else {
              return ''+params.value;
          }
        }
      },

      {
        headerName: 'Domain/Branch',
        field: 'branch',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'branch',
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          } if(params.value == undefined){
            return  '';
          } else {
              return '-';
          }
        }
      },

      {
        headerName: 'Score Obtained',
        field: 'testscore',
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
        aggFunc: 'avg',
        maxWidth: 140,
        // width:100,
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        // tooltipField:'testscore',
        width: 10,
        cellRenderer: (params) => {
          if(params.data && params.data.testtype == 'Personality & Behaviour'){
            return '<div style="text-align:right;">'+'-'+'</div>';
        } if(params.value == undefined){
          return  '';
        }else{
          if(params.value){
            return'<div style="text-align:right;">'+params.value+'</div>'
          } else {
            return '<div style="text-align:right;">'+'-'+'</div>';
          }
        }
        },
      },

      {
        headerName: 'Percentage ',
        field: 'percentage',
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
        maxWidth: 140,
        aggFunc: 'avg',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        cellClass: 'alignCenter',
        cellRenderer: (params) => {

          if( params.data && params.data.testtype == 'Personality & Behaviour'){
            return '-'
          }else {
            // if(params.value !== undefined && params.value !== null && params.value == 'null'){
              if(params.value && params.value <= 40){
                // let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar red-btn"  style="width: `+''+parseInt(params.value)+`%;">`+params.value.toFixed(2)+'%'+`</div>`;
            }
            if (params.value && params.value < 80 ) {
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar yellow-btn"  style="width: `+''+parseInt(params.value)+`%;">`+params.value.toFixed(2)+'%'+`</div>`;
            }
            if(params.value && params.value  < 90){
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar light-green" style="width: `+''+parseInt(params.value)+`%;">`+params.value.toFixed(2)+'%'+`</div>`;
            }
            if ( params.value && params.value >=90){
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar green-btn" style="width: `+''+parseInt(params.value)+`%; ">`+params.value.toFixed(2)+'%'+`</div>`;
            }
            if(params.value && params.value !== undefined && params.value !== null && params.value == 'null' && params.value == ''){
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return '';
          } if(params.value == undefined){
            return  '';
          }
            else {
            return '-';
            }

          }

        }
      },
      {
        headerName: 'Test Count',
        field: 'testcount',
        filter: 'agNumberColumnFilter',
        maxWidth: 120,
        tooltipField:'testcount',
        chartDataType: 'series',
        aggFunc: 'avg',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        cellRenderer: (params) => {
          if(params && params.value){
            return '<div style="text-align: end;">'+params.value+'</div>' ;
          } if(params.value == undefined){
            return  '';
          }else{
            return '<div style="text-align:right;">'+'-'+'</div>';
          }
        },
      },


    
      {
        headerName: 'Max Score',
        field: 'testmaxscore',
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
        maxWidth: 120,
        // tooltipField:'testmaxscore',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        // width: 100,
        cellClass: 'alignCenter',
        cellRenderer: (params) => {
          if(params.data && params.data.testtype == 'Personality & Behaviour'){
            return '<div style="text-align:right;">'+'-'+'</div>';
          } if(params.value == undefined){
            return  '';
          }else{
            if(params.value){
              return'<div style="text-align:right;">'+params.value+'</div>'
            } else {
              return '<div style="text-align:right;">'+'-'+'</div>';;
            }
          }

        }
      },

      {
        headerName: 'Test Name',
        field: 'testname',
        filter: 'agTextColumnFilter',
        tooltipField:'testname',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if(params && params.value){
            return '<span class="redColor">'+params.value+'</span>' ;
          } if(params.value == undefined){
            return  '';
          }else{
            return '-';
          }
        },
        maxWidth: 200,
      },

      {
        headerName: 'Rating',
        field: 'rating',
        maxWidth: 140,
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        // width: 100,
        cellRenderer: (params) => {

          if( params.data && params.data.testtype == 'Personality & Behaviour'){
            return '-'
        }else{
          if(params.value){
            if(params.value == 'Weak'){
              // return `<span><button class="btnsm red-btn">`+params.value +`</button></span>`;
              return params.value
            }if(params.value == 'Average') {
              // return `<span><button class="btnsm yellow-btn">`+params.value +`</button></span>`;
              return params.value
            } if(params.value == 'Excellent'){
              // return `<span><button class="btnsm green-btn">`+params.value +`</button></span>`;
              return params.value
            }  if(params.value == 'Good'){
              // return `<span><button class="btnsm greenlight-btn">`+params.value +`</button></span>`;
              return params.value
            }

            else {
              return '-';
            }
          } if(params.value == undefined){
            return  '';
          }else {
             return '-';
          }
        }
        }
      },

      {
        headerName: 'Qualification',
        field: 'specialization',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        aggFunc: 'avg',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'specialization',
        cellRenderer: (params) => {
          if(params.value ){
            return params.value;
          } if(params.value == undefined){
            return  '';
          } else {
              return '-';
          }
        }
      },

      {
        headerName: 'College/University',
        field: 'institute',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        aggFunc: 'avg',
        minWidth: 400,
        maxWidth:600,
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'institute',
        cellRenderer: (params) => {
          if(params.value ){
            return params.value;
          } if(params.value == undefined){
            return  '';
          } else {
              return '-';
          }
        }
      },
      {
        headerName: 'Graduation Aggregate',
        field: 'edu_percentage',
        filter: 'agNumberColumnFilter',
        aggFunc: 'avg',
        maxWidth: 190,
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        tooltipField:'edu_percentage',
        cellRenderer: (params) => {
          if(params.value ){
            return'<div style="text-align:right;">'+params.value+'%'+'</div>'
          } if(params.value == undefined){
            return  '';
          } else {
            return '<div style="text-align:right;">'+'-'+'</div>';
          }
        }
      },

      {
        headerName: 'Year of passing',
        field: 'passedout',
        filter: 'agDateColumnFilter',
        maxWidth: 140,
        chartDataType: 'series',
        // tooltipField:'passedout',
        cellRenderer: (params) => {
          if(params.value){
            return moment(params.value).format('MMM YYYY');
            // return params.value;
          } if(params.value == undefined){
            return  '';
          } else {
              return '-';
          }
        },
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','greaterThan','inRange'],
        },
      },


      {
        headerName: 'Gender',
        maxWidth: 140,
        field: 'gender',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        aggFunc: 'avg',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'gender',
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          } if(params.value == undefined){
            return  '';
          } else {
              return '-';
          }
        }
      },

      {
        headerName: 'Drive Name',
        field: 'drivename',
        filter: 'agTextColumnFilter',
        tooltipField:'drivename',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        // width: 100,
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          } if(params.value == undefined){
            return  '';
          }else{
            return '-';
          }
        }
      },
    
      {
        headerName: 'Test Type',
        maxWidth: 140,
        field: 'testtype',
        filter: 'agTextColumnFilter',
        tooltipField:'testtype',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        // width: 100,
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          } if(params.value == undefined){
            return  '';
          }else{
            return '-';
          }
        }
      },
   
      {
        headerName: 'Test Date',
        filter: 'agDateColumnFilter',
        field: 'testdate',
        maxWidth: 140,
        tooltipField:'testdate',
        chartDataType: 'series',
        // width: 100,
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          } if(params.value == undefined){
            return  '';
          }else{
            return '-';
          }
        },
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','greaterThan','inRange'],
        },
      },
      // {
      //   headerName: 'Completion',
      //   field: 'completion',
      //   filter:false,
      //   chartDataType: 'series',
      //   // filter: 'agTextColumnFilter',
      //   // filterParams: {
      //   //   suppressAndOrCondition: true,
      //   //   filterOptions: ['contains']
      //   // },
      //   // width: 100,
      // cellRenderer: (params) => {
      //   if(params.value == true){
      //     return `<div class="center"><i class="material-icons green">check</i></div>`
      //   } if (params.value == false){
      //     return `<div class="center"><i class="material-icons red">close</i></div>`
      //   }else {
      //     return '-';
      //   }
      // }
      // },
      {
        headerName: 'Schedule Name',
        field: 'schedulename',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'schedulename',
        enableRowGroup: true,
        // width: 100 ,
        cellRenderer: (params) => {
          // && params.data.display == true
          if(params.data  && params.value != null){
            return ''+params.value ;
          } if(params.value == undefined){
            return '';
          }else {
            return '-'+params.value;
          }
        }
      },
  ]
  }


  getSubTableDef(params,event){
    if (event.data && event.data.testtype === 'Personality & Behaviour') {

          this.columnDefsmini = [
            { headerName: 'Skill Name', field: 'skillname' },
            { headerName: 'Sten Score', field: 'stenScore' },
          ]
    }else{
       this.columnDefsmini = [
        {headerName: 'Sectional Name',field: 'secname'},
        {headerName: 'Questions Attempted',field: 'attendedquestions', cellClass: 'alignCenter',
          cellRenderer: (params) => {
            if (params.value != undefined && params.value) {
              return params.value +'/' + (params.data.overallquestions ? params.data.overallquestions: '-');
            } else {
              return '-';
            }
          },
        },
        {headerName: 'Score Obtained',field: 'score',cellClass: 'alignCenter'},
        {
          headerName: 'Percentage',
          field: 'accuracy',
          cellRenderer: (params) => {
            if (params.value != null && params.value <= 40) {
              return `<div class="progessbar red-btn" style="width: `+parseInt(params.value)+`%;">`+params.value.toFixed(2)+'%'+`</div>`;
            }
            if (params.value != null && params.value >= 40 && params.value < 80 ) {
              return `<div class="progessbar yellow-btn" style="width: `+parseInt(params.value)+`%;">`+params.value.toFixed(2)+'%'+`</div>`;
            } if(params.value != null && params.value >=80 && params.value < 90){
              return `<div class="progessbar light-green" style="width: `+parseInt(params.value)+`%;">`+params.value.toFixed(2)+'%'+`</div>`;
            }
            if (params.value != null && params.value >=90){
              return `<div class="progessbar green-btn" style="width: `+parseInt(params.value)+`%; ">`+params.value.toFixed(2)+'%'+`</div>`;
            } if(params.value !== undefined && params.value == 'null' && params.value == null ){
              return params.value = '-';
            }else {
              return '-';
            }
          },
        },
       ]
    }
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getAllColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.closeToolPanel();
    this.autoSizeAll(false);
    this.showPivotSection();
    var datasource = this.callApiForCandidateList();
    params.api.setServerSideDatasource(datasource);
  }


  onGridReadymini(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.closeToolPanel();
    this.autoSizeAll(false)
  }

  callApiForCandidateList() {
    return  {
      getRows: (params) => {
      let apiData: any = params;
      if(apiData.request.sortModel && apiData.request.sortModel.length > 0){
        apiData.request.sortModel.forEach(element => {
            if(element.sort == 'asc'){
                element.sort = 1
            } if(element.sort == 'desc'){
              element.sort = -1
            }
        });
      }

      if(apiData.request.filterModel.testdate){
        const filter = apiData.request.filterModel.testdate.filter;
        const filterTo = apiData.request.filterModel.testdate.filterTo;
        apiData.request.filterModel.testdate.filter = apiData.request.filterModel.testdate.dateFrom ? apiData.request.filterModel.testdate.dateFrom:filter;
        delete apiData.request.filterModel.testdate.dateFrom ? apiData.request.filterModel.testdate.dateFrom : '';
        apiData.request.filterModel.testdate.filterTo = apiData.request.filterModel.testdate.dateTo ?  apiData.request.filterModel.testdate.dateTo : filterTo;
        delete apiData.request.filterModel.testdate.dateTo ? apiData.request.filterModel.testdate.dateTo : '';
      }

      if(apiData.request.filterModel.passedout){
        const filter = apiData.request.filterModel.passedout.filter;
        const filterTo = apiData.request.filterModel.passedout.filterTo;
        apiData.request.filterModel.passedout.filter = apiData.request.filterModel.passedout.dateFrom ? apiData.request.filterModel.passedout.dateFrom:filter;
        delete apiData.request.filterModel.passedout.dateFrom ? apiData.request.filterModel.passedout.dateFrom : '';
        apiData.request.filterModel.passedout.filterTo = apiData.request.filterModel.passedout.dateTo ?  apiData.request.filterModel.passedout.dateTo : filterTo;
        delete apiData.request.filterModel.passedout.dateTo ? apiData.request.filterModel.passedout.dateTo : '';
      }
        apiData.request.attributes = JSON.parse(this.appconfig.getLocalStorage('role'));
        apiData.request.email = this.appconfig.getLocalStorage('email') ? this.appconfig.getLocalStorage('email') : '';

        //Filter  params 
        let localFilterval = localStorage.getItem('filterItem') ?  localStorage.getItem('filterItem') : JSON.parse(this.candidatereqdata);
        this.filteredValues = localFilterval ?  JSON.parse(localFilterval) : JSON.parse(this.candidatereqdata);
        this.customfilter = this.customfilter ? localStorage.getItem('customfilter') : 'false';
        apiData.request.customfilter = this.customfilter ? localStorage.getItem('customfilter') : 'false',
        this.customfilter ? apiData.request = apiData.request = {...apiData.request,  ...this.filteredValues } : '';
       // CGPA local values
        let localStorageCGPA = localStorage.getItem('Cgpa');
        let fromAndTo = localStorageCGPA ? JSON.parse(localStorageCGPA) : [];
        this.customfilter  ? apiData.request.CGPA = [localStorageCGPA ? JSON.parse(localStorageCGPA) : null] : ''
        localStorage.setItem('FilterData',JSON.stringify(apiData.request));
        this.gridApi.hideOverlay();
        this.candidateListSubscription =  this.ApiService.getHiringReport(apiData.request).subscribe((data1: any) => {
          this.gridApi.hideOverlay();
         if(data1.success == false){
              this.toastr.warning('Your session has expired Please login again');
              this.apiService.logout()
              this.gridApi.hideOverlay();
         }
        this.from = fromAndTo.from;
        this.to = fromAndTo.to;
        this.userList = data1 && data1.data ? data1.data: [];
        if (this.userList.length > 0) {
          this.gridApi.hideOverlay();
          if(apiData.request.groupKeys.length > 0){
          }else{
            this.FilteredRecords = data1 ? data1.total_count : 0;
            this.FilteredRecords = this.FilteredRecords.toLocaleString('en-IN')
          }
          
        this.pageRowCount = data1 && data1.total_count ? data1.total_count : 0;
        params.success({
          rowData: this.userList,
          rowCount: this.pageRowCount
        }
        );
      } else {
        params.success({
          rowData: this.userList,
          rowCount: 0
        }

        );
        this.gridApi.showNoRowsOverlay();
      }
      }, (err) => {
        params.fail();
        params.success({
          rowData: this.userList,
          rowCount: this.pageRowCount
        });
      
      });
      // 
      }
    }
}

  onBack(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.USERLIST);
  }

  getModel(e) {
  }

  onCellClicked(event) {
    if (event &&  event.column && event.column.userProvidedColDef && event.column.userProvidedColDef.headerName == 'Email') {
      // let email = event['data']['email'] ? this.ApiService.encrypt(event['data']['email']) : ''
      // this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS, email);
      sessionStorage.setItem('schedulename',event['data']['schedulename'])
      sessionStorage.setItem('testType',event['data']['testtype'])
      this.navtoDetailsPage(event['data']['email'])
    }

    if(event && event.colDef && event.colDef.headerName == 'Group'){
      sessionStorage.setItem('schedulename',event['data']['schedulename']);
      sessionStorage.setItem('testType',event['data']['testtype']);
      sessionStorage.setItem('rowIndex',event && event.rowIndex + 1);
      this.navtoDetailsPage(event && event.data.email);
    }
    
    if(event &&  event.column && event.column.userProvidedColDef && event.column.userProvidedColDef.field == 'testname'){
        if(event && event.data && event.data.section){
          this.getSubTableDef(event.data.section,event);
          this.rowData1 = event.data ? event.data.section : '';
          this.openUserFormDialog();
        }  
    }
  }

  navtoDetailsPage(email){
    this.sendData.sendMessage(true,'go');
    window.open(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS+'/'+`${email}`, '_blank');
  }
  // Add users Section
      openUserFormDialog() {
        this.sectiondialogRef = this.matDialog.open(this.opensection, {
          width: '800px',
          height: 'auto',
          panelClass: 'popupModalContainerForaddUser',
        });
      }


      openFilter() {
        // this.getFilter(this.filteredValues,this.selectedMenuIndex);
        this.filterDef = this.matDialog.open(this.filter, {
          width: '800px',
          height: 'auto',
          panelClass: 'filterPopup',
          disableClose: true 
        });
     
      }

    getFilter(filteredValues,index){
      localStorage.setItem('filterItem',filteredValues ? JSON.stringify(filteredValues) : JSON.stringify(this.candidatereqdata));
      let data;
      const cgpa = JSON.parse(localStorage.getItem('Cgpa'));
      if(filteredValues){
        data = {
          ...filteredValues, 
        }

        if(filteredValues.CGPA){
          data.CGPA = [cgpa]
        }
 

      }else{
        this.Isspinner = true
        data = {
          Domain: [],
          Qualification: [],
          Gender:[],
        }
      }

      this.ApiService.getCandidatefilters(data).subscribe((response:any)=>{
          if(response.success){
            this.Isspinner = false;
            this.filterTile = Object.keys(response.data);
            this.FilterData = response.data;
            this.selectedFilter(this.filterTile[index ? index : 0], index ? index : 0);
            this.selectedFilterTotalCount = '';
            this.selectedFilterTotalCount = response && response.totalCount;
          }else{
            this.Isspinner = true;
          }
      })
      
    }

  selectedFilter(event, index){
    this.filterIndex = event;
    localStorage.setItem('selectedIndex',index)
    this.filterIndexValue = localStorage.getItem('selectedIndex') ? localStorage.getItem('selectedIndex') : 0;
    this.selectedMenuIndex = index;
    var result = _.pickBy(this.FilterData, function(value, key) {
      return _.startsWith(key, event);
    });
    this.firstChildVal = result[event];
    this.selectedKeyValue = event;
  }

  onSelection($event, key) {
    this.Isspinner = true;
    this.selectedOptions.forEach(element => {
        element.default = true;
    });

    this.filteredValues[this.selectedKeyValue] = this.selectedOptions;
    if(this.selectedKeyValue != 'CGPA'){
      this.getFilter(this.filteredValues,this.selectedMenuIndex);
    }
   
      let arr = []
      // let filterCount = []
      for (const key in this.filteredValues) {
        if (Object.prototype.hasOwnProperty.call(this.filteredValues, key)) {
          const element = this.filteredValues[key];
            if(this.filteredValues[key].length > 0){
              arr.push({key: key,count:this.filteredValues[key].length})
            }
            if(key == 'CGPA' && this.from != undefined && this.to != undefined){
              arr.push({key: key,count:this.filteredValues['CGPA'] = 1})
            }
                     
        }
        this.ShowFilterWithCount = arr;
      }
}


  applyFilter(){
    this.customfilter = 'true';
    // this.isFilterRecords = true;
    localStorage.setItem('mainFilterCount', this.ShowFilterWithCount ? JSON.stringify(this.ShowFilterWithCount) : '[]');
    if(this.ShowFilterWithCount.length > 0){
      this.isFilterRecords = true;
    }else {
      this.isFilterRecords = false;
    }
    localStorage.setItem('customfilter','true');
    if(this.from != undefined && this.to != undefined){
      if(this.from <= this.to){
        this.CGPA = {
          from : parseInt(this.from),
          to : parseInt(this.to)
        }
        let setLocalvalues = this.CGPA;
        localStorage.setItem('Cgpa',JSON.stringify(setLocalvalues))
      }else {
        this.toastr.warning('Please enter valid CGPA');
        this.from = '';
        this.to = '';
        localStorage.setItem('Cgpa','{}')
      }
    }else{
      localStorage.setItem('Cgpa','{}')
    }
    this.cacheBlockSize = 0;
    // this.tabledef();
    this.gridApi.paginationGoToFirstPage();
    this.gridApi.refreshServerSideStore({ purge: true });
    this.closeDialog();
    this.getFilter(this.filteredValues,this.selectedMenuIndex);
  }


  clearAll(){
    if(this.ShowFilterWithCount.length > 0){
      this.getFilter('',this.selectedMenuIndex);
    }
    this.filteredValues = [];
    this.customfilter = 'false';
    this.from = '';
    this.to = '';
    this.SelectedFilterMainCount = [];
    this.ShowFilterWithCount = [];
    localStorage.setItem('mainFilterCount','[]');
    localStorage.setItem('filterItem',JSON.stringify(this.candidatereqdata));
    localStorage.setItem('Cgpa','{}');
    this.cacheBlockSize = 0;
    this.isFilterRecords = false;
    // this.selectedFilterTotalCount = '';
  }

  clearAlltab(){
      this.gridApi.refreshServerSideStore({ purge: true });
      this.gridApi.paginationGoToFirstPage();
      this.getFilter('',this.selectedMenuIndex);
      this.filteredValues = [];
      this.selectedFilterTotalCount = '';
      this.customfilter = 'false';
      this.from = '';
      this.to = '';
      this.SelectedFilterMainCount = [];
      this.ShowFilterWithCount = [];
      localStorage.setItem('mainFilterCount','[]');
      localStorage.setItem('filterItem',JSON.stringify(this.candidatereqdata));
      localStorage.setItem('Cgpa','{}');
      this.cacheBlockSize = 0;
      this.isFilterRecords = false;
      // this.tabledef();
  }


  clearFilter(FilterKey){
    //Inside filter removing checkbox
    this.removedSelectedSingleFilter(FilterKey);
    this.removedFilterFromRequestArray(FilterKey);
    this.gridApi.paginationGoToFirstPage();
    this.gridApi.refreshServerSideStore({ purge: true });
    this.getFilter(this.filteredValues,0);
  }

  removedSelectedSingleFilter(FilterKey){
    const filteredremovedItem = this.ShowFilterWithCount.filter((item) => item.key !== FilterKey);
    this.ShowFilterWithCount = filteredremovedItem;
    localStorage.setItem('mainFilterCount',JSON.stringify(this.ShowFilterWithCount));
    if(this.ShowFilterWithCount && this.ShowFilterWithCount.length > 0){
      this.isFilterRecords = true;
    }else {
      this.isFilterRecords = false;
    }

  }


  removedFilterFromRequestArray(FilterKey){
      if(FilterKey == 'CGPA'){
        localStorage.setItem('Cgpa','{}')
      }
    var filterArrAfterRemoved = _.omit(this.filteredValues, FilterKey);
    this.filteredValues = filterArrAfterRemoved;
    // checking object is empty or not 
   if(_.isEmpty(this.filteredValues)){
    this.isFilterRecords = false;
    this.gridApi.refreshServerSideStore({ purge: true });
   }
  }

  onSearchChange(event,from){
    if(event && from != undefined ){
      this.CGPA = {
        from : parseInt(this.from),
        to : parseInt(this.to)
      }
      let setLocalvalues = this.CGPA;
      localStorage.setItem('Cgpa',JSON.stringify(setLocalvalues))
      this.getFilter(this.filteredValues,this.selectedMenuIndex)
    }

  }


  closeDialog() {
    this.matDialog.closeAll();
  }
}
