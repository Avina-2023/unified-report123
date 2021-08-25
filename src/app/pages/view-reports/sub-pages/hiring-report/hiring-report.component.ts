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
  rowData:any
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public detailCellRendererParams;

  constructor(private appconfig: AppConfigService,private toastr: ToastrService, private ApiService: ApiService,) {      
    this.getHiringReportDetails();
    this.defaultColDef = { 
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true 
    };
  

  }

  ngOnInit(): void {
    this.tabledef();
  }

  // onFirstDataRendered(params) {
  //   this.gridApi = params.api;
  //   setTimeout(function () {
  //     if(params.data.){
  //       this.detailCellRendererParams = {
  //         detailGridOptions: {
  //           suppressRowClickSelection: true,
  //           enableRangeSelection: true,
  //           pagination: true,
  //           paginationAutoPageSize: true,
  //           resizable: true,
  //           columnDefs: [
  //             {
  //               headerName: 'Sectional Name',
  //               field: 'secname',
  //             },
  //             { 
  //               headerName: 'Questions Attempted',
  //               field: 'attendedquestions',
  //               cellRenderer: (params) => {
  //                 if(params.value != undefined && params.value){
  //                   return params.value +'/'+ (params.data.overallquestions ? params.data.overallquestions : '-') 
  //                 }else {
  //                   return '-';
  //                 }
  //               }
  //              },
  //             {
  //               headerName: 'Score Obtained',
  //               field: 'score',
  //             },
  //             {
  //               headerName: 'Percentage',
  //               field: 'accuracy',
  //               cellRenderer: (params) => {
  //                 if(params.value != undefined && params.value){
  //                   return params.value +'%' 
  //                 }else {
  //                   return '-';
  //                 }
  //               }
  //             },
  //           ],
  //           defaultColDef: {
  //             sortable: true,
  //             flex: 1,
  //           },
  //         },
          
  //         getDetailRowData: function (params) {
  //           console.log(params)
  //           params.successCallback(params.data.section);
  //         },
  //       };
  //     }else {
  //       this.detailCellRendererParams = {
  //         detailGridOptions: {
  //           suppressRowClickSelection: true,
  //           enableRangeSelection: true,
  //           pagination: true,
  //           paginationAutoPageSize: true,
  //           resizable: true,
  //           columnDefs: [
  //             {
  //               headerName: 'Skill Name',
  //               field: 'skillname',
  //             },
  //             { 
  //               headerName: 'Sten Score',
  //               field: 'stenScore',
  //              },
  //           ],
  //           defaultColDef: {
  //             sortable: true,
  //             flex: 1,
  //           },
  //         },
          
  //         getDetailRowData: function (params) {
  //           params.successCallback(params.data.skills);
  //         },
  //       };
  //     }
  
  //     // params.api.getDisplayedRowAtIndex(1).setExpanded(false);
  //   }, 0);
  // }



  tabledef(){
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'firstname',
        tooltipField:'firstname',    
        width: 100,
      },
      {
        headerName: 'Last Name',
        field: 'lastname',
        tooltipField:'lastname',
        width: 100,
      },
      {
        headerName: 'Mobile No',
        field: 'mobile',
        tooltipField:'mobile',
        width: 100,
      },
      {
        headerName: 'Email',
        field: 'email',
        tooltipField:'email',
        width: 100,
      },
      {
        headerName: 'Test Type',
        field: 'testtype',
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
        tooltipField:'testname',
        cellRenderer: 'agGroupCellRenderer',
        width: 200,
        
      },
      {
        headerName: 'Test Taken on',
        field: 'testdate',
        tooltipField:'testdate',
        width: 100,
      },
      {
        headerName: 'Score',
        field: 'testscore',
        tooltipField:'testscore',
        width: 100,
        cellRenderer: (params) => {
          if(params.value != undefined && params.value){
            return params.value +'/'+ (params.data.testmaxscore ? params.data.testmaxscore : '-') 
          }else {
            return '-';
          }
        }
      },
      // {
      //   headerName: 'Total Score',
      //   field: 'testmaxscore',
      //   tooltipField:'testmaxscore',
      // },
      {
        headerName: 'Completion',
        field: 'completion',
        width: 100,
      cellRenderer: (params) => {
        if(params.value == true){
          return `<i class="material-icons green">check</i>`
        } if (params.value == false){
          return `<i class="material-icons  red">close</i>`
        }else {
          return '-';
        }
      }
      },

      {
        headerName: 'Rating',
        field: 'rating',
        width: 100,
        cellRenderer: (params) => {
          if(params.data){
            if(params.data.testscore < 40){
              return `<span><button class="btnsm red-btn">Weak</button></span>`;
            }if(params.data.testscore >=40 && params.data.testscore < 80) {
              return `<span><button class="btnsm yellow-btn">Average</button></span>`;
            } if(params.data.testscore >=90){
              return `<span><button class="btnsm green-btn">Excellent</button></span>`;
            } else{
              return '-';
            }
          }else {
             return '-';
          }
        }
      },
    ];

    this.detailCellRendererParams = {
      detailGridOptions: {
        suppressRowClickSelection: true,
        enableRangeSelection: true,
        pagination: true,
        paginationAutoPageSize: true,
        resizable: true,
        columnDefs: [
          {
            headerName: 'Sectional Name',
            field: 'secname',
          },
          { 
            headerName: 'Questions Attempted',
            field: 'attendedquestions',
            cellRenderer: (params) => {
              if(params.value != undefined && params.value){
                return params.value +'/'+ (params.data.overallquestions ? params.data.overallquestions : '-') 
              }else {
                return '-';
              }
            }
           },
          {
            headerName: 'Score Obtained',
            field: 'score',
          },
          {
            headerName: 'Percentage',
            field: 'accuracy',
            cellRenderer: (params) => {
              if(params.value != undefined && params.value){
                return params.value +'%' 
              }else {
                return '-';
              }
            }
          },
        ],
        defaultColDef: {
          sortable: true,
          flex: 1,
        },
      },
      
      getDetailRowData: function (params) {
        console.log(params)
        params.successCallback(params.data.section);
      },
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
      this.rowData = res.data;
    })
  }
  
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
}
