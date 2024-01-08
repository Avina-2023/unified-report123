import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { AgGridAngular } from 'ag-grid-angular';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
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
        '#FFB74D',
        '#56B35A',
        '#EF2917',
      ],
  }
  ];
  doughnutChartLabels: Label[] = ['Trained', 'Assessed', 'Others'];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  public options2: ChartOptions = {
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
  public doughnutChartColors2: Colors[] = [{
    backgroundColor:
      [
        '#FFB74D',
        '#56B35A',
        '#EF2917',
      ],
  }
  ];
  doughnutChartLabels2: Label[] = ['Trained', 'Assessed', 'Others'];
  doughnutChartData2: MultiDataSet = [];
  doughnutChartType2: ChartType = 'doughnut';
  studentData: any;
  public themeClass: string = "ag-theme-quartz";
  studentChartData: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) { }

  ngOnInit() {
    this.getCurrentMonth();
    //this.getagGridData();
    this.generateYearOptions();
  }

  //  getCurrentMonth(){
  //   const currentYear = '2023';//this.currentyear using js
  //     const currentMonth = '10'
  //     let obj = {
  //       "year": currentYear,
  //       "month": currentMonth
  //   }
  //   this.getagGridData(obj);
  //  }

  //  changeMonthYear(){
  //   const currentYear = '2023'; // get the current changed value in select dropdown
  //     const currentMonth = '10';
  //   let changedDate = {
  //     "year": currentYear,
  //     "month": currentMonth 
  //   }
  //   this.getagGridData(changedDate);
  //  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  getCurrentMonth() {
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1; // Months are 0-based
    this.getagGridData({ year: this.selectedYear, month: this.selectedMonth });
  }

  generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let year = 2019; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  changeMonthYear() {
    // this.getagGridData({ year: this.selectedYear, month: this.selectedMonth });
    // console.log(this.selectedYear, this.selectedMonth, 'Changing month and year:');

    const year = +this.selectedYear;
    const month = +this.selectedMonth;
    this.getagGridData({ year, month });
    console.log(year, month, 'Changing month and year:');
  }

  rowData = [];

  columnDefs = [
    // { headerName: 'Date', resizable: true,  maxWidth: 130,  field: 'date', cellStyle: { 'border-right-color': '#e2e2e2' }, },
    { headerName: 'Date', resizable: true, maxWidth: 130, field: 'date', cellStyle: { 'border-right-color': '#e2e2e2' },
      valueFormatter: function (params) { return moment(params.value, 'DD-MM-YYYY').format('D-MMM-YYYY'); }, },
    {
      headerName: 'Registrations', resizable: true,  cellStyle: { 'border-right-color': '#e2e2e2' },
      children: [
        { headerName: 'Day', resizable: true,  maxWidth: 91,  cellStyle: { 'border-right-color': '#e2e2e2' }, field: 'regDayCount', },
        { headerName: 'YTD', resizable: true,  maxWidth: 91,  cellStyle: { 'border-right-color': '#e2e2e2' }, field: 'regYtdCount' },
      ]
    },
    {
      headerName: 'Skill Profile', resizable: true,
      children: [
        { headerName: 'Day', resizable: true,  maxWidth: 91,  field: 'profDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
        { headerName: 'YTD', resizable: true,  maxWidth: 91,  field: 'profYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
      ]
    },
    {
      headerName: 'L&T EduTech Trained', resizable: true,  
      children: [
        {
          headerName: 'Registrations', resizable: true,
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 91,  field: 'trainRegDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 91,  field: 'trainRegYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
        {
          headerName: 'Profile Filled', resizable: true, 
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 91,  field: 'trainProfDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 91,  field: 'trainProfYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
      ]
    },
    {
      headerName: 'L&T EduTech Assessed', resizable: true,
      children: [
        {
          headerName: 'Registrations', resizable: true, 
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 91,  field: 'assessRegDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 91,  field: 'assessRegYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
        {
          headerName: 'Profile Filled', resizable: true,
          children: [
            { headerName: 'Day', resizable: true,  maxWidth: 91,  field: 'assessProfDayCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },
            { headerName: 'YTD', resizable: true,  maxWidth: 91,  field: 'assessProfYtdCount', cellStyle: { 'border-right-color': '#e2e2e2' }, },

          ]
        },
      ]
    }

  ];

  // getagGridData(obj) {
  //   this.apiService.getStudentTrackerReport(obj).subscribe((response: any) => {
  //     if (response.success) {
  //       this.studentData = response.data
  //       console.log(this.studentData, 'overalldata');
  //       this.rowData = response.data.reportData
  //       // console.log(this.studentData.reportData,'studentDatastudentData');
  //       // this.studentChartData = response.data.chartData
  //       // console.log(this.studentChartData,'studentDatastudentData');
  //       let chartData = [
  //         this.studentData.chartData.registerTrainTotal,
  //         this.studentData.chartData.registerAssessTotal,
  //         this.studentData.chartData.otherRegisterTotal
  //       ]
  //       this.doughnutChartData.push(chartData);

  //       let chartData2 = [
  //         this.studentData.chartData.profileTrainTotal,
  //         this.studentData.chartData.profileAssessTotal,
  //         this.studentData.chartData.otherProfileTotal
  //       ]
  //       this.doughnutChartData2.push(chartData2);
  //     }
  //   })
  // }

  getagGridData(obj) {
    this.rowData = [];
    this.apiService.getStudentTrackerReport(obj).subscribe(
      (response: any) => {
        if (response.success) {
          this.studentData = response.data;
          console.log(this.studentData, 'overalldata');
          this.rowData = response.data.reportData;
          this.doughnutChartData = [];
          let chartData = [
            this.studentData.chartData.registerTrainTotal,
            this.studentData.chartData.registerAssessTotal,
            this.studentData.chartData.otherRegisterTotal
          ]
          this.doughnutChartData.push(chartData);
          this.doughnutChartData2 = [];
          let chartData2 = [
            this.studentData.chartData.profileTrainTotal,
            this.studentData.chartData.profileAssessTotal,
            this.studentData.chartData.otherProfileTotal
          ]
          this.doughnutChartData2.push(chartData2);
        }
      },
      (error) => {
        console.error('API Error:', error);
        this.rowData = [];
      }
    );
  }

  exportData() {
    this.gridApi.exportDataAsExcel();
  }

}
