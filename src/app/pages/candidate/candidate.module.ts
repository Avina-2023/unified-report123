import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { CandidateRoutes } from './candidate.routing';
import { MaterialModule } from 'src/app/material/material.module';
import { JobListingComponent } from './job-listing/job-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {JobListItemComponent} from './job-display-pages/job-list-item/job-list-item.component'
import { JobAppliedListComponent } from './job-display-pages/job-applied-list/job-applied-list.component';
import { JobSavedListComponent } from './job-display-pages/job-saved-list/job-saved-list.component';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { CommonPaginatorComponent } from './candidateCommons/common-paginator/common-paginator.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CandidateRoutes,
    MaterialModule,
    NgApexchartsModule,
    FormsModule
  ],
  declarations: [
    JobDashboardComponent,
    CandidateComponent,
    JobListingComponent,
    JobListItemComponent,
    JobAppliedListComponent,
    JobSavedListComponent,
    CommonPaginatorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CandidateModule { }
