import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-generate-id',
  templateUrl: './generate-id.component.html',
  styleUrls: ['./generate-id.component.css']
})
export class GenerateIdComponent implements OnInit {

  constructor(private ss:ServiceService) { }
data1:any=[];
  ngOnInit() {
    this.ss.doGen().subscribe((read)=>{
      this.data1=read["message"]
    })
  }
  generateId(obj)
  {
    console.log(obj);
    obj.count=0;
    this.ss.doGenerateId(obj).subscribe((obj)=>{
      if(obj["message"]=="success"){
        alert("registered successfully")
        this.ngOnInit();
      }
      else if(obj["message"]=="id generated already")
      {
        alert("id generated already")
        this.ngOnInit();
      }
    })
  }

}
