import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emp-postrequirments',
  templateUrl: './emp-postrequirments.component.html',
  styleUrls: ['./emp-postrequirments.component.scss']
})
export class EmpPostrequirmentsComponent implements OnInit {

  name = new FormControl('');
  regiForm: FormGroup;
  constructor() { }
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
    val2=[];

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


  ngOnInit() {

  }


  onChangeCategory(event) {
    //console.log(event.value);

}
firstDropDownChanged(val:any){
  if (val == "UG" ){
    this.val2 = ["BCA","BCOM"];
  }
else if (val == "PG" ){
  this.val2 = ["MCA","MCOM"];
}
else{
  this.val2=[];
}
}
}

