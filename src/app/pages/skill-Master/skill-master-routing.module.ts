import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { SkillMasterListComponent } from './skill-master-list/skill-master-list.component';
import { SkillBulkUploadComponent } from './skill-bulk-upload/skill-bulk-upload.component';

const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.SKILLMASTER.HOME}`, component: SkillMasterListComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.SKILLMASTER.SKILLBULKUPlOAD}`, component: SkillBulkUploadComponent,
  },
  {
    path: '',
    redirectTo: `${APP_CONSTANTS.ROUTES.SKILLMASTER.HOME}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillMasterRoutingModule { }
