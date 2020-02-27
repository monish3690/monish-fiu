import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { ReadattendanceComponent } from './readattendance/readattendance.component';
import { ReadmarksComponent } from './readmarks/readmarks.component';


const routes: Routes = [{path:'studentprofile',component:StudentprofileComponent,children:[  
                         {path:'readattendence',component:ReadattendanceComponent},
                          {path:'readmarks',component:ReadmarksComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
