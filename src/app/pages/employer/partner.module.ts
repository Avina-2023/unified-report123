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
import {EmpRequirmentsComponent} from './emp-requirments/emp-requirments.component'
import {EmpPostrequirmentsComponent} from './emp-postrequirments/emp-postrequirments.component';
import { MaterialModule } from 'src/app/material/material.module';
import {EmpUploadPostrequirmentComponent} from './emp-upload-postrequirment/emp-upload-postrequirment.component'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    AddPartnerComponent,
    PartnerListComponent,
    StylePaginatorDirective,
    PartnerEnquiriesComponent,
    MoreOptionsComponent,
    EmpPostrequirmentsComponent,
    EmpRequirmentsComponent,
    EmpUploadPostrequirmentComponent

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
  ],
})
export class Adminmodule { }
