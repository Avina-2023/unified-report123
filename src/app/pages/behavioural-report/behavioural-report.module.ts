import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviouralReportRoutingModule } from './behavioural-report-routing.module';
import { BehaviouralLandingPageComponent } from './behavioural-landing-page/behavioural-landing-page.component';
// import { BehaviouralPdfReportDownloadComponent } from '../../shared/behavioural-pdf-report-download/behavioural-pdf-report-download.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BehaviouralLandingPageComponent,
    // BehaviouralReportCanvasComponent,
    // BehaviouralPdfReportDownloadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BehaviouralReportRoutingModule,
    ChartsModule,
    SharedModule
  ],
})
export class BehaviouralReportModule { }
