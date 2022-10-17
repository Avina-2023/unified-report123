import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { IsAccessGuard } from './guards/is-access.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { CertificateViewComponent } from './pages/certificate-view/certificate-view.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { JobSeekersComponent } from './pages/jobSeekers/job-seekers/job-seekers.component'
import { RegisterPageComponent } from './pages/register/register-page/register-page.component'
import { StaticpageComponent } from './staticpage/staticpage.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { SidebarComponent } from './pages/empdashboard/sidebar/sidebar.component';
const routes: Routes = [
 {
    path: `landing`, component: LandingPageComponent
  },
  {
    path: `adminlogin`, component: LoginPageComponent,
  },
  {
    path:'',redirectTo:'/static',pathMatch:'full'
  },
  {
    path:'static',component:StaticpageComponent
  },
  {
    path: `register`, component: JobSeekersComponent
  },
  {
    path:'sidebar',component:SidebarComponent
  },
  {
    path: 'employers', component: RegisterPageComponent
  },
  {
    path: '', loadChildren: () => import('./pages/login/login-routing.module').then(m => m.LoginRoutingModule), canActivate: [IsloggedInGuard]
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
