import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.formInitialize();
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobileRegex: RegExp = /^[1-9][0-9]{9}$/;
    this.forgotPasswordForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(mobileRegex)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(emailregex)]],
    });
  }

  get mobile() {
    return this.forgotPasswordForm.get('mobile');
  }
  get email() {
    return this.forgotPasswordForm.get('email');
  }

  submit() {

    if ( this.forgotPasswordForm.get('email').valid) {
      let data;

      if (this.forgotPasswordForm.get('email').valid) {
        data = {
          email: this.apiService.encryptnew(this.forgotPasswordForm.value.email,environment.cryptoEncryptionKey),
          employer:true
        };
      }

      // this.appConfig.consoleLog('Registration Data which is passed to API', data);
      // API

      this.apiService.forgotPassword(data).subscribe((success: any) => {
        if(success.success){
          this.toastr.success(success.message);
          this.appConfig.routeNavigation("/login");
          }else{
            this.toastr.error(success.message);
          }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    } else {
      this.validateAllFields(this.forgotPasswordForm);
    }

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
    this.appConfig.routeNavigation("login");
  }

  inputChanged(f) {

  }


}
