import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerRoutingModule } from './partner-routing.module';
import { AddPartnerComponent } from './add-partner/add-partner.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { StylePaginatorDirective } from './partner-list/style-paginator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerEnquiriesComponent } from './partner-enquiries/partner-enquiries.component';

@NgModule({
  declarations: [
    AddPartnerComponent,
    PartnerListComponent,
    StylePaginatorDirective,
    PartnerEnquiriesComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class Adminmodule { }
