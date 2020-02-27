import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  data:any=[];

  constructor(private ss:ServiceService) { }

 data1;
commonTerm;

ngOnInit() {
  this.data1=this.ss.toCommon()
  console.log(this.data1)
  this.ss.doGet(this.data1).subscribe((read)=>{
   
    this.data=read["message"];
     console.log(this.data)
      
  })
}

  submitForm(obj)
  {
    console.log(obj)
    // this.data.push(obj)
   this.ss.registerStudent(obj).subscribe((obj)=>{
     if(obj["message"]=="success")
     {
       alert("success")
       this.ngOnInit();
     }
     else if(obj['message']=="generateid first"){
       alert("generated id first")
     }
   })

  }
  da:any=[];
  update(data){
    this.da=data;
  }
  updateStudent(upd)
  {
    console.log(upd)
    this.ss.doUpd(upd).subscribe((upd)=>{
      if(upd["message"]=="success")
      {
        alert("updated successfully")
      }
      else if(upd["message"]=="nodata")
      {
        alert("not existed")
      }

    })
  }

  //read year wise
  obj={'year':0,'department':''}
  changeYear(year:any){
    if(year==="all"){
      this.ngOnInit();
    } 
    else{
      console.log(year);
      this.obj.year=year;
      this.obj.department=this.data1;
      console.log(this.obj);
      this.ss.sortByYear(this.obj).subscribe((dataArray)=>{
        if(dataArray['message']==="nodatafound"){
          alert("no data found")
        }
        else{
          console.log(dataArray['message'])
          this.data=dataArray['message']
          console.log(this.data)
        }
      })
    }
  }


  deleteStudent(del)
  {
    var a=confirm("Do u want to continue")
    console.log(del);
    if(a==true){
    this.ss.doDel(del).subscribe((res)=>{
      if(res["message"]=="success")
      {
        alert("deleted successfully")
      }
    

    })

  }

  }
  
  //excel downloader

  public downloadFile(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames:
    ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type:
    'array' });
    this.saveAsExcelFile(excelBuffer, 'excelFileName');
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() +
    EXCEL_EXTENSION);
    }

    //excel pdf
    downloadPDF(){
      const doc = new jsPDF()
      var col=["fullname","studentid","year","phone","department","address","ssc","inter"]
      var rows=[];
      this.data.forEach(element=>{
      let fullname=element.first+element.second;
      let studentid=element.studentid;
      let year=element.year;
      let phone=element.phone;
      let department=element.department;
      let address=element.address;
      let ssc=element.ssc;
      let inter=element.inter;

      let temp=[fullname,studentid,year,phone,department,address,ssc,inter]
      rows.push(temp)
      })
      doc.autoTable(col,rows,{
      theme:'grid'
      })
      doc.save('first.pdf')
     }
     
}
