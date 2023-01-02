import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import{environment} from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-candidateRegister',
  templateUrl: './candidateRegister.component.html',
  styleUrls: ['./candidateRegister.component.scss']
})
export class candidateRegister implements OnInit {
  campusUrl = environment.CAMPUS_URL;
  freshGraduatesForm: FormGroup;
  @ViewChild('noSkill', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('notactive', { static: false }) notactive: TemplateRef<any>;

  success = true;
  registerform = true;
  newCandidate = false;
  existingCandidate = false;
  failuremail = false;
  msg = ''
  secretKey = "(!@#Passcode!@#)";
  skillProfileUrl = "/login?from=freshGrad";
  dialogRef: any;
  constructor(public fb: FormBuilder,private dialog: MatDialog, private glovbal_validators: GlobalValidatorService, public toastr: ToastrService, private ApiService: ApiService,public appConfig: AppConfigService, private router:Router   ) { }

  ngOnInit(): void {
    this.formInitialize()
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.freshGraduatesForm = this.fb.group({
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      // term: ['', [Validators.required]],
    })
  }

  register() {
    let enc_email = CryptoJS.AES.encrypt(this.freshGraduatesForm.value.email.toLowerCase().trim(), this.secretKey.trim()).toString();
    let apidata = {
      email : enc_email,
      user_name : this.freshGraduatesForm.value.user_name
    }

    this.ApiService.candidateRegistration(apidata).subscribe((res: any) => {
      if (res.success) {
        this.newCandidate = true
        this.registerform = false
        this.msg = res.message
        this.freshGraduatesForm.reset();
        this.openMatDialogs(this.matDialogRef)
      } else {
        this.msg = res.message
        this.registerform = false
        this.existingCandidate = true;
        if(this.msg=="Activation link is already sent to your email!"){
          this.openMatDialogs(this.notactive)
        }else{
          this.freshGraduatesForm.reset();
          this.toastr.error(this.msg);
        }
        // let currentUrl = this.router.url;
        // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        // this.router.navigate([currentUrl]);
        // });
      }
    })
  }

  get user_name() {
    return this.freshGraduatesForm.get('user_name');
  }
  get email() {
    return this.freshGraduatesForm.get('email');
  }

  closepops(){
    this.dialogRef.close()
    this.appConfig.routeNavigation("/");
  }


  openMatDialogs(templateref){
    this.dialog.open(templateref, {
      width: '50%',
      height:'60vh',
      disableClose: true,
      hasBackdrop:true
    });
  }

  resendEmail(){
    let enc_email = CryptoJS.AES.encrypt(this.freshGraduatesForm.value.email.toLowerCase().trim(), this.secretKey.trim()).toString();
    this.dialog.closeAll()
    let data={
      email: enc_email,
      resendActivationmail:true
    }
    this.ApiService.forgotPassword(data).subscribe((success: any) => {
      if(success.success){
        this.openMatDialogs(this.matDialogRef)
        // this.appConfig.routeNavigation("/login");
        this.appConfig.routeNavigationWithQueryParam("login",{from:"freshGrad"});
        }else{
          this.toastr.error(success.message);
        }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }
}
