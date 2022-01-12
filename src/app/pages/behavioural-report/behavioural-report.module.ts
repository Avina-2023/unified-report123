import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BehaviouralReportRoutingModule } from './behavioural-report-routing.module';
import { BehaviouralLandingPageComponent } from './behavioural-landing-page/behavioural-landing-page.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    BehaviouralLandingPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BehaviouralReportRoutingModule,
    ChartsModule
  ]
})
export class BehaviouralReportModule { }
