import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { log } from 'console';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  selectedCompanyData: any;
  disabledGraduations: string[] = [];
  keySkills: string[] = [];
  newSkill: string[] = [];
  JobLocations: any = [];
  YearofPassing: string[] = [];
  jobdata: any;
  selectedRangeOption: any;
  selectedOption: string;
  jobType = "";
  JobType = [
    'Full Time',
    'Internship',
  ]
  skillSet: any;
  jobLocation: any;
  description: any;
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
  //degreeOptions : any = ['Any Degree / Graduation', 'X Std', 'XII Std', 'Diploma UG', 'Diploma PG'];

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
    defaultFontName: 'inter',
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
    ],
    toolbarHiddenButtons: [
      ['fontName'],
      ['insertImage'],
      ['strikeThrough'],
      ['subscript'],
      ['superscript'],
      ['fontSize'],
      ['textColor'],
      ['backgroundColor'],
      ['link'],
      ['unlink'],
      ['insertVideo'],
      ['insertHorizontalRule'],
      ['removeFormat'],
      ['customClasses'],
      ['toggleEditorMode']
    ],
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
  @ViewChild('jobsaved', { static: false }) jobsavedtemplate: TemplateRef<any>;
  approvalStatus: string;
  patchedValue: string;
  isFormApproved: boolean = false;
  companypatch: { company: any; companyId: any; };
  disabledSpecifications: any[];
  constructor(
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  )
  {
    const currentYear = new Date().getFullYear() - 1;
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.YearofPassing.push(i.toString());
    }
    // console.log("from edit", this.appconfig.getLocalStorage('openJobData'));
  }
  ngOnInit() {
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('openJobData'));
    console.log(localjobData, 'console localjobdata');
    this.jobdata = this.appconfig.jobData ? this.appconfig.jobData : localjobData;
    this.selectedRangeOption = this.jobdata.ctcType;
    //console.log(this.selectedRangeOption, ' selected testctc');
    this.companylist();
    this.getallEducation();
    this.getallCourses();
    this.getalldegrees();
    this.cityLocation();
    this.skilllist();
    this.formerrorInitialize();

    //     if (this.jobdata?.approveStatus === 'approved') {
    //       this.addjobsForm.disable();
    //       const educationGroupsArray = this.addjobsForm.get('educationGroups') as FormArray;
    // educationGroupsArray.controls.forEach(group => {
    //   group.disable();
    // });

    //       this.config.editable = false;
    //       this.isFormApproved = true;
    //     }
    //     else {
    //       console.log('Other value or addjobsForm is not initialized.');
    //     }

    this.patchFormValues();
  }

  patchFormValues() {
    // setTimeout(() => {
    // let company = this.companyOptions.find((item:any) => {item.companyId ===  this.jobdata.companyId});
    //console.log(company, 'company test');
    if (this.jobdata) {
      this.companypatch = { company: this.jobdata.company, companyId: this.jobdata.companyId }
      const ctcValues = this.jobdata.ctc.split(' - ');
      //const dataFromLocalStorage = JSON.parse(localStorage.getItem('openJobData'));
      console.log(this.companypatch, 'companypatch');
      // const selectedCompany = this.companyOptions.find((item: any) => item.companyId === this.jobdata.companyId);
      this.jobdata.company = this.jobdata.company;
      this.addjobsForm.patchValue({
        // company: { company: this.jobdata.company, companyId: this.jobdata.companyId },
        // company: this.jobdata.company,
        // company: companyName,
        // company: selectedCompany,
        //company: dataFromLocalStorage?.company || '',
        jobRole: this.jobdata.jobRole,
        jobTitle: this.jobdata.jobTitle,
        jobLocation: this.jobdata.jobLocation,
        jobType: this.jobdata.jobType,
        applyLink: this.jobdata.applyLink,
        yearofPassout: this.jobdata.yearofPassout,
        skillSet: this.jobdata.skillSet,
        lastDatetoApply: this.jobdata.lastDatetoApply,
        fixed: this.jobdata.ctc,
        startrange: this.jobdata.ctcType === 'range' ? ctcValues[0] : null,
        endrange: this.jobdata.ctcType === 'range' ? ctcValues[1] : null,
        description: this.jobdata.description.length > 0 ? this.jobdata.description[0].item : '',
        requirement: this.jobdata.requirement.length > 0 ? this.jobdata.requirement[0].item : '',
        additionalInformation: this.jobdata.additionalInformation ? this.jobdata.additionalInformation.note : '',
      });

      const educationGroupsArray = this.addjobsForm.get('educationGroups') as FormArray;
      while (educationGroupsArray.length !== 0) {
        educationGroupsArray.removeAt(0);
      }

      for (let i = 0; i < this.jobdata.education.length; i++) {
        const educationItem = this.jobdata.education[i];
        const educationGroup = this.createEducationGroup();
        educationGroup.patchValue({
          level: educationItem.level,
          specification: educationItem.specification,
          discipline: educationItem.discipline,
        });
        // Pass the educationItem and the index to patchEducation
        this.patchEducation(educationItem, i);
        educationGroupsArray.push(educationGroup);
      }
    }

    if (this.jobdata?.approveStatus === 'approved') {
      this.addjobsForm.disable();
      const educationGroupsArray = this.addjobsForm.get('educationGroups') as FormArray;
      educationGroupsArray.controls.forEach(group => {
        group.disable();
      });

      this.config.editable = false;
      this.isFormApproved = true;
    }
    else {
      console.log('Other value or addjobsForm is not initialized.');
    }

    // }, 1000);
  }

   //compareFn(c1: any, c2: any): boolean { return c1 && c2 ? c1.companyId === c2.companyId : c1 === c2; }
   // get getskillSet() {
   //     return this.addjobsForm.get([this.skillSet]) as FormArray;
   //   }
  onMyValueChange(event) {
    console.log(event, 'eventconsole');
  }

  patchEducation(education: any, index: number) {
    this.apiService.getDegreeList().subscribe((data: any) => {
      this.alldegree = data;
      // Initialize degreeOptions with the common options
      this.degreeOptions = ['Any Degree / Graduation', 'X Std', 'XII Std'];
      console.log(this.alldegree, 'degreeList');
      // Define separate arrays for UG, PG, and Phd degrees
      this.ugDegrees = [];
      this.pgDegrees = [];
      this.phdDegrees = [];

      this.alldegree.data.forEach((item: any) => {
        if (item.qualification === "UG") {
          this.ugDegrees = this.ugDegrees.concat(item.degree);
        } else if (item.qualification === "PG") {
          this.pgDegrees = this.pgDegrees.concat(item.degree);
        } else if (item.qualification === "Phd") {
          this.phdDegrees = this.phdDegrees.concat(item.degree);
        }
      });

      // Set degreeOptions based on the provided level
      if (education.level === 'UG') {
        this.degreeOptions = this.ugDegrees;
      } else if (education.level === 'PG') {
        this.degreeOptions = this.pgDegrees;
      } else if (education.level === 'Phd') {
        this.degreeOptions = this.phdDegrees;
      }
      else if (education.level === 'Diploma') {
        this.degreeOptions = ['Diploma UG', 'Diploma PG'];
      }



      const params = { "degree": education.specification };
      this.apiService.getDepartmentcourses(params).subscribe((response: any) => {
        this.allDisciplines = response.data;
        if (this.allDisciplines) {
          console.log(this.allDisciplines, 'specializationlist');
          this.listOfSpecializations = this.allDisciplines;
        }
      }, error => {
        console.error('API error:', error);
      });

      // console.log(this.ugDegrees, 'UG degrees');
      // console.log(this.pgDegrees, 'PG degrees');
      // console.log(this.phdDegrees, 'Phd degrees');
      // console.log(this.degreeOptions, 'Updated degreeOptions based on level');
    });
    this.updateDisabledGraduations();
  }

  formerrorInitialize() {
    this.addjobsForm = this.fb.group({
      ctcOption: ['', Validators.required],
      fixed: [''],
      startrange: [''],
      endrange: [''],
      // company: [null, [Validators.required]],
      jobRole: ['', [Validators.required]],
      jobLocation: ['', [Validators.required]],
      jobType: [[], [Validators.required]],
      jobTitle: ['', [Validators.required]],
      skillSet: ['', [Validators.required]],
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
      educationGroups: this.fb.array([this.createEducationGroup()])
    });
    this.formGroups = this.addjobsForm.get('educationGroups')['controls'];
  }

  get urlFormaterror() {
    return this.addjobsForm.controls;
  }
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
  get fixedctc() {
    return this.addjobsForm.get('fixedctc');
  }
  createEducationGroup(): FormGroup {
    return this.fb.group({
      level: ['', Validators.required],
      specification: [''],
      discipline: [[]],
    });
  }
  addEducationGroup(): void {
    const lastGroupIndex = this.formGroups.length - 1;
    const lastGroup = this.formGroups[lastGroupIndex];
    console.log(lastGroup.value, 'lastgrupvalue');
    if (lastGroup.value == '') {
      console.log('nullvalue presents');
    }
    if (lastGroup.valid) {
      this.formGroups.push(this.createEducationGroup());
      this.updateDisabledGraduations();
    }
    else {
      lastGroup.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields in the last added group.', 'Form Validation Error');
    }
  }

  removeEducationGroup(index: number): void {
    // if (this.formGroups.length > 1 && index > 0) {
    //   this.formGroups.splice(index, 1);
    //   this.addjobsForm.setControl('educationGroups', this.fb.array(this.formGroups));
    // }

    if (this.formGroups.length > 1 && index > 0) {
      const removedGroup = this.formGroups[index];
      const removedGroupGraduation = removedGroup.get('level').value;

      // Remove the graduation from the disabledGraduations array
      const graduationIndex = this.disabledGraduations.indexOf(removedGroupGraduation);
      if (graduationIndex !== -1) {
        this.disabledGraduations.splice(graduationIndex, 1);
      }

      this.formGroups.splice(index, 1);
      this.addjobsForm.setControl('educationGroups', this.fb.array(this.formGroups));
    }

  }

  updateDisabledGraduations(): void {
    this.disabledGraduations = [];
    for (const group of this.formGroups) {
      const graduationValue = group.get('level').value;
      if (graduationValue && !this.disabledGraduations.includes(graduationValue)) {
        this.disabledGraduations.push(graduationValue);
      }
    }
  }

  isGraduationDisabled(graduationValue: string, groupIndex: number): boolean {
    // Check if the graduationValue is in the disabledGraduations array
    // Apply the disabled condition only for 'SSLC', 'HSC', and 'Any Graduation'
    return ['SSLC', 'HSC', 'Any Graduation']?.includes(graduationValue) && this.disabledGraduations?.includes(graduationValue);
  }

  updateDisabledSpecifications(currentIndex: number): void {
    this.disabledSpecifications = [];
    for (let i = 0; i < this.formGroups.length; i++) {
      if (i !== currentIndex) {
        const specificationValue = this.formGroups[i].get('specification').value;
        // Check if the specification value is not null and is not already in the disabledSpecifications array
        if (specificationValue !== null && !this.disabledSpecifications.includes(specificationValue)) {
          this.disabledSpecifications.push(specificationValue);
        }
      }
    }
  }

  // isOptionDisabled(option: string, currentIndex: number): boolean {
  //   // Update the disabledSpecifications array for the current index
  //   this.updateDisabledSpecifications(currentIndex);

  //   // Check if the option is in the disabledSpecifications array
  //   return this.disabledSpecifications?.includes(option);
  // }

  isOptionDisabled(option: string, currentIndex: number): boolean {
    this.updateDisabledSpecifications(currentIndex);
    let ugLevelCount = 0;
    let ugdegreeCount = 0;
    let pgdegreeCount = 0;
    let pgLevelCount = 0;
    let phdLevelCount = 0;
    let phddegreeCount = 0;

    const hasUGLevelAndNonNullValues = this.formGroups.some((group, i) => {
      if (group.value.level === 'UG' && i !== currentIndex) {
        ugLevelCount++;
      }
      return ugLevelCount > 0;
    });
    const hasPGDegreeAndNonNullValues = this.formGroups.some((group, i) => {
      if (group.value.level === 'PG' && group.value.specification === 'Any Degree' && i !== currentIndex) {
        pgdegreeCount++;
      }
      return pgdegreeCount > 0;
    });
    const hasPHDDegreeAndNonNullValues = this.formGroups.some((group, i) => {
      if (group.value.level === 'Phd' && group.value.specification === 'Any Degree' && i !== currentIndex) {
        phddegreeCount++;
      }
      return phddegreeCount > 0;
    });
    const hasUGDegreeAndNonNullValues = this.formGroups.some((group, i) => {
      if (group.value.level === 'UG' && group.value.specification === 'Any Degree' && i !== currentIndex) {
        ugdegreeCount++;
      }
      return ugdegreeCount > 0;
    });
    const hasPGLevelAndNonNullValues = this.formGroups.some((group, i) => {
      if (group.value.level === 'PG' && i !== currentIndex) {
        pgLevelCount++;
      }
      return pgLevelCount > 0;
    });
    const hasPHDLevelAndNonNullValues = this.formGroups.some((group, i) => {
      if (group.value.level === 'Phd' && i !== currentIndex) {
        phdLevelCount++;
      }
      return phdLevelCount > 0;
    });
    const currentFormGroup = this.formGroups[currentIndex];
    const currentGroupValue = currentFormGroup.get('level').value;
	  return (option !== 'Any Degree' && this.disabledSpecifications?.includes(option)) || (option == "Any Degree" && hasUGLevelAndNonNullValues && currentGroupValue === 'UG') || (option == "Any Degree" && hasPGLevelAndNonNullValues && currentGroupValue === 'PG') || (option == "Any Degree" && hasPHDLevelAndNonNullValues && currentGroupValue === 'Phd') || (option !== "Any Degree" && hasUGLevelAndNonNullValues && hasUGDegreeAndNonNullValues && currentGroupValue === 'UG') || (option !== "Any Degree" && hasPGLevelAndNonNullValues && hasPGDegreeAndNonNullValues && currentGroupValue === 'PG') || (option !== "Any Degree" && hasPHDLevelAndNonNullValues && hasPHDDegreeAndNonNullValues && currentGroupValue === 'Phd');

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

  getalldegrees() {
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

  degreeOptionChange(selectedGraduation: string, index: number) {
    const currentFormGroup = this.formGroups[index];
    console.log(currentFormGroup.get('level').value);
    if (currentFormGroup.get('level').value === 'SSLC' || currentFormGroup.get('level').value === 'HSC' || currentFormGroup.get('level').value === 'Any Graduation') {
      this.degreeOptions = ['Any Degree / Graduation', 'X Std', 'XII Std'];
    }
    if (currentFormGroup.get('level').value === 'Diploma') {
      this.degreeOptions = ['Diploma UG', 'Diploma PG'];
    }
    if (currentFormGroup.get('level').value === 'UG') {
      this.degreeOptions = this.ugDegrees;
    }

    if (currentFormGroup.get('level').value === 'PG') {
      this.degreeOptions = this.pgDegrees;
    }

    if (currentFormGroup.get('level').value === 'Phd') {
      this.degreeOptions = this.phdDegrees;
    }
  }

  disciplineOptionChange(selectedCourse: string, index: number) {
    const currentFormGroup = this.formGroups[index];
    console.log(currentFormGroup.get('specification').value);
    if (currentFormGroup.get('specification').value !== null) {
      const params = { "degree": currentFormGroup.get('specification').value };
      this.apiService.getDepartmentcourses(params).subscribe((response: any) => {
        this.allDisciplines = response.data;
        if (this.allDisciplines) {
          console.log(this.allDisciplines, 'specializationlist');
          this.listOfSpecializations = this.allDisciplines;
        }
      }, error => {
        // Handle API error here
        console.error('API error:', error);
      });
    }
    else {
      this.listOfSpecializations = [];
    }
  }

  onGraduationChange(selectedGraduation: string, index: number) {
    this.updateDisabledGraduations();
    const currentFormGroup = this.formGroups[index];
    // Clear values in the current form group
    currentFormGroup.get('specification').setValue(null);
    //currentFormGroup.get('course').setValue(null);
    currentFormGroup.get('discipline').setValue(null);
    if (selectedGraduation === null) {
      return;
    }

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
      // currentFormGroup.get('specification').setValue(
      //   selectedGraduation === 'Diploma'
      //     ? ['Diploma UG', 'Diploma PG']
      //     : ''
      // );
    }

    if (selectedGraduation === 'Any Graduation' || selectedGraduation === 'SSLC' || selectedGraduation === 'HSC') {
      currentFormGroup.get('discipline').clearValidators();
      currentFormGroup.get('discipline').updateValueAndValidity();
    }
    else {
      currentFormGroup.get('discipline').setValidators(Validators.required);
      currentFormGroup.get('discipline').updateValueAndValidity();
    }
    if (selectedGraduation === 'UG' || selectedGraduation === 'PG' || selectedGraduation === 'Diploma') {
      currentFormGroup.get('specification').setValidators(Validators.required);
      currentFormGroup.get('specification').updateValueAndValidity();
    }
    else {
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
    }
  }

  onDegreeChange(selectedCourse: string, index: number) {
    const currentFormGroup = this.formGroups[index];
    currentFormGroup.get('discipline').setValue(null);
     if (selectedCourse == 'Any Degree') {
      this.listOfSpecializations = ['Any Specialization'];
      currentFormGroup.get('discipline').setValue(['Any Specialization']);
    }
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

    if (currentFormGroup.get('level').value != null && currentFormGroup.get('specification').value == null) {
      //currentFormGroup.get('specification').setValue(null);
      console.log('validation set');
      currentFormGroup.get('specification').setValidators(Validators.required);
      currentFormGroup.get('specification').updateValueAndValidity();
      currentFormGroup.get('discipline').setValidators(Validators.required);
      currentFormGroup.get('discipline').updateValueAndValidity();
    }
  }

  onCourseChange(selectedCourse: string, index: number) {
    const currentFormGroup = this.formGroups[index];
    // if(currentFormGroup.get('discipline').value == null){
    //   // currentFormGroup.get('level').setValue(null);
    // }
    const levelArray = ['SSLC', 'HSC', 'Any Graduation'];

    if (
      currentFormGroup.get('level').value !== null &&
      currentFormGroup.get('specification').value !== null &&
      currentFormGroup.get('discipline').value?.length === 0 &&
      !levelArray.includes(currentFormGroup.get('level').value)
    ) {
      currentFormGroup.get('level').setValue(null);
      console.log('empty course value');
    }
  }

  iscourseDisabled(index: number): boolean {
     const currentFormGroup = this.formGroups[index];
    // const selectedValue = currentFormGroup.get('discipline')?.value;
    // if (selectedValue && selectedValue.includes('Any Specialization')) {
    //   const clearedValues = selectedValue.filter(value => value === 'Any Specialization');
    //   currentFormGroup.get('discipline')?.patchValue(clearedValues, { emitEvent: false });
    // }

    // if (currentFormGroup.get('level').value === 'Diploma' || currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG' || currentFormGroup.get('level').value === 'Phd') {
    //   return false; // Do not apply disabled
    // } else {
    //   return true; // Apply disabled
    // }
    if (currentFormGroup.get('specification').value === 'X Std' || currentFormGroup.get('specification').value === 'Any Degree / Graduation' || currentFormGroup.get('specification').value === 'XII Std' || currentFormGroup.get('specification').value === 'Any Degree' || currentFormGroup.get('specification').value == null) {
      return true; // Do not apply disabled
    }
    else {
      return false; // Apply disabled
    }

  }

  isdegreeDisabled(index: number): boolean {
    const currentFormGroup = this.formGroups[index];

    if (currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG' || currentFormGroup.get('level').value === 'Phd' || currentFormGroup.get('level').value === 'Diploma') {
      return false; // Do not apply disabled
    }
    else {
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
    // Make an API request to search for skills based on the typed text.
    const data: any = {
      searchText: searchText
    };
    //console.log('Search text:', searchText);
    this.apiService.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.JobLocations = res.data.map((item) => item.city);
        //console.log(this.JobLocations, 'locate');
      }
    });
  }

  companylist() {
    const data: any = {};
    this.apiService.masterCompany().subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          console.log(res.data, 'res.data');

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
      fixedControl.setValue(this.jobdata.ctc);
      startrangeControl.clearValidators();
      endrangeControl.clearValidators();
      startrangeControl.setValue(null);
      endrangeControl.setValue(null);
    }
    else {
      startrangeControl.setValidators(Validators.required);
      endrangeControl.setValidators(Validators.required);
      // startrangeControl.setValue(this.startrange);
      // endrangeControl.setValue(this.endrange);
      fixedControl.clearValidators();
      fixedControl.setValue(null);
      const ctcValues = this.jobdata.ctc.split(' - ');
      startrangeControl.patchValue(ctcValues[0]);
      endrangeControl.patchValue(ctcValues[1]);
      // startrangeControl.patchValue(this.jobdata.startrange);
      // endrangeControl.patchValue(this.jobdata.endrange);
      // const fixedControl = this.addjobsForm.get('fixed');
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
    //Utc to ISO
     const inputDate = new Date(this.addjobsForm.value?.lastDatetoApply);
    // Set the hours, minutes, and seconds to 23:59:59
    inputDate.setHours(23, 59, 59);
    // Convert to UTC and get the ISO string
    const ISTDateString = inputDate.toISOString();
    if (this.addjobsForm.valid && areEducationGroupsValid && !this.isFormApproved) {
      var obj = {
        "jobId": this.jobdata.jobId,
        "companyId": this.companypatch.companyId,
        "company": this.companypatch.company,
        "jobRole": this.addjobsForm.value.jobRole,
        "jobTitle": this.addjobsForm.value.jobTitle,
        "jobLocation": this.addjobsForm.value.jobLocation,
        "jobType": this.addjobsForm.value.jobType,
        "yearofPassout": this.addjobsForm.value.yearofPassout,
        "skillSet": this.addjobsForm.value.skillSet,
        "ctcType": this.addjobsForm.value.ctcOption,
        "ctc": isFixed ? this.addjobsForm.value?.fixed : `${startRange} - ${endRange}`,
        //"lastDatetoApply": this.addjobsForm.value.lastDatetoApply,
        "lastDatetoApply": ISTDateString,
        "additionalInformation": additionalInformation,
        "description": descriptionItems,
        "requirement": requirementItems,
        "partnerLabel": "",
        "address": "",
        "companyLogo": "https://example.com/path/to/your/logo.png",
        "isActive": true,
        "jobCategoryId": "64cc8cbd112e2bb777bc92fb",
        "postedDate": formatDate(new Date(), 'dd-MM-yyyy', 'en-IN', 'IST'),
        "workType": "Jobs",
        "applyLink": this.addjobsForm.value.applyLink,
        "education": this.formGroups.map(formGroup => formGroup.value)
      }
      console.log(obj, 'post');
      this.apiService.UploadPostJob(obj).subscribe((data: any) => {

        // console.log(data)
        if (data.success === false) {
          this.toastr.warning(data.message);
        }
        else {
          this.toastr.success(data.message);
          this.toastr.success(data.message);
          const popup = this.dialog.open(this.jobsavedtemplate, {
            width: '400px',
            height: '240px',
            disableClose: true,
            hasBackdrop: true,
          });
          //window.location.reload();
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    }
    else {
      console.log("Form Validation Failed", this.addjobsForm.errors);
      this.addjobsForm.markAllAsTouched();
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }
  clearviewForm() {
    this.dialog.closeAll();
    this.appconfig.routeNavigation('/auth/partner/viewopenjobs');
  }
  closeThankYou() {
    this.dialog.closeAll();
    this.appconfig.routeNavigation('/auth/partner/viewopenjobs');
    location.reload();
  }
  getMinDate(): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  }

}
