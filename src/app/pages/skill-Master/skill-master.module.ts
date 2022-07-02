import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillMasterRoutingModule } from './skill-master-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SkillMasterRoutingModule,
    ChartsModule,
    SharedModule
  ],
})
export class SkillMasterModule { }
