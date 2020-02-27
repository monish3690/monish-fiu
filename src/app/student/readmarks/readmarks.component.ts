import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-readmarks',
  templateUrl: './readmarks.component.html',
  styleUrls: ['./readmarks.component.css']
})
export class ReadmarksComponent implements OnInit {
  studentdata=this.ss.loggedinUser;
  loggedstudentid=this.studentdata.studentid;
  marksdata;
  constructor(private ss:ServiceService) {}
                                       
  ngOnInit() {
    this.ss.loggedStudentMarks(this.loggedstudentid).subscribe((res)=>{
      if(res['message']=="no data found with the given student id"){
        alert("no data found with the given student id")
      }
      else{
        this.marksdata=res["message"];
        console.log(this.marksdata);
      }

    })

  }

}
