import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';

@Component({
  selector: 'app-job-seekers',
  templateUrl: './job-seekers.component.html',
  styleUrls: ['./job-seekers.component.scss']
})
export class JobSeekersComponent implements OnInit {
  freshGraduatesForm: FormGroup;
  constructor(public fb: FormBuilder,private glovbal_validators: GlobalValidatorService,) { }

  ngOnInit(): void {
    this.formInitialize()
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.freshGraduatesForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      term:['',[Validators.required]],
    })
  }

  register(){

  }

  get name() {
    return this.freshGraduatesForm.get('name');
  }
  get email() {
    return this.freshGraduatesForm.get('email');
  }
}
