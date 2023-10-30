import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
  addjobsForm: FormGroup;
  formGroups: FormGroup[] = [];


  jobdata: any;
  selectedOption: string = '1';

  keySkills: string[] = [];
  newSkill: string[] = [];
  industryTypes = [
    'Full time',
    'Internship',
    'All',
  ];
  Company_Name= [
    'TCS',
    'Cognizant',
    'ZOHO',
    'Wipro',
    'HCL',
    'TehchMahindra',
    'Infosys',
    'LnT_Edutech',
    'Movate',
    'Samsung',
    'Capgemini',
    'Hexaware ',
  ];
  jobLocation = [''];
  JobLocations = [
    'ANY LOCATION',
    'CHENNAI',
    'BANGLORE',
    'MUMBAI',
    'DELHI',
    'PUNE',
    'KOLKATA',
    'KOCHI',
    'HYDERABAD',
    'MADURAI',
    'PONDYCHERRY',
    'SURAT',
  ]
  // keySkills = [
  //   'UI/UX',
  //   'JAVA',
  //   'PYTHON',
  //   'JAVASCRIPT',
  //   'PHP',
  // ]
  jobType = [''];
  JobType = [
     'Full Time',
     'Internship',
  ]
YearofPassing = [
     '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ]
  skillSet = [''];
  ctcArray = ['Option 1', 'Option 2', 'Option 3'];
  rangefromArray = ['Option A', 'Option B', 'Option C'];
  rangetoArray = ['Option X', 'Option Y', 'Option Z'];
  // selectedOption: string = 'jobs';
  htmlContent_description = '';
  htmlContent_requirement = '';
  htmlContent_information = '';
  employerLogo = '';
  formBuilder: any;
  errorMsgforCmpnyLogo = '';
  employerCmpnyLogoFile: any;
  displayImageUrl = "";
  employerLogoUrl: string;
  multipleSpecialization = [];
  listOfSpecializations: any;
  educations: any;
  level: string;
  degreeOptions = [
    { "id": "0", "specification_name": "Any Degree / Graduation" },
    { "id": "1", "specification_name": "X Std" },
    { "id": "2", "specification_name": "XII Std" }
  ]
  courseOptions = ['Any Course', 'Pick From the List'];
  ugDegree: any;
  diplomaCourses: string[];
  pgDegree: any;
  allCourses: any;
  pgCourses: any;
  ugCourses: any;

  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '100px',
    maxHeight: '100px',
    placeholder: 'Type here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
    };

//   editorConfig = {
//   editable: true, // Set this to 'false' to make the editor read-only
//   spellcheck: true,
//   height: 'auto',
//   minHeight: '100px',
//   placeholder: 'Enter Job Description',
//   translate: 'yes',
//   defaultParagraphSeparator: 'p',
//   defaultFontName: 'Arial',
//   toolbarHiddenButtons: [
//     ['fontName'],
//     ['insertImage'],
//     ['strikeThrough'],
//     ['subscript'],
//     ['superscript'],
//   ],
// };

  constructor(
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    //on click on edit in ag-grid table it'll get data particular rowdata from localstorage
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('openJobData'));
    this.jobdata = this.appconfig.jobData ? this.appconfig.jobData : localjobData;
    console.log(this.jobdata, 'data for edit job page');

     this.getallEducation();
    this.getallCourses();
    // this.getRoute();
    this.formerrorInitialize();
    this.skilllist();
    // this.getIndustryType();
    this.addjobsForm = this.formBuilder.group({
    });
  }
   skilllist() {
  const data: any = {};
  this.apiService.getSkill(data).subscribe((res: any) => {
    if (res.success) {
      this.newSkill = res.data.map(item => item.skillName);
    }
  });
}
   formerrorInitialize() {
    // const emailregex: RegExp =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.addjobsForm = this.fb.group({
  fixedctc: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9,]*$/)
        ]
      ],
          startrangectc: ['', [
          Validators.required,
          Validators.pattern(/^[0-9,]*$/)
        ]],
      endrangectc: ['',[
          Validators.required,
          Validators.pattern(/^[0-9,]*$/)
        ]],
      ctcOptions: ['1'],
      company: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
      jobLocation: [[], [Validators.required]],
      // jobLocation: ['', [Validators.required]],
      jobType: [[], [Validators.required]],
      jobTitle: ['', [Validators.required]],
      specification: ['', [Validators.required]],
      discipline: ['', [Validators.required]],
      skillSet: [[], [Validators.required]],
      lastDatetoApply: [[]],
      yearofPassout: [[], [Validators.required]],
      applyLink: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(\/\S*)?$/i)
        ]
      ],
      //  lastDatetoApply: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern(/^[0-9]+$/),
      //     Validators.minLength(4),
      //     Validators.maxLength(4),
      //   ]
      // ],
      // mobile: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.minLength(10),
      //     Validators.maxLength(10),
      //     Validators.pattern('[1-9]{1}[0-9]{9}'),
      //   ]),
      // ],
      // description: ['', [Validators.required]],
      requirement: ['', [Validators.required]],
      description: ['', [Validators.required]],
      additionalInformation: [],
      // ctcOptions: ['1'],
      educationGroups: this.fb.array([this.createEducationGroup()])

    });
    this.formGroups = this.addjobsForm.get('educationGroups')['controls'];
  }
   createEducationGroup(): FormGroup {
    return this.fb.group({
      level: [null, Validators.required],
      specification: [null],
     // course: [null],
      discipline: [this.multipleSpecialization],
    });
  }
addEducationGroup(): void {
    const lastGroupIndex = this.formGroups.length - 1;
    const lastGroup = this.formGroups[lastGroupIndex];
    if (lastGroup.valid) {
      this.formGroups.push(this.createEducationGroup());
    } else {
      lastGroup.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields in the last added group.', 'Form Validation Error');
    }
  }
removeEducationGroup(index: number): void {
    if (this.formGroups.length > 1 && index > 0) {
      this.formGroups.splice(index, 1);
      this.addjobsForm.setControl('educationGroups', this.fb.array(this.formGroups));
    }
  }
getallEducation() {
    this.apiService.getallEducations().subscribe((data: any) => {
      this.educations = data[0];
    })
  }

  getallCourses() {
    this.apiService.getallCollegeCourses().subscribe((data: any) => {
      this.allCourses = data;
      if (this.allCourses) {
        this.diplomaCourses = this.allCourses?.diploma_disciplines;
        this.ugCourses = this.allCourses?.ug_disciplines;
        this.pgCourses = this.allCourses?.pg_disciplines;
        this.ugDegree = this.allCourses?.ug_specifications;
        this.pgDegree = this.allCourses?.pg_specifications;
      }
    })
  }

  onGraduationChange(selectedGraduation: string, index: number) {
    const currentFormGroup = this.formGroups[index];
    // Clear values in the current form group
    currentFormGroup.get('specification').setValue(null);
    //currentFormGroup.get('course').setValue(null);
    currentFormGroup.get('discipline').setValue(null);

    if (selectedGraduation === null) {
      return;
    }

    if (selectedGraduation === 'SSLC' || selectedGraduation === 'HSC' || selectedGraduation === 'Any Graduation' || selectedGraduation === 'Diploma') {
      this.degreeOptions = [
        { "id": "0", "specification_name": "Any Degree / Graduation" },
        { "id": "1", "specification_name": "X Std" },
        { "id": "2", "specification_name": "XII Std" },
        { "id": "2", "specification_name": "Diploma" }
      ];
      currentFormGroup.get('specification').setValue(
        selectedGraduation === 'Any Graduation'
          ? 'Any Degree / Graduation'
          : selectedGraduation === 'Diploma'
            ? 'Diploma'
            : selectedGraduation === 'SSLC'
              ? 'X Std'
              : 'XII Std'
      );
    }

    if (selectedGraduation === 'Any Graduation' || selectedGraduation === 'SSLC' || selectedGraduation === 'HSC') {
      currentFormGroup.get('discipline').clearValidators();
      currentFormGroup.get('discipline').updateValueAndValidity();
    } else {
      currentFormGroup.get('discipline').setValidators(Validators.required);
      currentFormGroup.get('discipline').updateValueAndValidity();
    }


    if (selectedGraduation === 'UG' || selectedGraduation === 'PG') {
      currentFormGroup.get('specification').setValidators(Validators.required);
      currentFormGroup.get('specification').updateValueAndValidity();
    } else {
      currentFormGroup.get('specification').clearValidators();
      currentFormGroup.get('specification').updateValueAndValidity();
    }

    if (selectedGraduation) {
      // currentFormGroup.get('degree').setValue(null);
      currentFormGroup.get('discipline').setValue([]);
    }

    if (selectedGraduation === 'UG') {
      this.degreeOptions = this.ugDegree;
    }

    if (selectedGraduation === 'PG') {
      this.degreeOptions = this.pgDegree;
    }

    if (currentFormGroup.get('level').value === 'Diploma') {
      currentFormGroup.get('discipline').setValue(null);
      this.listOfSpecializations = this.diplomaCourses;
    }

    if (currentFormGroup.get('level').value === 'UG') {
      currentFormGroup.get('discipline').setValue(null);
      this.listOfSpecializations = this.ugCourses;
    }

    if (currentFormGroup.get('level').value === 'PG') {
      currentFormGroup.get('discipline').setValue(null);
      this.listOfSpecializations = this.pgCourses;
    }
    // currentFormGroup.get('specialization').setValidators(Validators.required);
    // currentFormGroup.get('specialization').updateValueAndValidity();
  }


  // onDegreeChange(selectedDegree: string, index: number) {
  //   const currentFormGroup = this.formGroups[index];

  //   if (selectedDegree === null) {
  //     currentFormGroup.get('course').setValue(null);
  //   }

  //   // Handle additional logic if needed...
  // }

  onDegreeChange(selectedCourse: string, index: number) {
    const currentFormGroup = this.formGroups[index];

    // Handle course change logic...
    // if (selectedCourse === 'Any Course' || selectedCourse === null) {
    //   currentFormGroup.get('specialization').setValue(null);
    //   currentFormGroup.get('specialization').clearValidators();
    //   currentFormGroup.get('specialization').updateValueAndValidity();
    // }

    //if (selectedCourse === 'Pick From the List') {
    // Additional logic based on the selected course...
    // }
  }


  // isSelectDisabled(index: number): boolean {
  //   const currentFormGroup = this.formGroups[index];

  //   if ((currentFormGroup.get('graduation').value === 'UG' || currentFormGroup.get('graduation').value === 'PG') &&
  //     currentFormGroup.get('degree').value !== 'Any Degree / Graduation' &&
  //     currentFormGroup.get('degree').value &&
  //     currentFormGroup.get('graduation').value) {
  //     return false; // Do not apply disabled
  //   } else {
  //     return (currentFormGroup.get('graduation').value !== 'Diploma' && currentFormGroup.get('graduation').value !== 'Phd');
  //   }
  // }

  iscourseDisabled(index: number): boolean {
    const currentFormGroup = this.formGroups[index];

    const selectedValue = currentFormGroup.get('discipline')?.value;
    if (selectedValue && selectedValue.includes('Any Specialization')) {
      const clearedValues = selectedValue.filter(value => value === 'Any Specialization');
      currentFormGroup.get('discipline')?.patchValue(clearedValues, { emitEvent: false });
    }

    if (currentFormGroup.get('level').value === 'Diploma' || currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }

  isdegreeDisabled(index: number): boolean {
    const currentFormGroup = this.formGroups[index];

    if (currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }

  saveviewForm(){

  }
  clearviewForm() {

  }

}
