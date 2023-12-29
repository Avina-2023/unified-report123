import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-Tracker',
  templateUrl: './student-Tracker.component.html',
  styleUrls: ['./student-Tracker.component.scss']
})
export class StudentTrackerComponent implements OnInit {
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  public defaultColDef: ColDef;
  public gridColumnApi;
  public rowModelType;
  public rowSelection = 'multiple';
  public serverSideStoreType;
  overallreportdata: any;

  public overlayNoRowsTemplate =
  ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';

  colorconfig = [
    {
      color: '#DC3545',
      bgcolor: '#DC354514'
    },
    {
      color: '#007BFF',
      bgcolor: '#007BFF14'
    },
    {
      color: '#FFC107',
      bgcolor: '#FFC10714'
    },
    {
      color: '#7388A9',
      bgcolor: '#4CAF5014'
    }
  ]

  // progress bar chart 1
  public options: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: false
      }
    },

    cutoutPercentage: 70
  }

  public doughnutChartColors: Colors[] = [{
    backgroundColor:
      [
        '#2862FF',
        '#5289C9',
        '#EB4A8A',
        '#FF6A81',
      ],

  }
  ];

  doughnutChartLabels: Label[] = ['Skill Profiles Filled', 'Open Job Views', 'Internship Applications', 'Job Applications'];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';

  constructor(
    private router:Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) { } 

  ngOnInit() {
    this.getOverAllReport();
   }


  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

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

  getOverAllReport() {
    this.apiService.getOverAllReport(data).subscribe((response: any) => {
      if (response.success) {
        this.overallreportdata = response.data
        let chartData = [
          this.overallreportdata.eduTechReport.skillProfileCount,
          this.overallreportdata.eduTechReport.openJobViewCount,
          this.overallreportdata.eduTechReport.internshipApplicationCount,
          this.overallreportdata.eduTechReport.jobApplicationCount
        ]
        this.doughnutChartData.push(chartData);
        console.log(this.overallreportdata, 'overallreportdata');
      }
    })
  }

}
