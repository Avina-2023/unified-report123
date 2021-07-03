import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from './../utils/app-constants.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../utils/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private toastr: ToastrService
  ) { }

  logout() {
    this.appConfig.clearLocalStorage();
    this.toastr.warning('You have been logged out successfully');
    return this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
  }

  getReportsDataAPI(data) {
    return this.http.post(`${this.BASE_URL}/getunifiedReport`, data);
  }

  getReportsData(data) {
    return this.http.get('../../assets/json/reports.json');
  }

}
