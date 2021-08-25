import { ApiService } from './../services/api.service';
import { AppConfigService } from './../utils/app-config.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

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
      if (this.appConfig.getLocalStorage('token')) {
        return true;
      } else {
        this.apiService.logout();
        return false;
      }  
  }
  
}
