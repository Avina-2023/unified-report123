import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ColDef, GridApi } from 'ag-grid-community';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { Chart } from 'chart.js';

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
  chart: any;
  chart2: any;
  chartLabels: string[];
  chartColors: string[];
  chartLabels2: string[];
  chartColors2: string[];
  chartData: number[];

  constructor() { } 

  ngOnInit() {
    
    this.chartLabels = ['Skill Profile Filled', 'Job Applications', 'Open Job Views', 'Internship Applications'];
    this.chartColors = ['#EB4A8A', '#FF6A81', '#5289C9', '#2862FF'];
    this.chartData = [55, 45, 25, 65];


    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: [55, 45, 25, 65],
            backgroundColor: this.chartColors,
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
          legend: {
          display: false,
          // position: 'bottom',
        },
        tooltips: {
          enabled: true,
        },   
        cutoutPercentage: 55, 
        responsive: true,
        maintainAspectRatio: false,
      },
    });


    this.chartLabels2 = ['Skill Profile Filled', 'Job Applications', 'Open Job Views', 'Internship Applications'];
    this.chartColors2 = ['#EB4A8A', '#FF6A81', '#5289C9', '#2862FF'];

    this.chart2 = new Chart('canvas2', {
      type: 'doughnut',
      data: {
        labels: this.chartLabels2,
        datasets: [
          {
            data: [55, 45, 25, 65],
            backgroundColor: this.chartColors2,
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
          legend: {
          display: false,
          // position: 'bottom',
        },
        tooltips: {
          enabled: true,
        },   
        cutoutPercentage: 55, 
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    
  }

}
