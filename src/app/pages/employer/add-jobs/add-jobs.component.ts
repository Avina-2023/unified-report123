import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss'],
})
export class AddJobsComponent implements OnInit {
  addjobsForm: FormGroup;
  keySkills: string[] = [];
  newSkill: string[] = [];
  companyOptions: string[] = [];
  selectedCompany: string[] = [];
  companyId: string[] = [];
  selectedRangeOption: string = 'fixed';
  industryTypes = [
    'Full time',
    'Internship',
    'All',
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
  jobType = "";
  JobType = [
     'Full Time',
     'Internship',
  ]
  YearofPassing: string[] = [];
  skillSet = [];
 fixed: any;
  range: any;
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
  level: string;
  degreeOptions: any[];
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

  @ViewChild('jobsaved', { static: false }) jobsavedtemplate: TemplateRef<any>;
  ugDegrees: any[];
  pgDegrees: any[];
  phdDegrees: any[];
  alldegree: any;
  allDisciplines: any;
  startrange: any;
  endrange: any;
  selectedOption: string;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    //private ApiService: ApiService,
    private appconfig: AppConfigService,
    private toastr: ToastrService,
    private dialog: MatDialog) {

    const currentYear = new Date().getFullYear()-1;
    for (let i = currentYear ; i >= currentYear - 10; i--) {
      this.YearofPassing.push(i.toString());
    }

  }
  ngOnInit(): void {
    this.getallEducation();
    this.getallCourses();
    this.getalldegree();
    // this.getRoute();
    this.formerrorInitialize();
    this.skilllist();
    this.companylist();
    this.cityLocation();
    // this.getIndustryType();
    // this.addjobsForm = this.formBuilder.group({
    // });
  }


cityLocation() {
    const data: any = {};
    this.apiService.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.JobLocations = res.data.map(item => item.city);
        //console.log(this.JobLocations, 'locations');
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

//   companylist() {
//      const data: any = {};
//     this.apiService.masterCompany().subscribe(
//   (res: any) => {
//     console.log(res);
//     if (res.success) {
//       this.companyOptions = res.data.map(item => item.company);
//       //this.companyOptions = res.data;
//       console.log(this.companyOptions, '');
//     }
//   },
//   (error) => {
//     console.error('API request error:', error);
//   }
// );
//   }

//   companylist() {
//   const data: any = {};
//   this.apiService.masterCompany().subscribe(
//     (res: any) => {
//       console.log(res);
//       if (res.success) {
//         this.companyOptions = res.data.map(item => ({
//           company: item.company,
//           companyId: item.companyId
//         }));
//         console.log(this.companyOptions, '');
//       }
//     },
//     (error) => {
//       console.error('API request error:', error);
//     }
//   );
// }


companylist() {
  const data: any = {};
  this.apiService.masterCompany().subscribe(
    (res: any) => {
      console.log(res);
      if (res.success) {
        this.companyOptions = res.data.map(item => ({
          company: item.company,
          companyId: item.companyId
        }));
        console.log(this.companyOptions, '');
      }
    },
    (error) => {
      console.error('API request error:', error);
    }
  );
}

formatCompany(selectedCompany: any): void {
  if (selectedCompany) {
    const payload = {
      "company": selectedCompany.company,
      "companyId": selectedCompany.companyId
    };
    console.log(payload);
  }
  }

  formerrorInitialize() {
     //const emailregex: RegExp =
      // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.addjobsForm = this.fb.group({
      ctcOption: ['', Validators.required],
      fixed:[''],
      startrange:[''],
      endrange: [''],
      company: ['', [Validators.required]],
      jobRole: ['', [Validators.required]],
      jobLocation: [[], [Validators.required]],
      // jobLocation: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      level: ['', [Validators.required]],
      specification: ['', [Validators.required]],
      discipline: ['', [Validators.required]],
      skillSet: [[], [Validators.required]],
      lastDatetoApply: [[], [Validators.required]],
      yearofPassout: [[], [Validators.required]],
      applyLink: [
        '',
        [
          Validators.required,
         // Validators.pattern(/^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(\/\S*)?$/i)
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
      description:  ['', [Validators.required]],
      additionalInformation: [''],
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
  get specification() {
    return this.addjobsForm.get('specification');
  }
  get discipline() {
    return this.addjobsForm.get('discipline');
  }
  get fixedctc() {
    return this.addjobsForm.get('fixedctc');
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
   get lastDatetoApply() {
    return this.addjobsForm.get('lastDatetoApply');
  }
  get description() {
    return this.addjobsForm.get('description');
  }
  get requirement() {
    return this.addjobsForm.get('requirement');
  }

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
    // if (this.selectedOption === 'Internships') {
    //   fixedControl.clearValidators();
    //   fixedControl.setValue(null);
    //   fixedControl.updateValueAndValidity();

    //   startrangeControl.clearValidators();
    //   startrangeControl.setValue(null);
    //   startrangeControl.updateValueAndValidity();

    //   endrangeControl.clearValidators();
    //   endrangeControl.setValue(null);
    //   endrangeControl.updateValueAndValidity();

    //   ctcOptionControl.clearValidators();
    //   ctcOptionControl.setValue(null);
    //   ctcOptionControl.updateValueAndValidity();
    // }
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
  closeThankYou() {
      this.dialog.closeAll();
      this.appconfig.routeNavigation('/auth/partner/viewopenjobs');
}
  saveForm() {

    const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);

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
  // const additionalInformation =
  //   {
  //     note: htmladditionalinformation
  //   }
  //  ;

  const additionalInformation = htmladditionalinformation ? { note: htmladditionalinformation } : {};

   // if (this.addjobsForm.valid && areEducationGroupsValid)
    {
      // Perform form submission actions{
    var obj = {
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
            //"email":this.existsEmail==""?this.registerForm.value.email:this.existsEmail,
            //"existsUser":this.existsUser
    }
    console.log(obj, 'post');

      this.apiService.UploadPostJob(obj).subscribe((data: any) => {
        // console.log(data)
        if (data.success == false) {
        this.toastr.warning(data.message);

        } else {
        this.toastr.success(data.message);
        const popup = this.dialog.open(this.jobsavedtemplate, {
        width: '400px',
        height: '240px',
        disableClose: true,
        hasBackdrop: true,
      });
          // this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.PARTNERLIST);
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    }
    //  else {
    //    this.addjobsForm.markAllAsTouched();
    //    this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
    //    this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    // }
  }
  clearForm() {
    this.addjobsForm.reset();
  }

}
