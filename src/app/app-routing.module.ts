import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from './utils/app-constants.service';
import { IsloggedInGuard } from './guards/islogged-in.guard';
import { IsAccessGuard } from './guards/is-access.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)//, canActivate: [IsloggedInGuard]
  },
  {
    path: `${APP_CONSTANTS.ROUTES.AUTH}`, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)//, canActivate: [IsAccessGuard]
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.AUTH}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
