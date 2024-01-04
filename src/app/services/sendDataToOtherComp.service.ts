import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SentDataToOtherComp {

  constructor() { }
  private subject = new Subject<any>();
  public jobData_Subject = new Subject<any>();
  sendMessage(data: any,value:any) {
    data = {
      data:data,
      value:value
    }
      this.subject.next( data );
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage (): Observable<any> {
      return this.subject.asObservable();
  }

  getMessage_Dyn (sub:Subject<any>): Observable<any> {
    return sub.asObservable();
  }
  sendMessage_Dyn (data: any,value:any, sub:Subject<any>) {
    data = {
      data:data,
      value:value
    }
      sub.next( data );
  }
}