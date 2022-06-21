import { UserListComponent } from './user-list/user-list.component';
import { APP_CONSTANTS } from './../../utils/app-constants.service';
import { ViewOverallReportsComponent } from './view-overall-reports/view-overall-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringReportComponent } from './sub-pages/hiring-report/hiring-report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidateOverAllReportComponent } from '../candidate-assessment-report/candidate-over-all-report/candidate-over-all-report.component';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.VIEWREPORTS}/:id`, component: ViewOverallReportsComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.USERLIST}`, component: UserListComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.HIRINGREPORT}`, component: HiringReportComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.DASHBOARD}`, component: DashboardComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.BEHAVIOUR_MODULE.HOME}`, loadChildren: () => import('../behavioural-report/behavioural-report.module').then(m => m.BehaviouralReportModule)
  },
  // {
  //   path: `${APP_CONSTANTS.ROUTES.CANDIDATE.VIEWOVERALLREPORT}/:id`, component: CandidateOverAllReportComponent,
  // },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.REPORTS.USERLIST}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewReportsRoutingModule { }
