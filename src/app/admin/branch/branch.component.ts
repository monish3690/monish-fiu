import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private router:Router,private ss:ServiceService) { }
 
  m;
  ngOnInit() {
  }
  readBranch(obj)
  {
  console.log(obj) ;
  this.m=obj;
  this.ss.toSer=this.m;
  this.router.navigate(['/adminprofile/common']) 
  }
 


}
