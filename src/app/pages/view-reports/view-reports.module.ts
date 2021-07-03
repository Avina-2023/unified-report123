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


@NgModule({
  declarations: [
    ProfileInfoComponent,
    DocInfoComponent,
    AssessmentInfoComponent,
    CompetencyAreasComponent,
    QualityAreaComponent,
    ViewOverallReportsComponent,
  ],
  imports: [
    CommonModule,
    ViewReportsRoutingModule,
    SharedModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ViewReportsModule { }
