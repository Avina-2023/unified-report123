import { ToastrService } from 'ngx-toastr';
import { APP_CONSTANTS } from './../../../utils/app-constants.service';
import { AppConfigService } from './../../../utils/app-config.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  show = false;
  disableButton: boolean;

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public appConfig: AppConfigService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formInitialize();
  }

  login() {
    this.disableButton = true;
    const apiData = {
      email: this.loginForm.value.username.trim(),
      pass: this.loginForm.value.password.trim(),
      loginfrom:"unifiedreport",
    }

    this.apiService.login(apiData).subscribe((response: any)=> {
      if ((response && response.success) || (response && response.data) || (response && response.token)) {
        
          if(response.data.attributes){
            this.appConfig.setLocalStorage('token', 'true');
            this.appConfig.setLocalStorage('role',response.data ? JSON.stringify(response.data.attributes.organisations)  : '');
            this.appConfig.setSessionStorage('email',response.data && response.data.attributes  ? response.data.attributes.email : '');
            this.disableButton = false;
            this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.REPORTS.HOME);
          }else {
            this.toastr.error('User not found please try with diffrent credentials');
          }

      } else {
        this.toastr.error('Invalid Login Credentials');
      }
    }, (err)=> {
      this.disableButton = false;
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

}
