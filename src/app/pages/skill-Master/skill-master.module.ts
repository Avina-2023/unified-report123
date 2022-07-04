import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillMasterRoutingModule } from './skill-master-routing.module';
import { SkillBulkUploadComponent } from './skill-bulk-upload/skill-bulk-upload.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
// import { SkillMasterListComponent } from './skill-master-list/skill-master-list.component';


@NgModule({
  declarations: [
    SkillBulkUploadComponent,
    // SkillMasterListComponent
  ],
  imports: [
    CommonModule,
    SkillMasterRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class SkillMasterModule { }
