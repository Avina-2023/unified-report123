import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, retry, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  stateCtrl = new FormControl('');
  states: any;
  stateone: any[] = [];
  empProfile: any;
  empProfile1: any;
  editCompany: any;
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;

  //-----------------------phone number validation messages----------------------//
  InvalidNumber = 'Mobile Number is Invalid'
  NumberRequired = 'Mobile Number is Required'
  // ------------------------emial validation messages-------------------//
  InvalidEmail = ' Email is Invalid '
  EmailRequired = 'Email is Required'

  allStates: any = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh',
    'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'

  ]

  allCountry: any = [{ id: 1, name: 'India', countryId: 101 }]
  stateArray: any = [];
  districtArray: any = [];

  @ViewChild('stateInput') stateInput: ElementRef<HTMLInputElement>;
  profileForm: FormGroup;
  hrDetails: any = [];
  formBuilder: any;

  addcontact: any;
  constructor( private globalValidation : GlobalValidatorService,private fb: FormBuilder, private apiService: ApiService, private toaster: ToastrService) {
    this.states = this.allStates
  }

  ngOnInit(): void {
    this.createProfile()
    this.empDetails()

    this.HRspocPatch()
    this.getState()

  }

  getState() {
    this.profileForm.controls['country'].setValue(101);
    this.apiService.getState({ country_id: 101 }).subscribe((data: any) => {
      if (data.success == false) {
        this.toaster.warning(data.message);
      } else {
        this.stateArray = data.data
      }
    }, (err) => {
      this.toaster.warning('Connection failed, Please try again.');
    });
  }

  selectState(e) {
    this.apiService.getDistrict({ state_id: e.value }).subscribe((data: any) => {
      if (data.success == false) {
        this.toaster.warning(data.message);
      } else {
        this.districtArray = data.data
      }
    }, (err) => {
      this.toaster.warning('Connection failed, Please try again.');
    });
  }

  remove(selectstate: any): void {
    const index = this.stateone.indexOf(selectstate);
    if (index >= 0) {
      this.stateone.splice(index, 1);
    }
    this.states.push(selectstate)

  }

  selectMe(event: any, index) {
    if (event) {
      this.stateone.push(event);
      this.states.splice(index, 1)
    }
  }
  // public myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
  createProfile() {
    this.profileForm = this.fb.group({
      empSize: ['', [Validators.required]],
      websiteAddress: ['', [Validators.required]],
      chairmanName: ['', [Validators.required]],
      chairmanEmail: ['', [
        //Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]],
      mobileNumber: ['', [
        // Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ],],
      chroName: ['', [
        Validators.required
      ]],
      chroEmail: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]],
      chromobileNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ],],

      addressOne: ['', Validators.required],
      addressTwo: ['', Validators.required],
      pincode: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[1-9]{1}[0-9]{5}'),
      ]),],

      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      stateCtrlone: new FormControl(this.stateone),

      hrContactDetails : this.fb.array([this.hrDetailsInitArr()]),
    })
  }


  hrDetailsInitArr(){
    return this.fb.group({
      hrName: [null,[Validators.required]],
      hrdesignation: [null,[Validators.required]],
      hrEmail: [null,[Validators.required,this.globalValidation.email()]],
      hrMobilenumber:  [null,[Validators.required,this.globalValidation.mobileRegex()]],
    })
  }

  get hrContactDetails() {
    return this.profileForm.get('hrContactDetails') as FormArray;
  }
  get chips() {
    return this.profileForm.get('stateCtrlone');
  }

  get state() {
    return this.profileForm.get('state');
  }

  addContactField() {
    if (this.hrContactDetails.valid) {
          return this.hrContactDetails.push(this.hrDetailsInitArr())
    } else {
      this.toaster.warning('Make sure, you have entered HR contact details');
      this.globalValidation.validateAllFormArrays(this.profileForm.get('hrContactDetails') as FormArray)
    }
  }

  get empSize() {
    return this.profileForm.get('empSize');
  }

  removeContactField(index: number): void {
    if (this.hrContactDetails.length > 1) this.hrContactDetails.removeAt(index);
    else this.hrContactDetails.patchValue([{ hrName: null, hrdesignation: null, hrEmail: null, hrMobilenumber: null }]);

  }
  //submit profile
  profile() {
    var obj = {
      email: localStorage.getItem('email'),
      detailedInformation: this.profileForm.value,
      detailedInformationType: true,

    }
    // debugger;
    // console.log(this.profileForm.valid);
    if (this.profileForm.valid) {

      this.apiService.updatePartner(obj).subscribe((data: any) => {
        if (data.success == false) {
          this.toaster.warning(data.message);
        } else {
          this.toaster.success(data.message);
        }
      }, (err) => {
        this.toaster.warning('Connection failed, Please try again.');
      });
    } else {
      this.profileForm.markAllAsTouched();
      this.toaster.warning('Please fill all the red highlighted fields to proceed further');
    }
  }
  //  hr details patch value
  HRspocPatch() {
    this.empProfile1 = [];
    var apiData = { "filterModel": { "email": { "filterType": "set", "values": [localStorage.getItem('email')] } } }
    this.apiService.empProfileDetails(apiData).subscribe((result: any) => {
      if (result.success) {
        this.empProfile1 = result.data[0]
        this.hrDetails = this.empProfile1 && this.empProfile1.detailedInformation && this.empProfile1?.detailedInformation?.hrContactDetails;
       if(this.hrDetails.length > 0){
        this.hrContactDetails.clear();
        this.hrDetails.forEach((element,i)=>{
          this.hrContactDetails.push(
            this.fb.group({
              hrName: [this.hrDetails[i].hrName,[Validators.required]],
              hrdesignation: [this.hrDetails[i].hrdesignation, [Validators.required]],
              hrEmail: [this.hrDetails[i].hrEmail,[Validators.required,this.globalValidation.email()]],
              hrMobilenumber:  [this.hrDetails[i].hrMobilenumber,[Validators.required,this.globalValidation.mobileRegex()]],
            })
          )
        })
       }

      } else {

      }
    })
  }


  empDetails() {
    this.empProfile = [];
    var apiData = { "filterModel": { "email": { "filterType": "set", "values": [localStorage.getItem('email')] } } }
    this.apiService.empProfileDetails(apiData).subscribe((result: any) => {
      if (result.success) {
        this.empProfile = result.data[0]
        if (this.empProfile?.companyImgURL && this.productionUrl == true) {
          this.empProfile.companyImgURL = this.empProfile?.companyImgURL + environment.blobToken
        } else if (this.empProfile?.companyImgURL && this.productionUrl == false) {
          this.empProfile.companyImgURL = this.empProfile?.companyImgURL
        }
        if (this.empProfile.detailedInformation) {
          var obj = { value: this.empProfile.detailedInformation.state }
          this.selectState(obj)
          this.profileForm.patchValue({
            empSize: this.empProfile.detailedInformation.empSize,
            websiteAddress: this.empProfile.detailedInformation.websiteAddress,
            chairmanName: this.empProfile.detailedInformation.chairmanName,
            chairmanEmail: this.empProfile.detailedInformation.chairmanEmail,
            mobileNumber: this.empProfile.detailedInformation.mobileNumber,
            chroName: this.empProfile.detailedInformation.chroName,
            chroEmail: this.empProfile.detailedInformation.chroEmail,
            chromobileNumber: this.empProfile.detailedInformation.chromobileNumber,

            addressOne: this.empProfile.detailedInformation.addressOne,
            addressTwo: this.empProfile.detailedInformation.addressTwo,
            pincode: this.empProfile.detailedInformation.pincode,
            district: parseInt(this.empProfile.detailedInformation.district),
            state: parseInt(this.empProfile.detailedInformation.state),
            country: parseInt(this.empProfile.detailedInformation.country),
            // stateCtrlone:result.data[0].detailedInformation.stateCtrlone,
          })
          if (this.empProfile.detailedInformation && this.empProfile.detailedInformation.stateCtrlone.length) {
            this.empProfile.detailedInformation.stateCtrlone.forEach((element, i) => {
              this.profileForm.value.stateCtrlone.push(element ? element : '')
              const index = this.states.indexOf(element);
              this.states.splice(index, 1)
            });
          }
        }
      } else {
        this.toaster.error(result.message)
      }
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
