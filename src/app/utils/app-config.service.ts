import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SentDataToOtherComp } from '../services/sendDataToOtherComp.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  jobData:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private sendData: SentDataToOtherComp,
  ) {
    this.getjobdata();
   }

   getjobdata(){
    this.sendData.getMessage_Dyn(this.sendData.jobData_Subject).subscribe((data:any)=>{
      this.jobData = data.value
      console.log(this.jobData,'jobdata')
    })
   }

   getCurrentYear() {
    return new Date().getFullYear();
  }

  // get Current route
  currentRoute() {
    return this.route.url;
  }

  // Navigations
  routeNavigation(path: any) {
    return this.route.navigate([path]);
  }

  // Navigations with Param only
  routeNavigationWithParam(path: any, param: any) {
    return this.route.navigate([path, param]);
  }

  // Navigations with query param only
  routeNavigationWithQueryParam(path: any, queryParam: any) {
    return this.route.navigate([path], { queryParams: queryParam });
  }

  // Navigations with Param and Query param
  routeNavigationWithQueryParamAndParam(path: any, param: any, queryParam: any) {
    return this.route.navigate([path, param], { queryParams: queryParam });
  }
  
  // To get a local storage value
  getLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  // To get a Session storage value
  getSessionStorage(key: string): any {
    return sessionStorage.getItem(key);
  }

  // To set localstorage key and value
  setLocalStorage(key: string, value: any): any {
    return localStorage.setItem(key, value);
  }

  // To set sessionstorage key and value
  setSessionStorage(key: string, value: any): any {
    return sessionStorage.setItem(key, value);
  }

  // Clear local storage
  clearLocalStorage() {
    return localStorage.clear()
  }

  // Clear one entry in local storage
  clearLocalStorageOne(key: any) {
    return localStorage.removeItem(key);
  }
  
  // Clear session storage
  clearSessionStorage() {
    return sessionStorage.clear();
  }

  // Clear one entry in local storage
  clearSessionStorageOne(key: any) {
    return sessionStorage.removeItem(key);
  }
  

  // To print logs
  consoleLog(identityString: any, printText: any) {
    if (environment) {
      // console.log(identityString, printText);
    }
  }

  isComingFromMicroCert() {
    let isCert = localStorage.getItem('type');
    if (isCert == 'microcert' || isCert == 'campus') {
      return false;
    } else {
      return true;
    }
  }


  transformToTitleCase(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  base64Encryption(data: string): string {
    return btoa(data);
  }

  base64Decryption(data: string): string {
    try {
      return atob(data);
    } catch (error) {
      console.error('Invalid data:', error);
      return null;
    }
  }
  //usage: {{appconfig.transformToTitleCase(item.firstName)}}

}
