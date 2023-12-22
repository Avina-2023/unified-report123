import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ChartComponent, ApexDataLabels, ApexPlotOptions, ApexYAxis, ApexTitleSubtitle, ApexXAxis, ApexFill
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

  public overlayNoRowsTemplate =
  ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';

  // columnDefs: any = [];

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private router:Router,
  ) { 
    this.chartOptions = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          },
          columnWidth: "10%", 
        }
      },
      dataLabels: {
        enabled: true,
        // formatter: function(val) {
        //   return val + "%";
        // },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
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
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "light",
      //     type: "horizontal",
      //     shadeIntensity: 0.25,
      //     gradientToColors: undefined,
      //     inverseColors: true,
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [50, 0, 100, 100]
      //   }
      // },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          // formatter: function(val) {
          //   return val + "%";
          // }
        }
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        // floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  } 

  ngOnInit() { }


  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  // columnDefs = [
  //   { headerName: 'Make', field: 'make' },
  //   { headerName: 'Model', field: 'model' },
  //   { headerName: 'Price', field: 'price' }
  // ];

  columnDefs = [
    { headerName: 'Parent 1', field: 'make' },
    {
      headerName: 'Parent 2',
      children: [
        { headerName: 'Child 1', field: 'model' },
        { headerName: 'Child 2', field: 'price' },
        { headerName: 'Child 3', field: 'make' }
      ]
    },
    {
      headerName: 'Parent 3',
      children: [
        { headerName: 'Child 1', field: 'price' },
        {
          headerName: 'Child 2',
          children: [
            { headerName: 'Grandchild 1', field: 'make' },
            { headerName: 'Grandchild 2', field: 'model' }
          ]
        }
      ]
    },
    { headerName: 'Parent 4', field: 'model' },
   
  ];

  getagGridData(){


    
  }

  exportData(){
    this.router.navigate(['/auth/overall-reports'])
  }

}
