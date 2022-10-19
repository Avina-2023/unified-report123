import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerRoutingModule } from './empdashboard-routing.module';
import { DisciplineChartComponent } from './discipline-chart/discipline-chart.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DemographyChartComponent } from './demography-chart/demography-chart.component';
import {DashboardComponent } from './dashboard/dashboard.component';
import {CountdisplayCardComponent} from './countdisplay-card/countdisplay-card.component'
import {ChartsModule} from 'ng2-charts';
import { DegreeChartComponent } from './degree-chart/degree-chart.component';
import { GraduationChartComponent } from './graduation-chart/graduation-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    DashboardComponent,
    CountdisplayCardComponent,
    DemographyChartComponent,
    DisciplineChartComponent,
    DegreeChartComponent,
    GraduationChartComponent,
  ],
  imports: [
    CommonModule,
   EmployerRoutingModule,
    MaterialModule,
    ChartsModule,
    SharedModule
  ],
})
export class EmployerModule { }
