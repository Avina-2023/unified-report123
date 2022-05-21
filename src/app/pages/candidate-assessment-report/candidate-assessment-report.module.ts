
import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateAssesmentReportRoutingModule } from './candidate-assessment-report-routing.module';
import { CandidateOverAllReportComponent } from './candidate-over-all-report/candidate-over-all-report.component';
import { AssessmentOverviewComponent } from './sub-pages/assessment-overview/assessment-overview.component';
import { TestInfoAndTestCountComponent } from './sub-pages/test-info-and-test-count/test-info-and-test-count.component';
import { SectionAnalysisComponent } from './sub-pages/section-analysis/section-analysis.component';
import { TopicAnalysisComponent } from './sub-pages/topic-analysis/topic-analysis.component';
import { BloomsTaxonomyComponent } from './sub-pages/blooms-taxonomy/blooms-taxonomy.component';
import { ComplexityAnalysisComponent } from './sub-pages/complexity-analysis/complexity-analysis.component';
import { TimeSpentAnalysisComponent } from './sub-pages/time-spent-analysis/time-spent-analysis.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    CandidateOverAllReportComponent,
    AssessmentOverviewComponent,
    TestInfoAndTestCountComponent,
    SectionAnalysisComponent,
    TopicAnalysisComponent,
    BloomsTaxonomyComponent,
    ComplexityAnalysisComponent,
    TimeSpentAnalysisComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    CandidateAssesmentReportRoutingModule,
    ChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CandidateAssesmentReportModule {}
