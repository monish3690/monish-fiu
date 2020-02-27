import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
  file:File;
  marks;
  constructor(private ss:ServiceService) { }

  ngOnInit() {
    this.ss.getMarks().subscribe((read)=>{

      if(read['message']=="no attendence data")
      {
        alert("no attendence data")
      }
      else{
        this.marks=read['message']
   
      }
     })
  }

  stumarks(obj)
  {
    console.log(obj)
    let formdata = new FormData();
    formdata.append("branch",obj.branch);
    formdata.append("year",obj.year);
    formdata.append("marks",this.file,this.file.name);
    this.ss.setMarks(formdata).subscribe((res)=>{
    if(res["message"]=="marks Sheet uploaded successfully")
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
