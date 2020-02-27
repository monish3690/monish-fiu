import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
 constructor(public ss:ServiceService,public router:Router){}

  
 logout()
 {
   this.ss.logout();
 }
}
