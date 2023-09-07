import { APP_CONSTANTS } from './../utils/app-constants.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../utils/app-config.service';
import * as CryptoJS from 'crypto-js';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = environment.API_BASE_URL;
  EDGE_URL = environment.NODE_EDGE_URL;
  BASE_URL_RE = environment.API_BASE_URL_RE;
  SKILL_EDGE_URL = environment.SKILL_EDGE_URL;
  Prourl = environment.NODE_URL;
  EncryptKEY = environment.encryptionKey;
  cryptoEncryptionKey = environment.cryptoEncryptionKey;

  filterSubject: Subject<any> = new Subject();
  partnersubject: Subject<any> = new Subject();
  getFilteredCandidates: any;
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  logout() {
    this.appConfig.clearLocalStorage();
    this.appConfig.clearSessionStorage();
    return this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.HOME);
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/candidatelogin`, data);
  }

  // userlogin
  student_login(loginData) {
    return this.http.post(`${this.BASE_URL}/userLogin`, loginData);
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
  getDriveCardData(data) {
    return this.http.post(`${this.BASE_URL}/joblistwithaggrid`, data);
  }
  getAGgridData(data) {
    return this.http.post(`${this.BASE_URL}/joblistwithaggrid`, data);
  }
  getCandidateListByDeive(data) {
    return this.http.post(`${this.BASE_URL}/candidatelistbyappliedjob`, data);
  }
  getAGgridPatnerList(data) {
    return this.http.post(`${this.BASE_URL}/partnerList`, data);
  }
  encrypt(data) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.EncryptKEY
      ).toString();
    } catch (e) {
      console.log(e);
      return data;
    }
  }

  encryptnew(data, customSecretKey) {
    try {
      this.EncryptKEY = customSecretKey ? customSecretKey : this.EncryptKEY;
      return CryptoJS.AES.encrypt(data, this.EncryptKEY).toString();
      // return CryptoJS.AES.encrypt(JSON.stringify(data), this.EncryptKEY).toString();
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

  decryptnew(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.cryptoEncryptionKey);
      // console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return data;
    } catch (e) {
      console.log(e);
      return data;
    }
  }

  getSectionWiseDetails(data) {
    return this.http.post(`${this.BASE_URL}/sectionwiseScoreDetails`, data);
  }

  getProctorVideo(data) {
    return this.http.post(`${this.Prourl}/getProctorVideobyUserRoomId`, data);
  }

  getHiringReport(data) {
    return this.http.post(`${this.BASE_URL}/getAgegridReportList`, data, {
      reportProgress: true,
    });
  }

  getBehaviourReport(data) {
    return this.http.post(
      `${this.BASE_URL}/getBehaviouralReportContent `,
      data
    );
  }

  //   getBajajBehaviourReport(data) {
  //     // data.email=
  //     // 'bppdemo9001@abc.com',

  // data.reportId='R2'
  //     return this.http.post(`${this.BASE_URL}/getBehaviouralReportContent1 `, data);
  //   }

  getCandidateSkills(email) {
    return this.http.post(
      `${this.BASE_URL}/getCandidateRecommendedJobs `,
      email
    );
  }

  getCertificateDetails(certificateCode) {
    return this.http.get(
      `${this.BASE_URL}/getCandidateVerificationDetails?certificationID=${certificateCode}`
    );
  }

  getCandidatefilters(data) {
    return this.http.post(`${this.BASE_URL}/getCandidatefilters`, data, {
      reportProgress: true,
    });
  }

  getcandidateList(data) {
    return this.http.post(`${this.BASE_URL}/getCandidateList`, data);
  }

  // Assessment Analytics Report Api
  getTestSummary(data) {
    return this.http.post(`${this.BASE_URL}/getTestSummary`, data);
  }

  getTestDetails(data) {
    return this.http.post(`${this.BASE_URL}/getTestDetails`, data);
  }

  getTestSummaryCard(data) {
    return this.http.post(`${this.BASE_URL}/getTestSummaryCard`, data);
  }

  getSectionAnalysis(data) {
    return this.http.post(`${this.BASE_URL}/getSectionAnalysis`, data);
  }

  getTopicAnalysis(data) {
    return this.http.post(`${this.BASE_URL}/getTopicAnalysis`, data);
  }

  getTaxonomyAnalysis(data) {
    return this.http.post(`${this.BASE_URL}/getTaxonomyAnalysis`, data);
  }
  getComplexityAnalysisForTest(data) {
    return this.http.post(
      `${this.BASE_URL}/getComplexityAnalysisForTest`,
      data
    );
  }

  getTimeSpentAnalysis(data) {
    return this.http.post(`${this.BASE_URL}/getTimeSpentAnalysis`, data);
  }

  getSectionWiseComplexityAnalysis(data) {
    return this.http.post(
      `${this.BASE_URL}/getSectionWiseComplexityAnalysis`,
      data
    );
  }
  getComplexityForTopicAnalysis(data) {
    return this.http.post(
      `${this.BASE_URL}/getComplexityForTopicAnalysis`,
      data
    );
  }
  getTaxonomyWiseComplexityAnalysis(data) {
    return this.http.post(
      `${this.BASE_URL}/getTaxonomyWiseComplexityAnalysis`,
      data
    );
  }

  postRegister(data) {
    return this.http.post(`${this.BASE_URL}/employeeRegister`, data);
  }

  registrationForm(data) {
    return this.http.post(`${this.BASE_URL}/registrationForm`, data);
  }

  getSkillMasterList(data) {
    return this.http.post(`${this.BASE_URL}/getSkillList`, data, {
      reportProgress: true,
    });
  }

  getSkill(data) {
    return this.http.post(`${this.BASE_URL}/getSkill`, data, {
      reportProgress: true,
    });
  }
  skillMasterValidate(data) {
    return this.http.post(`${this.BASE_URL}/skillValidate`, data);
  }

  skillUploadValidator(data) {
    return this.http.post(`${this.BASE_URL}/skillUploadValidator`, data);
  }

  partnerfooterlist(data) {
    return this.http.post(`${this.BASE_URL}/partnerfooterlist`, data);
  }

  candidateRegistration(data) {
    return this.http.post(`${this.SKILL_EDGE_URL}/register`, data);
  }

  partnerList(data) {
    return this.http.post(`${this.BASE_URL}/partnerList`, data);
  }

  updatePartnerStatus(data) {
    return this.http.post(`${this.BASE_URL}/updatePartnerStatus`, data);
  }

  updatePartner(data) {
    return this.http.post(`${this.BASE_URL}/partnerdetailsupload`, data);
  }

  industryType(data) {
    return this.http.post(`${this.BASE_URL}/industrytypelist`, data);
  }

  forgotPassword(email) {
    return this.http.post(`${this.BASE_URL}/userforgotPassword`, email);
  }

  passwordReset(data) {
    // this.datas is api body data
    return this.http.post(`${this.BASE_URL}/submitResetPassword`, data);
  }
  changePassword(data) {
    // this.datas is api body data
    return this.http.post(`${this.BASE_URL}/changePassword `, data);
  }

  empdashboard() {
    return this.http.get(`${this.BASE_URL}/dashboard`);
  }

  empProfileDetails(data) {
    return this.http.post(`${this.BASE_URL}/partnerList`, data);
  }

  uservalidationCheck(data) {
    return this.http.post(`${this.BASE_URL}/uservalidationCheck`, data);
  }

  getState(data) {
    return this.http.post(`${this.BASE_URL}/stateList`, data);
  }

  getDistrict(data) {
    return this.http.post(`${this.BASE_URL}/districtList`, data);
  }

  imageUpload(data) {
    return this.http.post(`${this.BASE_URL}/imageUpload`, data);
  }
  partnerListDashboard() {
    return this.http.get(`${this.BASE_URL}/partnerListDashboard`);
  }

  viewjobRequirments(data) {
    return this.http.post(`${this.BASE_URL}/joblistwithaggrid`, data);
  }

  // Joblist API
  joblistingDashboard(data) {
    return this.http.post(`${this.BASE_URL}/joblist`, data);
  }

  // JobFilter API
  jobfilterDashboard(data) {
    return this.http.post(`${this.BASE_URL}/jobfilter`, data);
  }

  // candidateFilter API for candidatesearch
  candidateFilter(data) {
    return this.http.post(`${this.BASE_URL}/candidateFilter`, data);
  }

  // Save Jobs API
  saveJobsDashboard(data) {
    return this.http.post(`${this.BASE_URL}/saveJobs`, data);
  }

  // candidate apis

  candidateDashboard(data) {
    return this.http.post(`${this.BASE_URL}/candidatedashboard`, data);
  }

  // Note : applied-jobs and savedjob common api body was diffrent

  candidateJoblist(data) {
    return this.http.post(`${this.BASE_URL}/joblist`, data);
  }
  savedJobs(data) {
    return this.http.post(`${this.BASE_URL}/submitJobForm`, data);
  }
  candidateDetails(data) {
    return this.http.post(`${this.BASE_URL}/getcandidatedetail`, data);
  }
  getEmployerDetails(data) {
    return this.http.post(`${this.BASE_URL}/getemployerDetails`, data);
  }
  uploadExcelFile(data) {
    return this.http.post(`${this.BASE_URL}/jobupload`, data);
  }
  emailOtpregister(data) {
    return this.http.post(`${this.BASE_URL}/generateEmailOtp`, data);
  }
  validateEmailOtp(data) {
    return this.http.post(`${this.BASE_URL}/validateEmailOtp`, data);
  }
  behaviouralDashboard(data) {
    return this.http.post(`${this.BASE_URL_RE}/behaviouralDashboard`, data);
  }
  behaviourResultAks(data) {
    return this.http.post(`${this.BASE_URL_RE}/behaviourResultAks`, data);
  }

  getStatusupdated(data) {
    return this.http.post(`${this.BASE_URL}/updateJobApplicationStatus`, data);
  }
  districtList(stateId) {
    // this.datas is api body data
    return this.http.post(`${this.BASE_URL}/districtList`, stateId);
  }
  getallStates(){
    // return this.http.post(`${this.BASE_URL}/api/state_api`, Id, { headers: this.withoutTokens(), withCredentials: true });
    return this.http.get(`../assets/json/state.json`);
  }
  getallCandidateDetails(data) {
    return this.http.post(`${this.BASE_URL}/getallcandidatedetails`, data);
  }
  getJobDetail(data) {
    return this.http.post(`${this.BASE_URL}/getJobDetail`, data);
  }
  getCandidateByFilter(data){
    return this.http.post(`${this.BASE_URL}/candidateFilter`, data);
  }
  getsaveCandidate(data){
    return this.http.post(`${this.BASE_URL}/saveCandidate`, data); 
  }
  // candidateResultDetails(data) {
  //   return this.http.post(`${this.BASE_URL_RE}/candidateResultDetails`, data);
  // }
  // courseTracking(data) {
  //   return this.http.post("https://devfacade.lntedutech.com/learnerProgressStatus", data);
  // }

  candidateResultDetails(data){
    return this.http.post(`${this.BASE_URL}/candidateResultDetails`,data);
  }
  getcourseTracking(data){
    return this.http.post(`${this.BASE_URL}/learnerProgressStatus`,data);
  }
}
