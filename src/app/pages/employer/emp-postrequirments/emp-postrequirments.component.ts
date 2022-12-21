import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


({
  imports: [ ReactiveFormsModule, ],
})
@Component({
  selector: 'app-emp-postrequirments',
  templateUrl: './emp-postrequirments.component.html',
  styleUrls: ['./emp-postrequirments.component.scss']
})
export class EmpPostrequirmentsComponent implements OnInit {
  name = new FormControl('');
  postForm: FormGroup;
  selectedInput: any;
  constructor( private fb: FormBuilder) { }
  selectArray: any = [
    'Full Time',
    'Part Time',
  ];
  graduation=[
        'SSLC',
      'HSC',
      'Diploma',
      'UG',
      'PG',
      'PHd',]
    //val2=["ctc-form-width"];

  // anygraduationArray: any = [
  //   'SSLC',
  //   'HSC',
  //   'Diploma',
  //   'UG',
  //   'PG',
  //   'PHd',

  // ];

  // anydegreeArray: any = [
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',

  // ];
   anycourseArray: any = [
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',
  //   '',

   ];
  AnyGraduationStatus = [];

  keyskillArray= [];


  fromDate: Date;
  toDate: Date;

  yearofpassingArray: any = [
    '2019',
    '2020',
    '2021',
    '2022',
  ];

  ctcArray:any = [
    '12lacs',
    '13lacs',
    '14lacs',
    '15lacs',
  ];

  ngOnInit() {

  }


  onChangeCategory(event) {
    //console.log(event.value);

}
 createPost() {
  this.postForm = this.fb.group({
     jobrole: ['', [Validators.required]],
     jobtitle: ['', [Validators.required]],
     joblocation: ['', [Validators.required]],
     jobtype: ['', [Validators.required]],
     anygraduation: ['', [Validators.required]],
     anydegree: ['', [Validators.required]],
     anycourse: ['', [Validators.required]],
     selectspecialization: ['', [Validators.required]],
     fixedpackage: ['', [Validators.required]],
     rangepackagefrom: ['', [Validators.required]],
     rangepackageto: ['', [Validators.required]],
     yearofpassing: ['', [Validators.required]],
     keyskills: ['', [Validators.required]],
     jobdescription: ['', [Validators.required]],
     drivedate: ['', [Validators.required]],
    lastdatetoapply : ['', [Validators.required]],

   })
 }

}

