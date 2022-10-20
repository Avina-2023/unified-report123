import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { PartnerListComponent } from '../employer/partner-list/partner-list.component';
import { CountdisplayCardComponent } from './countdisplay-card/countdisplay-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DegreeChartComponent } from './degree-chart/degree-chart.component';
import { DemographyChartComponent } from './demography-chart/demography-chart.component';
import { DisciplineChartComponent } from './discipline-chart/discipline-chart.component'
import { GraduationChartComponent } from './graduation-chart/graduation-chart.component';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.HOME}`, component: DashboardComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.COUNTCARD}`, component: CountdisplayCardComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.DEMOGRAPHY}`, component: DemographyChartComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.DISCIPLINE}`, component: DisciplineChartComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.DEGREE}`, component: DegreeChartComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.GRADUATION}`, component: GraduationChartComponent
  },      
 
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.EMPDASHBOARD.HOME}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
