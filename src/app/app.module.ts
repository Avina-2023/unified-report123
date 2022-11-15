import { ToastrModule } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { SharedModule } from './shared/shared.module';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { IsAccessGuard } from './guards/is-access.guard';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { CertificateViewComponent } from './pages/certificate-view/certificate-view.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PartnersListComponent } from './pages/landing-page/partners-list/partners-list.component';
import { LandingHeaderComponent } from './pages/landing-page/landing-header/landing-header.component';
import { LandingFooterComponent } from './pages/landing-page/landing-footer/landing-footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { RegisterPageComponent } from './pages/login/register-page/register-page.component';
// import { JobSeekersComponent } from './pages/login/candidateRegister/candidateRegister.component';
import {candidateRegister} from './pages/login/candidateRegister/candidateRegister.component'
import { SkillMasterListComponent } from './pages/skill-Master/skill-master-list/skill-master-list.component';
import { StaticpageComponent } from './staticpage/staticpage.component';
import { SetPasswordComponent } from './pages/login/set-password/set-password.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    CertificateViewComponent,
    LandingPageComponent,
    PartnersListComponent,
    LandingHeaderComponent,
    LandingFooterComponent,
    LoginPageComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    RegisterPageComponent,
    // JobSeekersComponent,
    candidateRegister,
    SkillMasterListComponent,
    StaticpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MaterialModule,
    SharedModule,
    DragScrollModule,
    PerfectScrollbarModule,
    AgGridModule,
    CarouselModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
        maxOpened:1,
        autoDismiss:true,
        progressBar:true,
        progressAnimation:'increasing',
        closeButton:true
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
      },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    IsloggedInGuard, IsAccessGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
