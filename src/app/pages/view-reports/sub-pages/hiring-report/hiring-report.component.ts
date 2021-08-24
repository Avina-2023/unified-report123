import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
@Component({
  selector: 'app-hiring-report',
  templateUrl: './hiring-report.component.html',
  styleUrls: ['./hiring-report.component.scss']
})
export class HiringReportComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public columnDefs;
  public defaultColDef;
  public detailCellRendererParams;
  public rowData = [
    {
      "fname": "Venkadesh",
      "lname":"SR",
      "mobile": "6379139868",
      "email": "venkatdoss1989@gmail.com",
      "testtype":"Aptitude",
      "testname":"Cognitive Abilities",
      "taken":"18th Aug 2021",
      "tscore":"15.58 / 54",
      "completion":"Completed",
      "rating":"Strong",
      "callRecords": [{
          "name": "Quantitative Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "",
      "lname":"",
      "mobile": "",
      "email": "",
      "testtype":"English Language",
      "testname":"English Language",
      "taken":"18th Aug 2021",
      "tscore":"20 / 50",
      "completion":"Not Completed",
      "rating":"Strong",
      "callRecords": [{
          "name": "Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical2",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "",
      "lname":"",
      "mobile": "",
      "email": "",
      "testtype":"Coding",
      "testname":"Coding",
      "taken":"18th Aug 2021",
      "tscore":"20 / 50",
      "completion":"Completed",
      "rating":"Strong",
      "callRecords": [{
          "name": "Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical2",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "",
      "lname":"",
      "mobile": "",
      "email": "",
      "testtype":"Personlity & Behaviour",
      "testname":"Personlity & Behaviour",
      "taken":"18th Aug 2021",
      "tscore":"20 / 50",
      "completion":"Not Completed",
      "rating":"Strong",
      "callRecords": [{
          "name": "Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical2",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "Ankit",
      "lname":"ANK",
      "mobile": "774934922",
      "email": "ankit@gmail.com",
      "testtype":"Aptitude",
      "testname":"Cognitive Abilities",
      "taken":"18th Aug 2021",
      "tscore":"15.58 / 54",
      "completion":"Not Completed",
      "rating":"Strong",
      "callRecords": [{
          "name": "Quantitative Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "",
      "lname":"",
      "mobile": "",
      "email": "",
      "testtype":"English Language",
      "testname":"English Language",
      "taken":"18th Aug 2021",
      "tscore":"20 / 50",
      "completion":"Completed",
      "rating":"Strong",
      "callRecords": [{
          "name": "Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical2",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "",
      "lname":"",
      "mobile": "",
      "email": "",
      "testtype":"Coding",
      "testname":"Coding",
      "taken":"18th Aug 2021",
      "tscore":"20 / 50",
      "completion":"Completed",
      "rating":"Weak",
      "callRecords": [{
          "name": "Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical2",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    },
    {
      "fname": "",
      "lname":"",
      "mobile": "",
      "email": "",
      "testtype":"Personlity & Behaviour",
      "testname":"Personlity & Behaviour",
      "taken":"18th Aug 2021",
      "tscore":"20 / 50",
      "completion":"Completed",
      "rating":"Weak",
      "callRecords": [{
          "name": "Ability",
          "QT": "13/20",
          "SO": 2.4,
          "percentage": "17%",
      }, {
        "name": "Analytical2",
        "QT": "15/20",
        "SO": 2.4,
        "percentage": "17%",
      }]
    }

  ]

  constructor(private appconfig: AppConfigService) { 
    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'fname',
        tooltipField:'fname',
       
      },
      {
        headerName: 'Last Name',
        field: 'lname',
        tooltipField:'lname',
      },
      {
        headerName: 'Mobile No',
        field: 'mobile',
        tooltipField:'mobile',
      },
      {
        headerName: 'Email',
        field: 'email',
        tooltipField:'email',
      },
      {
        headerName: 'Test Type',
        field: 'testtype',
        tooltipField:'testtype',
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'Test Name',
        field: 'testname',
        tooltipField:'testname',
      },
      {
        headerName: 'Test Taken on',
        field: 'taken',
        tooltipField:'taken',
      },
      {
        headerName: 'Total Score',
        field: 'tscore',
        tooltipField:'tscore',
      },
      {
        headerName: 'Completion',
        field: 'completion',
        tooltipField:'completion',
      cellRenderer: (params) => {
        if(params.value == 'Completed'){
          return `<i class="material-icons green">check</i>`
        } if (params.value == 'Not Completed'){
          return `<i class="material-icons  red">close</i>`
        }else {
          return '';
        }
      }
      },

      {
        headerName: 'Rating',
        field: 'rating',
        cellRenderer: (params) => {
          if(params.value == 'Strong'){
            return `<span><button  class="btn btn-green">`+params.value+`</button></span>`;
          }if(params.value == 'Weak') {
            return `<span><button  class="btn btn-yellow">`+params.value+`</button></span>`;
          } else {
             return '';
          }
        }
      },

    ];
    this.defaultColDef = { flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true, };
 
    this.detailCellRendererParams = {
      detailGridOptions: {
        suppressRowClickSelection: true,
        enableRangeSelection: true,
        pagination: true,
        paginationAutoPageSize: true,
        columnDefs: [
          {
            headerName: 'Sectional Name',
            field: 'name',
          },
          { 
            headerName: 'Questions Attempted',
            field: 'QT'
           },
          {
            headerName: 'Score Obtained',
            field: 'SO',
          },
          {
            headerName: 'Percentage',
            field: 'percentage',
          },
        ],
        defaultColDef: {
          sortable: true,
          flex: 1,
        },
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
      },
    };
  }

  ngOnInit(): void {
  }

  onFirstDataRendered(params) {
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(false);
    }, 0);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.closeToolPanel();
  }

  onBack(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.USERLIST);
  }

}
