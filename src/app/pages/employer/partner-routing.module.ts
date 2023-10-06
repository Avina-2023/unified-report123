import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { EmpRequirmentsComponent } from './emp-requirments/emp-requirments.component';
import { EmpUploadPostrequirmentComponent } from './emp-upload-postrequirment/emp-upload-postrequirment.component';
import { PartnerEnquiriesComponent } from './partner-enquiries/partner-enquiries.component';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';

// import { ViewDriveComponent } from './view-drive/view-drive.component';
const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.PARTNERLIST}`,
    component: PartnerListComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.ADDPARTNER}`,
    component: AddPartnerComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.PARTNERENQUIRY}`,
    component: PartnerEnquiriesComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.REQUIRMENT}`,
    component: EmpRequirmentsComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.UPLOADREQUIRMENT}`,
    component: EmpUploadPostrequirmentComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.ADDOPENJOBS}`,
    component: AddJobsComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PARTNER.VIEWOPENJOBS}`,
    component: ViewJobsComponent,
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.PARTNER.PARTNERLIST}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
