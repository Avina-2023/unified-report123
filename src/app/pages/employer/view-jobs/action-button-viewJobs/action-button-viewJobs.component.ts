import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-action-button-viewJobs',
  templateUrl: './action-button-viewJobs.component.html',
  styleUrls: ['./action-button-viewJobs.component.scss']
})
export class ActionButtonViewJobsComponent implements ICellRendererAngularComp {
  @ViewChild('matDialog', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('confirmmatDialog') confirmmatDialogRef!: TemplateRef<any>;

  jobdata: any;
  jobStatus: any;
  statusdata: any;
  params: ICellRendererParams;
  constructor(
    public router: Router,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private messenger: SentDataToOtherComp,
    private dialog: MatDialog 
  ) { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  // agInit(params: ICellRendererParams): void {
  //   throw new Error('Method not implemented.');
  // }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params, 'params'); 
    params.value; 
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }
  

  ngOnInit() {
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('currentJobData'));
    this.jobdata = this.appconfig.jobData ? this.appconfig.jobData : localjobData;
  }

  getStatusChange(status) { 
    // console.log(this.jobdata);
    let data = {
      email: this.params.data.email, 
      jobId: this.jobdata.jobId, 
      jobStatus: status, 
    };
    this.ApiService.getStatusupdated(data).subscribe((response: any) => { 
      if (response.success) { 
        // this.statusdata = response?.success;
        this.statusdata = response?.data;
        console.log(this.statusdata);
        this.messenger.sendMessage('grid-refresh', true); 
      } else {
      }
    });
    const dialogRef = this.dialog.open(this.confirmmatDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
      data: { status },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
  okclose() {
    this.dialog.closeAll();
  }
  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
    });
  }

  openStatusDialog(status: string) {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
      data: { status },
    });
  }
  
}
