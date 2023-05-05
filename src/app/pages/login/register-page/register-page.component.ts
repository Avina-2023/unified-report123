import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  otpform: FormGroup;
  success = true;
  isAgreeToTermsChecked: boolean = false;
  isdisable: boolean = false;
  submitbtn: any = true;
  iconGreen = false;
  @ViewChild('noSkill', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('conditions', { static: false }) termsconditions: TemplateRef<any>;
  @ViewChild('spoc', { static: false }) otpfirstpage: TemplateRef<any>;
  @ViewChild('thankyou', { static: false }) thankyoupage: TemplateRef<any>;
  // @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput:NgOtpInputComponent;

  dialogRef: any;
  otpForm: FormGroup;
  router: any;
  http: any;
  userEmail: any;
  userName: any;

  constructor(
    public fb: FormBuilder,
    private glovbal_validators: GlobalValidatorService,
    public apiService: ApiService,
    private formBuilder: FormBuilder,

    public appConfig: AppConfigService,
    private dialog: MatDialog,
    public toastr: ToastrService
  ) {}
  industrytype: any;

  ngOnInit(): void {
    this.formInitialize();
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required]],
      digit2: ['', [Validators.required]],
      digit3: ['', [Validators.required]],
      digit4: ['', [Validators.required]],
      digit5: ['', [Validators.required]],
      digit6: ['', [Validators.required]],
    });
    this.apiService.industryType({}).subscribe((response: any) => {
      this.industrytype = response.data;
    });
  }
  onSubmit() {
    const otp = this.otpForm.value.otp.join('');

    console.log('OTP submitted:', otp);
  }

  somevent(e) {
    //if(e.checked==true) {
    if (
      e.checked == true &&
      this.registerForm.touched &&
      this.registerForm.valid
    ) {
      this.submitbtn = false;
    }

    if (
      (e.checked == false &&
        this.registerForm.touched &&
        this.registerForm.valid) ||
      (e.checked == false &&
        this.registerForm.touched &&
        this.registerForm.invalid)
    ) {
      this.submitbtn = true;
    }
    // this.submitbtn = true
  }

  formInitialize() {
    const emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      jobtype: ['', [Validators.required]],
      company: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mobile: [
        '',
        [Validators.required, this.glovbal_validators.mobileRegex()],
      ],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      term:['',[Validators.requiredTrue]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let data = {
        mobile: this.registerForm.value.mobile.toString(),
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        jobtype: this.registerForm.value.jobtype,
        designation: this.registerForm.value.designation,
        company: this.registerForm.value.company,
        //  otpForm:this.otpForm.value.otpForm,
        //  terms:this.registerForm.value.term,
      };
      console.log(data,'data ');
      this.userEmail =  data.email
      this.userName =  data.name

      this.apiService.postRegister(data).subscribe((response: any) => {
        console.log(response,'responsesd');

        if (response.success) {
          this.registerForm.reset();
          const dialogopen = this.dialog.open(this.termsconditions, {
            width: '800px',
            height: '500px',
            disableClose: true,
            hasBackdrop: true,
          });
        } else {
          // this.success = true;
          this.toastr.warning(response.message);
        }
      });
    }
  }

  agreeTerms() {
  //   const otp = Math.floor(100000 + Math.random() * 900000);

  // const data = {
  //   email: this.userEmail,
  //   user_name:this.userName,
  //   // otp: otp
  // };
  // console.log(data,'data');

  //   this.apiService.emailOtpregister(data).subscribe((response:any) => {
  //     console.log(response,'response');

  //     if(response.success){
  //       this.registerForm.reset();
    const popup = this.dialog.open(this.thankyoupage, {
      width: '800px',
      height: '500px',
      disableClose: true,
      hasBackdrop: true,
    });
  }
  //   })
  // }

  // submit_btn() {
  //   const otp = `${this.otpForm.value.digit1}${this.otpForm.value.digit2}${this.otpForm.value.digit3}${this.otpForm.value.digit4}${this.otpForm.value.digit5}${this.otpForm.value.digit6}`;
  //   console.log(otp);
    // this.apiService.validateEmailOtp('').subscribe((response:any) => {
    //   if(response.success){
    //     this.registerForm.reset();
  //   const popup = this.dialog.open(this.thankyoupage, {
  //     width: '800px',
  //     height: '500px',
  //     disableClose: true,
  //     hasBackdrop: true,
  //   });
  // }
// })
// }

  closeThankYou() {
    this.dialog.closeAll();
    console.log('login');
    //  this.dialogRef.close()
    this.appConfig.routeNavigation('/login');
    // this.router.navigateByUrl('/login');
    // this.thankyoupage.nativeElement.parentNode.removeChild(this.thankyoupage.nativeElement);
  }

  // closepops(){
  //   this.dialogRef.close()
  //   this.appConfig.routeNavigation("/");
  // }

  matDialogOpen() {
    this.dialogRef = this.dialog.open(this.matDialogRef, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
    });
  }

  get name() {
    return this.registerForm.get('name');
  }
  get company() {
    return this.registerForm.get('company');
  }
  get designation() {
    return this.registerForm.get('designation');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get term() {
    return this.registerForm.get('term');
  }
  get jobtype() {
    return this.registerForm.get('jobtype');
  }
  onKeyUp(event: any, index: number) {
    let nextIndex = index + 1;
    if (event.code == 'Backspace') {
      nextIndex = index - 1;
    }

    if (nextIndex > 5 && nextIndex == 6) {
      this.iconGreen = true;
    }
    else if (nextIndex < 5){
      this.iconGreen = false;
    }
    if (nextIndex < 6 && nextIndex > -1) {
      const nextInput = document.getElementById(nextIndex.toString());
      nextInput.focus();

    }
  }

}
