import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PopUpCellRendererComponent } from './pop-up-cell-renderer/pop-up-cell-renderer.component';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-drive',
  templateUrl: './manage-drive.component.html',
  styleUrls: ['./manage-drive.component.scss'],
})
export class ManageDriveComponent implements OnInit {
  rowData: any;
  getdataag: any;
  public sideBar = 'filters';
  public gridColumnApi: any;
  columnDefs: any = [];
  private gridApi!: GridApi;
  public gridOptions: GridOptions;
  lastDatetoApply: string;
  selectedRow: any[];
  constructor(private apiService: ApiService) {
    this.gridOptions = <GridOptions>{
      frameworkComponents: {
        popUpRender: PopUpCellRendererComponent,
      },
    };
  }

  ngOnInit(): void {
    this.tabledata();
    this.getaggridjoblist();
  }
  arrayofData: any = [];

  // Ag Grid Secction

  tabledata() {
    this.columnDefs = [
      { headerName: 'S.No', field: 'id', minWidth: 100, default:'-',
      cellRenderer : function (params) {
        return params.rowIndex +1 ;
      }
    },
      {
        headerName: '',
        field: 'companyLogo',
        width: 75,
        sortable: false,
        cellRenderer: function (params) {
          let val = encodeURI(params.value);
          return `<img width="30px" height"22px" src=${val}>`;
        },
      },
      { headerName: 'Company Name', field: 'company', minWidth: 175 },
      { headerName: 'Drive No.', field: 'Drive No', minWidth: 120 },
      { headerName: 'Job Title', field: 'jobTitle', minWidth: 180 },
      {
        headerName: 'Candidates Applied',
        field: 'Candidates Applied',
        minWidth: 180,
      },
      { headerName: 'Offer Released', field: 'offerReleased', minWidth: 150 },
      {
        headerName: 'Last Date to Apply',
        field: 'lastDatetoApply',
        minWidth: 180,
        cellRenderer: (data) => {
          return moment(data.lastDatetoApply).format('MMM d, y')
      }
      }, 
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 100,
        cellClass: 'status-style',
        cellRenderer: function (params) {
          if (params.value === 'Active') {
            return '<button mat-button disabled class="status-button">Active</button>';
          }
          if (params.value === 'Pending') {
            return '<button mat-button disabled class="pending-button">Pending</button>';
          }
          if (params.value === 'Expired') {
            return '<button mat-button disabled class="expired-button">Expired</button>';
          }
          if (params.value === 'Closed') {
            return '<button mat-button disabled class="closed-button">Closed</button>';
          }
          if (params.value === 'Rejected') {
            return '<button mat-button disabled class="rejected-button">Rejected</button>';
          }
        },
      },
      {
        headerName: '',
        field: 'action',
        cellRenderer: 'popUpRender',
        maxWidth: 80,
      },
    ];
  }
  async onSelectionChanged(event) {
    var rowData = event.api.getSelectedNodes();
    var ids = [];
    await rowData.forEach(elem => {
      ids.push(elem.data._id);
    });
    this.selectedRow = ids;
  }
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  getaggridjoblist() {
    let data = '';
    this.apiService.getAGgridData(data).subscribe((response: any) => {
      if (response.success) {
        this.getdataag = response.data;
      } else {
        alert('failed');
      }
      // console.log(this.getdataag,'aggrid');
    });
  }
}