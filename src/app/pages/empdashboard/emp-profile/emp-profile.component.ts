import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
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
  a: any;
  allStates: any = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh',
    'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'

  ]

  @ViewChild('stateInput') stateInput: ElementRef<HTMLInputElement>;
  profileForm: FormGroup;
  hrDetails: any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private toaster: ToastrService) {
    this.states = this.allStates

  }

  ngOnInit(): void {
    this.createProfile()
    this.empDetails()
    this.HRspocPatch()
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
  createProfile() {
    this.profileForm = this.fb.group({
      empSize: ['', [Validators.required]],
      websiteAddress: ['', [Validators.required]],
      chairmanName: ['', [Validators.required]],
      chairmanEmail: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      chroName: ['', [Validators.required]],
      chroEmail: ['', [Validators.required]],
      chromobileNumber: ['', [Validators.required]],
      hrContactDetails: this.buildContacts(this.hrcontact.hrContactDetails),
      addressOne: ['', Validators.required],
      addressTwo: ['', Validators.required],
      pincode: ['', Validators.required],
      // hrName:['',Validators.re],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      stateCtrlone: new FormControl(this.stateone, Validators.required)
    })
  }

  hrcontact = {
    hrContactDetails: [{ hrName: '', hrdesignation: '', hrEmail: '', hrMobilenumber: '' }]
  }

  form: FormGroup = this.fb.group({
    contacts: this.buildContacts(this.hrcontact.hrContactDetails)
  });


  get hrContactDetails(): FormArray {
    return this.profileForm.get('hrContactDetails') as FormArray;
  }
  get chips() {
    return this.profileForm.get('stateCtrlone');
  }

  buildContacts(hrdetilas: { hrName: string; hrdesignation: string; hrEmail: string; hrMobilenumber: string }[] = []) {
    return this.fb.array(hrdetilas.map(hrcontact => this.fb.group(hrcontact)));
  }

  addContactField() {
    this.hrContactDetails.push(this.fb.group({ hrName: null, hrdesignation: null, hrEmail: null, hrMobilenumber: null }))
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
      detailedInformationType: true
    }
    if(this.profileForm.valid){
      this.apiService.updatePartner(obj).subscribe((data: any) => {
        if (data.success == false) {
          this.toaster.warning(data.message);
        } else {
          this.toaster.success(data.message);
        }
      }, (err) => {
        this.toaster.warning('Connection failed, Please try again.');
      });  
    }
  
  }
//  hr details patch value
  HRspocPatch() {
    this.empProfile1 = [];
    let spoc = this.profileForm.get("hrContactDetails") as FormArray;
    var apiData = { "filterModel": { "email": { "filterType": "set", "values": [localStorage.getItem('email')] } } }
    this.apiService.empProfileDetails(apiData).subscribe((result: any) => {
      if (result.success) {
        this.empProfile1 = result.data[0]
        this.hrDetails = this.empProfile1?.detailedInformation?.hrContactDetails;
        for (let i = 0; i < this.hrDetails.length; i++) {
          spoc.controls[i].patchValue({
            hrName: this.hrDetails[i].hrName,
            hrdesignation: this.hrDetails[i].hrdesignation,
            hrEmail: this.hrDetails[i].hrEmail,
            hrMobilenumber: this.hrDetails[i].hrMobilenumber,
          });
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
          district: this.empProfile.detailedInformation.district,
          state: this.empProfile.detailedInformation.state,
          country: this.empProfile.detailedInformation.country,
          // stateCtrlone:result.data[0].detailedInformation.stateCtrlone,
        })
        this.empProfile.detailedInformation.stateCtrlone.forEach((element, i) => {
          this.profileForm.value.stateCtrlone.push(element ? element : '')
          this.states.splice(element, i)
        });
      } else {
        this.toaster.error(result.message)
      }
    })
  }
}