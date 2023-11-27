import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { log } from 'console';
@Component({
  selector: 'app-action-button-viewJobs',
  templateUrl: './action-button-viewJobs.component.html',
  styleUrls: ['./action-button-viewJobs.component.scss']
})
export class ActionButtonViewJobsComponent implements ICellRendererAngularComp {
  @ViewChild('matDialog', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('confirmmatDialog') confirmmatDialogRef!: TemplateRef<any>;
  @ViewChild('viewEditJobmatDialog', {static: false}) viewEditJobmatDialogRef: TemplateRef<any>;
  @ViewChild('editJobmatDialog', {static: false}) editJobmatDialogRef: TemplateRef<any>;
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
    //getting ag-grid data from local storage
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('partnerListAgData'));
    this.jobdata = this.appconfig.jobData ? this.appconfig.jobData : localjobData;
  }

  editOpenJobProfile() {
    console.log('test syrjbh');

    //save data in local storage to edit job page
    this.appconfig.setLocalStorage('openJobData', JSON.stringify(this.params.data));
    console.log(this.params.data.jobId,'test 2');

  }

  getStatusChange(status) {
    let data = {
      jobId: this.params.data.jobId,
      approveStatus: status,
    };

    this.ApiService.getOpenJobStatusUpdated(data).subscribe((response: any) => {
      if (response.success) {
        this.statusdata = response?.data;
        // console.log(this.statusdata);
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

  // openViewJobDialog() {
  //   const dialogRef = this.dialog.open(this.viewEditJobmatDialogRef, {
  //     width: '1000px',
  //     height: 'auto',
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }

  openEditJobDialog() {
    console.log('test for edit');

    const dialogRef = this.dialog.open(this.editJobmatDialogRef, {
      width: '1000px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    this.editOpenJobProfile()
  }

}
