import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ApexAxisChartSeries, ApexChart, ChartComponent, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexTitleSubtitle, ApexXAxis, ApexFill, ApexLegend,
  ApexGrid,ApexOptions
} from "ng-apexcharts";

import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-partner-Tracker',
  templateUrl: './partner-Tracker.component.html',
  styleUrls: ['./partner-Tracker.component.scss']
})
export class PartnerTrackerComponent implements OnInit {

  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public defaultColDef: ColDef;
  public gridColumnApi;
  public rowModelType;
  public rowSelection = 'multiple';
  public serverSideStoreType;
  overallreportdata: any;
  selectedYear: number;
  selectedMonth: number;
  years: number[] = [];
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];


  public overlayNoRowsTemplate = ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions:any;
  // public chartOptions2: Partial<ChartOptions>;
  public chartOptions2:any;
  partnerData: any;
  public themeClass: string = "ag-theme-quartz";
  barchartData: any[];
  barchartData2: any[];
  constructor(
    private router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) {

    this.chartOptions = {
      tooltip: {
        enabled: false,
      },
      series: [
        {
          // name: "Inflation",
          // data: [7, 21]
          data: [],
          tooltip:{
            enabled:false
          }
        }
      ],
      chart: {
        height: 250,
        type: "bar",
        toolbar: {
          show: false
        }
      },
     
  
      plotOptions: {
        bar: {
          columnWidth: "10%",
          distributed: true,
          dataLabels: {
            position: "top" // top, center, bottom
          },
          // tooltip:{
          //   show:false,
          //   enabled:false
          // }
        }
      },
      // legend: {
      //   show: false
      // },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [
          "Jobs Posted",
          "Internships Posted"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 115],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        }
      },
      fill: {
        colors: ["#FFB74D","#EF2917"]
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: true
        },
        // labels: {
        //   show: true,
        //   formatter: function (val) {
        //     return val + "";
        //   }
        // }
      },
      title: {
        // text: "Monthly Inflation in Argentina, 2002",
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };

    this.chartOptions2 = {
      tooltip: {
        enabled: false,
      },
      series: [
        {
          // name: "Inflation",
          // data: [7, 21]
          data: [],
          tooltip: {
            enabled: false,
          },
        }
      ],
      chart: {
        height: 250,
        type: "bar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "10%",
          distributed: true,
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [
          "Jobs Posted",
          "Internships Posted"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 115],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        colors: ["#FFB74D","#EF2917"]
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: true
        },
        // labels: {
        //   show: true,
        //   formatter: function (val) {
        //     return val + "";
        //   }
        // }
      },
      title: {
        // text: "Monthly Inflation in Argentina, 2002",
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
    
  }

  ngOnInit() {
    this.getCurrentMonth();
    //this.getagGridData();
    this.generateYearOptions();
  }


  onGridReady(params) {
    this.gridApi = params.api;
  }

  getCurrentMonth() {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1; // Months are 0-based
    this.getPartneragGridData({ year: this.selectedYear, month: this.selectedMonth });
  }

  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let year = 2019; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  changeMonthYear() {
    const year = +this.selectedYear;
    const month = +this.selectedMonth;
    this.getPartneragGridData({ year, month });
    console.log(year, month, 'Changing month and year:');
  }

  rowData = [];

  columnDefs = [
    { headerName: 'Date', resizable: true, maxWidth: 130, field: 'date', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' },
      valueFormatter: function (params) { return moment(params.value, 'DD-MM-YYYY').format('D-MMM-YYYY'); }, },
    {
      headerName: 'No of Partners', resizable: true, cellStyle: { 'border-right-color': '#e2e2e2' },
      children: [
        { headerName: 'Day', resizable: true,  maxWidth: 110,   cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, field: 'dayCount', },
        { headerName: 'YTD', resizable: true,  maxWidth: 110,   cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, field: 'ytdCount' },
      ]
    },
    {
      headerName: 'Hiring Partners', resizable: true,
      children: [
        {
          headerName: 'Jobs', resizable: true,
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 110,   field: 'hirJobDayCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 110,   field: 'hirJobYtdCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },

          ]
        },
        {
          headerName: 'Internships', resizable: true,
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 112,   field: 'hirInternDayCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 112,   field: 'hirInternYtdCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },

          ]
        },
      ]
    },
    {
      headerName: 'Open Market', resizable: true,
      children: [
        {
          headerName: 'Jobs', resizable: true,
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 112,   field: 'openJobDayCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 112,   field: 'openJobYtdCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },

          ]
        },
        {
          headerName: 'Internships', resizable: true,
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 112,   field: 'openInternDayCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 112,   field: 'openInternYtdCount', cellStyle: { 'border-right-color': '#e2e2e2', 'text-align': 'right' }, },

          ]
        },
      ]
    }

  ];

  getPartneragGridData(obj) {
    this.apiService.getPartnerTrackerReport(obj).subscribe((response: any) => {
      if (response.success) {
        this.partnerData = response.data;
        console.log(this.partnerData, 'partnerDatapartnerData');
        this.rowData = response?.data?.reportData;
        this.barchartData = [
          this.partnerData.chartData.hirJobTotal,
          this.partnerData.chartData.hirInternshipTotal
        ];
        console.log(this.barchartData, 'barchartData');
        this.chartOptions.series[0].data = this.barchartData;
        this.barchartData2 = [
          this.partnerData.chartData.openJobTotal,
          this.partnerData.chartData.openInternshipTotal
        ];
        console.log(this.barchartData2, 'barchartData2');
        this.chartOptions2.series[0].data = this.barchartData2;
        if (this.partnerData == null) {
          this.rowData = [];
        }
      } else {
        console.error("API request failed:", response.errorMessage);
      }
    });
  }

  exportPartnerData() {
    if (this.gridApi) {
      const params = {
        columnGroups: true,
        allColumns: true,
        fileName: 'Month-wise_Partner_Tracker.xlsx',
        sheetName: 'Month-wise_Partner_Tracker',
        domLayout: 'autoHeight', 
      };
      this.gridApi.exportDataAsExcel(params);
    }
  }

}