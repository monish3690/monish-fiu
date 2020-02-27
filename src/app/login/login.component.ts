import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  


  constructor(private router:Router,private ss:ServiceService) { }

  ngOnInit() {

    setTimeout(() => {
      this.ss.logout();
    }, 0);
  }
  login(obj)
  {
    console.log(obj);
    if(obj.role=="Admin")
    {
    if(obj.id!=="admin")
    {
      alert("invalid Username");
    }
    else if(obj.password!=='admin'){
           
      alert("invalid passsword")
    }
      else{
      
        alert("login Successfully")
        this.ss.loggedinStatus=true;
        // this.ss.loggedinUser=obj.id;
        this.router.navigate(['/adminprofile'])
       
      }
    }
    else if(obj.role=="User")
    {
      this.ss.studentLogin(obj).subscribe((res)=>{
        if(res["message"]=="invalid-studentid"){
          alert("invalid student id")
        }
        else if(res["message"]=="invalid-password"){
                 alert("invalid-password")
        }
        else{
          alert("logged in successfully")
          this.ss.loggedinUser=res["name"]
          this.ss.loggedinStatus=true;
          this.router.navigate(['/studentprofile']);

        }
      })
    }
    else{
      alert("please select role")
    }

    }
  }


