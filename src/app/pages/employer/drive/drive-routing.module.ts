import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ManageDriveComponent } from './manage-drive/manage-drive.component';
// import { DriveSettingsComponent } from './manage-drive/pop-up-cell-renderer/drive-settings/drive-settings.component';
import { DriveSettingsComponent } from './drive-settings/drive-settings.component';
import { ViewCandidateByDriveComponent } from './viewCandidateByDrive/viewCandidateByDrive.component';
const routes: Routes = [
  {
    path: `${APP_CONSTANTS.ROUTES.DRIVE.MANAGEDRIVE}`, component: ManageDriveComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DRIVE.DRIVESETTINGS}`, component: DriveSettingsComponent,
  },
  {
    path: `${APP_CONSTANTS.ROUTES.DRIVE.VIEWCANDIDATE}`, component: ViewCandidateByDriveComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriveRoutingModule { }
