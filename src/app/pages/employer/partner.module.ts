import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerRoutingModule } from './partner-routing.module';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { StylePaginatorDirective } from './partner-list/style-paginator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerEnquiriesComponent } from './partner-enquiries/partner-enquiries.component';
import { MoreOptionsComponent } from './partner-list/more-options/more-options.component';
import { EmpRequirmentsComponent } from './emp-requirments/emp-requirments.component';
import { EmpPostrequirmentsComponent } from './emp-postrequirments/emp-postrequirments.component';
import { MaterialModule } from 'src/app/material/material.module';
import { EmpUploadPostrequirmentComponent } from './emp-upload-postrequirment/emp-upload-postrequirment.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OverallReportComponent } from './overall-Report/overall-Report.component';
import { OverallReportDetailsCardComponent } from './overall-Report/overall-Report-details-card/overall-Report-details-card.component';
import { OverallReportMinicardDetailsComponent } from './overall-Report/overall-Report-minicard-details/overall-Report-minicard-details.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
// import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AddPartnerComponent,
    PartnerListComponent,
    AddJobsComponent,
    ViewJobsComponent,
    StylePaginatorDirective,
    PartnerEnquiriesComponent,
    MoreOptionsComponent,
    EmpPostrequirmentsComponent,
    EmpRequirmentsComponent,
    EmpUploadPostrequirmentComponent,
    OverallReportComponent,
    OverallReportDetailsCardComponent,
    OverallReportMinicardDetailsComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule,
    NzDropDownModule,
    NzSelectModule,
    // AngularEditorModule
  ],
})
export class Adminmodule {}
