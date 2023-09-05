import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from 'ag-grid-community';
// import {MatIconModule} from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-actionButtons',
  templateUrl: './actionButtons.component.html',
  styleUrls: ['./actionButtons.component.scss'],
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  @ViewChild('matDialog', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('confirmmatDialog') confirmmatDialogRef!: TemplateRef<any>;

  params: ICellRendererParams;
  statusdata: any;
  email: any;
  jobId: any;
  jobStatus: any;
  jobdata: any;
  lastAction: string | null = null;

  constructor(
    public router: Router,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private messenger: SentDataToOtherComp,
    private dialog: MatDialog
  ) {}
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  // agInit(params: ICellRendererParams): void {
  //   throw new Error('Method not implemented.');
  // }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params, 'params');
    // console.log(this.params.data,'candidatedata');
    // console.log(this.params.data.jobStatus,'job statuses');
    // console.log(this.params.data.studentName,'studentname');
    params.value;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    let localjobData = JSON.parse(
      this.appconfig.getLocalStorage('currentJobData')
    );
    this.jobdata = this.appconfig.jobData
      ? this.appconfig.jobData
      : localjobData;
  }

  candidateprofile() {
    this.appconfig.setLocalStorage(
      'C_Candidate_status',
      JSON.stringify(this.params.data)
    );
    this.router.navigateByUrl(
      '/auth/drive/viewCandidateProfilebyEmployer?from=VA'
    );
  }

  // getStatusChange(status){
  //   console.log(this.jobdata)
  //   let data = {
  //     "email": this.params.data.email,
  //     "jobId": this.jobdata.jobId,
  //     "jobStatus": status
  //   }
  //   console.log(this.params)
  //   this.ApiService.getStatusupdated(data).subscribe((response:any) => {
  //     if (response.success){
  //       this.statusdata = response.data;
  //       this.messenger.sendMessage("grid-refresh",true)
  //     }
  //   })
  // }

  getStatusChange(status) {
    console.log(this.jobdata);
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
