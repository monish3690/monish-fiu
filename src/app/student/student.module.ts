import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';

import { ReadattendanceComponent } from './readattendance/readattendance.component';
import { ReadmarksComponent } from './readmarks/readmarks.component';


@NgModule({
  declarations: [StudentprofileComponent,ReadattendanceComponent, ReadmarksComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
