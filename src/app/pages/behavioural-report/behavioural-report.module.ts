import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BehaviouralReportRoutingModule } from './behavioural-report-routing.module';
import { BehaviouralLandingPageComponent } from './behavioural-landing-page/behavioural-landing-page.component';


@NgModule({
  declarations: [
    BehaviouralLandingPageComponent
  ],
  imports: [
    CommonModule,
    BehaviouralReportRoutingModule
  ]
})
export class BehaviouralReportModule { }
