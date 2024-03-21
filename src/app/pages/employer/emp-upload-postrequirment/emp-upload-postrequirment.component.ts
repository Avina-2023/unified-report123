/*import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emp-upload-postrequirment',
  templateUrl: './emp-upload-postrequirment.component.html',
  styleUrls: ['./emp-upload-postrequirment.component.scss'],
})
export class EmpUploadPostrequirmentComponent implements OnInit {
  file: any;
  fileName: '';
  userdetails: any;
  IsToFeildEnable = true;

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getEmployerDetails();
  }

  getEmployerDetails() {
    var obj = {
      userId: this.apiService.encryptnew(
        localStorage.getItem('email'),
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.getEmployerDetails(obj).subscribe((result: any) => {
      if (result.success) {
        this.userdetails = result;
      } else {
        console.log('failed to load employer details');
      }
    });
  }

  downloadTemplate() {
    const excel = `assets/templates/joblist upload.csv`;
    window.open(excel, '_blank');
  }

  onFileSelected(event) {

    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.IsToFeildEnable = false;
    }
  }

  saveUploadModel() {
    if (this.file.type == 'text/csv') {
      console.log('file type is csv');
      var UsercompanyId = this.userdetails?.data?.userId;
      var UsercompanyName = this.userdetails?.data?.company;
      var UsercompanyLogo = this.userdetails?.data?.companyImgURL;
      var UsercompanyEmail = this.userdetails?.data?.email;
      var UserjobList = this.file;
      const fd = new FormData();
      fd.append('companyId', UsercompanyId);
      fd.append('companyName', UsercompanyName);
      fd.append('companyLogo', UsercompanyLogo);
      fd.append('companyEmail', UsercompanyEmail);
      fd.append('jobList', UserjobList);
      this.apiService.uploadExcelFile(fd).subscribe((data: any) => {
        if(data.success == false){
          console.log('FAILURE');
          this.toastr.warning(data.message);
        }else{
          console.log('success');
        this.toastr.success(data.message);
        this.cancleUpload()
      }
      });
    } else {
      this.toastr.warning('Please upload the correct CSV file');
    }
  }
  trimFilename(fileName) {
    if (fileName) {
      let replaceFilename = '';
      replaceFilename = fileName.length > 25 ? fileName.slice(0, 25) + '...' : fileName;
      return replaceFilename;
    }
    return '';
  }
  cancleUpload() {
    this.IsToFeildEnable = true;
    this.fileName = "";
    this.file = "";
  }
}
*/
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { formatDate } from '@angular/common';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-emp-upload-postrequirment',
  templateUrl: './emp-upload-postrequirment.component.html',
  styleUrls: ['./emp-upload-postrequirment.component.scss'],
})

export class EmpUploadPostrequirmentComponent implements OnInit {
  @ViewChild('jobsaved', { static: false }) jobsavedtemplate: TemplateRef<any>;
  file: any;
  fileName: '';
  userdetails: any;
  IsToFeildEnable = true;
  selectedOption: string = 'Jobs';
  selectedRangeOption: string = 'fixed';
  jobForm: FormGroup;
  formGroups: FormGroup[] = [];
  submitted: boolean = false;

  //Multiselect Dropdown
  listOfOption: Array<{ label: string; value: string }> = [];
  locations: any = [];
  size: NzSelectSizeType = 'default';
  multipleValue = [];
  yearofPassingValue = [];
  multipleSpecialization = [];
  companyOptions: string[] = [];
  selectedCompany: string[] = [];
  formTouched: boolean = false;
  //Rich Text Editor
  htmlContent = '';
  htmlContent_1 = '';


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '100px',
    maxHeight: '100px',
   // placeholder: 'Type here...',
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





  //   config: AngularEditorConfig = {
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
  //     ['fontSize']
  //   ],
  // };


  fixed: any;
  range: any;
  yearofPassout: string[];
  specification: string;
  level: string;
  degreeOptions: any[];
  multipleLocation: [];
  courseOptions = ['Any Course', 'Pick From the List'];
  course: string;
  listOfSpecializations: any;
  discipline: string;
  diplomaCourses: string[];
  educations: any;
  allCourses: any;
  pgCourses: any;
  ugCourses: any;
  ugDegree: any;
  pgDegree: any;
  startrange: any;
  endrange: any;
  stipend: any;
  alldegree: any;
  ugDegrees: any[];
  pgDegrees: any[];
  phdDegrees: any;
  degreeValue: any;
  allDisciplines: any;
  companyDataResult: any;
  companyData: string;
  // disabledGraduations: any;
  // Inside your component class
  disabledGraduations: string[] = [];
  disabledSpecifications: string[] = [];
  showCompanySelect: boolean = false;
  roles: any;
  orgdetails: any;
  roleCode: any;
  username:any;
  companyinfoDetails: any;


  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private appconfig: AppConfigService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {this.selectedOption = 'Jobs';}

  ngOnInit(): void {

    this.getallEducation();
    this.getallCourses();
    this.getalldegree();
    this.skilllist();
    this.companylist();
    // this.onCompanyChange();
    this.cityLocation();
    //this.locations = ['Chennai', 'Bangalore', 'Mumbai'];
    this.yearofPassout = [];
    const currentYear = new Date().getFullYear() + 4;
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.yearofPassout.push(i.toString());
    }
    this.jobForm = this.fb.group({
      jobRole: ['', Validators.required],
      // company: ['', Validators.required],
      company: ['',this.roleCode ==='SADM'?Validators.required : null],
      jobTitle: ['', Validators.required],
      jobLocation: [this.multipleLocation, Validators.required],
      jobType: ['', Validators.required],
      description: ['', Validators.required],
      // requirement: ['', Validators.required],
      requirement: [''],
      ctcOption: ['', Validators.required],
      fixed: [''],
      startrange: [''],
      endrange: [''],
      stipend: [''],
      lastDatetoApply: ['', Validators.required],
      skillSet: [this.multipleValue, Validators.required],
      yearofPassout: [this.yearofPassingValue, Validators.required],
      educationGroups: this.fb.array([this.createEducationGroup()])
    });
    this.formGroups = this.jobForm.get('educationGroups')['controls'];

    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;

  if (this.roleCode !== 'SADM') {
      this.companyDetails();
    }
  }

  companyDetails() {
    // Retrieve the company details from localstorage
    this.companyData = localStorage.getItem('companyDetails');
    this.companyDataResult = JSON.parse(this.companyData);
    //console.log(this.companyDataResult, 'companydetails');
  }

  // validateCtc(control) {
  //   const value = control.value;
  //   if (value === -1 || value < 0) {
  //     return { invalidCtc: true };
  //   }
  //   return null;
  // }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
      this.updateDisabledGraduations();
    } else {
      lastGroup.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields in the last added group.', 'Form Validation Error');
    }
  }

  removeEducationGroup(index: number): void {
    if (this.formGroups.length > 1 && index > 0) {
      const removedGroup = this.formGroups[index];
      const removedGroupGraduation = removedGroup.get('level').value;

      // Remove the graduation from the disabledGraduations array
      const graduationIndex = this.disabledGraduations.indexOf(removedGroupGraduation);
      if (graduationIndex !== -1) {
        this.disabledGraduations.splice(graduationIndex, 1);
      }

      this.formGroups.splice(index, 1);
      this.jobForm.setControl('educationGroups', this.fb.array(this.formGroups));
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
    console.log(currentFormGroup.get('level').value, 'Current Level Value');
    //return this.disabledSpecifications?.includes(option);
    //return (option !== 'Any Degree' && this.disabledSpecifications?.includes(option)) || (option == "Any Degree" && hasUGLevelAndNonNullValues) || (option == "Any Degree" && hasPGLevelAndNonNullValues);
    return (option !== 'Any Degree' && this.disabledSpecifications?.includes(option)) || (option == "Any Degree" && hasUGLevelAndNonNullValues && currentGroupValue === 'UG') || (option == "Any Degree" && hasPGLevelAndNonNullValues && currentGroupValue === 'PG') || (option == "Any Degree" && hasPHDLevelAndNonNullValues && currentGroupValue === 'Phd') || (option !== "Any Degree" && hasUGLevelAndNonNullValues && hasUGDegreeAndNonNullValues && currentGroupValue === 'UG') || (option !== "Any Degree" && hasPGLevelAndNonNullValues && hasPGDegreeAndNonNullValues && currentGroupValue === 'PG') || (option !== "Any Degree" && hasPHDLevelAndNonNullValues && hasPHDDegreeAndNonNullValues && currentGroupValue === 'Phd');

    /*if (option !== 'Any Degree' && this.disabledSpecifications?.includes(option)) {
      return true;
    } else if (option === 'Any Degree' && hasUGLevelAndNonNullValues && currentGroupValue === 'UG') {
      return true;
    } else if (option === 'Any Degree' && hasPGLevelAndNonNullValues && currentGroupValue === 'PG') {
      return true;
    } else if (option === 'Any Degree' && hasPHDLevelAndNonNullValues && currentGroupValue === 'Phd') {
      return true;
    } else {
      return false;
    }*/
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
      //console.log(this.ugDegree, 'ugdegreeold');
    })
  }


  skilllist() {
    const data: any = {};
    this.apiService.getSkill(data).subscribe((res: any) => {
      if (res.success) {
        this.listOfOption = res.data.map(item => item.skillName);
        //console.log(res, 'skilllist');
      }
    });
  }


  cityLocation() {
    const data: any = {};
    this.apiService.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.locations = res.data.map(item => item.city);
        //console.log(this.locations, 'locations');
      }
    });
  }


  handleSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value;
    // Make an API request to search for skills based on the typed text.
    const data: any = {
      searchText: searchText
    };
    //console.log('Search text:', searchText);
    this.apiService.getSkill(data).subscribe((res: any) => {
      if (res.success) {
        this.listOfOption = res.data.map((item) => item.skillName);
        //console.log(res, 'searchSkills');
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
        this.locations = res.data.map((item) => item.city);
        //console.log(this.locations, 'locate');
      }
    });
  }

  getalldegree() {
    this.apiService.getDegreeList().subscribe((data: any) => {
      this.alldegree = data;
      //console.log(this.alldegree, 'degreeList');
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

      // Now, this.ugDegrees will contain UG degrees, and this.pgDegrees will contain PG degrees
      //console.log(this.ugDegrees, 'UG degrees');
      // console.log(this.pgDegrees, 'PG degrees');
      // console.log(this.phdDegrees, 'Phd degrees');
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
    console.log(currentFormGroup);
    // Clear values in the current form group
    currentFormGroup.get('specification').setValue(null);
    //currentFormGroup.get('course').setValue(null);
    currentFormGroup.get('discipline').setValue(null);

    if (selectedGraduation === null) {
      console.log('value empty');
      this.updateDisabledGraduations();
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
    } else {
      currentFormGroup.get('discipline').setValidators(Validators.required);
      currentFormGroup.get('discipline').updateValueAndValidity();
    }


    if (selectedGraduation === 'UG' || selectedGraduation === 'PG' || selectedGraduation === 'Diploma') {
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
    }

    if (currentFormGroup.get('level').value === 'UG') {
      currentFormGroup.get('discipline').setValue(null);
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
        // Handle API error here
        console.error('API error:', error);
      });
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
    if (currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG' || currentFormGroup.get('level').value === 'Diploma' || currentFormGroup.get('level').value === 'Phd') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }

  ctcChange() {
    const fixedControl = this.jobForm.get('fixed');
    const startrangeControl = this.jobForm.get('startrange');
    const endrangeControl = this.jobForm.get('endrange');
    const stipendControl = this.jobForm.get('stipend');
    const ctcOptionControl = this.jobForm.get('ctcOption');
    if (this.selectedOption === 'Jobs') {
      stipendControl.clearValidators();
      stipendControl.setValue(null);
      stipendControl.updateValueAndValidity();
      ctcOptionControl.setValidators(Validators.required);
      ctcOptionControl.updateValueAndValidity();
      this.selectedRangeOption = 'fixed';
    }
    if (this.selectedOption === 'Internships') {
      stipendControl.setValidators(Validators.required);
      stipendControl.updateValueAndValidity();
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
    this.jobForm.reset();
  }


  onCtcOptionChange() {
    const fixedControl = this.jobForm.get('fixed');
    const startrangeControl = this.jobForm.get('startrange');
    const endrangeControl = this.jobForm.get('endrange');
    const stipendControl = this.jobForm.get('stipend');
    if (this.selectedRangeOption === 'fixed') {
      fixedControl.setValidators(Validators.required);
      fixedControl.setValue(this.fixed); // Set the value of the selected control
      startrangeControl.clearValidators();
      endrangeControl.clearValidators();
      startrangeControl.setValue(null); // Set the opposite control's value to null
      endrangeControl.setValue(null);
    } else if (this.selectedRangeOption === 'range') {
      startrangeControl.setValidators(Validators.required);
      endrangeControl.setValidators(Validators.required);
      startrangeControl.setValue(this.startrange); // Set the value of the selected control
      endrangeControl.setValue(this.endrange);
      fixedControl.clearValidators();
      fixedControl.setValue(null); // Set the opposite control's value to null
    }

    fixedControl.updateValueAndValidity();
    startrangeControl.updateValueAndValidity();
    endrangeControl.updateValueAndValidity();
  }

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
  onCompanyChange() {
   if (this.selectedCompany) {
      const obj = {
        userId: this.apiService.encryptnew(this.selectedCompany,environment.cryptoEncryptionKey),
        // companyId: this.selectedCompany,

        // userId: this.apiService.encryptnew(localStorage.getItem('email'),
        // environment.cryptoEncryptionKey),
        // companyId: this.selectedCompany,

        // "companyId": this.companyDataResult?.userId,
        // "companyEmail": this.companyDataResult?.email,
        // "companyLogo": this.companyDataResult?.companyImgURL,
        // "company": this.companyDataResult?.company,
      };
      console.log('API Request Payload:', obj);
      this.apiService.getEmployerDetails(obj).subscribe(
        (result: any) => {
        this.companyDataResult = result.data;

        console.log('API Response:', result);
        },
        (error) => {
          console.error('Error fetching employer details:', error);
        }
      );
    }
  }

  onSubmit() {
    const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);
    const isFixed = this.jobForm.value.fixed;
    const startRange = this.jobForm.value.startrange;
    const endRange = this.jobForm.value.endrange;
    const htmlDescription = this.jobForm.value?.description;
    const htmljobRequirements = this.jobForm.value?.requirement;
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


    if (this.jobForm.valid && areEducationGroupsValid) {
      // const inputDate = new Date(this.jobForm.value?.lastDatetoApply);
      // const ISTOffset = 330; // IST is UTC+5:30
      // const ISTDate = new Date(inputDate.getTime() + (ISTOffset * 60000));
      // const ISTDateString = ISTDate.toISOString();
      // const inputDate = new Date(this.jobForm.value?.lastDatetoApply);
      // Set time zone offset to zero (UTC)
      //inputDate.setMinutes(inputDate.getMinutes() - inputDate.getTimezoneOffset());
      // Set the UTC hours, minutes, and seconds to 23:59:59
      //inputDate.setUTCHours(23, 59, 59);
      // Convert to UTC and get the ISO string
      //const ISTDateString = inputDate.toISOString();

      const inputDate = new Date(this.jobForm.value?.lastDatetoApply);
      inputDate.setHours(23, 59, 59);
      const ISTDateString = inputDate.toISOString();

      var obj = {
        "companyId": this.companyDataResult?.userId,
        "companyEmail": this.companyDataResult?.email,
        "companyLogo": this.companyDataResult?.companyImgURL,
        "company": this.companyDataResult?.company,
        // "about": this.companyDataResult?.about ? this.companyDataResult?.about : '',
        "division": this.companyDataResult?.industryType,
        "jobFamily": this.companyDataResult?.industryType,
        "about": this.companyDataResult?.description,
        "address": "",
        //"postedDate": formatDate(new Date(), 'dd-MM-yyyy', 'en-IN', 'IST'),
       // "postedDate": formatDate(new Date(), 'MM-dd-yyyy', 'en-IN', 'IST'),
        "jobTitle": this.jobForm.value?.jobTitle,
        "jobRole": this.jobForm.value?.jobRole,
        "jobLocation": this.jobForm.value?.jobLocation,
        "jobType": this.jobForm.value?.jobType,
        "yearofPassout": this.jobForm.value?.yearofPassout,
        "skillSet": this.jobForm.value?.skillSet,
        "lastDatetoApply": ISTDateString,
        // "lastDatetoApply": this.jobForm.value.lastDatetoApply,
        "eligibilityCriteria": [],
        "additionalInformation": {},
        "partnerLabel": "Skill Exchange Partner",
        "jobCategoryId": "64cc8ce4112e2bb777bcbef5",
        "education": this.formGroups.map(formGroup => formGroup.value),
        "description": descriptionItems,
        "requirement": requirementItems,
        "driveDate": "",
        "isActive": true
      };

      if (this.selectedOption === 'Jobs') {
        obj['workType'] = this.selectedOption;
        obj['ctcType'] = this.jobForm.value?.ctcOption;
        obj['ctc'] = isFixed ? this.jobForm.value?.fixed : `${startRange} - ${endRange}`;
        console.log(obj, 'object');
      } else if (this.selectedOption === 'Internships') {
        obj['workType'] = this.selectedOption;
        obj['ctc'] = this.jobForm.value?.stipend;
        console.log(obj, 'object');
      }

    //  if(this.roleCode === 'SADM'){
    //     obj['company'] = this.companyDataResult?.company;
    //     obj['companyId'] = this.companyDataResult?.companyId;
    //     obj['companyEmail'] = this.companyDataResult?.email;
    //     obj['companyLogo'] = this.companyDataResult?.companyImgURL;

    //   //  obj['company'] = this.jobForm.value?.company.company;
    //   //  obj['companyId'] = this.jobForm.value?.company.companyId;
    //   //  obj['companyEmail'] = this.jobForm.value?.email;
    //   //  obj['companyLogo'] = this.jobForm.value?.companyImgURL;
    //   }

      this.apiService.UploadPostJob(obj).subscribe((data: any) => {
        // console.log(data)
        if (data.success == false) {
          this.toastr.warning(data.message);


        } else {
          this.toastr.success(data.message);
          const popup = this.dialog.open(this.jobsavedtemplate, {
            width: '380px',
            height: '240px',
            disableClose: true,
            hasBackdrop: true,
          });
          //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);

        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });

      // const consolidatedData = {
      //   jobFormValues: this.jobForm.value,
      //   dynamicFormData: this.formGroups.map(formGroup => formGroup.value)
      // };

      // Clear the form or navigate to another page if needed
      //this.jobForm.reset();
      //this.formGroups.forEach(formGroup => formGroup.reset());
    } else {
      // Mark all form controls as touched to display validation errors
      this.jobForm.markAllAsTouched();
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  jobSaved() {
    this.dialog.closeAll();
    this.appconfig.routeNavigation('/auth/partner/jobrequirment');
  }

  clearForm() {
    if (this.jobForm.dirty) {
      // Display a success message for form cleared
      this.toastr.success('Form cleared successfully.');
    } else if (!this.formTouched) {
      // Display a warning message if the form hasn't been touched
      this.toastr.warning('Please interact with the form before clearing.');
      return;
    }
    const ctcOptionValue = this.jobForm.get('ctcOption').value;
    this.jobForm.reset();
    this.formGroups.forEach(formGroup => formGroup.reset());
    this.jobForm.get('ctcOption').setValue(ctcOptionValue);
  }

}


