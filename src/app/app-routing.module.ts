import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAccessGuard } from './guards/is-access.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { candidateRegister } from './pages/login/candidateRegister/candidateRegister.component';
import { RegisterPageComponent } from './pages/login/register-page/register-page.component';

import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { CertificateViewComponent } from './pages/certificate-view/certificate-view.component';
import { ExternalLinkComponent } from './pages/external-link/external-link.component';
const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.LANDINGPAGE.LANDINGPAGE}`, loadChildren: () => import('./pages/landing-screen/landing-screen.module').then(m => m.LandingScreenModule),canActivate: [IsloggedInGuard]
  },
  {
    path: `landingold`, component: LandingPageComponent
  },
  {
    path: `adminlogin`, component: LoginPageComponent,
  },
  // {
  //   path:'htmlStatic',redirectTo:'/static',pathMatch:'full' // path should be empty string for static html
  // },
  {
    path: `register`, component: candidateRegister
  },
  {
    path: 'employers', component: RegisterPageComponent
  },
  {
    path: '', loadChildren: () => import('./pages/login/login-routing.module').then(m => m.LoginRoutingModule), canActivate: [IsloggedInGuard]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.AUTH}`, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: `${APP_CONSTANTS.ROUTES.CNDIDATELANDING}`, loadChildren: () => import('./pages/candidate/candidate.module').then(m => m.CandidateModule), canActivate: [IsAccessGuard]
  },
  {
    path: `certificate`, component: CertificateViewComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.HOME}`, loadChildren: () => import('./pages/view-reports/view-reports.module').then(m => m.ViewReportsModule), data: { key: 'user' }
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EXTLOGIN}`, component: ExternalLinkComponent
  },
  {
    path: `error`,
    pathMatch: 'full',
    component: PagenotfoundComponent
  },
  {
    path: `**`,
    pathMatch: 'full',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
