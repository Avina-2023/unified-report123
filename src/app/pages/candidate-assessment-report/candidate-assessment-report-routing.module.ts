
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { CandidateOverAllReportComponent } from './candidate-over-all-report/candidate-over-all-report.component';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.CANDIDATE.VIEWOVERALLREPORT}`, component: CandidateOverAllReportComponent,
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.CANDIDATE.VIEWOVERALLREPORT}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateAssesmentReportRoutingModule { }
