import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-readattendance',
  templateUrl: './readattendance.component.html',
  styleUrls: ['./readattendance.component.css']
})
export class ReadattendanceComponent implements OnInit {
  studentdata=this.ss.loggedinUser;
  loggedstudentid=this.studentdata.studentid;
  attendencedata;
  constructor(private ss:ServiceService) {}
                                       
  ngOnInit() {
    this.ss.loggedStudentData(this.loggedstudentid).subscribe((res)=>{
      if(res['message']=="no data found with the given student id"){
        alert("no data found with the given student id")
      }
      else{
        this.attendencedata=res["message"];
        console.log(this.attendencedata);
      }

    })

  }

}
