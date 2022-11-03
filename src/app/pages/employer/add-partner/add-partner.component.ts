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
  eoiFormUrl:string;
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
            this.eoiFileName = "EOIForm";
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
      establishedYear: ['', Validators.compose([Validators.required, Validators.minLength(4),Validators.maxLength(4),Validators.pattern('[1-9]{1}[0-9]{3}')])],
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
    this.errorMsgforLogo='';
    this.employerLogoFile = event.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile",event.target.files[0]);
    fd.append("type", "profile");
    this.ApiService.imageUpload(fd).subscribe((imageData: any) => {
      if (imageData.success == false) {
        this.toastr.warning(imageData.message);
      } else {
        this.employerLogoFileName = event.target.files[0].name;
        this.employerLogoUrl = imageData.data
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }
  onEoiFileSelected(event) {
    this.errorMsgforeoi='';
    this.eoiFile = event.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile",event.target.files[0]);
    fd.append("type", "EOF");
    this.ApiService.imageUpload(fd).subscribe((imageData: any) => {
      if (imageData.success == false) {
        this.toastr.warning(imageData.message);
      } else {
        this.eoiFormUrl = imageData.data
        this.eoiFileName = this.eoiFile.name;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  
  }
  savePartner() {
    if (this.existsUser == "false" && this.employerLogoFileName == "") {
      this.errorMsgforLogo = "Employer Logo is Required"
      this.toastr.warning(this.errorMsgforLogo);
    } else if (this.existsUser == "false" && this.eoiFileName == "") {
      this.errorMsgforeoi = "EOF Form is Required"
      this.toastr.warning(this.errorMsgforeoi);
    } else if(!this.registerForm.valid){
      this.toastr.warning("Please fill all the red highlighted fields to proceed further");
    }else{
      this.errorMsgforeoi = "";
      this.errorMsgforLogo = "";
      var obj = {
            "employerName": this.registerForm.value.employerName,
            "establishedYear": this.registerForm.value.establishedYear,
            "industryType": this.registerForm.value.industryType,
            "companyImgURL": this.employerLogoUrl,
            "name":this.registerForm.value.name,
            "designation":this.registerForm.value.designation,
            "mobile":this.registerForm.value.mobile,
            "description":this.registerForm.value.description,
            "eoiFormUrl":this.eoiFormUrl,
            "email":this.registerForm.value.email,
            "existsUser":this.existsUser
      }
      this.ApiService.updatePartner(obj).subscribe((data: any) => {
        console.log(data)
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
