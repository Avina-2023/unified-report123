import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter,MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';

@Component({
  selector: 'app-pop-up-cell-renderer',
  templateUrl: './pop-up-cell-renderer.component.html',
  styleUrls: ['./pop-up-cell-renderer.component.scss']
})

export class PopUpCellRendererComponent implements ICellRendererAngularComp {
 
  getseconds:any=[];
  gettime:any[];
  seconds: any;
  gethours:any;
  date: FormControl;
  dateF:Date=new Date();
  Time:any[];
  hours: string;
  min: string;
  meridiem: string;
  time: string;
  Workflow:any=[];
  jopDetails: { AppliedDate: string; Title: string; Created_by: string; }[];
  params:any;
  // matDialog: any;
 
  constructor(
    private dialog: MatDialog,
    private dialog1: MatDialog,
    private dialog2: MatDialog,
    private dialog3: MatDialog,
    private appConfig: AppConfigService,
    private msgData : SentDataToOtherComp

    
    ) {}
    @ViewChild('matDialog', { static: false }) matDialog: TemplateRef<any>;
    @ViewChild('matDialog1', { static: false }) matDialog1: TemplateRef<any>;
    @ViewChild('matDialog2', { static: false }) matDialog2: TemplateRef<any>;
    @ViewChild('matDialog3', { static: false }) matDialog3: TemplateRef<any>;
    MatDialog() {
      const dialogRef = this.dialog.open(this.matDialog, {
        width: '400px',
        height: '407px',
        panelClass: 'matDialog',
        autoFocus: false,
        closeOnNavigation: true,
        disableClose: true,
      });
    }
    MatDialog1(){
      const dialogRef = this.dialog1.open(this.matDialog1, {
        width: '592px',
        height: '280px',
        panelClass: 'matDialog1',
        autoFocus: false,
        closeOnNavigation: true,
        disableClose: true,
      });
    }
    MatDialog2(){
      const dialogRef = this.dialog2.open(this.matDialog2, {
        width: '592px',
        height: '236px',
        panelClass: 'matDialog2',
        autoFocus: false,
        closeOnNavigation: true,
        disableClose: true,
      });
    }
    MatDialog3(){
      const dialogRef= this.dialog3.open(this.matDialog3,{
        width: '781px',
        height: '530px',
        panelClass: 'matDialog3',
        autoFocus: false,
        closeOnNavigation: true,
        disableClose: true,
        
      });
    }
    instructionClose() {
       this.dialog.closeAll();
    }
    value:any;

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    params.value
    // console.log(params.data);    
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    for( var i= 0 ; i<=60; i++){
      this.getseconds.push(i) 
   };
    this.gethours = this.getseconds.filter((val,i)=> i < 13)
    this.gethours = this.gethours.slice(1,13)
 
    this.jopDetails=[{

      
          "AppliedDate":"Sep 23, 2022 12:30 pm",
          "Title":"Job Requirement Posted1",
          "Created_by":"L&T"
      },
      {
          "AppliedDate":"Sep 29, 2022 12:30 pm",
          "Title":"Job Requirement Posted",
          "Created_by":"Admin"
      },
      {
          "AppliedDate":"Sep 30, 2022 12:30 pm",
          "Title":"Job Requirement Posted",
          "Created_by":"System"
      },
      {
          "AppliedDate":"Oct 01, 2022 12:30 pm",
          "Title":"Job Requirement Posted",
          "Created_by":"Admin"
      }
  ]
  
      
  }
  
  onHoursSelected(value:string){
    console.log("the selected Hours is " + value);
   this.hours=value
}
onMinSelected(value:string){
  console.log("the selected Min is " + value);
  this.min=value
}
onMeridiemSelected(value:string){
  console.log("the selected M is " + value);
  this.meridiem=value
  this.time=this.hours+':'+this.min+':'+this.meridiem
  console.log(this.time);
}
viewApplication(){
  this.appConfig.setLocalStorage("currentJobID",this.params.data.jobId)
  this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.VIEWCANDIDATE);
}

}