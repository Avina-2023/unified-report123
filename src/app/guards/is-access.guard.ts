import { ApiService } from './../services/api.service';
import { AppConfigService } from './../utils/app-config.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class IsAccessGuard implements CanLoad {
  constructor(private appConfig: AppConfigService, private apiService: ApiService) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.appConfig.getLocalStorage('token')) {
      return true;
    } else {
      this.apiService.logout();
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let param = route.queryParams;
      if(param.details){
       let details =  this.apiService.decrypt(param.details);
          if( details.email && (details.type  == 'microcert' || details.type  == 'campus')){
               localStorage.setItem('type',details.type);
               localStorage.setItem('token', 'true');
               sessionStorage.setItem('driveInfo', details.driveId);
               sessionStorage.setItem('assessmentId',details.assessmentId); 
                return true
          }else {
            this.apiService.logout();
            this.appConfig.routeNavigation('/error')
            return false
          }
      }else{
        if (this.appConfig.getLocalStorage('token')) {
          return true;
        } else {
          this.apiService.logout();
          return false;
        }  
      }

  }
  
}
