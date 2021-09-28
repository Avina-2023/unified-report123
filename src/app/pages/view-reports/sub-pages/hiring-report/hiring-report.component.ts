import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { ApiService } from '../../../../services/api.service';
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
  reportsData: any;

  constructor(private appconfig: AppConfigService,private toastr: ToastrService, private ApiService: ApiService,) {      
    this.getHiringReportDetails();
    this.defaultColDef = { 
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
       floatingFilter: true, 
    };
  }

  ngOnInit(): void {
    this.tabledef();
  }

  tabledef(){
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'firstname',
        filter: 'agTextColumnFilter',
        tooltipField:'firstname',    
        width: 100,
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
        width: 100,
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
        width: 100 ,
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
        width: 100,
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
        width: 200,
      },
      {
        headerName: 'Test Taken on',
        filter: 'agDateColumnFilter',
        field: 'testdate',
        tooltipField:'testdate',
        width: 100,
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
        width: 100,
        cellRenderer: (params) => {
          if(  params.value != null && params.value / params.data.testmaxscore * 100 <= 40){
            return `<div class="progessbar red-btn"  style="width: `+''+params.value+`%;">`+params.value+`</div>`;
          }
          if ( params.value != null && params.value / params.data.testmaxscore * 100 >= 40 && params.value / params.data.testmaxscore * 100 < 80 ) {
            return `<div class="progessbar yellow-btn"  style="width: `+''+params.value+`%;">`+params.value +`</div>`;
          } 
          if(params.value != null && params.value / params.data.testmaxscore * 100 >=80 && params.value / params.data.testmaxscore * 100 < 90){
            return `<div class="progessbar blue-btn" style="width: `+''+params.value+`%;">`+params.value+`</div>`;
          }if (params.value != null && params.value / params.data.testmaxscore * 100 >=90){
            return `<div class="progessbar green-btn" style="width: `+''+params.value+`%; ">`+params.value +`</div>`;
          } if(params.value !== undefined && params.value == 'null' && params.value == null  && params.data.testmaxscore == null){
            return params.value = '-';
          }else {
            return '-';
          }
        },
      },
      {
        headerName: 'Maxscore',
        field: 'testmaxscore',
        filter: 'agNumberColumnFilter',
        tooltipField:'testmaxscore',
        width: 100,
        cellClass: 'alignCenter',
        cellRenderer: (params) => {
          if(params.value){
            return  ''+params.value
          } else {
            return '-';
          }
        }
      },
      {
        headerName: 'Completion',
        field: 'completion',
        filter: 'agTextColumnFilter',
        width: 100,
      cellRenderer: (params) => {
        if(params.value == true){
          return `<i class="material-icons green">check</i>`
        } if (params.value == false){
          return `<i class="material-icons red">close</i>`
        }else {
          return '-';
        }
      }
      },

      {
        headerName: 'Rating',
        field: 'rating',
        filter: 'agTextColumnFilter',
        width: 100,
        cellRenderer: (params) => {
          if(params.value){
            if(params.value == 'Weak'){
              return `<span><button class="btnsm red-btn">`+params.value +`</button></span>`;
            }if(params.value == 'Average') {
              return `<span><button class="btnsm yellow-btn">`+params.value +`</button></span>`;
            } if(params.value == 'Excellent'){
              return `<span><button class="btnsm green-btn">`+params.value +`</button></span>`;
            }  if(params.value == 'Good'){
              return `<span><button class="btnsm blue-btn">`+params.value +`</button></span>`;
            }
            
            else {
              return '-';
            }
          }else {
             return '-';
          }
        }
      },
    ];
    this.getSubTableDef();
  }

  getSubTableDef(){
    this.detailCellRendererParams = function (params) {
      var res: any = {};
      res.getDetailRowData = function (params) {
        params.successCallback(params.data.section);
      };
      if (params.data && params.data.testtype === 'Personality & Behaviour') {
        res.detailGridOptions = {
          rowSelection: 'multiple',
          suppressRowClickSelection: true,
          enableRangeSelection: true,
          pagination: true,
          paginationAutoPageSize: true,
          columnDefs: [
            { headerName: 'Skill Name', field: 'skillname' },
            { headerName: 'Sten Score', field: 'stenScore' },
          ],
          defaultColDef: {flex: 1},
        };
      } else {
        res.detailGridOptions = {
          rowSelection: 'multiple',
          suppressRowClickSelection: true,
          enableRangeSelection: true,
          pagination: true,
          paginationAutoPageSize: true,
          columnDefs: [
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
                  return `<div class="progessbar red-btn" style="width: `+params.value+`%;">`+params.value+`</div>`;
                }
                if (params.value != null && params.value >= 40 && params.value < 80 ) {
                  return `<div class="progessbar yellow-btn" style="width: `+params.value+`%;">`+params.value+`</div>`;
                } if(params.value != null && params.value >=80 && params.value < 90){
                  return `<div class="progessbar blue-btn" style="width: `+params.value+`%;">`+params.value+`</div>`;
                }
                if (params.value != null && params.value >=90){
                  return `<div class="progessbar green-btn" style="width: `+params.value+`%; ">`+params.value+`</div>`;
                } if(params.value !== undefined && params.value == 'null' && params.value == null ){
                  return params.value = '-';
                }else {
                  return '-';
                }
              },
            },
          ],
          defaultColDef: { flex: 1 },
        };
      }
      return res;
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.closeToolPanel();
    this.sizeToFit();
  }

  onBack(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.USERLIST);
  }

  getHiringReportDetails(){
    this.ApiService.getHiringReport().subscribe((res: any)=> {
      if(res){
        this.rowData = res.data;
      }else {
          this.toastr.warning('Please try after sometimes...')
      }
    })
  }
  
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
