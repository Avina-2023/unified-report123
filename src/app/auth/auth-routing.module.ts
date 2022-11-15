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
        path: `${APP_CONSTANTS.ROUTES.SKILLMASTER.HOME}`, loadChildren: () => import('../pages/skill-Master/skill-master.module').then(m => m.SkillMasterModule)
      },{
        path: `${APP_CONSTANTS.ROUTES.PARTNER.HOME}`, loadChildren: () => import('../pages/employer/partner.module').then(m => m.Adminmodule)
      },
      {
        path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.HOME}`, loadChildren: () => import('../pages/employer/empdashboard/empdashboard.module').then(m => m.EmployerModule)
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
