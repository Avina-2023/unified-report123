import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  createForm: FormGroup;
  toggleVisibility = true;
  toggleVisibilityConfirmPassword = true;
  toggleVisibilityTempPassword = true;
  toggleVisibilityoldPassword = true;
  currentRoute: string;
  passwordTempToken: any;
  prePoulteEmailId: any;
  type: string;
  capsOn: any;
  getCurrentYear = this.appConfig.getCurrentYear();
  apiemail: any;
  deCryuserId: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private toastr: ToastrService
  ) {
    this.apiemail = this.appConfig.getLocalStorage('email') ? this.appConfig.getLocalStorage('email') : '';
   }

  ngOnInit() {
    this.formInitialize();
  }


  formInitialize() {
   // const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.createForm = this.fb.group({
      oldpassword: ['', [Validators.required]],
      // temp: ['', [Validators.required]],
      password: ['', [Validators.required, this.patternValidator(), Validators.maxLength(30)]],
      confirmpassword: ['', [Validators.required]]
    }, { validators: this.identityRevealedValidator }
    )
    // , this.autoPopulateMail(); // Function to auto populate mail after form loads.
  }



  get oldpassword() {
    return this.createForm.get('oldpassword');
  }
  get password() {
    return this.createForm.get('password');
  }
  // get temp() {
  //   return this.createForm.get('temp');
  // }
  get confirmpassword() {
    return this.createForm.get('confirmpassword');
  }

  submit() {
    if (this.createForm.valid) {
      const apiData = {
        userId: this.apiService.encryptnew(this.apiemail,environment.cryptoEncryptionKey),
        password: this.apiService.encryptnew(this.createForm.value.oldpassword,environment.cryptoEncryptionKey),
        newPassword: this.apiService.encryptnew(this.createForm.value.password,environment.cryptoEncryptionKey),
        // type:"employer"
      };
      this.apiService.changePassword(apiData).subscribe((success: any) => {
        if(success.success){
          this.toastr.success(`Password has been updated Successfully`);
          localStorage.clear();
        this.appConfig.routeNavigationWithQueryParam(APP_CONSTANTS.ENDPOINTS.LOGIN, { mail: apiData.userId });
        }else{
          this.toastr.error(success.message);
        }
      }, (error) => {
        this.toastr.error(error.message);
      });
    } else {
      this.validateAllFields(this.createForm);
    }

  }

  signIn() {
    this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN);
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

   patternValidator() {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      const passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/gm;
      const passRegex1: RegExp = /\s/gm;
      const passRegex2: RegExp = /\s?[, ]\s?/gm;

      // test the value of the control against the regexp supplied
      const valid = passRegex.test(control.value) && !passRegex1.test(control.value) && !passRegex2.test(control.value)
        // tslint:disable-next-line: quotemark
        && !control.value.includes("'") && !control.value.includes('"') && !control.value.includes('&');

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : { passwordvalidator: true };
    };
  }

  identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const pass = control.get('password');
    const confirm = control.get('confirmpassword');

    return pass && confirm && pass.value !== confirm.value ? { notMatch: true } : null;
  }


}
