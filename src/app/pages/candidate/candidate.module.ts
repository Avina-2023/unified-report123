import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { CandidateRoutes } from './candidate.routing';
import { MaterialModule } from 'src/app/material/material.module';
import { JobListingComponent } from './job-listing/job-listing.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeTemplateComponent } from './resume-template/resume-template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {JobListItemComponent} from './job-display-pages/job-list-item/job-list-item.component'
import { JobAppliedListComponent } from './job-display-pages/job-applied-list/job-applied-list.component';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { CommonPaginatorComponent } from './candidateCommons/common-paginator/common-paginator.component';
import { JobSavedListComponent } from "./job-display-pages/job-saved-list/job-saved-list.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { TimeAgoPipe } from 'src/app/pipe/timeago.pipe';
import { NoDataFoundComponent } from './candidateCommons/no-data-found/no-data-found.component';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CandidateRoutes,
    MaterialModule,
    NgApexchartsModule,
    FormsModule,
  ],
  declarations: [
    JobDashboardComponent,
    CandidateComponent,
    JobListingComponent,
    JobListItemComponent,
    ResumeBuilderComponent,
    ResumeTemplateComponent,
    JobAppliedListComponent,
    JobSavedListComponent,
    JobDescriptionComponent,
    CommonPaginatorComponent,
    TimeAgoPipe,
    NoDataFoundComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CandidateModule { }
