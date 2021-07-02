import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { DocInfoComponent } from './pages/doc-info/doc-info.component';
import { AssessmentInfoComponent } from './pages/assessment-info/assessment-info.component';
import { CompetencyAreasComponent } from './pages/competency-areas/competency-areas.component';
import { QualityAreaComponent } from './pages/quality-area/quality-area.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    ProfileInfoComponent,
    DocInfoComponent,
    AssessmentInfoComponent,
    CompetencyAreasComponent,
    QualityAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
