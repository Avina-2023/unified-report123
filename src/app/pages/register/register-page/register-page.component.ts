import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  constructor(public fb: FormBuilder,private glovbal_validators: GlobalValidatorService,) { }

  ngOnInit(): void {
    this.formInitialize();
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      mobile: ['', [Validators.required,this.glovbal_validators.mobileRegex()]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      term:['', [Validators.required]],
    })
  }

  register(){

  }


  get name() {
    return this.registerForm.get('name');
  }
  get company() {
    return this.registerForm.get('company');
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

}
