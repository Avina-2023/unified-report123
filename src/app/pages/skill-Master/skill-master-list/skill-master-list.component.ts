import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { AgChartThemeOverrides, CheckboxSelectionCallbackParams, ColDef, ColSpanParams, GridApi, HeaderCheckboxSelectionCallbackParams, IColumnToolPanel, SideBarDef } from '@ag-grid-enterprise/all-modules';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-skill-master-list',
  templateUrl: './skill-master-list.component.html',
  styleUrls: ['./skill-master-list.component.scss']
})
export class SkillMasterListComponent implements OnInit {
  @ViewChild('instructionSelect', { static: false }) instructionSelect: TemplateRef<any>;
  @ViewChild('rejectSelect', { static: false }) rejectSelect: TemplateRef<any>;
  @ViewChild('sectionDetails', { static: false }) opensection: TemplateRef<any>;
  public rowModelType;
  public serverSideStoreType;
  public gridColumnApi;
  public detailCellRendererParams;
  public masterDetail;
  public defaultColDef;
  public columnDefsmini;
  public columnDefs;
  public rowSelection = 'multiple';
  public selectedRow = [];

  public rowData: any[] | null = [1, 2];
  public overlayNoRowsTemplate =
    ' <span><br><br><img src="assets/images/skillMaster/norecord.svg" alt="" /> <br><br> <h3>No Records Found</h3></span>';
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
  public autoGroupColumnDef: ColDef = {
    flex: 1,
    minWidth: 320,
  };
  private gridApi!: GridApi;
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
    defaultToolPanel: 'columns',
  };
  SelectedFilterMainCount: any = [];
  demoimg: any;
  Isspinner = false;
  FormateName: any;
  cacheBlockSize: any = 100;
  rowData1: any;
  sectiondialogRef: any;
  skillMasterListSubscription: Subscription;
  skillMasterList: any = [];
  pageRowCount = 0;
  statusList = ["All Skills", "Approved Skills", "Unapproved Skills", "Rejected Skills"];
  statusSelectedValue = "All Skills";
  rejectList = ["Duplicate Entry", "Invalid Data", "Others"];
  rejectSelectedValue = "Duplicate Entry";
  rejectOtherValue = "";
  roles:any;
  orgdetails:any;
  roleCode:any;
  constructor(public matDialog: MatDialog, private sendData: SentDataToOtherComp, private ApiService: ApiService, private appconfig: AppConfigService, private toastr: ToastrService) {
    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    if(this.roleCode != "IADM"){
      this.appconfig.routeNavigation('error');
    }
    this.serverSideStoreType = 'partial';
    this.rowModelType = 'serverSide';
    this.defaultColDef = {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      sortable: true,
      resizable: true,
      filter: true,
      enableFilter: true,
      minWidth: 220,
      sideBar: 'filter',
    };
  }

  ngOnInit(): void {
    this.sendData.sendMessage(true, 'go');
    this.SelectedFilterMainCount = localStorage.getItem('mainFilterCount') ? JSON.parse(localStorage.getItem('mainFilterCount')) : localStorage.setItem('mainFilterCount', '[]');
    this.tabledef();
  }
  ngOnDestroy() {
    this.skillMasterListSubscription ? this.skillMasterListSubscription.unsubscribe() : '';
  }

  navToSkillBulkUpload() {
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.SKILLMASTER.SKILLBULKUPlOAD);
  }

  statusChange(e) {
    this.gridApi.setFilterModel(null);
    this.statusSelectedValue = e.value;
    this.gridApi.deselectAll();
    this.tabledef();
    this.gridApi.paginationGoToFirstPage();
    this.gridApi.refreshServerSideStore({ purge: true });
  }

  RejectChange(e) {
    this.rejectSelectedValue = e.value;
    if (e.value !== "Others") {
      this.rejectOtherValue = "";
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.closeToolPanel();
    this.autoSizeAll(false);
    var datasource = this.callApiForCandidateList();
    params.api.setServerSideDatasource(datasource);
  }

  callApiForCandidateList() {
    return {
      getRows: (params) => {
        let apiData: any = params;
        if (this.statusSelectedValue == "All Skills") {
          apiData.request.status = "";
        } else if (this.statusSelectedValue == "Approved Skills") {
          apiData.request.status = "Approved";
        } else if (this.statusSelectedValue == "Unapproved Skills") {
          apiData.request.status = "Unapproved";
        } else if (this.statusSelectedValue == "Rejected Skills") {
          apiData.request.status = "Rejected";
        }
        this.skillMasterListSubscription = this.ApiService.getSkillMasterList(apiData.request).subscribe((data1: any) => {
          if (data1.success == false) {
            // this.toastr.warning('Your session has expired Please login again');
            // this.ApiService.logout()
            params.fail();
            params.success({
              rowData: [],
              rowCount: 0,
            });
            this.gridApi.showNoRowsOverlay();
          } else {
            this.skillMasterList = data1 && data1.data ? data1.data : [];
            if (this.skillMasterList.length > 0) {
              this.pageRowCount = data1 && data1.totalCount ? data1.totalCount : 0;
              this.gridApi.hideOverlay();
              params.success({
                rowData: this.skillMasterList,
                rowCount: this.pageRowCount
              });
              this.gridApi.selectAllFiltered()
              this.gridApi.selectAll();
            } else {
              params.success({
                rowData: this.skillMasterList,
                rowCount: 0
              });
              this.gridApi.showNoRowsOverlay();
            }
          }
        }, (err) => {
          params.fail();
          params.success({
            rowData: [],
            rowCount: 0,
          });
        });
        this.gridApi.hideOverlay();
        this.gridApi.showNoRowsOverlay();
      }
    }
  }

  exportCSV() {
    if(this.selectedRow.length){
      this.gridApi.exportDataAsCsv({
        columnKeys: ["_id", "skillName", "domain"],
        onlySelected:true
      });
    }else{
      this.gridApi.exportDataAsCsv({
        columnKeys: ["_id", "skillName", "domain"],
      });
    }
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getAllColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }


  InstructionSelect() {
    const dialogRef = this.matDialog.open(this.instructionSelect, {
      width: '500px',
      height: '500px',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'instructionSelect'
    });
  }

  instructionClose() {
    this.matDialog.closeAll();
  }

  RejectSelect() {
    const dialogRef = this.matDialog.open(this.rejectSelect, {
      width: '500px',
      height: '410px',
      autoFocus: false,
      closeOnNavigation: true,
      panelClass: 'rejectSelect'
    });
  }

  RejectClose() {
    this.matDialog.closeAll();
    this.rejectOtherValue = "";
    this.rejectSelectedValue = "Duplicate Entry";
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  openUserFormDialog() {
    this.sectiondialogRef = this.matDialog.open(this.opensection, {
      width: '800px',
      height: 'auto',
      panelClass: 'popupModalContainerForaddUser',
    });
  }

  tabledef() {
    this.columnDefs = [
      {
        headerName: 'ObjectId',
        field: '_id',
        hide: true,
        suppressColumnsToolPanel: true,
        filter: false
      },
      {
        headerName: 'Skill Name',
        field: 'skillName',
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        minWidth:350,
        maxWidth:350,
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField: 'skillName',
        // headerCheckboxSelection: this.statusSelectedValue != "All Skills" ? true : false,
        // headerCheckboxSelectionFilteredOnly: this.statusSelectedValue != "All Skills" ? true : false,
        checkboxSelection: this.statusSelectedValue != "All Skills" ? true : false,
        cellRenderer: (params) => {
          if (params.value) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        }
      },
      {
        headerName: 'Domain',
        field: 'domain',
        filter: 'agTextColumnFilter',
        chartDataType: 'series',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField: 'domain',
        cellRenderer: (params) => {
          if (params.value) {
            return params.value;
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        }
      },
      {
        headerName: 'Source',
        field: 'createdBy',
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField: 'createdBy',
        cellRenderer: (params) => {
          if (params.value) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        }
      },
      {
        headerName: 'Created On',
        filter: 'agDateColumnFilter',
        field: 'createdAt',
        minWidth:200,
        maxWidth:200,
        // tooltipField: 'createdAt',
        chartDataType: 'series',
        cellRenderer: (params) => {
          if (params.value) {
            var date =new Date(params.value);
            return (date.toLocaleString()).toString()
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        },
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'greaterThan', 'inRange'],
        },
      },
      {
        headerName: 'Status',
        field: 'status',
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        cellRenderer: (params) => {
          if (params.value) {
            this.FormateName = params.value;
            if (this.FormateName == "Approved") {
              return `<div class="green-btns"> <span class="dot"></span>` + this.titleCase(this.FormateName) + `</div>`;
            } else if (this.FormateName == "Unapproved") {
              return `<div class="yellow-btns"> <span class="dot"></span>` + this.titleCase(this.FormateName) + `</div>`;
            } else {
              return `<div class="red-btns"> <span class="dot"></span>` + this.titleCase(this.FormateName) + `</div>`;
            }
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        }
      }, {
        headerName: 'Notes',
        field: 'reason',
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField: 'reason',
        cellRenderer: (params) => {
          if (params.value) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        }
      },
      {
        headerName: 'Approved By',
        field: 'approvedBy',
        filter: 'agTextColumnFilter',
        chartDataType: 'category',
        aggFunc: 'sum',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['contains']
        },
        tooltipField: 'approvedBy',
        cellRenderer: (params) => {
          if (params.value) {
            this.FormateName = params.value;
            return this.titleCase(this.FormateName);
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        }
      },
      {
        headerName: 'Approved On',
        filter: 'agDateColumnFilter',
        field: 'approvedAt',
        minWidth:200,
        maxWidth:200,
        // tooltipField: 'approvedAt',
        chartDataType: 'series',
        cellRenderer: (params) => {
          if (params.value) {
            var date =new Date(params.value);
            return (date.toLocaleString()).toString()
          } if (params.value == undefined) {
            return '';
          } else {
            return '-';
          }
        },
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['equals', 'lessThan', 'greaterThan', 'inRange'],
        },
      },
    ]
  }


  async onSelectionChanged(event) {
    var rowData = event.api.getSelectedNodes();
    var ids = [];
    await rowData.forEach(elem => {
      ids.push(elem.data._id);
    });
    this.selectedRow = ids;
  }

  approveSkillMaster() {
    var apiData = {
      "ids": this.selectedRow,
      "status": "Approved",
      "reason": "",
      "approvedBy": this.appconfig.getLocalStorage('email') ? this.appconfig.getLocalStorage('email') : ''
    }
    this.skillMasterListSubscription = this.ApiService.skillMasterValidate(apiData).subscribe((data1: any) => {
      if (data1.success == false) {
        this.toastr.warning('Unable to update, Please try again.');
        this.gridApi.hideOverlay();
      } else {
        this.rowData = [];
        this.selectedRow = [];
        this.skillMasterList = [];
        this.gridApi.deselectAll();
        this.toastr.success('Approved Updated Successfully');
        this.tabledef();
        this.gridApi.paginationGoToFirstPage();
        this.gridApi.refreshServerSideStore({ purge: true });
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
      this.gridApi.hideOverlay();
    });
    this.gridApi.hideOverlay();
  }

  rejectSkillMaster() {
    if (this.rejectSelectedValue === "Others" && this.rejectOtherValue === "") {
      this.toastr.warning('Please enter the value in Others');
    } else {
      let notes;
      if (this.rejectOtherValue !== "") {
        notes = this.rejectOtherValue;
      } else {
        notes = this.rejectSelectedValue;
      }
      var apiData = {
        "ids": this.selectedRow,
        "status": "Rejected",
        "reason": notes,
        "approvedBy": this.appconfig.getLocalStorage('email') ? this.appconfig.getLocalStorage('email') : ''
      }
      this.skillMasterListSubscription = this.ApiService.skillMasterValidate(apiData).subscribe((data1: any) => {
        if (data1.success == false) {
          this.toastr.warning('Unable to update, Please try again.');
          this.gridApi.hideOverlay();
        } else {
          this.rowData = [];
          this.selectedRow = [];
          this.skillMasterList = [];
          this.rejectOtherValue = "";
          this.rejectSelectedValue = "Duplicate Entry";
          this.matDialog.closeAll();
          this.gridApi.deselectAll();
          this.toastr.success('Rejected Updated Successfully');
          this.tabledef();
          this.gridApi.paginationGoToFirstPage();
          this.gridApi.refreshServerSideStore({ purge: true });
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
        this.gridApi.hideOverlay();
      });
      this.gridApi.hideOverlay();

    }
  }
}
