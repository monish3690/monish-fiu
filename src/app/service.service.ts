import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private hc:HttpClient) { }
  loggedinStatus:boolean
  bcode;
 
   loggedinUser:any
  logout()
  {
    this.loggedinStatus=false;
  }

   toSer;
   toCommon()
   {
     return this.toSer;
     
   }


  doGenerateId(obj):Observable<any>
  {
    this.bcode=obj.branchcode;
    return this.hc.post('/save',obj)
  }
  doGen():Observable<any>
  {
    return this.hc.get<any>('/learn')
  }

  registerStudent(obj):Observable<any>
  {
    obj.branchcode=this.bcode;
    return this.hc.post('/reg',obj);
  }

  doGet(obj):Observable<any>
  {
    return this.hc.get<any>(`/readAll/${obj}`)
  }
  doUpd(upd):Observable<any>
  {
     return this.hc.put('/update',upd)
  }

 
  doDel(obj):Observable<any>
  {
return this.hc.delete(`/remove/${obj.phone}`)
  }

  //to read your wise
  sortByYear(byyear):Observable<any>
  {
    console.log(byyear);
    return this.hc.post('/readbyyear',byyear);
  }

  studentLogin(obj):Observable<any>
  {
    console.log(obj)
    return this.hc.post('/login',obj);
  }
  setAttendence(data):Observable<any>
  {
    return this.hc.post<any>('/uploadattendence',data)
    }
    getAttendence():Observable<any>
    {
      // console.log(obj)
      return this.hc.get('/readattendence')
    }

    loggedStudentData(obj):Observable<any>{
      return this.hc.get(`/loggedinstudentattendence/${obj}`)
    }


    //
    setMarks(data):Observable<any>
    {
      return this.hc.post<any>('/uploadmarks',data)
      }

      getMarks():Observable<any>
      {
        // console.log(obj)
        return this.hc.get('/readmarks')
      }
      loggedStudentMarks(obj):Observable<any>{
        return this.hc.get(`/loggedinstudentmarks/${obj}`)
      }

     
}
