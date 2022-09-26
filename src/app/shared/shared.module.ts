import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from './../material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HorizontalBarChartComponent } from './horizontal-bar-chart/horizontal-bar-chart.component';
import { RoundcanvasComponent } from './roundcanvas/roundcanvas.component';
import { ChartsModule } from 'ng2-charts';
import { BehaviouralPdfReportDownloadComponent } from './behavioural-pdf-report-download/behavioural-pdf-report-download.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BehaviouralReportCanvasComponent } from './behavioural-report-canvas/behavioural-report-canvas.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BarChartComponent,
    HorizontalBarChartComponent,
    RoundcanvasComponent,
    BehaviouralPdfReportDownloadComponent,
    ToolbarComponent,
    BehaviouralReportCanvasComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgxChartsModule,
    ChartsModule,
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    HeaderComponent,
    FooterComponent,
    NgxChartsModule,
    BarChartComponent,
    HorizontalBarChartComponent,
    RoundcanvasComponent,
    BehaviouralPdfReportDownloadComponent,
    ToolbarComponent,
    BehaviouralReportCanvasComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class SharedModule { }
