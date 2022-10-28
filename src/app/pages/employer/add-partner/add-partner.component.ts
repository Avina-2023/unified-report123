import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {
  registerForm: FormGroup;
  employerLogoFileName = '';
  employerLogoFile: any;
  employerLogoUrl: string;
  eoiFileName = '';
  eoiFile: any;
  existsUser = "false";
  errorMsgforLogo = '';
  errorMsgforeoi = '';
  constructor(public fb: FormBuilder, private appconfig: AppConfigService, private route: ActivatedRoute, private ApiService: ApiService, private toastr: ToastrService) { }
  industryTypeArray: any = []
  ngOnInit(): void {
    this.getRoute();
    this.formInitialize();
    this.getIndustryType();
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      let email = param.params.email
        ? this.ApiService.decrypt(param.params.email)
        : param.params.email;
      if (email && email != undefined && email != "") {
        this.existsUser = "true";
        var obj = {
          "filterModel": {
            "email": {
              "filterType": "text",
              "type": "contains",
              "filter": email
            }
          }
        }
        this.ApiService.partnerList(obj).subscribe((partnerList: any) => {
          if (partnerList.success == false) {
            this.toastr.warning('Connection failed, Please try again.');
          } else {
            var details = partnerList.data[0];
            this.registerForm.patchValue({
              employerName: details?.company,
              establishedYear: details?.establishedYear,
              industryType: details?.industryType,
              name: details?.firstName,
              designation: details?.designation,
              mobile: details?.mobile,
              description: details?.description,
              email: details?.email
            });
            this.employerLogoFileName = details?.companyImgURL ? "profile Image" : "";
            this.employerLogoUrl = details?.companyImgURL;
            this.eoiFileName = details?.eoiForms[0].name;
          }
        }, (err) => {
          this.toastr.warning('Connection failed, Please try again.');
        });
      }
    });
  }

  formInitialize() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    this.registerForm = this.fb.group({
      employerName: ['', [Validators.required]],
      establishedYear: ['', [Validators.required]],
      industryType: ['', [Validators.required]],
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[1-9]{1}[0-9]{9}')])],
      description: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
    })
  }

  getIndustryType(){
    this.ApiService.industryType({}).subscribe((industryTypeList: any) => {
      if (industryTypeList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.industryTypeArray = industryTypeList.data;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  onEmployerLogoFileSelected(event) {
    this.employerLogoFile = event.target.files[0];
    if (this.employerLogoFile) {
      this.employerLogoFileName = this.employerLogoFile.name;
      var reader = new FileReader();
      reader.readAsDataURL(this.employerLogoFile);
      reader.onload = () => {
        this.employerLogoUrl = reader.result as string;
      }
    }
  }
  onEoiFileSelected(event) {
    this.eoiFile = event.target.files[0];
    if (this.eoiFile) {
      this.eoiFileName = this.eoiFile.name;
    }
  }
  savePartner() {
    if (this.existsUser == "false" && this.employerLogoFileName == "") {
      this.errorMsgforLogo = "Employer Logo is required"
      this.toastr.warning(this.errorMsgforLogo);
    } else if (this.existsUser == "false" && this.eoiFileName == "") {
      this.errorMsgforeoi = "EOF form is required"
      this.toastr.warning(this.errorMsgforeoi);
    } else {
      this.errorMsgforeoi = "";
      this.errorMsgforLogo = "";
      const fd = new FormData();
      fd.append("employerName", this.registerForm.value.employerName);
      fd.append("establishedYear", this.registerForm.value.employerName);
      fd.append("industryType", this.registerForm.value.industryType);
      fd.append("employerLogo", this.employerLogoFile);
      fd.append("name", this.registerForm.value.name);
      fd.append("designation", this.registerForm.value.designation);
      fd.append("mobile", this.registerForm.value.mobile);
      fd.append("description", this.registerForm.value.description);
      fd.append("eoiForm", this.eoiFile);
      fd.append("email", this.registerForm.value.email);
      fd.append("existsUser", this.existsUser);
      this.ApiService.updatePartner(fd).subscribe((data: any) => {
        if (data.success == false) {
          this.toastr.warning(data.message);
        } else {
          this.toastr.success(data.message);
          this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERLIST);
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    }

  }


  get employerName() {
    return this.registerForm.get('employerName');
  }

  get establishedYear() {
    return this.registerForm.get('establishedYear');
  }
  get industryType() {
    return this.registerForm.get('industryType');
  }
  get name() {
    return this.registerForm.get('name');
  }
  get designation() {
    return this.registerForm.get('designation');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }
  get description() {
    return this.registerForm.get('description');
  }
  get email() {
    return this.registerForm.get('email');
  }

}
