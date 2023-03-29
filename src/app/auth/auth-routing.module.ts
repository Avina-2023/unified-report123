import { APP_CONSTANTS } from './../utils/app-constants.service';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAccessGuard } from '../guards/is-access.guard';
import { EmpPostrequirmentsComponent } from '../pages/employer/emp-postrequirments/emp-postrequirments.component';
// import { EmpRequirmentsComponent } from '../pages/employer/emp-requirments/emp-requirments.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      // {
      //   path: `${APP_CONSTANTS.ROUTES.REPORTS.HOME}`, loadChildren: () => import('../pages/view-reports/view-reports.module').then(m => m.ViewReportsModule),canActivate:[IsAccessGuard],data:{key:'user'}
      // },

      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATE.HOME}`, loadChildren: () => import('../pages/candidate-assessment-report/candidate-assessment-report.module').then(m => m.CandidateAssesmentReportModule)
      },
      {
        path: `${APP_CONSTANTS.ROUTES.SKILLMASTER.HOME}`, loadChildren: () => import('../pages/skill-Master/skill-master.module').then(m => m.SkillMasterModule)
      },{
        path: `${APP_CONSTANTS.ROUTES.PARTNER.HOME}`, loadChildren: () => import('../pages/employer/partner.module').then(m => m.Adminmodule),canActivate:[IsAccessGuard]
      },
      {
        path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.HOME}`, loadChildren: () => import('../pages/employer/empdashboard/empdashboard.module').then(m => m.EmployerModule),canActivate:[IsAccessGuard]
      },
      {
        path: `${APP_CONSTANTS.ROUTES.DRIVE.HOME}`, loadChildren: () => import('../pages/employer/drive/drive.module').then(m => m.DriveModule)
      },
      {
        path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.POSTREQUIRMENT}`, component: EmpPostrequirmentsComponent
      },
      // {
      //   path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.REQUIRMENT}`, component: EmpRequirmentsComponent
      // },

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
