import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerRoutingModule } from './partner-routing.module';
import { AddPartnerComponent } from './add-partner/add-partner.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartnerListComponent } from './partner-list/partner-list.component';


@NgModule({
  declarations: [
    AddPartnerComponent,
    PartnerListComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class EmployerModule { }
