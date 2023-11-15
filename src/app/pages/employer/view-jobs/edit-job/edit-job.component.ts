import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { log } from 'console';



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
  company: any;
  jobId: any;
  selectedCompany: any;
  selectedCompanyData: any;
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
  degreeOptions: any[];
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
  specification: any;
  discipline: any;
  allDisciplines: any;
  ugDegrees: { id: string; specification_name: string; }[];
  pgDegrees: { id: string; specification_name: string; }[];
  phdDegrees: { id: string; specification_name: string; }[];
  alldegree: any;

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
    this.getalldegree();
    this.cityLocation();
    // this.getRoute();
    this.formerrorInitialize();
    this.skilllist();
    this.companylist();
    // this.addjobsForm = this.formBuilder.group({
    // });
    this.patchFormValues()
    // this.patchSkillSet()
    //console.log(this.addjobsForm.value,'test job');
  console.log(this.addjobsForm, '------------------');

  }

  patchFormValues() {
    // setTimeout(() => {
  //let company = this.companyOptions.find((item:any) => {item.companyId ===  this.jobdata.companyId});

    //console.log(company, 'company test');
    if (this.jobdata) {
       this.selectedCompanyData=this.jobdata.company
       console.log(this.jobdata, 'jobdata');
        this.addjobsForm.patchValue({
        //company: { company: this.jobdata.company, companyId: this.jobdata.companyId },
        company: this.selectedCompanyData,
        jobRole: this.jobdata.jobRole,
        jobTitle: this.jobdata.jobTitle,
        jobLocation: this.jobdata.jobLocation,
        jobType: this.jobdata.jobType,
        applyLink: this.jobdata.applyLink,
        yearofPassout: this.jobdata.yearofPassout,
        skillSet: this.jobdata.skillSet,
        lastDatetoApply: this.jobdata.lastDatetoApply,

        description: this.jobdata.description.length > 0 ? this.jobdata.description[0].item : '',
        requirement: this.jobdata.requirement.length > 0 ? this.jobdata.requirement[0].item : '',
        additionalInformation: this.jobdata.additionalInformation ? this.jobdata.additionalInformation.note : '',
      });

    const educationGroupsArray = this.addjobsForm.get('educationGroups') as FormArray;
    educationGroupsArray.clear(); // Clear existing values

    // Patch education values from jobdata
    this.jobdata.education.forEach((educationItem) => {
      const educationGroup = this.createEducationGroup(); // Use your existing function
      educationGroup.patchValue({
        level: educationItem.level,
        specification: educationItem.specification,
        discipline: educationItem.discipline, // Assuming discipline is a direct value, adjust as needed
      });
      educationGroupsArray.push(educationGroup);
    });
  }

    // }, 1000);
  }
  // patchEducationDetails() {
  //   this.jobdata.education.forEach(item => {
  //     console.log(item,'item');

  //     this.addjobsForm.value.educationGroups.push(item)
  //   })
  // }

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

      requirement: ['', [Validators.required]],
      description: ['', [Validators.required]],
      additionalInformation: [],
      // ctcOptions: ['1'],
       //education: this.formBuilder.array([]),
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

getalldegree() {
  this.apiService.getDegreeList().subscribe((data: any) => {
   this.alldegree = data;
   console.log(this.alldegree, 'degreeList');
   // Define separate arrays for UG and PG degrees
   this.ugDegrees = [];
   this.pgDegrees = [];
   this.phdDegrees = [];
   this.alldegree.data.forEach((item: any) => {
    if (item.qualification === "UG") {
     this.ugDegrees = this.ugDegrees.concat(item.degree);
    } else if (item.qualification === "PG") {
     this.pgDegrees = this.pgDegrees.concat(item.degree);
    }
    else if (item.qualification === "Phd") {
     this.phdDegrees = this.phdDegrees.concat(item.degree);
    }
   });
   console.log(this.ugDegrees, 'UG degrees');
   console.log(this.pgDegrees, 'PG degrees');
   console.log(this.phdDegrees, 'Phd degrees');
  });
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
    // if (selectedGraduation === 'SSLC' || selectedGraduation === 'HSC' || selectedGraduation === 'Any Graduation' || selectedGraduation === 'Diploma') {
    //   this.degreeOptions = [
    //     { "id": "0", "specification_name": "Any Degree / Graduation" },
    //     { "id": "1", "specification_name": "X Std" },
    //     { "id": "2", "specification_name": "XII Std" },
    //     { "id": "2", "specification_name": "Diploma" }
    //   ];
    //   currentFormGroup.get('specification').setValue(
    //     selectedGraduation === 'Any Graduation'
    //       ? 'Any Degree / Graduation'
    //       : selectedGraduation === 'Diploma'
    //         ? 'Diploma'
    //         : selectedGraduation === 'SSLC'
    //           ? 'X Std'
    //           : 'XII Std'
    //   );
    // }

 if (selectedGraduation === 'SSLC' || selectedGraduation === 'HSC' || selectedGraduation === 'Any Graduation') {
   this.degreeOptions = ['Any Degree / Graduation', 'X Std', 'XII Std'];
   currentFormGroup.get('specification').setValue(
    selectedGraduation === 'Any Graduation'
     ? 'Any Degree / Graduation'
     : selectedGraduation === 'HSC'
      ? 'XII Std'
      : selectedGraduation === 'SSLC'
       ? 'X Std'
       : ''
   );
    }
     if (selectedGraduation === 'Diploma') {
   this.degreeOptions = ['Diploma UG', 'Diploma PG'];
   currentFormGroup.get('specification').setValue(
    selectedGraduation === 'Diploma'
     ? ['Diploma UG', 'Diploma PG']
     : ''
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
   this.degreeOptions = this.ugDegrees;
  }
  if (selectedGraduation === 'PG') {
   this.degreeOptions = this.pgDegrees;
  }
  if (selectedGraduation === 'Phd') {
   this.degreeOptions = this.phdDegrees;
  }
    if (currentFormGroup.get('level').value === 'Diploma') {
      currentFormGroup.get('discipline').setValue(null);
     // this.listOfSpecializations = this.diplomaCourses;
    }

    if (currentFormGroup.get('level').value === 'UG') {
      currentFormGroup.get('discipline').setValue(null);
      //this.listOfSpecializations = this.ugCourses;
    }

    if (currentFormGroup.get('level').value === 'PG') {
      currentFormGroup.get('discipline').setValue(null);
      //this.listOfSpecializations = this.pgCourses;
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
    currentFormGroup.get('discipline').setValue(null);
    //if (selectedCourse !== null && typeof selectedCourse === 'string') {
    if (selectedCourse !== null && typeof selectedCourse === 'string' && selectedCourse !== 'Any Degree / Graduation' && selectedCourse !== 'X Std' && selectedCourse !== 'XII Std') {
      console.log(selectedCourse, 'selectedCoursevalues');
      const params = { "degree": selectedCourse };
      this.apiService.getDepartmentcourses(params).subscribe((response: any) => {
        this.allDisciplines = response.data;
        if (this.allDisciplines) {
          console.log(this.allDisciplines, 'specializationlist');
          this.listOfSpecializations = this.allDisciplines;
        }
      }, error => {
        // Handle API
        console.error('API error:', error);
      });
    }
  }

  iscourseDisabled(index: number): boolean {
    const currentFormGroup = this.formGroups[index];

    const selectedValue = currentFormGroup.get('discipline')?.value;
    if (selectedValue && selectedValue.includes('Any Specialization')) {
      const clearedValues = selectedValue.filter(value => value === 'Any Specialization');
      currentFormGroup.get('discipline')?.patchValue(clearedValues, { emitEvent: false });
    }

    if (currentFormGroup.get('level').value === 'Diploma' || currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG' || currentFormGroup.get('level').value === 'Phd') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }

  isdegreeDisabled(index: number): boolean {
    const currentFormGroup = this.formGroups[index];

    if (currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG' || currentFormGroup.get('level').value === 'Phd' || currentFormGroup.get('level').value === 'Diploma') {
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
        console.log(res.data,'res.data');

        this.companyOptions = res.data.map(item => ({
          company: item.company,
          companyId: item.companyId
        }));
        console.log(this.companyOptions, '0000');
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
       this.patchFormValues();
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

  saveviewForm() {
    const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);

    const isUpdate = !!this.addjobsForm.value.jobId;

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
    { }



    var obj = {
           "jobId": this.jobdata.jobId,
            "companyId": this.addjobsForm.value.company.companyId,
            "company": this.addjobsForm.value.company.company,
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
            "partnerLabel": "",
            "address": "",
            "companyLogo": "https://example.com/path/to/your/logo.png",
            "isActive": true,
            "jobCategoryId": "64cc8cbd112e2bb777bc92fb",
            "postedDate": formatDate(new Date(), 'dd-MM-yyyy', 'en-IN', 'IST'),
            "workType":"Jobs",
            "applyLink": this.addjobsForm.value.applyLink,
            "education": this.formGroups.map(formGroup => formGroup.value)
    }
    console.log(obj, 'post');
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
