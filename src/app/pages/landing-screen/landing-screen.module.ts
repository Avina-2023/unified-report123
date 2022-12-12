import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingAboutComponent } from './landing-about/landing-about.component';
import { LandingEmployersComponent } from './landing-employers/landing-employers.component';
import { LandingFreshGraduateComponent } from './landing-freshGraduate/landing-freshGraduate.component';
import { LandingHiringPartnerComponent } from './landing-hiringPartner/landing-hiringPartner.component';
import { LandingInstitutionalPartnerComponent } from './landing-InstitutionalPartner/landing-InstitutionalPartner.component';
import { LandingContactComponent } from './landing-contact/landing-contact.component';
import { LandingScreenComponent } from './landing-screen.component';
import { LandingScreenRoutes } from './landing-screen.routing';
import { LandingHeaderComponent } from './commons/landing-header/landing-header.component';
import { LandingFooterComponent } from './commons/landing-footer/landing-footer.component';
import { LandingHomeComponent } from './landing-Home/landing-Home.component';

@NgModule({
  imports: [
    CommonModule,
    LandingScreenRoutes
  ],
  declarations: [ 
     LandingHomeComponent,  
     LandingAboutComponent, 
     LandingEmployersComponent,
     LandingFreshGraduateComponent,
     LandingHiringPartnerComponent,
     LandingInstitutionalPartnerComponent,
     LandingContactComponent,
     LandingScreenComponent,
     LandingHeaderComponent,
     LandingFooterComponent
     
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LandingScreenModule { }
