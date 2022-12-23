import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { BehaviouralLandingPageComponent } from './behavioural-landing-page/behavioural-landing-page.component';
import { BajajViewReportComponent } from './bajaj-view-report/bajaj-view-report.component';
const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.BEHAVIOUR_MODULE.BEHAVIOUR_REPORT}/:id`, component: BehaviouralLandingPageComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.BEHAVIOUR_MODULE.BEHAVIOUR_REPORT1}/:id`, component: BajajViewReportComponent,
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.REPORTS.BEHAVIOUR_MODULE.BEHAVIOUR_REPORT}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BehaviouralReportRoutingModule { }
