import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  companyOptions: string[] = [];
  companyId: any;
  company: string[] = [];
  keySkills: string[] = [];
  newSkill: string[] = [];
  JobLocations: any = [];
  YearofPassing: string[] = [];
  jobdata: any;
  selectedRangeOption: string = 'fixed';
  selectedOption: string;
  industryTypes = [
    'Full time',
    'Internship',
    'All',
  ];
  jobType = "";
  JobType = [
    'Full Time',
    'Internship',
  ]
  skillSet: any;
  jobLocation: any;
  description: any;
  ctcArray = ['Option 1', 'Option 2', 'Option 3'];
  rangefromArray = ['Option A', 'Option B', 'Option C'];
  rangetoArray = ['Option X', 'Option Y', 'Option Z'];
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

  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com" ? true : false;

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
  startrange: any;
  endrange: any;
  fixed: any;

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

  ) {
    const currentYear = new Date().getFullYear() - 1;
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.YearofPassing.push(i.toString());
    }
  }

  ngOnInit() {
    //on click on edit in ag-grid table it'll get data particular rowdata from localstorage
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('openJobData'));
    this.jobdata = this.appconfig.jobData ? this.appconfig.jobData : localjobData;
    console.log(this.jobdata, 'data for edit job page');

    this.getallEducation();
    this.getallCourses();
    this.cityLocation();
    // this.getRoute();
    this.formerrorInitialize();
    this.skilllist();
    this.companylist();
    // this.addjobsForm = this.formBuilder.group({
    // });
    this.patchFormValues()
    // this.patchSkillSet()
  }



patchFormValues() {
  console.log(this.addjobsForm, 'bef');

  if (this.jobdata) {
    console.log(this.jobdata, 'jobdata');

 const formattedJobLocation = this.jobdata.jobLocation.map(location =>
      location.toUpperCase().replace(/\b\w/g, (char) => char.toLowerCase())
    );

    this.addjobsForm.patchValue({
      company: this.jobdata.company,
      jobRole: this.jobdata.jobRole,
      jobTitle: this.jobdata.jobTitle,
      jobLocation: formattedJobLocation,
      jobType: this.jobdata.jobType,
      applyLink: this.jobdata.applyLink,
      yearofPassout: this.jobdata.yearofPassout,
      skillSet: this.jobdata.skillSet,
      lastDatetoApply: this.jobdata.lastDatetoApply,
      ctcOption: this.jobdata.ctcType,
      fixed: this.jobdata.ctc, // Only if it's a fixed type
      description: this.jobdata.description,
      requirement: this.jobdata.requirement,
      additionalInformation: this.jobdata.additionalInformation,
      // ... continue patching other form controls
    });

    // Patch education data
    if (this.jobdata.education && this.jobdata.education.length > 0) {
      for (let i = 0; i < this.jobdata.education.length; i++) {
        if (i < this.formGroups.length) {
          const educationItem = this.jobdata.education[i];

          this.formGroups[i].patchValue({
            level: educationItem.level,
            specification: educationItem.specification,
            discipline: educationItem.discipline,
          });
        } else {
          // If there are more education entries in jobdata than in formGroups, add a new form group
          this.addEducationGroup();
          const lastAddedGroup = this.formGroups[this.formGroups.length - 1];

          if (lastAddedGroup) {
            lastAddedGroup.patchValue({
              level: this.jobdata.education[i].level,
              specification: this.jobdata.education[i].specification,
              discipline: this.jobdata.education[i].discipline,
            });
          }

        }
      }
    }
  }

  console.log(this.addjobsForm, '------------------');
}



   formerrorInitialize() {
    // const emailregex: RegExp =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.addjobsForm = this.fb.group({
     ctcOption: ['', Validators.required],
           fixed:['', [
                    Validators.required,
                    Validators.pattern(/^[0-9,]+/)
                    ]],
      startrange: ['', [
                    Validators.required,
                    Validators.pattern(/^[0-9,]+/)
                    ]],
       endrange: ['', [
                    Validators.required,
                    Validators.pattern(/^[0-9,]+/)
                     ]],
      company: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
      jobLocation: ['', [Validators.required]],
      // jobLocation: ['', [Validators.required]],
      jobType: [[], [Validators.required]],
      jobTitle: ['', [Validators.required]],
      specification: ['', [Validators.required]],
      discipline: ['', [Validators.required]],
      skillSet: ['', [Validators.required]],
      //[this.skillSet]: [this.fb.array([]), [Validators.required]],
      lastDatetoApply: [[], [Validators.required]],
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
// get getskillSet() {
//     return this.addjobsForm.get([this.skillSet]) as FormArray;
//   }
   get jobRole() {
    return this.addjobsForm.get('jobRole');
  }
   get jobTitle() {
    return this.addjobsForm.get('jobTitle');
  }
  get lastDatetoApply() {
    return this.addjobsForm.get('lastDatetoApply');
  }
  get applyLink() {
    return this.addjobsForm.get('applyLink');
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

skilllist() {
  const data: any = {};
  this.apiService.getSkill(data).subscribe((res: any) => {
    if (res.success) {
      this.newSkill = res.data.map(item => item.skillName);
    }
  });
  }

handleSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    const data: any = {
      searchText: searchText
    };
    console.log('Search text:', searchText);
    this.apiService.getSkill(data).subscribe((res: any) => {
      if (res.success) {
        this.newSkill = res.data.map((item) => item.skillName);
        console.log(res, 'searchSkills');
      }
    });
  }

 companylist() {
     const data: any = {};
    this.apiService.masterCompany().subscribe(
  (res: any) => {
    console.log(res);
    if (res.success) {
      this.companyOptions = res.data.map(item => item.company);
    }
  },
  (error) => {
    console.error('API request error:', error);
  }
);
  }

  cityLocation() {
    const data: any = {};
    this.apiService.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.JobLocations = res.data.map(item => item.city);
        console.log(this.JobLocations, 'locations');
      }
    });
  }

  locationSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    const data: any = {
      searchText: searchText
    };
    this.apiService.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.JobLocations = res.data.map((item) => item.city);
      }
    });
  }

ctcChange() {
    const fixedControl = this.addjobsForm.get('fixed');
    const startrangeControl = this.addjobsForm.get('startrange');
    const endrangeControl = this.addjobsForm.get('endrange');
    const ctcOptionControl = this.addjobsForm.get('ctcOption');
    if (this.selectedOption === 'Jobs') {
      ctcOptionControl.setValidators(Validators.required);
      ctcOptionControl.updateValueAndValidity();
      this.selectedRangeOption = 'fixed';
    }
    if (this.selectedOption === 'Internships') {
      fixedControl.clearValidators();
      fixedControl.setValue(null);
      fixedControl.updateValueAndValidity();

      startrangeControl.clearValidators();
      startrangeControl.setValue(null);
      startrangeControl.updateValueAndValidity();

      endrangeControl.clearValidators();
      endrangeControl.setValue(null);
      endrangeControl.updateValueAndValidity();

      ctcOptionControl.clearValidators();
      ctcOptionControl.setValue(null);
      ctcOptionControl.updateValueAndValidity();
    }
    this.addjobsForm.reset();
  }


  onCtcOptionChange() {
    const fixedControl = this.addjobsForm.get('fixed');
    const startrangeControl = this.addjobsForm.get('startrange');
    const endrangeControl = this.addjobsForm.get('endrange');
    if (this.selectedRangeOption === 'fixed') {
      fixedControl.setValidators(Validators.required);
      fixedControl.setValue(this.fixed);
      startrangeControl.clearValidators();
      endrangeControl.clearValidators();
      startrangeControl.setValue(null);
      endrangeControl.setValue(null);
    } else if (this.selectedRangeOption === 'range') {
      startrangeControl.setValidators(Validators.required);
      endrangeControl.setValidators(Validators.required);
      startrangeControl.setValue(this.startrange);
      endrangeControl.setValue(this.endrange);
      fixedControl.clearValidators();
      fixedControl.setValue(null);
    }
    fixedControl.updateValueAndValidity();
    startrangeControl.updateValueAndValidity();
    endrangeControl.updateValueAndValidity();
  }

  saveviewForm(){
    const isFixed = this.addjobsForm.value.fixed;
    const startRange = this.addjobsForm.value.startrange;
    const endRange = this.addjobsForm.value.endrange;

    const htmlDescription = this.addjobsForm.value?.description;
    const htmljobRequirements = this.addjobsForm.value?.requirement;
    const htmladditionalinformation = this.addjobsForm.value?.additionalInformation;

  const descriptionItems = [
    {
      item: htmlDescription
    }
  ];
  const requirementItems = [
    {
      item: htmljobRequirements
    }
  ];
  const additionalInformation = htmladditionalinformation ? { note: htmladditionalinformation } : {};

 var obj = {
            "companyId": this.addjobsForm.value.companyId,
            "company": this.addjobsForm.value.company,
            "jobRole": this.addjobsForm.value.jobRole,
            "jobTitle": this.addjobsForm.value.jobTitle,
            "jobLocation":this.addjobsForm.value.jobLocation,
            "jobType":this.addjobsForm.value.jobType,
            "yearofPassout":this.addjobsForm.value.yearofPassout,
            "skillSet": this.addjobsForm.value.skillSet,
            "ctcType": this.addjobsForm.value.ctcOption,
            "ctc": isFixed ? this.addjobsForm.value?.fixed : `${startRange} - ${endRange}`,
            "lastDatetoApply":this.addjobsForm.value.lastDatetoApply,
            "additionalInformation": additionalInformation,
            "description": descriptionItems,
            "requirement": requirementItems,
            "applyLink": this.addjobsForm.value.applyLink,
            "education": this.formGroups.map(formGroup => formGroup.value)
            //"email":this.existsEmail==""?this.registerForm.value.email:this.existsEmail,
            //"existsUser":this.existsUser
    }
      console.log(obj,'post');
      this.apiService.UploadPostJob(obj).subscribe((data: any) => {
        // console.log(data)
        if (data.success == false) {
          this.toastr.warning(data.message);

        } else {
          this.toastr.success(data.message);
          // this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERLIST);
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    // }
  }
  clearviewForm() {
    this.addjobsForm.reset();
  }

}
