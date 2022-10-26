import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder, NgForm, FormArray, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
    }
    ]

  @ViewChild('stateInput') stateInput: ElementRef<HTMLInputElement>;
  profileForm:FormGroup;
  constructor(private fb:FormBuilder) { 
    this.states = this.stateCtrl.valueChanges.pipe(
      startWith(null),
      map((selectstate: any) => (selectstate ? this._filter(selectstate) : this.allStates.slice())),
    );
  }

  ngOnInit(): void {
    this.createProfile()
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
  stateCtrlone:new FormControl([], Validators.required)
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




profile(){
  console.log(this.profileForm.value)
}




}
