import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from 'ag-grid-community';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatCalendar } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pop-up-cell-renderer',
  templateUrl: './pop-up-cell-renderer.component.html',
  styleUrls: ['./pop-up-cell-renderer.component.scss'],
  providers: [DatePipe],
})
export class PopUpCellRendererComponent implements ICellRendererAngularComp {
  deadlineForm: FormGroup;
  rejectReason: FormGroup;
  getseconds: any = [];
  gettime: any[];
  seconds: any;
  gethours: any;
  date: FormControl;
  //dateF: Date = new Date();
  dateF = Date;
  Time: any[];
  hours: string;
  min: string;
  meridiem: string;
  time: string;
  Workflow: any = [];
  jopDetails: { AppliedDate: string; Title: string; Created_by: string }[];
  params: any;
  statusdata: any;
  // matDialog: any;

  constructor(
    private dialog: MatDialog,
    private dialog1: MatDialog,
    private dialog2: MatDialog,
    private dialog3: MatDialog,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private appConfig: AppConfigService,
    private ApiService: ApiService,
    private messenger: SentDataToOtherComp
  ) { }
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
  MatDialog1() {
    const dialogRef = this.dialog1.open(this.matDialog1, {
      width: '592px',
      height: '280px',
      panelClass: 'matDialog1',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  MatDialog2() {
    const dialogRef = this.dialog2.open(this.matDialog2, {
      width: '592px',
      height: '236px',
      panelClass: 'matDialog2',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  MatDialog3() {
    const dialogRef = this.dialog3.open(this.matDialog3, {
      width: '781px',
      height: '530px',
      panelClass: 'matDialog3',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
    });
  }
  
  value: any;

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params?.data?.approveStatus, 'actualjobdata');
    


    params.value;
    // console.log(params.data);
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    //console.log('testingdadlkfjlsk');
    this.dateF = this.params?.data?.lastDatetoApply;

    for (var i = 0; i <= 60; i++) {
      this.getseconds.push(i);
    }
    this.gethours = this.getseconds.filter((val, i) => i < 13);
    this.gethours = this.gethours.slice(1, 13);


    this.jopDetails = [
      {
        AppliedDate: 'Sep 23, 2022 12:30 pm',
        Title: 'Job Requirement Posted1',
        Created_by: 'L&T',
      },
      {
        AppliedDate: 'Sep 29, 2022 12:30 pm',
        Title: 'Job Requirement Posted',
        Created_by: 'Admin',
      },
      {
        AppliedDate: 'Sep 30, 2022 12:30 pm',
        Title: 'Job Requirement Posted',
        Created_by: 'System',
      },
      {
        AppliedDate: 'Oct 01, 2022 12:30 pm',
        Title: 'Job Requirement Posted',
        Created_by: 'Admin',
      },
    ];

    this.formInitialize();
    
    

  }


  formInitialize() {
    this.deadlineForm = this.fb.group({
      hours: ['11', Validators.required],
      min: ['59', Validators.required],
      meridiem: ['PM', Validators.required],
      date: [this.dateF, Validators.required],
    });

    
    this.rejectReason = this.fb.group({
      remarks: ['', Validators.required],
    });
  }

  onHoursSelected(value: string) {
    // console.log("the selected Hours is " + value);
    this.hours = value;
  }
  onMinSelected(value: string) {
    // console.log("the selected Min is " + value);
    this.min = value;

  }
  onMeridiemSelected(value: string) {
    // console.log("the selected M is " + value);
    this.meridiem = value;
  }



  viewApplication() {
    this.appConfig.setLocalStorage('currentJobID', this.params.data.jobId);
    this.appConfig.setLocalStorage('currentJobData', JSON.stringify(this.params.data));

    this.appConfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.VIEWCANDIDATE
    );
  }

  editJob(){
    this.appConfig.setLocalStorage('currentJobID', this.params.data.jobId);
    this.appConfig.setLocalStorage('currentJobData', JSON.stringify(this.params.data));
    
    this.appConfig.routeNavigation(
      APP_CONSTANTS.ENDPOINTS.VIEWDRIVE.DRIVESETTINGS
    );
  }



  onOpenClick(status) {
    const date = new Date(this.deadlineForm?.value?.date);
    let hours = parseInt(this.deadlineForm?.value?.hours, 10);
    const min = parseInt(this.deadlineForm?.value?.min, 10);
    const meridiem = this.deadlineForm?.value?.meridiem;
    // Adjust hours for PM
    if (meridiem === 'PM' && hours < 12) {
      hours = hours + 12;
    }
    // Adjust date if the time is in AM
    if (meridiem === 'AM' && hours === 12) {
      date.setDate(date.getDate()); // Subtract one day
      hours = 0; // Reset hours to 0 for AM
    }
    // Set the time on the existing date
    date.setHours(hours, min, 0, 0);
    // Format the date in UTC
    const formattedDate = date.toISOString();
    console.log(formattedDate);
    console.log(status);

    let data = {
      "jobId": this.params.data.jobId,
      "companyId": this.params.data.companyId,
      "approveStatus": status,
      "lastDatetoApply": formattedDate
    };
    const currentDate = new Date();
    const ISOString = currentDate.toISOString();
    if (formattedDate > ISOString){
      this.updateData(data);
    }
    else{
      this.toastr.warning('Last Date should be greater than current date');
    }
    
    
  }


  rejectClick(status){
   if(this.rejectReason?.valid){
    const remarks = this.rejectReason?.value?.remarks;
    let data = {
      "jobId": this.params.data.jobId,
      "companyId": this.params.data.companyId,
      "approveStatus": status,
      "remarks": remarks
    };
    //console.log(data, 'remarks');,
    this.updateData(data);
   }
   else{
    this.toastr.warning('Please enter the reason to reject the application');
    this.rejectReason?.markAllAsTouched();
   }
    
  }


  confirmClose(status){
     let data = {
       "jobId": this.params.data.jobId,
       "companyId": this.params.data.companyId,
       "approveStatus": status
     };
     this.updateData(data);
   }


  updateData(data){
    this.ApiService.getOpenJobStatusUpdated(data).subscribe((response: any) => {
      if (response.success == false) {
        this.toastr.warning(response.message);
      } else {
        this.statusdata = response?.data;
        console.log(this.statusdata);
        this.messenger.sendMessage('grid-refresh', true);
        this.toastr.success(response.message);
        this.dialog.closeAll();
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  cancelClick() {
    this.formInitialize();
    this.dialog.closeAll();
  }
  



  getCurrentDate(): Date {
    return new Date();
  }




  approveApplication() {
    this.formInitialize();
    this.MatDialog();
  }

  rejectApplication(){
    this.MatDialog1();
  }
  closeApplication(){
    this.MatDialog2();
  }
}
