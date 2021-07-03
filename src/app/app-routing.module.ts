import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from './utils/app-constants.service';

const routes: Routes = [
  // {
  //   path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },
  {
    path: `${APP_CONSTANTS.ROUTES.AUTH}`, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
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
