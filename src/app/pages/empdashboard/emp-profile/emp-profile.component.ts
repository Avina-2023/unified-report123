import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder, NgForm, FormArray, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit {
  separatorKeysCodes: number[] =  [ENTER, COMMA];
  stateCtrl = new FormControl('');
  states: Observable<string[]>;
  stateone: any[] = [];
  empProfile:any;
  editCompany:any;
  allStates :any = [
    {
    "key": "AN",
    "active":false,
    "name": "Andaman and Nicobar Islands"
    },
    {
    "key": "AP",
    "active":false,
    "name": "Andhra Pradesh"
    },
    {
    "key": "AR",
    "active":false,
    "name": "Arunachal Pradesh"
    },
    {
    "key": "AS",
    "active":false,
    "name": "Assam"
    },
    {
    "key": "BR",
    "active":false,
    "name": "Bihar"
    },
    {
    "key": "CG",
    "active":false,
    "name": "Chandigarh"
    },
    {
    "key": "CH",
    "active":false,
    "name": "Chhattisgarh"
    },
    {
    "key": "DH",
    "active":false,
    "name": "Dadra and Nagar Haveli"
    },
    {
    "key": "DD",
    "active":false,
    "name": "Daman and Diu"
    },
    {
    "key": "DL",
    "active":false,
    "name": "Delhi"
    },
    {
    "key": "GA",
    "active":false,
    "name": "Goa"
    },
    {
    "key": "GJ",
    "active":false,
    "name": "Gujarat"
    },
    {
    "key": "HR",
    "active":false,
    "name": "Haryana"
    },
    {
    "key": "HP",
    "active":false,
    "name": "Himachal Pradesh"
    },
    {
    "key": "JK",
    "active":false,
    "name": "Jammu and Kashmir"
    },
    {
    "key": "JH",
    "active":false,
    "name": "Jharkhand"
    },
    {
    "key": "KA",
    "active":false,
    "name": "Karnataka"
    },
    {
    "key": "KL",
    "active":false,
    "name": "Kerala"
    },
    {
    "key": "LD",
    "active":false,
    "name": "Lakshadweep"
    },
    {
    "key": "MP",
    "active":false,
    "name": "Madhya Pradesh"
    },
    {
    "key": "MH",
    "active":false,
    "name": "Maharashtra"
    },
    {
    "key": "MN",
    "active":false,
    "name": "Manipur"
    },
    {
    "key": "ML",
    "active":false,
    "name": "Meghalaya"
    },
    {
    "key": "MZ",
    "active":false,
    "name": "Mizoram"
    },
    {
    "key": "NL",
    "active":false,
    "name": "Nagaland"
    },
    {
    "key": "OR",
    "active":false,
    "name": "Odisha"
    },
    {
    "key": "PY",
    "active":false,
    "name": "Puducherry"
    },
    {
    "key": "PB",
    "active":false,
    "name": "Punjab"
    },
    {
    "key": "RJ",
    "active":false,
    "name": "Rajasthan"
    },
    {
    "key": "SK",
    "active":false,
    "name": "Sikkim"
    },
    {
    "key": "TN",
    "active":false,
    "name": "Tamil Nadu"
    },
    {
    "key": "TS",
    "active":false,
    "name": "Telangana"
    },
    {
    "key": "TR",
    "active":false,
    "name": "Tripura"
    },
    {
    "key": "UK",
    "active":false,
    "name": "Uttar Pradesh"
    },
    {
    "key": "UP",
    "active":false,
    "name": "Uttarakhand"
    },
    {
    "key": "WB",
    "active":false,
    "name": "West Bengal"
    }]

  @ViewChild('stateInput') stateInput: ElementRef<HTMLInputElement>;
  profileForm:FormGroup;
  constructor(private fb:FormBuilder,private apiService:ApiService,private toaster:ToastrService) { 
    this.states = this.stateCtrl.valueChanges.pipe(
      startWith(null),
      map((selectstate: any) => (selectstate ? this._filter(selectstate) : this.allStates.slice())),
    );
  }

  ngOnInit(): void {
    this.createProfile()
    this.empDetails()
    this.HRspocPatch()
    console.log('hloooo',this.HRspocPatch())
  }

  private _filter(value: string): string[] {
    const filterValue = value
    return this.allStates.filter(selectstate => selectstate.toUpperCase().includes(filterValue));
  }
  remove(selectstate: string): void {
    const index = this.stateone.indexOf(selectstate);
    if (index >= 0) {
      this.stateone.splice(index, 1);
    }
  }
  
  selectMe(event:any){
    if (event) {
      event.active=true
      this.stateone.push(event.name);
    }
  }
  createProfile(){
this.profileForm = this.fb.group({
  empSize: ['',[Validators.required]],
  websiteAddress:['',[Validators.required]],
  chairmanName:['',[Validators.required]],
  chairmanEmail:['',[Validators.required]],
  mobileNumber:['',[Validators.required]],
  chroName:['',[Validators.required]],
  chroEmail:['',[Validators.required]],
  chromobileNumber:['',[Validators.required]],
  hrContactDetails: this.buildContacts(this.hrcontact.hrContactDetails),
  hrName:['',Validators.compose([Validators.required])],
  hrdesignation:['',Validators.compose([Validators.required])],
  hrEmail:['',Validators.compose([Validators.required])],
  hrMobilenumber:['',Validators.compose([Validators.required])],
  addressOne:['',Validators.required],
  addressTwo:['',Validators.required],
  pincode:['',Validators.required],
  district:['',Validators.required],
  state:['',Validators.required],
  country:['',Validators.required],
  stateCtrlone:new FormControl(this.stateone, Validators.required)
})
}


updateProfile(){
this.profileForm.patchValue({
  empSize:this.editCompany.empSize,
})
}
hrcontact = {
  hrContactDetails: [{ hrName: '', hrdesignation: '' ,hrEmail:'',hrMobilenumber:'' }]
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

buildContacts(hrdetilas: {hrName: string; hrdesignation: string;hrEmail:string;hrMobilenumber:string}[] = []) {
  return this.fb.array(hrdetilas.map(hrcontact => this.fb.group(hrcontact)));
}

addContactField() {
  this.hrContactDetails.push(this.fb.group({hrName: null, hrdesignation: null,hrEmail:null,hrMobilenumber:null}))
}

removeContactField(index: number): void {
  if (this.hrContactDetails.length > 1) this.hrContactDetails.removeAt(index);
  else this.hrContactDetails.patchValue([{hrName: null, hrdesignation: null,hrEmail:null,hrMobilenumber:null}]);
}




  profile() {
    console.log(this.profileForm.value)
    var obj = {
      email: localStorage.getItem('email'),
      detailedInformation: this.profileForm.value,
      detailedInformationType: true
    }
    this.apiService.updatePartner(obj).subscribe((data: any) => {
      console.log(data)
      if (data.success == false) {
        this.toaster.warning(data.message);
      } else {
        this.toaster.success(data.message);
      }
    }, (err) => {
      this.toaster.warning('Connection failed, Please try again.');
    });
  }

  HRspocPatch() {
    let spoc = this.profileForm.get("hrContactDetails") as FormArray;
    for (let i = 0; i < this.empProfile.spoc; i++) {
      spoc.controls[i].patchValue({
        hrName: this.empProfile.spoc[i].hrName,
        hrdesignation: this.empProfile.spoc[i].hrdesignation,
        hrEmail: this.empProfile.spoc[i].hrEmail,
        hrMobilenumber: this.empProfile.spoc[i].hrMobilenumber,
      });
    }
  }
  

empDetails(){
  this.empProfile=[];
  var apiData = {"filterModel":{"email":{"filterType":"set","values":[localStorage.getItem('email')]}}}
  this.apiService.empProfileDetails(apiData).subscribe((result:any)=>{
    if(result.success){
      this.empProfile=result.data 
      this.profileForm.patchValue({
        empSize: result.data[0].detailedInformation.empSize,
        websiteAddress:result.data[0].detailedInformation.websiteAddress,
        chairmanName:result.data[0].detailedInformation.chairmanName,
        chairmanEmail:result.data[0].detailedInformation.chairmanEmail,
        mobileNumber:result.data[0].detailedInformation.mobileNumber,
        chroName:result.data[0].detailedInformation.chroName,
        chroEmail:result.data[0].detailedInformation.chroEmail,
        chromobileNumber:result.data[0].detailedInformation.chromobileNumber,
        hrContactDetails: result.data[0].detailedInformation.hrContactDetails,
        hrName:result.data[0].detailedInformation.hrName,
        hrdesignation:result.data[0].detailedInformation.hrdesignation,
        hrEmail:result.data[0].detailedInformation.hrEmail,
        hrMobilenumber:result.data[0].detailedInformation.hrMobilenumber,
        addressOne:result.data[0].detailedInformation.addressOne,
        addressTwo:result.data[0].detailedInformation.addressTwo,
        pincode:result.data[0].detailedInformation.pincode,
        district:result.data[0].detailedInformation.district,
        state:result.data[0].detailedInformation.state,
        country:result.data[0].detailedInformation.country,
        stateCtrlone:result.data[0].detailedInformation.stateCtrlone,
      })  
    }else{
      this.toaster.error(result.message)
    }
  })
}
}
