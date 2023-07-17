import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
// import {MatIconModule} from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
@Component({
  selector: 'app-actionButtons',
  templateUrl: './actionButtons.component.html',
  styleUrls: ['./actionButtons.component.scss']
})
export class ActionButtonsComponent implements ICellRendererAngularComp {
  params: ICellRendererParams;
  statusdata: any;
  email: any;
  jobId: any;
  jobStatus: any;
  jobdata: any;

  constructor(
    public router:Router,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private messenger: SentDataToOtherComp

  ) { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  // agInit(params: ICellRendererParams): void {
  //   throw new Error('Method not implemented.');
  // }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params,'params');
    
    params.value
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('currentJobData'))
   this.jobdata =  this.appconfig.jobData?this.appconfig.jobData:localjobData
  }

  candidateprofile(){
    this.appconfig.setLocalStorage("C_Candidate_status", this.params.data)
    this.router.navigate(['/auth/drive/viewCandidateProfilebyEmployer'])
  }

  getStatusChange(status){
    console.log(this.jobdata)
    let data = {
      "email": this.params.data.email,
      "jobId": this.jobdata.jobId,
      "jobStatus": status
    }
    console.log(this.params)
    this.ApiService.getStatusupdated(data).subscribe((response:any) => {
      if (response.success){
        this.statusdata = response.data;
        this.messenger.sendMessage("grid-refresh",true)        
      }
    })
  }
  
}
