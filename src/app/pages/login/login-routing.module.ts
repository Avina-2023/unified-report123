import { APP_CONSTANTS } from './../../utils/app-constants.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ExternalLinkComponent } from './external-link/external-link.component';
const routes: Routes = [
  {
    path: ``, redirectTo: `${APP_CONSTANTS.ROUTES.LOGIN}`
  },
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, component: LoginPageComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PASSWORD.FORGOT}`, component: ForgotPasswordComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PASSWORD.RESET}`, component: SetPasswordComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.PASSWORD.SETUP}`, component: SetPasswordComponent
  },
  {
    path: `${APP_CONSTANTS.ROUTES.EXTLOGIN}`, component: ExternalLinkComponent
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.LOGIN}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
