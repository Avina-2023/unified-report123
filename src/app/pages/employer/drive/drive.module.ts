import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriveRoutingModule } from './drive-routing.module';
import { ManageDriveComponent } from './manage-drive/manage-drive.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopUpCellRendererComponent } from './manage-drive/pop-up-cell-renderer/pop-up-cell-renderer.component';
import { DriveSettingsComponent } from './drive-settings/drive-settings.component';
import { ViewCandidateByDriveComponent } from './viewCandidateByDrive/viewCandidateByDrive.component';
import { ViewCandidateProfilebyEmployerComponent } from './viewCandidateProfilebyEmployer/viewCandidateProfilebyEmployer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [
    ManageDriveComponent,
    PopUpCellRendererComponent,
    DriveSettingsComponent,
    ViewCandidateByDriveComponent,
    ViewCandidateProfilebyEmployerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule,
    DriveRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule, 
    FormsModule,
    NgCircleProgressModule,
    ReactiveFormsModule,
    NzDropDownModule,
    NzSelectModule,
    AngularEditorModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
})
export class DriveModule {}
