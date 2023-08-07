import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { CandidateRoutes } from './candidate.routing';
import { MaterialModule } from 'src/app/material/material.module';
import { JobListingComponent } from './job-listing/job-listing.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeTemplateViewerComponent } from './resume-template-viewer/resume-template-viewer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobListItemComponent } from './job-display-pages/job-list-item/job-list-item.component';
import { JobAppliedListComponent } from './job-display-pages/job-applied-list/job-applied-list.component';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { JobSavedListComponent } from './job-display-pages/job-saved-list/job-saved-list.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { TimeAgoPipe } from 'src/app/pipe/timeago.pipe';
import { TimeDiffPipe } from 'src/app/pipe/timeDiff/timeDiff.pipe';
import { NoDataFoundComponent } from './candidateCommons/no-data-found/no-data-found.component';
import { ResumeTemplate1Component } from './resume-builder/resume-templates/resumeTemplate1/resumeTemplate1.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DragScrollModule } from 'ngx-drag-scroll';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    CandidateRoutes,
    MaterialModule,
    NgApexchartsModule,
    FormsModule,
    CarouselModule,
    DragScrollModule,
  ],
  declarations: [
    JobDashboardComponent,
    ResumeTemplate1Component,
    CandidateComponent,
    JobListingComponent,
    JobListItemComponent,
    ResumeBuilderComponent,
    ResumeTemplateViewerComponent,
    JobAppliedListComponent,
    JobSavedListComponent,
    JobDescriptionComponent,
    TimeAgoPipe,
    TimeDiffPipe,
    NoDataFoundComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CandidateModule {}
