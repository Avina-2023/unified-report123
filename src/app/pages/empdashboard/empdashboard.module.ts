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
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    DashboardComponent,
    CountdisplayCardComponent,
    DemographyChartComponent,
    DisciplineChartComponent,
    DegreeChartComponent,
    GraduationChartComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
   EmployerRoutingModule,
    MaterialModule,
    ChartsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
  ],
})
export class EmployerModule { }
