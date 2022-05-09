import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SentDataToOtherComp {

  constructor() { }
  private subject = new Subject<any>();

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

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}