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
import {CarouselModule} from 'ngx-owl-carousel-o';
import { MaterialModule } from 'src/app/material/material.module';
import {AnimateOnScrollModule} from 'ng2-animate-on-scroll';
import { ScrollTrackDirective } from 'src/app/directives/scroll-track.directive';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MaterialModule,
    AnimateOnScrollModule.forRoot(),
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
     LandingFooterComponent,
     ScrollTrackDirective,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LandingScreenModule { }
