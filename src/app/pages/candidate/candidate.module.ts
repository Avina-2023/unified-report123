import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { CandidateRoutes } from './candidate.routing';
import { MaterialModule } from 'src/app/material/material.module';
import { JobListingComponent } from './job-listing/job-listing.component';

@NgModule({
  imports: [
    CommonModule,
    CandidateRoutes,
    MaterialModule
  ],
  declarations: [
    CandidateComponent,
    JobListingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CandidateModule { }
