import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { GenerateIdComponent } from './generate-id/generate-id.component';
import { BranchComponent } from './branch/branch.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarksComponent } from './marks/marks.component';
import { CommonComponent } from './common/common.component';
import { CommonPipe } from './common.pipe';


@NgModule({
  declarations: [AdminprofileComponent, GenerateIdComponent, BranchComponent, AttendanceComponent, MarksComponent, CommonComponent, CommonPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
