import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { ApiService } from '../../../../services/api.service';
import { IGetRowsParams } from '@ag-grid-enterprise/all-modules';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hiring-report',
  templateUrl: './hiring-report.component.html',
  styleUrls: ['./hiring-report.component.scss']
})
export class HiringReportComponent implements OnInit {
  rowData:any;
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public detailCellRendererParams;
  public rowModelType;
  public serverSideStoreType;
  public rowSelection;
  public masterDetail;
  reportsData: any;
  userList: any = [];
  pageRowCount = 0;
  candidateListSubscription: Subscription;  
  constructor(private appconfig: AppConfigService,private toastr: ToastrService, private ApiService: ApiService,) {      
    // this.getHiringReportDetails();

    // this.rowSelection = "multiple";
    this.serverSideStoreType = 'partial';
    this.masterDetail = true;
    this.rowModelType = 'infinite';
    this.defaultColDef = { 
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      //  floatingFilter: true, 
    };
  }

  ngOnInit(): void {
    // this.tabledef();
  }

  ngOnDestroy() {
    this.candidateListSubscription ? this.candidateListSubscription.unsubscribe() : '';
  }

  tabledef(){
    return   [  
      {
        headerName: 'Name',
        field: 'firstname',
        filter: 'agTextColumnFilter',
        
        tooltipField:'firstname',    
        // width: 100,
        cellRenderer: (params) => {
          if(params.data && params.data.display == true){
            return  params.value;
          }else {
            return '';
          }
        }
      },
      {
        headerName: 'Email',
        field: 'email',
        filter: 'agTextColumnFilter',
        tooltipField:'email',
        // width: 100,
        cellRenderer: (params) => {
          if(params.data && params.data.display == true){
            return '<span class="redColor">'+params.value+'</span>' ;
          } if(params.data && params.data.display != true){
            return '<span class="displayNone">'+params.value+'</span>' ;
          } if(params.value == undefined){
            return'';
          }else { 
              return ''+params.value;
          }
        }
      },

      {
        headerName: 'Schedule Name',
        field: 'schedulename',
        filter: 'agTextColumnFilter',
        tooltipField:'schedulename',
        enableRowGroup: true,
        // width: 100 ,
        cellRenderer: (params) => {
          if(params.value != null && params.data && params.data.display == true){
            return ''+params.value ;
          } if(params.value == undefined){
            return '';
          }else {
            return ''+params.value;
          }
        }
      },
      {
        headerName: 'Test Type',
        field: 'testtype',
        filter: 'agTextColumnFilter',
        tooltipField:'testtype',
        // width: 100,
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          }else{
            return '-';
          }
        }
      },
      {
        headerName: 'Test Name',
        field: 'testname',
        filter: 'agTextColumnFilter',
        tooltipField:'testname',
        cellRenderer: 'agGroupCellRenderer',
        maxWidth: 200,
      },
      {
        headerName: 'Test Date',
        filter: 'agDateColumnFilter',
        field: 'testdate',
        tooltipField:'testdate',
        // width: 100,
        cellRenderer: (params) => {
          if(params.value){
            return params.value;
          }else{
            return params.data?.scheduledate;
          }
        },
        filterParams: {
          comparator: 
          function (filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var dateParts = dateAsString.split('/');
            var cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
            );
            if (filterLocalDateAtMidnight?.getTime() === cellDate?.getTime()) {
              return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          },
        },
      },
      {
        headerName: 'Score Obtained',
        field: 'testscore',
        filter: 'agNumberColumnFilter',
        tooltipField:'testscore',
        // width: 100,
        cellRenderer: (params) => {
          if(params.data && params.data.testtype == 'Personality & Behaviour'){
            return '-'
        }else{
          if(params.value){
            return'<div style="text-align:right;">'+params.value+'</div>'
          } else {
            return '-';
          }
        }
        },
      },
      {
        headerName: 'Maxscore',
        field: 'testmaxscore',
        filter: 'agNumberColumnFilter',
        tooltipField:'testmaxscore',
        // width: 100,
        cellClass: 'alignCenter',
        cellRenderer: (params) => {
          if(params.data && params.data.testtype == 'Personality & Behaviour'){
              return '-'
          }else{
            if(params.value){
              return'<div style="text-align:right;">'+params.value+'</div>'
            } else {
              return '-';
            }
          }

        }
      },

      {
        headerName: 'Percentage ',
        field: 'percentage',
        filter: 'agNumberColumnFilter',
        // tooltipField:'testmaxscore',
        // width: 100,
        cellClass: 'alignCenter',
        cellRenderer: (params) => {

          if( params.data && params.data.testtype == 'Personality & Behaviour'){
            return '-'
          }else {
            // if(params.value !== undefined && params.value !== null && params.value == 'null'){
              if(params.value && params.value <= 40){
                // let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar red-btn"  style="width: `+''+parseInt(params.value)+`%;">`+parseInt(params.value)+'%'+`</div>`;
            }
            if (params.value && params.value < 80 ) {
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar yellow-btn"  style="width: `+''+parseInt(params.value)+`%;">`+parseInt(params.value)+'%'+`</div>`;
            } 
            if(params.value && params.value  < 90){
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar light-green" style="width: `+''+parseInt(params.value)+`%;">`+parseInt(params.value)+'%'+`</div>`;
            }
            if ( params.value && params.value >=90){
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return `<div class="progessbar green-btn" style="width: `+''+parseInt(params.value)+`%; ">`+parseInt(params.value)+'%'+`</div>`;
            } 
            if(params.value && params.value !== undefined && params.value !== null && params.value == 'null' && params.value == ''){
            //  let per:any = params.data.testscore != null && params.data.testscore / params.data.testmaxscore * 100;
            return ''+parseInt(params.value);
          }
            else {
            return '-';
            }

          }
           
        }
      },
      {
        headerName: 'Completion',
        field: 'completion',
        filter: 'agTextColumnFilter',
        // width: 100,
      cellRenderer: (params) => {
        if(params.value == true){
          return `<div class="center"><i class="material-icons green">check</i></div>`
        } if (params.value == false){
          return `<div class="center"><i class="material-icons red">close</i></div>`
        }else {
          return '-';
        }
      }
      },

      {
        headerName: 'Rating',
        field: 'rating',
        filter: 'agTextColumnFilter',
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
          }else {
             return '-';
          }
        }


        }
      },


      // this.detailCellRendererParams = function (params) {
      //   var res: any = {};
      //   res.getDetailRowData = function (params) {
      //     params.successCallback(params.data.section);
      //   };
      //   if (params.data && params.data.testtype === 'Personality & Behaviour') {
      //     res.detailGridOptions = {
    
      //       rowSelection: 'multiple',
      //       suppressRowClickSelection: true,
      //       enableRangeSelection: true,
      //       rowModelType : 'serverSide',
      //       pagination: true,
      //       paginationAutoPageSize: true,
      //       columnDefs: [
      //         { headerName: 'Skill Name', field: 'skillname' },
      //         { headerName: 'Sten Score', field: 'stenScore' },
      //       ],
      //       defaultColDef:{ flex: 1 },
      //       // rowModelType : 'serverSide',
      //       // serverSideStoreType : 'partial'
      //     };
      //   } else {
      //     res.detailGridOptions = {
      //       rowSelection: 'multiple',
      //       suppressRowClickSelection: true,
      //       enableRangeSelection: true,
      //       rowModelType : 'serverSide',
      //       pagination: true,
      //       paginationAutoPageSize: true,
      //       columnDefs: [
      //         {headerName: 'Sectional Name',field: 'secname'},
      //         {headerName: 'Questions Attempted',field: 'attendedquestions', cellClass: 'alignCenter',
      //           cellRenderer: (params) => {
      //             if (params.value != undefined && params.value) {
      //               return params.value +'/' + (params.data.overallquestions ? params.data.overallquestions: '-');
      //             } else {
      //               return '-';
      //             }
      //           },
      //         },
      //         {headerName: 'Score Obtained',field: 'score',cellClass: 'alignCenter'},
      //         {
      //           headerName: 'Percentage',
      //           field: 'accuracy',
      //           cellRenderer: (params) => {
      //             if (params.value != null && params.value <= 40) {
      //               return `<div class="progessbar red-btn" style="width: `+params.value+`%;">`+params.value+`</div>`;
      //             }
      //             if (params.value != null && params.value >= 40 && params.value < 80 ) {
      //               return `<div class="progessbar yellow-btn" style="width: `+params.value+`%;">`+params.value+`</div>`;
      //             } if(params.value != null && params.value >=80 && params.value < 90){
      //               return `<div class="progessbar blue-btn" style="width: `+params.value+`%;">`+params.value+`</div>`;
      //             }
      //             if (params.value != null && params.value >=90){
      //               return `<div class="progessbar green-btn" style="width: `+params.value+`%; ">`+params.value+`</div>`;
      //             } if(params.value !== undefined && params.value == 'null' && params.value == null ){
      //               return params.value = '-';
      //             }else {
      //               return '-';
      //             }
      //           },
      //         },
      //       ],
      //       defaultColDef: { flex: 1 },
      //     };
      //   }
      //   return res;
      // }
  ]
 
 
  }

  getSubTableDef(){
    
 
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // let candidateDefinition =  this.tabledef();
    //  console.log(candidateDefinition,'candidateDefinition')
    this.gridApi.setColumnDefs( this.tabledef());
    this.gridApi.closeToolPanel();
    this.sizeToFit();
    this.callApiForCandidateList();

    
  }


  callApiForCandidateList() {

    var datasource = {
      getRows: (params: IGetRowsParams) => {
      let apiData: any = params;
      this.gridApi.showLoadingOverlay();
      // console.log(apiData)
      if(apiData.sortModel && apiData.sortModel.length > 0){
        apiData.sortModel.forEach(element => {
            if(element.sort == 'asc'){
                element.sort = 1
            }else{
              element.sort = -1
            }
        });
      }
     this.candidateListSubscription =  this.ApiService.getHiringReport(apiData).subscribe((data1: any) => {
        this.gridApi.hideOverlay();
        this.userList = data1 && data1.data ? data1.data: [];
        if (this.userList.length > 0) {
        let count = params.startRow;
        this.userList.forEach((element, i) => {
          count = count + 1;
          // element['counter'] = count;
        });
        this.pageRowCount = data1 && data1.total_count ? data1.total_count : 0;
        params.successCallback(
          this.userList, this.pageRowCount
        );
      } else {
        params.successCallback(
          this.userList, 0
        );
        this.gridApi.showNoRowsOverlay();
      }
      }, (err) => {
        this.gridApi.hideOverlay();
        params.failCallback();
        params.successCallback(
          this.userList, this.pageRowCount
        );
        this.gridApi.showNoRowsOverlay();
      });
      }
    }
    this.gridApi.setDatasource(datasource);

    // console.log( datasource)
}

  onBack(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.USERLIST);
  }

  // getHiringReportDetails(){
  //   let data ={
  //     pagenumber: 0
  //   }
  //   this.ApiService.getHiringReport(data).subscribe((res: any)=> {
  //     if(res){
  //       this.rowData = res.data;
  //     }else {
  //         this.toastr.warning('Please try after sometimes...')
  //     }
  //   })
  // }
  
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  getModel(e) {
    // const filteredArray = this.gridApi.getModel().rootNode.childrenAfterFilter;
    // if(e.filterInstance.appliedModel == null){
    //   this.gridApi.getModel(null);
    //     // this.tabledef();
    // }else {
    //   filteredArray.forEach(element => {
    //     element.data.isFilter = true;
    //     // this.tabledef();
    // });

    // }
  }

  onCellClicked(event) {
    if (event.column.userProvidedColDef.headerName == 'Email') {
      let email = event['data']['email'] ? this.ApiService.encrypt(event['data']['email']) : '';
      this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS, email);
    }
  }
}
