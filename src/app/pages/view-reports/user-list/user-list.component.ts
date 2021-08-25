import { APP_CONSTANTS } from './../../../utils/app-constants.service';
import { AppConfigService } from './../../../utils/app-config.service';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnChanges, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {

  userlist: any;
  paginationPageSize = 500;
  cacheBlockSize: any = 500;
  gridApi: any;
  columnDefs = [];
  defaultColDef = {
    flex: 1,
    minWidth: 40,
    resizable: true,
    filter:true,
  };
  tooltipShowDelay = 0;
  rowData: any;
  searchBox = false;
  filterValue: string;
  quickSearchValue = '';
  constructor(private toastr: ToastrService, private ApiService: ApiService, private appconfig: AppConfigService) { }

  ngOnInit(): void {
    this.tableDef();
  }

  ngOnChanges() {
    this.tableDef();
  }


  getUserList() {
    const apiData = {
      email: ''
    }
    this.ApiService.getUserList(apiData).subscribe((res: any)=> {
      if (res.success && res.data && res.data.length > 0) {
        this.userlist = res.data;
        this.rowData = this.userlist;
      } else {
        this.toastr.error('No userlist available to show');
        this.userlist= [];
        this.rowData = [];
      }
    }, (err)=> {
      this.userlist = [];
      this.rowData = this.userlist;
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  nav(){
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.HIRINGREPORT);
  }

  sortevent(e) {
  }

  customComparator = (valueA, valueB) => {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  }

  onCellClicked(event) {
    if (event.column.userProvidedColDef.headerName === 'Reports') {
      let email = event['data']['email'] ? this.ApiService.encrypt(event['data']['email']) : '';
      this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.REPORTS.VIEWREPORTS, email);
    }
  }

  getModel(e) {
    // console.log(e);
    const filteredArray = this.gridApi.getModel().rootNode.childrenAfterFilter;
    if (filteredArray && filteredArray.length === 0) {
      this.toastr.warning('No search results found');
    }
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.quickSearchValue);
    const filteredArray = this.gridApi.getModel().rootNode.childrenAfterFilter;
    if (filteredArray && filteredArray.length === 0) {
      this.toastr.warning('No search results found');
    }
  }


tableDef() {
  this.columnDefs = [
    {
      headerName: 'Firstname',
      field: 'firstname',
      filter: true,
      minWidth: 120,
      sortable: true,
      tooltipField: 'firstname',
      getQuickFilterText: (params) => {
        return params.value;
      }
    },
    {
      headerName: 'Lastname',
      field: 'lastname',
      filter: true,
      minWidth: 120,
      sortable: true,
      tooltipField: 'lastname',
      getQuickFilterText: (params) => {
        return params.value;
      }
    },
    {
      headerName: 'Email ID',
      field: 'email',
      filter: true,
      minWidth: 120,
      sortable: true,
      tooltipField: 'email',
      getQuickFilterText: (params) => {
        return params.value;
      }
    },
    {
      headerName: 'Reports', field: 'email',
      filter: false,
      floatingFilterComponentParams: { suppressFilterButton: false },
      minWidth: 100,
      maxWidth: 100,
      sortable: false,
      getQuickFilterText: (params) => {
        return params.value;
      },
      cellStyle: { textAlign: 'center', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' },
      cellRenderer: (params) => {
          return `<button mat-raised-button class="agTable-btn" mat-raised-button>View Report</button>`;
      },
    },
  ];

  this.getUserList();
}

}
