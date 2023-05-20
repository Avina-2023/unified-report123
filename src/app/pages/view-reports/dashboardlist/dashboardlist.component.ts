import { Component, OnInit, Inject } from '@angular/core';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import {
  AgChartThemeOverrides,
  ColDef,
  GridApi,
  SideBarDef,
} from '@ag-grid-enterprise/all-modules';
@Component({
  selector: 'app-dashboardlist',
  templateUrl: './dashboardlist.component.html',
  styleUrls: ['./dashboardlist.component.scss'],
})
export class DashboardlistComponent implements OnInit {
  private _locale: string;
  checkboxSelection: boolean = true;
  CheckboxRenderer: boolean = true;
  deliveryId: any;
  rowData: any;
  frameworkComponents: { checkboxRenderer: any };
  data: moment.Moment;
  date: any;
  message: any;
  status: any;
  private gridApi!: GridApi;
  public columnDefsmini;
  columnDefs = [
    {
      headerName: 'Deliveryid',
      field: 'Deliveryid',
      checkboxSelection: true,
      minWidth: 460,
      tooltipField: 'Deliveryid',
    },
    {
      headerName: 'Delivery label',
      field: 'Delivery_label',
      tooltipField: 'Delivery_label',
    },
    {
      headerName: 'Delivery Start Time',
      field: 'Delivery_Start_Time',
      tooltipField: 'Delivery_Start_Time',
    },
    {
      headerName: 'Delivery End Time',
      field: 'Delivery_End_Time',
      tooltipField: 'Delivery_End_Time',
    },
    {
      headerName: 'Test Name',
      field: 'Test_Name',
      tooltipField: 'Test_Name',
    },
    {
      headerName: 'Total Count',
      field: 'Total_Count',
      tooltipField: 'Total_Count',
    },
    {
      headerName: 'Started',
      field: 'Started',
      tooltipField: 'Started',
    },
    {
      headerName: 'Yet To Start',
      field: 'Yet_To_Start',
      tooltipField: 'Yet_To_Start',
    },
    {
      headerName: 'Completed',
      field: 'Completed',
      tooltipField: 'Completed',
    },
    {
      headerName: 'Inprogrss',
      field: 'Inprogrss',
      tooltipField: 'Inprogrss',
    },
    {
      headerName: 'Terminated',
      field: 'Terminated',
      tooltipField: 'Terminated',
    },
  ];
  public detailCellRendererParams;
  public rowModelType;
  public serverSideStoreType;
  public rowSelection;
  public masterDetail;
  cacheBlockSize: any = 2500;
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 320,
  };
  public onDate(event: any, newDate: any): void {}

  constructor(
    private sendData: SentDataToOtherComp,
    private toastr: ToastrService,
    private ApiService: ApiService
  ) {}
  ngOnInit(): void {
    this.dateChange('');
  }

  defaultColDef = {
    flex: 1,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    resizable: true,
    filter: true,
    enableFilter: true,
    minWidth: 220,
    sideBar: 'filter',
    tooltipComponentParams: { color: '#ececec' },
  };

  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      legend: {
        enabled: false,
        position: 'left',
      },
      paddingX: 120,
      paddingY: 20,
    },
    cartesian: {
      navigator: {
        enabled: true,
      },
    },
  };
  public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: false,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: false,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressExpandAll: true,
          suppressFilterSearch: true,
        },
      },
    ],
  };

  onRowSelected(event: any) {
    this.deliveryId = event.data.Deliveryid;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  dateChange(event: any) {
    let data = {
      date: event ? moment(event.target.value).format('YYYY-MM-DD') : '',
    };
    this.ApiService.behaviouralDashboard(data).subscribe((res: any) => {
      if (res.status) {
        this.rowData = res.data;
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  behaviourResultAks(event: any) {
    let data = {
      deliveryid: this.deliveryId,
    };
    this.ApiService.behaviourResultAks(data).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }
}
