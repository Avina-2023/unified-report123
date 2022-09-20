import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import{environment} from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-job-seekers',
  templateUrl: './job-seekers.component.html',
  styleUrls: ['./job-seekers.component.scss']
})
export class JobSeekersComponent implements OnInit {
  campusUrl = environment.CAMPUS_URL;
  freshGraduatesForm: FormGroup;
  success = true;
  newCandidate = true;
  successmail = false;
  failuremail = false;
  secretKey = "(!@#Passcode!@#)";
  skillProfileUrl = environment.SKILL_PROFILE_URL;
  constructor(public fb: FormBuilder, private glovbal_validators: GlobalValidatorService, public toastr: ToastrService, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.formInitialize()
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.freshGraduatesForm = this.fb.group({
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      term: ['', [Validators.required]],
    })
  }

  register() {
    this.freshGraduatesForm.value.email = CryptoJS.AES.encrypt(this.freshGraduatesForm.value.email.toLowerCase().trim(), this.secretKey.trim()).toString();
    this.ApiService.candidateRegistration(this.freshGraduatesForm.value).subscribe((res: any) => {
      if (res.newCandidate == true) {
        this.newCandidate = false
        this.successmail = true
        this.failuremail = false
      } else {
        this.newCandidate = false
        this.successmail = false;
        this.failuremail = true;
      }
    })
  }

  get user_name() {
    return this.freshGraduatesForm.get('user_name');
  }
  get email() {
    return this.freshGraduatesForm.get('email');
  }
}
