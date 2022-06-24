import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSeekersComponent } from './job-seekers/job-seekers.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class JobSeekersModule { }
