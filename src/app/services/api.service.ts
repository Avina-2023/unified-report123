import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from './../utils/app-constants.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../utils/app-config.service';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = environment.API_BASE_URL;
  EDGE_URL = environment.NODE_EDGE_URL;
  Prourl = environment.NODE_URL;
  EncryptKEY = environment.encryptionKey;
  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,

  ) { }

  logout() {
    this.appConfig.clearLocalStorage();
    this.appConfig.clearSessionStorage();
    return this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  getReportsDataAPI(data) {
    return this.http.post(`${this.BASE_URL}/getunifiedReport`, data);
  }

  getReportsData(data) {
    return this.http.get('../../assets/json/reports.json');
  }

  getUserList(data) {
    // return this.http.post(`${this.BASE_URL}/getuserList`, data);
  }

  getDriveBaisedUser(data) {
    return this.http.post(`${this.BASE_URL}/driveCandidateList`, data);
  }

  encrypt(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.EncryptKEY).toString();
    } catch (e) {
      console.log(e);
      return data;
    }
  }

  decrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.EncryptKEY);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
      return data;
    }
  }

  getSectionWiseDetails(data){
    return this.http.post(`${this.BASE_URL}/sectionwiseScoreDetails`, data);
  }

  getProctorVideo(data){
    return this.http.post(`${this.Prourl}/getProctorVideobyUserRoomId`, data);
  }

  getHiringReport(data){
    return this.http.post(`${this.BASE_URL}/getAgegridReport`,data);
  }

  getBehaviourReport(data){
    return this.http.post(`${this.BASE_URL}/getBehaviouralReportContent `,data);
  }

  getCandidateSkills(email){
    return this.http.post(`${this.BASE_URL}/getCandidateRecommendedJobs `,email);
  }

  getCertificateDetails(certificateCode){
    return this.http.get(`${this.BASE_URL}?code=renIDfwbxERkbhqSSgpX6Sy2qLYJvjydtJbFhBZg0ElMbt/gFRXN3g==&certificateCode=${certificateCode}`);
   }

  getCandidatefilters(data){
    return this.http.post(`${this.BASE_URL}/getCandidatefilters `,data);
  }
}
