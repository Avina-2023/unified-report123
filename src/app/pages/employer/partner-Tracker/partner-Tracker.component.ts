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
  ApexGrid
} from "ng-apexcharts";

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
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
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
      series: [
        {
          // name: "Inflation",
          // data: [3, 7, 21, 35]
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "10%",
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
          "Jan",
          "Feb"
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
              stops: [0, 100],
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
        colors: ["#EF2917"]
      },
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + "";
          }
        }
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

    // this.chartOptions2 = {
    //   series: [
    //     {
    //       // name: "distibuted",
    //       // data: [21, 10]
    //       data: []
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar",
    //     events: {
    //       click: function (chart, w, e) {
    //       }
    //     }
    //   },
    //   colors: [
    //     "#FFB74D",
    //     "#EF2917",
    //   ],
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "10%", 
    //       distributed: true,
    //       dataLabels: {
    //         position: "top",
    //       }
    //     }
    //   },
    //   legend: {
    //     show: false
    //   },
    //   grid: {
    //     show: false
    //   },
    //   xaxis: {
    //     categories: [
    //       ["Job", "Posted"],
    //       ["Internship", "Posted"]
    //     ],
    //     labels: {
    //       style: {
    //         colors: [
    //           "#FFB74D",
    //           "#EF2917",
    //         ],
    //         fontSize: "12px"
    //       }
    //     }
    //   }
    // };

    this.chartOptions2 = {
      series: [
        {
          // name: "Inflation",
          // data: [3, 7, 21, 35]
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "10%",
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
          "Jan",
          "Feb"
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
              stops: [0, 100],
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
        colors: ["#EF2917"]
      },
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + "";
          }
        }
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
    // this.getPartneragGridData({ year: this.selectedYear, month: this.selectedMonth });
    // console.log(this.selectedYear, this.selectedMonth , 'Changing month and year:');

    const year = +this.selectedYear;
    const month = +this.selectedMonth;
    this.getPartneragGridData({ year, month });
    console.log(year, month, 'Changing month and year:');
  }

  rowData = [];

  columnDefs = [
    { headerName: 'Date', resizable: true, field: 'date', cellStyle: { 'border-right-color': '#e2e2e2' }, },
    {
      headerName: 'No Of Partners', resizable: true, cellStyle: { 'border-right-color': '#e2e2e2' },
      children: [
        { headerName: 'Day', resizable: true, cellStyle: { 'border-right-color': '#e2e2e2' }, field: 'dayCount', },
        { headerName: 'YTD', resizable: true, cellStyle: { 'border-right-color': '#e2e2e2' }, field: 'ytdCount' },
      ]
    },
    {
      headerName: 'Hiring Partners', resizable: true,
      children: [
        {
          headerName: 'Jobs', resizable: true,
          children: [
            { headerName: 'Day', resizable: true, field: 'hirJobDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true, field: 'hirJobYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
        {
          headerName: 'Internships', resizable: true,
          children: [
            { headerName: 'Day', resizable: true, field: 'hirInternDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true, field: 'hirInternYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

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
            { headerName: 'Day', resizable: true, field: 'openJobDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true, field: 'openJobYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
        {
          headerName: 'Internships', resizable: true,
          children: [
            { headerName: 'Day', resizable: true, field: 'openInternDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true, field: 'openInternYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
      ]
    }

  ];

  // getPartneragGridData(obj) {
  //   this.apiService.getPartnerTrackerReport(obj).subscribe((response: any) => {
  //     if (response.success) {
  //       this.partnerData = response.data
  //       console.log(this.partnerData, 'partnerDatapartnerData');
  //       this.rowData = response?.data?.reportData
  //       console.log(this.rowData, 'rowDatarowData');
  //       this.barchartData = [
  //         this.partnerData.chartData.hirJobTotal,
  //         this.partnerData.chartData.hirInternshipTotal
  //       ]
  //       console.log(this.barchartData,'aaaaaaaaaaaa')
  //       // this.chartOptions.series[0].data.push(...this.barchartData)
  //       this.chartOptions.series[0].data = this.barchartData;
  //       if (this.partnerData == null) {
  //         this.rowData = [];
  //       }
  //     }
  //   })
  // }

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

  // getPartneragGridData(obj) {
  //   this.rowData = [];
  //   this.apiService.getPartnerTrackerReport(obj).subscribe(
  //     (response: any) => {
  //       if (response.success) {
  //         this.partnerData = response.data;
  //         console.log(this.partnerData, 'partnerData');
  //         this.rowData = response?.data?.reportData;
  //         console.log(this.rowData, 'rowData');
  //       }
  //     },(error) => {
  //       console.error('API Error:', error);
  //       this.rowData = []; // Set rowData to an empty array on API error
  //     }
  //   );
  // }

  exportPartnerData() {
    this.gridApi.exportDataAsExcel();
  }

}
