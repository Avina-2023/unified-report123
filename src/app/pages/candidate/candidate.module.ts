import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { CandidateRoutes } from './candidate.routing';

@NgModule({
  imports: [
    CommonModule,
    CandidateRoutes
  ],
  declarations: [CandidateComponent]
})
export class CandidateModule { }
