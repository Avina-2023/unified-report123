import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  success = true;
  constructor(public fb: FormBuilder,private glovbal_validators: GlobalValidatorService,public apiService: ApiService,
    public appConfig: AppConfigService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.formInitialize();
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      designation:['',[Validators.required]],
      mobile: ['', [Validators.required,this.glovbal_validators.mobileRegex()]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      // term:['',[Validators.required]],
    })
  }

  register(){
    let data = {
      mobile:this.registerForm.value.mobile,
      email:this.registerForm.value.email,
      name:this.registerForm.value.name,
      designation:this.registerForm.value.designation,
      company:this.registerForm.value.company,
      // terms:this.registerForm.value.term,
    }
    this.apiService.postRegister(data).subscribe((response:any)=>{
        if(response.success){
          setTimeout(() => {
            this.success = false;
          }, 1000);

        }else{
            this.success = true;
            this.toastr.warning(response.message)
            // this.registerForm.reset();
        }
    })


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

}
