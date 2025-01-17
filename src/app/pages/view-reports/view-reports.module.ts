import { ViewOverallReportsComponent } from './view-overall-reports/view-overall-reports.component';
import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewReportsRoutingModule } from './view-reports-routing.module';
import { AssessmentInfoComponent } from './sub-pages/assessment-info/assessment-info.component';
import { CompetencyAreasComponent } from './sub-pages/competency-areas/competency-areas.component';
import { DocInfoComponent } from './sub-pages/doc-info/doc-info.component';
import { ProfileInfoComponent } from './sub-pages/profile-info/profile-info.component';
import { QualityAreaComponent } from './sub-pages/quality-area/quality-area.component';
import { UserListComponent } from './user-list/user-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { DragScrollModule } from 'ngx-drag-scroll';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { ChartsModule } from 'ng2-charts';
import { BehaviouralAssessmentInfoComponent } from './sub-pages/behavioural-assessment-info/behavioural-assessment-info.component';
// import { BajajViewReportComponent } from '../behavioural-report/bajaj-view-report/bajaj-view-report.component';
import { BehaviouralCompetencyAreasComponent } from './sub-pages/behavioural-competency-areas/behavioural-competency-areas.component';
import { BehaviouralQualityAreaComponent } from './sub-pages/behavioural-quality-area/behavioural-quality-area.component';
import 'ag-grid-enterprise';
import { HiringReportComponent } from './sub-pages/hiring-report/hiring-report.component';
import { ChartsModule } from 'ng2-charts';
import { BehaviouralReportModule } from '../behavioural-report/behavioural-report.module';
import { CandidateSkillsComponent } from './sub-pages/candidate-skills/candidate-skills.component';
import { CandidateProfileComponent } from './sub-pages/candidate-profile/candidate-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BajajBehaviouralCompetencyAreaComponent } from './sub-pages/bajaj-behavioural-competency-area/bajaj-behavioural-competency-area.component';
import { DashboardlistComponent } from './dashboardlist/dashboardlist.component';
@NgModule({
  declarations: [
    ProfileInfoComponent,
    DocInfoComponent,
    AssessmentInfoComponent,
    CompetencyAreasComponent,
    QualityAreaComponent,
    ViewOverallReportsComponent,
    UserListComponent,
    BehaviouralAssessmentInfoComponent,
    BehaviouralCompetencyAreasComponent,
    BehaviouralQualityAreaComponent,
    HiringReportComponent,
    CandidateSkillsComponent,
    CandidateProfileComponent,
    DashboardComponent,
    BajajBehaviouralCompetencyAreaComponent,
    DashboardlistComponent,
    // BajajViewReportComponent
    
  ],
  imports: [
    CommonModule,
    ViewReportsRoutingModule,
    DragScrollModule,
    // ChartsModule,
    SharedModule,
    MaterialModule,
    PdfViewerModule,
    ChartsModule,
    BehaviouralReportModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    AgGridModule.withComponents([])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ViewReportsModule { }
