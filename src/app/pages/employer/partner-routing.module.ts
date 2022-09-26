import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import {  PartnerListComponent} from './partner-list/partner-list.component';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.PARTNERLIST}`, component: PartnerListComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.ADDPARTNER}`, component: AddPartnerComponent,
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.PARTNER.PARTNERLIST}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
