import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalValidatorService } from 'src/app/globalvalidators/global-validator.service';
import { ApiService } from 'src/app/services/api.service';
import { NgModule } from '@angular/core';

({
  imports: [ReactiveFormsModule],
});
@Component({
  selector: 'app-emp-postrequirments',
  templateUrl: './emp-postrequirments.component.html',
  styleUrls: ['./emp-postrequirments.component.scss'],
})
export class EmpPostrequirmentsComponent implements OnInit {
  name = new FormControl('');
  postForm: FormGroup;
  selectedStatus: any;
  selectedOption: any;
  getSkill: any;
  newSkill:any;

  constructor(
    private fb: FormBuilder,
    private globalValidation: GlobalValidatorService,
    private toaster: ToastrService,
    private apiservice:ApiService,

  ) {}
  selectArray: any = ['Full Time', 'Part Time'];
  //  code FOR  DEPENDED DROUPDOWN

  selectedGraduation: string;

  selected_degrees: any[];

  selected_courses: any[];

  selected_specializations: any[];

  yearofpassingArray =function getLast30Years(): number[] {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Use the Array.from method to create an array of numbers from 0 to 29
    return Array.from({ length: 30 }, (_, i) => currentYear - i);
  }


  graduations = [
    { value: 'sslc', label: 'SSLC' },

    { value: 'hsc', label: 'HSC' },

    { value: 'diploma', label: 'Diploma' },

    { value: 'ug', label: 'UG' },

    { value: 'pg', label: 'PG' },

    { value: 'phd', label: 'Phd' },
  ];

  degrees = [
    { value: 'x std', label: 'X Std', graduation: 'sslc' },

    { value: 'xii std', label: 'XII Std', graduation: 'hsc' },

    { value: 'b.e', label: 'B.E', graduation: 'ug' },

    { value: 'bsc', label: 'B.sc', graduation: 'ug' },

    { value: 'btech', label: 'B.Tech', graduation: 'ug' },

    { value: 'b.ed', label: 'B.Ed', graduation: 'ug' },

    { value: 'm.e', label: 'M.E', graduation: 'pg' },

    { value: 'm.sc', label: 'M.sc', graduation: 'pg' },

    { value: 'mtech', label: 'M.Tech', graduation: 'pg' },

    { value: 'm.ed', label: 'M.Ed', graduation: 'pg' },
  ];

  courses = [
    {
      label: 'pick from the list',
      value: 'pick from the list',
      graduation: 'diploma',
    },

    {
      label: 'pick from the list',
      value: 'pick from the list',
      graduation: 'ug',
    },

    {
      label: 'pick from the list',
      value: 'pick from the list',
      graduation: 'pg',
    },

    {
      label: 'pick from the list',
      value: 'pick from the list',
      graduation: 'phd',
    },
  ];

  specializations: any = [
    { label: 'Nautical science', value: 'Nautical science', graduation: 'ug' },
    { label: 'Maritime science', value: 'Maritime science', graduation: 'ug' },
    { label: 'Physics', value: 'Physics', graduation: 'ug' },
    { label: 'Mantine Engineer', value: 'Mantine Engineer', graduation: 'ug' },


    { label: 'Nautical science', value: 'Nautical science', graduation: 'pg' },
    { label: 'Maritime science', value: 'Maritime science', graduation: 'pg' },
    { label: 'Physics', value: 'Physics', graduation: 'pg' },
    { label: 'Mantine Engineer', value: 'Mantine Engineer', graduation: 'pg' },


    { label: 'Nautical science', value: 'Nautical science', graduation: 'diploma' },
    { label: 'Maritime science', value: 'Maritime science', graduation: 'diploma' },
    { label: 'Physics', value: 'Physics', graduation: 'diploma' },
    { label: 'Mantine Engineer', value: 'Mantine Engineer', graduation: 'diploma' },


    { label: 'Nautical science', value: 'Nautical science', graduation: 'phd' },
    { label: 'Maritime science', value: 'Maritime science', graduation: 'phd' },
    { label: 'Physics', value: 'Physics', graduation: 'phd' },
    { label: 'Mantine Engineer', value: 'Mantine Engineer', graduation: 'phd' },
  ];


  AnyGraduationStatus = [];



 onToppingRemoved(topping: string) {
  const toppings = this.keyskillArrayControl.value as string[];
  this.keyskillArrayControl.setValue(toppings); // To trigger change detection
}

// skilllist=function(){
//   let data: any = {};
//   this.apiservice.getSkill(data).subscribe((res: any) => {
//     if (res.success) {
//      console.log(data);

//     }
//   });
// }

skilllist(){
  let data: any = {

  };
  this.apiservice.getSkill(data).subscribe((res:any)=>{
    this.newSkill
   console.log(res,'resss');

     if (res.success){
      this.newSkill=res.data;
     }
    console.log(this.newSkill);
  //   this.newSkill = res.name;
  // this.keyskillArrayControl.setValue(res.name)
  // console.log(this.newSkill)

  })
}

 keyskillArrayControl = new FormControl([]);
  // keyskillArray = [
  //   'Nautical science',
  //   'Maritime science',
  //   'Physics',
  //   'Mantine Engineer',
  // ];

  fromDate: Date;
  toDate: Date;


  yearofPassingControl = new FormControl([]);
  toppingList: any [] = ['2019', '2020', '2021', '2022', '2023', '2024'];

  ctcArray: any = ['12lacs', '13lacs', '14lacs', '15lacs'];

  rangefromArray: any = ['8lac', '9lac', '10lac', '11lac'];

  rangetoArray: any = ['12lac', '13lac', '14lac', '15lac'];

  ngOnInit() {
    this.createPost();
    this.skilllist();
  }
  radio() {}

  onChangeCategory(event) {
    //console.log(event.value);
  }
  createPost() {
    this.postForm = this.fb.group({
      jobrole: ['', [Validators.required]],
      jobtitle: ['', [Validators.required]],
      joblocation: ['', [Validators.required]],
      jobtype: ['', [Validators.required]],
      anygraduation: [null, [Validators.required]],
      anydegree: [null, [Validators.required]],
      anycourse: [null, [Validators.required]],
      selectspecialization: [null, [Validators.required]],
      fixedpackage: ['', [Validators.required]],
      ctcOptions: ['1'],
      rangepackagefrom: ['', [Validators.required]],
      rangepackageto: ['', [Validators.required]],
      yearofpassing: ['', [Validators.required]],
      keyskills: ['', [Validators.required]],
      jobdescription: ['', [Validators.required]],
      drivedate: ['', [Validators.required]],
      lastdatetoapply: ['', [Validators.required]],

      educationalDetails: this.fb.array([this.educationalDetailsInitArr()]),
    });
  }

  educationalDetailsInitArr() {
    return this.fb.group({
      anygraduation: [null, [Validators.required]],
      anydegree: [null, [Validators.required]],
      anycourse: [null, [Validators.required]],
      selectspecialization: [null, [Validators.required]],
    });
  }

  get educationalDetails() {
    return this.postForm.get('educationalDetails') as FormArray;
  }

  get anygraduation() {
    return this.postForm.get('anygraduation') as FormArray;
  }

  degreeData(data):any{
    console.log(data)
    if(data)
    {
      return this.degrees.filter((degree) => degree.graduation === data);
  }else{
    return [];
  }
  }

  updateDegree(data) {
    // console.log(data.value);
    const selectedGraduation = data.value;
    //console.log(selectedGraduation);
    //console.log('nill', this.postForm);

    this.selected_degrees = this.degrees.filter(
      (degree) => degree.graduation === selectedGraduation
    );
     console.log(this.selected_degrees);
    //console.log(this.selected_degrees[0].label, 'Result')

    this.selected_courses = this.courses.filter(
      (course) => course.graduation === selectedGraduation
    );
    console.log(this.selected_courses);

    this.selected_specializations = this.specializations.filter(
      (specialization) => specialization.graduation === selectedGraduation
    );
    console.log(this.selected_specializations);
  }

  getformarrayvalue(index) {
    return this.educationalDetails.at(index);
  }
  addMoreField() {
    if (this.educationalDetails.valid) {
      return this.educationalDetails.push(this.educationalDetailsInitArr());
    }
     else {
      this.toaster.warning('Make sure, you have entered  educationaldetails');
      this.globalValidation.validateAllFormArrays(
        this.postForm.get('educationalDetails') as FormArray
      );
    }

  }

  removeyearofPasing(index: any): void {}





  removeEducationalField(index: number): void {
    if (this.educationalDetails.length > 1)
      this.educationalDetails.removeAt(index);
    else
      this.educationalDetails.patchValue([
        {
          anygraduation: null,
          anydegree: null,
          anycourse: null,
          selectspecialization: null,
        },
      ]);
  }

  // save button
  onSubmit() {
    console.log(this.keyskillArrayControl.value)
    // if (this.postForm.valid) {
    var obj = {
      email: localStorage.getItem('email'),
      detailedInformation: this.postForm.value,
    };
    console.log(obj, this.postForm.value.ctcOptions);
    // }
  }
  clearall() {
    console.log(this.getformarrayvalue(0));
  }
}
