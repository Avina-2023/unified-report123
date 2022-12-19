import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from './../../../utils/app-constants.service';
import { AppConfigService } from './../../../utils/app-config.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as publicIp from 'public-ip';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent  {
  checkRouter: string;
  loginForm: FormGroup;
  hide = true;
  show = false;
  disableButton: boolean;
  userIP: any;
  isCandidate:boolean = true;
  labelname:any;

  @ViewChild('mailsuccess', { static: false }) mailsuccess: TemplateRef<any>;
  @ViewChild('notactive', { static: false }) notactive: TemplateRef<any>;

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public appConfig: AppConfigService,
    public toastr: ToastrService,
    private matDialog: MatDialog,
    public router:Router,
    private activatedRoute: ActivatedRoute,

  ) {

    if(this.router.url == '/login?from=freshGrad'){
      this.labelname = 'Email'
    }else{
      this.labelname = 'User ID'
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.from == 'freshGrad'){
        this.isCandidate = true;
      }else{
        this.isCandidate = false;
      }
    })
  }

  ngOnInit(): void {
    this.formInitialize();
  }

  openMatDialogs(templateref){
    this.matDialog.open(templateref, {
      width: '50%',
      height:'60vh',
      disableClose: true,
      hasBackdrop:true
    });
  }

  login() {
    this.disableButton = true;
    const apiData = {
      userId: this.loginForm.value.username.trim(),
      pass: this.loginForm.value.password.trim(),
      loginfrom:"unifiedreport",
      type:"employerLogin"
    }

    if(this.isCandidate){
      let cparams = {
        email: this.apiService.encryptnew(this.loginForm.value.username.trim(),environment.cryptoEncryptionKey),
      password: this.apiService.encryptnew(this.loginForm.value.password.trim(),environment.cryptoEncryptionKey)
      }
      this.apiService.student_login(cparams).subscribe((data:any)=>{
        if(data.success)
        {
        this.appConfig.setLocalStorage('c_token', data && data.token ? data.token : '');
        this.appConfig.setLocalStorage('email', data && data.data.email ? data.data.email : '');
        this.appConfig.setLocalStorage('name',data && data.data.personal_details?data.data.personal_details.name:'N/A')
        this.appConfig.setLocalStorage('profileImage',data && data.data.personal_details?data.data.personal_details.profileImage:'')
        this.appConfig.setLocalStorage('candidateProfile',data && data.data?JSON.stringify(data.data):'')
        this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.DASHBOARD);
      }else{
        // this.appConfig.setLocalStorage('c_token', data && data.token ? data.token : 'my token');

        if(data.message=="Your account is not active!")
        {
          this.openMatDialogs(this.notactive)
        }else{
          this.toastr.warning(data.message)
        }

      }
      })
    }else{
       this.apiService.login(apiData).subscribe((response: any)=> {

      if ((response && response.success) || (response && response.data) || (response && response.token)) {
          if(response.data.attributes){
            this.appConfig.setLocalStorage('token', 'true');
            this.appConfig.setLocalStorage('role',response.data ? JSON.stringify(response.data.attributes.organisations)  : '');
            this.appConfig.setLocalStorage('email',response.data && response.data.attributes  ? response.data.attributes.email : '');
            this.appConfig.setLocalStorage('username',response.data && response.data.attributes  ? response.data.attributes.username : '');
            this.appConfig.setLocalStorage('firstName',response.data && response.data.attributes  ? response.data.attributes.firstName : '');
            this.appConfig.setLocalStorage('profileCompletion',response.data && response.data.attributes && response.data.attributes.profileCompletion  ? response.data.attributes.profileCompletion : '');
            this.disableButton = false;
            if(response.data.attributes.oldAdmin == true){
          this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.DASHBOARD);
            }
            else{
              this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.EMPDASHBOARD.HOME);
            }
            this.matDialog.closeAll();
            this.getIPAddress();
          }else {
            this.toastr.error(response.message);
          }

      } else {
        this.toastr.error(response.message);
      }
    }, (err)=> {
      this.disableButton = false;
    });
    }

  }

  resendEmail(){
    this.matDialog.closeAll()
    let data={
      email: this.apiService.encryptnew(this.loginForm.value.username.trim(),environment.cryptoEncryptionKey),
      resendActivationmail:true
    }
    this.apiService.forgotPassword(data).subscribe((success: any) => {
      if(success.success){
        this.openMatDialogs(this.mailsuccess)
        // this.appConfig.routeNavigation("/login");
        this.appConfig.routeNavigationWithQueryParam("login",{from:"freshGrad"});
        }else{
          this.toastr.error(success.message);
        }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }



  getIPAddress(){
    publicIp.v4().then((ip) => {
      this.userIP = ip ?  ip : '';
      this.appConfig.setLocalStorage('IP',this.userIP ? this.userIP : '');
    });
  }

  forgotPassword() {
    if(this.isCandidate){
      this.appConfig.routeNavigationWithQueryParam("forgot-password",{from:"freshGrad"});
    }else{
      this.appConfig.routeNavigationWithQueryParam("forgot-password",{from:"employer"});
    }

  }
}
