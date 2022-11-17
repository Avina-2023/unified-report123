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
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CandidateRoutes,
    MaterialModule
  ],
  declarations: [
    CandidateComponent,
    JobListingComponent,
    JobListItemComponent,
    JobAppliedListComponent,
    JobSavedListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CandidateModule { }
