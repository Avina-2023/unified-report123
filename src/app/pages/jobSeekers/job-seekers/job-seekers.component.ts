import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import{environment} from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-job-seekers',
  templateUrl: './job-seekers.component.html',
  styleUrls: ['./job-seekers.component.scss']
})
export class JobSeekersComponent implements OnInit {
  campusUrl = environment.CAMPUS_URL;
  freshGraduatesForm: FormGroup;
  @ViewChild('noSkill', { static: false }) matDialogRef: TemplateRef<any>;

  success = true;
  registerform = true;
  newCandidate = false;
  existingCandidate = false;
  failuremail = false;
  msg = ''
  secretKey = "(!@#Passcode!@#)";
  skillProfileUrl = environment.SKILL_PROFILE_URL;
  dialogRef: any;
  constructor(public fb: FormBuilder,private dialog: MatDialog, private glovbal_validators: GlobalValidatorService, public toastr: ToastrService, private ApiService: ApiService,public appConfig: AppConfigService,    ) { }

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
    this.freshGraduatesForm.value.email = CryptoJS.AES.encrypt(this.freshGraduatesForm.value.email.toLowerCase().trim(), this.secretKey.trim()).toString();
    this.ApiService.candidateRegistration(this.freshGraduatesForm.value).subscribe((res: any) => {
      if (res.success) {
        this.newCandidate = true
        this.registerform = false
        this.msg = res.message
        this.matDialogOpen()
      } else {
        this.msg = res.message
        this.registerform = false
        this.existingCandidate = true;
        this.toastr.error(this.msg)
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

  matDialogOpen() {
    this.dialogRef = this.dialog.open(this.matDialogRef, {
      width: '500px',
      disableClose: true,
      hasBackdrop:true
    });
  }
}
