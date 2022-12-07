import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriveRoutingModule } from './drive-routing.module';
import { ManageDriveComponent } from './manage-drive/manage-drive.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PopUpCellRendererComponent } from './manage-drive/pop-up-cell-renderer/pop-up-cell-renderer.component';
import { DriveSettingsComponent } from './drive-settings/drive-settings.component';
@NgModule({
  declarations: [
    ManageDriveComponent,
    PopUpCellRendererComponent,
    
    DriveSettingsComponent 
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule,
    DriveRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule
  ]

})
export class DriveModule { }

