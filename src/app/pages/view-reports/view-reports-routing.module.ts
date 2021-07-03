import { UserListComponent } from './user-list/user-list.component';
import { APP_CONSTANTS } from './../../utils/app-constants.service';
import { ViewOverallReportsComponent } from './view-overall-reports/view-overall-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.VIEWREPORTS}/:id`, component: ViewOverallReportsComponent, 
  },
  {
    path: `${APP_CONSTANTS.ROUTES.REPORTS.USERLIST}`, component: UserListComponent, 
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.REPORTS.USERLIST}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewReportsRoutingModule { }
