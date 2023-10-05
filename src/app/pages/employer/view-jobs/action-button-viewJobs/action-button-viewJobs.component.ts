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
  agInit(params: ICellRendererParams): void {
    throw new Error('Method not implemented.');
  }
  // agInit(params: ICellRendererParams): void {
  //   this.params = params;
  //   console.log(this.params, 'params'); 
  //   params.value; 
  // }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }
  

  ngOnInit() {
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
