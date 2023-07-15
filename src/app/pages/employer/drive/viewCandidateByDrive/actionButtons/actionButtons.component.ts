import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
// import {MatIconModule} from '@angular/material/icon';
// import { MatTableModule } from '@angular/material/table';
// import { MatNoDataRow, MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
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

  constructor(
    public router:Router,
    private ApiService: ApiService,
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
  }

  candidateprofile(){
    this.router.navigate(['/auth/drive/viewCandidateProfilebyEmployer'])
  }

  getStatusChange(status){
    let data = {
      // "email": this.email,
      "jobId": this.jobId,
      "jobStatus": status
    }
    this.ApiService.getStatusupdated(data).subscribe((response:any) => {
      if (response.success){
        this.statusdata = response.data;
        console.log(this.statusdata,'statusdata');
        
      }
    })
  }
  
  // getUserProfileSummary(){
  //   let data = {
  //     "email":  this.email,
  //     "jobId": this.jobId,
  
  //   }
  //     this.ApiService.getStatusupdated(data).subscribe((res:any)=>{
  //       if(res.success){
  //           this.statusdata = res ? res.data[0] : '';
  //       }else{
  //         this.toast.warning(res.message);
  //       }
  //     })
  // }


  // getSectionWiseComplexityAnalysis(){
  //   let data = {
  //     "driveId": this.driveId,
  //     "email":  this.email,
  //     "testName": this.testName,
  //   }
  //   this.ApiService.getSectionWiseComplexityAnalysis(data).subscribe((res:any)=>{
  //     if(res.success){
  //         this.data = res.data;
  //     }else{
  //       this.toast.warning(res.message)
  //     }
  //   })
  // }
}
