import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { IsAccessGuard } from './guards/is-access.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { CertificateViewComponent } from './pages/certificate-view/certificate-view.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: `landing`, component: LandingPageComponent
  },
  {
    path: ``, component: LandingPageComponent ,canActivate: [IsloggedInGuard]
  },
  {
    path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [IsloggedInGuard]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.AUTH}`, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [IsAccessGuard]
  },
  {
    path: `certificate`, component: CertificateViewComponent
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
