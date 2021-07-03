import { ViewOverallReportsComponent } from './view-overall-reports/view-overall-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ``, component: ViewOverallReportsComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewReportsRoutingModule { }
