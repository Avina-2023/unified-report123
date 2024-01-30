import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from './../../../utils/app-config.service';
import { ApiService } from './../../../services/api.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  notTrue = false;
  getCurrentYear = this.appConfig.getCurrentYear();
  isCandidate: boolean;
  currentYear: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      if(params.from == 'freshGrad'){
        this.isCandidate = true;
      }else{
        this.isCandidate = false;
      }
    })
  }

  ngOnInit() {
    this.formInitialize();
    this.currentYear = new Date().getFullYear();
  }

  formInitialize() {
    // const usernameregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileRegex: RegExp = /^[1-9][0-9]{9}$/;
    this.forgotPasswordForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(mobileRegex)]],
      username: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get mobile() {
    return this.forgotPasswordForm.get('mobile');
  }
  get username() {
    return this.forgotPasswordForm.get('username');
  }

  submit() {
if(this.isCandidate){

    let data;

    if (this.forgotPasswordForm.get('username').valid) {
      data = {
        email: this.apiService.encryptnew(this.forgotPasswordForm.value.username,environment.cryptoEncryptionKey),

      };
    }

    // this.appConfig.consoleLog('Registration Data which is passed to API', data);
    // API
// console.log('candiate',data)
    this.apiService.forgotPassword(data).subscribe((success: any) => {
      if(success.success){
        this.toastr.success(success.message);
        // this.appConfig.routeNavigation("/login");
        // this.appConfig.routeNavigationWithQueryParam("login",{from:"freshGrad"});
        window.location.href = "https://reviewinfo.lntedutech.com/login/";
        }else{
          this.toastr.error(success.message);
        }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });

}else{

    let data;

    if (this.forgotPasswordForm.get('username').valid) {
      data = {
        userId: this.apiService.encryptnew(this.forgotPasswordForm.value.username,environment.cryptoEncryptionKey),
        employer:true,
        type:"employerForgot"
      };
    }

    // this.appConfig.consoleLog('Registration Data which is passed to API', data);
    // API
// console.log('emp',data)
    this.apiService.forgotPassword(data).subscribe((success: any) => {
      if(success.success){
        this.toastr.success(success.message);
        // this.appConfig.routeNavigation("/login");
          this.appConfig.routeNavigationWithQueryParam("login",{from:"employer"});

        }else{
          this.toastr.error(success.message);
        }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });

}
    //  else {
    //   this.validateAllFields(this.forgotPasswordForm);
    // }

  }
  // To validate all fields after submit
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  signIn() {
    // this.appConfig.routeNavigation("login");
    if(this.isCandidate){
      // this.appConfig.routeNavigationWithQueryParam("login",{from:"freshGrad"});
      window.location.href = "https://reviewinfo.lntedutech.com/login/";
    }else{
      this.appConfig.routeNavigationWithQueryParam("login",{from:"employer"});
    }
  }

  inputChanged(f) {

  }


}
