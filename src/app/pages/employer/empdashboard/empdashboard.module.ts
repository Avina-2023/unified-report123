import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerRoutingModule } from './empdashboard-routing.module';
import { DisciplineChartComponent } from './discipline-chart/discipline-chart.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DemographyChartComponent } from './demography-chart/demography-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CountdisplayCardComponent } from './countdisplay-card/countdisplay-card.component'
import { ChartsModule } from 'ng2-charts';
import { DegreeChartComponent } from './degree-chart/degree-chart.component';
import { GraduationChartComponent } from './graduation-chart/graduation-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { MatChipsModule} from '@angular/material/chips';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { DetailsCardComponent } from './dashboard/details-card/details-card.component';
import { ActionButtonsComponent } from '../drive/viewCandidateByDrive/actionButtons/actionButtons.component';
import { CandidateSearchComponent } from './candidate-search/candidate-search.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    DashboardComponent,
    CountdisplayCardComponent,
    DemographyChartComponent,
    DisciplineChartComponent,
    DegreeChartComponent,
    GraduationChartComponent,
    EmpProfileComponent,
    ChangePasswordComponent,
    DetailsCardComponent,
    ActionButtonsComponent,
    CandidateSearchComponent
  ],
  imports: [
    CommonModule,
   EmployerRoutingModule,
    MaterialModule,
    ChartsModule,
    SharedModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    NgCircleProgressModule
  ],
})
export class EmployerModule { }
