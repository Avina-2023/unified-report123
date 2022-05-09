import { APP_CONSTANTS } from './../utils/app-constants.service';
import { AppConfigService } from './../utils/app-config.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedInGuard implements CanActivate {
  constructor(private appConfig: AppConfigService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.appConfig.getLocalStorage('token')) {
        return true;
      } else {  
        this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.DASHBOARD);
        return false;
      }
  }
  
}
