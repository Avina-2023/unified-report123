import { Routes, RouterModule } from '@angular/router';
import { LandingAboutComponent } from './landing-about/landing-about.component';
import { LandingHomeComponent } from './landing-Home/landing-Home.component';
import { LandingScreenComponent } from './landing-screen.component';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { LandingEmployersComponent } from './landing-employers/landing-employers.component';
import { LandingFreshGraduateComponent } from './landing-freshGraduate/landing-freshGraduate.component';
import { LandingHiringPartnerComponent } from './landing-hiringPartner/landing-hiringPartner.component';
import { LandingInstitutionalPartnerComponent } from './landing-InstitutionalPartner/landing-InstitutionalPartner.component';
import { LandingContactComponent } from './landing-contact/landing-contact.component';


const routes: Routes =[ 
  {
    path: '', component: LandingScreenComponent,
    children: [
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.HOME}`, component:LandingHomeComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.ABOUT}`, component:LandingAboutComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.EMPLOYER}`, component:LandingEmployersComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.FRESHGRADUATES}`, component:LandingFreshGraduateComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.HIRINGPARTNER}`, component:LandingHiringPartnerComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.INSTITUTIONALPARTNERS}`, component:LandingInstitutionalPartnerComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.CONTACT}`, component:LandingContactComponent
      },
      {
        path:'',redirectTo:`${APP_CONSTANTS.ROUTES.LANDINGPAGE.HOME}`,pathMatch:'full'
      }
    ]
  }
];

export const LandingScreenRoutes = RouterModule.forChild(routes);
