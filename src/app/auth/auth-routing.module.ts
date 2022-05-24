import { APP_CONSTANTS } from './../utils/app-constants.service';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {
        path: `${APP_CONSTANTS.ROUTES.REPORTS.HOME}`, loadChildren: () => import('../pages/view-reports/view-reports.module').then(m => m.ViewReportsModule)
      },

      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATE.HOME}`, loadChildren: () => import('../pages/candidate-assessment-report/candidate-assessment-report.module').then(m => m.CandidateAssesmentReportModule)
      },
      {
        path: '',
        redirectTo: `${APP_CONSTANTS.ROUTES.REPORTS.HOME}`,
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
