import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private ss:ServiceService) { }
  file:File;
 attendence;
  ngOnInit() {
      this.ss.getAttendence().subscribe((read)=>{

   if(read['message']=="no attendence data")
   {
     alert("no attendence data")
   }
   else{
     this.attendence=read['message']
     this.ngOnInit();

   }
  })
  }
  attendance(data)
  {
    console.log(data)
    
    let formdata = new FormData();
    formdata.append("branch",data.branch);
    formdata.append("year",data.year);
    formdata.append("attendence",this.file,this.file.name);
    this.ss.setAttendence(formdata).subscribe((res)=>{
    if(res["message"]=="Attendence Sheet uploaded successfully")
    {
    alert(res["message"]);
    }
    else if(res["err_desc"]=="Corupted excel file"){
    alert(res["err_desc"]);
    }
   })
  
  }
  fileUpload(filedata){

    this.file=filedata.target.files[0];
    }

  }
     
      

