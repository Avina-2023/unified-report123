import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { ApiService } from '../../../../services/api.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AgChartThemeOverrides, ColDef, ColSpanParams, GridApi, IColumnToolPanel, SideBarDef } from '@ag-grid-enterprise/all-modules';
@Component({
  selector: 'app-hiring-report',
  templateUrl: './hiring-report.component.html',
  styleUrls: ['./hiring-report.component.scss']
})
export class HiringReportComponent implements OnInit {
  @ViewChild('sectionDetails', {static: false}) opensection: TemplateRef<any>;
  @ViewChild('filter', {static: false}) filter: TemplateRef<any>;
  
  subscription: Subscription;
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
  constructor(private sendData: SentDataToOtherComp, private matDialog: MatDialog,private appconfig: AppConfigService,private toastr: ToastrService, private ApiService: ApiService,) {      
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
  }

  ngOnInit(): void {
    this.tabledef();
    this.subscription = this.sendData.getMessage().subscribe(message => {
      this.isFilterOpen = message;
      if(this.isFilterOpen){
        this.openFilter();
      }else {

      }
    });

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
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField:'firstname',
        // width: 100,
        cellRenderer: (params) => {
          // && params.data.display == true
          if(params.value){
            return  params.value;
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
            return '<span class="redColor">'+params.value+'</span>' ;
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
        
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        // tooltipField:'testscore',
        // width: 100,
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
        tooltipField:'testcount',
        chartDataType: 'series',
        aggFunc: 'avg',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
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
        // cellRenderer: 'agGroupCellRenderer',
        maxWidth: 200,
      },


    
      {
        headerName: 'Maxscore',
        field: 'testmaxscore',
        filter: 'agNumberColumnFilter',
        chartDataType: 'series',
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
        // cellRenderer: 'agGroupCellRenderer',
        maxWidth: 200,
      },

      {
        headerName: 'Rating',
        field: 'rating',
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
        chartDataType: 'series',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals','lessThan','lessThanOrEqual','greaterThan','greaterThanOrEqual','inRange']
        },
        tooltipField:'edu_percentage',
        cellRenderer: (params) => {
          if(params.value ){
            return'<div style="text-align:right;">'+params.value+'</div>'
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
        chartDataType: 'series',
        tooltipField:'passedout',
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
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
        field: 'gender',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
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
        apiData.request.email = this.appconfig.getSessionStorage('email') ? this.appconfig.getSessionStorage('email') : '';
        
        this.candidateListSubscription =  this.ApiService.getHiringReport(apiData.request).subscribe((data1: any) => {
        this.userList = data1 && data1.data ? data1.data: [];
        if (this.userList.length > 0) {
          this.gridApi.hideOverlay();
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
      }
      }, (err) => {
        params.fail();
        params.success({
          rowData: this.userList,
          rowCount: this.pageRowCount
        });
      });
      this.gridApi.showNoRowsOverlay();
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
    // sessionStorage.setItem('InAppReport','false');
    this.sendData.sendMessage(false);
    window.open(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS+'/'+`${email}`, '_blank');
  }
  // Add users Section
      openUserFormDialog() {
        this.sectiondialogRef = this.matDialog.open(this.opensection, {
          width: '800px',
          height: 'auto',
          panelClass: 'popupModalContainerForaddUser'
        });
      }


      openFilter() {
        this.filterDef = this.matDialog.open(this.filter, {
          width: '800px',
          height: 'auto',
          panelClass: 'filterPopup'
        });
      }
}
