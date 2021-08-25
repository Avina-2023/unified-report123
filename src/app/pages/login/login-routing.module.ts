import { APP_CONSTANTS } from './../../utils/app-constants.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ``, redirectTo: `${APP_CONSTANTS.ROUTES.LOGIN}`
  },
  {
    path: `${APP_CONSTANTS.ROUTES.LOGIN}`, component: LoginPageComponent
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
