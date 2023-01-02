import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerRoutingModule } from './partner-routing.module';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { StylePaginatorDirective } from './partner-list/style-paginator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerEnquiriesComponent } from './partner-enquiries/partner-enquiries.component';
import { MoreOptionsComponent } from './partner-list/more-options/more-options.component';
import {EmpRequirmentsComponent} from './emp-requirments/emp-requirments.component'


@NgModule({
  declarations: [
    AddPartnerComponent,
    PartnerListComponent,
    StylePaginatorDirective,
    PartnerEnquiriesComponent,
    MoreOptionsComponent,
    EmpRequirmentsComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule
  ],
})
export class Adminmodule { }
