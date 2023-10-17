import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss'],
})
export class AddJobsComponent implements OnInit {
  addjobsForm: FormGroup;
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
  selectedOption: string = '1';
  htmlContent_description = '';
  htmlContent_requirement = '';
  htmlContent_information = '';
  employerLogo = '';
  formBuilder: any;
  errorMsgforCmpnyLogo = '';
  employerCmpnyLogoFile: any;
  displayImageUrl = "";
  employerLogoUrl: string;
  formGroups: FormGroup[] = [];
  multipleSpecialization = [];
  listOfSpecializations: any;
  educations: any;
  graduation: string;
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

  constructor(private fb: FormBuilder, private apiService: ApiService, private ApiService: ApiService,private appconfig: AppConfigService, private toastr: ToastrService) {
    // this.addjobsForm = this.fb.group({
    //   fixedctc: [''],
    //   startrangectc: [''],
    //   endrangectc: [''],
    //   ctcOptions: ['1'],
    // });
  }
  ngOnInit(): void {
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
      jobType: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      skillSet: ['', [Validators.required]],
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
      graduation: [null, Validators.required],
      degree: [null],
      course: [null],
      specialization: [this.multipleSpecialization],
    });
  }
  get company() {
    return this.addjobsForm.get('company');
  }
  get jobRole() {
    return this.addjobsForm.get('jobRole');
  }
   get jobTitle() {
    return this.addjobsForm.get('jobTitle');
  }

  //  get jobLocation() {
  //   return this.addjobsForm.get('jobLocation');
  // }
  // get jobType() {
  //   return this.addjobsForm.get('jobType');
  // }
  get degree() {
    return this.addjobsForm.get('degree');
  }
  get specialization() {
    return this.addjobsForm.get('specialization');
  }
  get fixedctc() {
    return this.addjobsForm.get('fixedctc');
  }
  get startrangectc() {
    return this.addjobsForm.get('startrangectc');
  }
  get endrangectc() {
    return this.addjobsForm.get('endrangectc');
  }
  get keyskill() {
    return this.addjobsForm.get('keyskill');
  }
  get lastdate() {
    return this.addjobsForm.get('lastdate');
  }
  get applyLink() {
    return this.addjobsForm.get('applyLink');
  }
  // get description() {
  //   return this.addjobsForm.get('description');
  // }
  // get requirement() {
  //   return this.addjobsForm.get('requirement');
  // }
  // get lastDatetoApply() {
  //   return this.addjobsForm.get('lastDatetoApply');
  // }
// onEmployerLogoFileSelected(event) {
//   this.errorMsgforCmpnyLogo = '';
//   this.employerCmpnyLogoFile = event.target.files[0];
//    const fd = new FormData();
//     fd.append("uploadFile",event.target.files[0]);
//     fd.append("type", "profile");
// this.ApiService.imageUpload(fd).subscribe((imageData: any) => {
//       if (imageData.success == false) {
//         this.toastr.warning(imageData.message);
//       } else {
//         this.employerLogo = event.target.files[0].name;
//         if (imageData.data && this.productionUrl == true) {
//           this.displayImageUrl = imageData.data + environment.blobToken
//         } else if (imageData.data && this.productionUrl == false) {
//           this.displayImageUrl = imageData.data
//         }
//         this.employerLogoUrl = imageData.data;
//       }
//     }, (err) => {
//       this.toastr.warning('Connection failed, Please try again.');
//     });

//   }

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
  onSubmit() {
    // const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);
    // if (this.addjobsForm.valid && areEducationGroupsValid) {
    //   const consolidatedData = {
    //     jobFormValues: this.addjobsForm.value,
    //     dynamicFormData: this.formGroups.map(formGroup => formGroup.value)
    //   };
    //   console.log(consolidatedData);

    // } else {
    //   this.addjobsForm.markAllAsTouched();
    //   this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
    //   this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    // }
  }
saveForm() {
    // if (this.addjobsForm.valid) {
      // Perform form submission actions{
      var obj = {
            "company": this.addjobsForm.value.company,
            "jobRole": this.addjobsForm.value.jobRole,
            "jobTitle": this.addjobsForm.value.jobTitle,
            "jobLocation":this.addjobsForm.value.jobLocation,
            "jobType":this.addjobsForm.value.jobType,
            "yearofPassout":this.addjobsForm.value.yearofPassout,
            "skillSet": this.addjobsForm.value.skillSet,
            "lastDatetoApply":this.addjobsForm.value.lastDatetoApply,
            "additionalInformation":this.addjobsForm.value.additionalInformation,
            "description":this.addjobsForm.value.description,
            "requirement":this.addjobsForm.value.requirement,
            "applyLink":this.addjobsForm.value.applyLink,

            //"email":this.existsEmail==""?this.registerForm.value.email:this.existsEmail,
            //"existsUser":this.existsUser
      }
      this.apiService.UploadPostJob(obj).subscribe((data: any) => {
        // console.log(data)
        if (data.success == false) {
          this.toastr.warning(data.message);
        } else {
          this.toastr.success(data.message);
          this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERLIST);
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    // }

  }

  clearForm() {
    this.addjobsForm.reset();
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
    currentFormGroup.get('degree').setValue(null);
    currentFormGroup.get('course').setValue(null);
    currentFormGroup.get('specialization').setValue(null);

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
      currentFormGroup.get('degree').setValue(
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
      currentFormGroup.get('specialization').clearValidators();
      currentFormGroup.get('specialization').updateValueAndValidity();
    } else {
      currentFormGroup.get('specialization').setValidators(Validators.required);
      currentFormGroup.get('specialization').updateValueAndValidity();
    }


    if (selectedGraduation === 'UG' || selectedGraduation === 'PG') {
      currentFormGroup.get('degree').setValidators(Validators.required);
      currentFormGroup.get('degree').updateValueAndValidity();
    } else {
      currentFormGroup.get('degree').clearValidators();
      currentFormGroup.get('degree').updateValueAndValidity();
    }

    if (selectedGraduation) {
      // currentFormGroup.get('degree').setValue(null);
      currentFormGroup.get('specialization').setValue([]);
    }

    if (selectedGraduation === 'UG') {
      this.degreeOptions = this.ugDegree;
    }

    if (selectedGraduation === 'PG') {
      this.degreeOptions = this.pgDegree;
    }

    if (currentFormGroup.get('graduation').value === 'Diploma') {
      currentFormGroup.get('specialization').setValue(null);
      this.listOfSpecializations = this.diplomaCourses;
    }

    if (currentFormGroup.get('graduation').value === 'UG') {
      currentFormGroup.get('specialization').setValue(null);
      this.listOfSpecializations = this.ugCourses;
    }

    if (currentFormGroup.get('graduation').value === 'PG') {
      currentFormGroup.get('specialization').setValue(null);
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

    const selectedValue = currentFormGroup.get('specialization')?.value;
    if (selectedValue && selectedValue.includes('Any Specialization')) {
      const clearedValues = selectedValue.filter(value => value === 'Any Specialization');
      currentFormGroup.get('specialization')?.patchValue(clearedValues, { emitEvent: false });
    }

    if (currentFormGroup.get('graduation').value === 'Diploma' || currentFormGroup.get('graduation').value === 'UG' || currentFormGroup.get('graduation').value === 'PG') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }

  isdegreeDisabled(index: number): boolean {
    const currentFormGroup = this.formGroups[index];

    if (currentFormGroup.get('graduation').value === 'UG' || currentFormGroup.get('graduation').value === 'PG') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }
}
