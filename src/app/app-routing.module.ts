import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EceComponent } from './ece/ece.component';
import { CseComponent } from './cse/cse.component';
import { MechanicalComponent } from './mechanical/mechanical.component';
import { CivilComponent } from './civil/civil.component';



const routes: Routes = [{path:"",redirectTo:'home',pathMatch:'full'},{path:'home',component:HomeComponent},
                        {path:'login',component:LoginComponent},
                        {path:'departments',component:DepartmentsComponent},
                        {path:'ece',component:EceComponent},
                        {path:'cse',component:CseComponent},
                        {path:'mechanical',component:MechanicalComponent},
                        {path:'civil',component:CivilComponent},
                        {path:'aboutus',component:AboutusComponent},
                         {path:'contactus',component:ContactusComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
