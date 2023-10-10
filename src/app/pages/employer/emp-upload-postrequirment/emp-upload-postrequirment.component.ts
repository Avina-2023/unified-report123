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
      var UsercompanyId = this.userdetails.data.userId;
      var UsercompanyName = this.userdetails.data.company;
      var UsercompanyLogo = this.userdetails.data.companyImgURL;
      var UsercompanyEmail = this.userdetails.data.email;
      var UserjobList = this.file;
      const fd = new FormData();
      fd.append('companyId', UsercompanyId);
      fd.append('companyName', UsercompanyName);
      fd.append('companyLogo', UsercompanyLogo);
      fd.append('companyEmail', UsercompanyEmail);
      fd.append('jobList', UserjobList);
      this.apiService.uploadExcelFile(fd).subscribe((data: any) => {
        if(data.success == false){
          this.toastr.warning(data.message);
        }else{
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
}*/




import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
// import { AngularEditorConfig } from '@kolkov/angular-editor';


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
  selectedOption: string = 'jobs';
  selectedRangeOption: string = 'fixed';
  jobForm: FormGroup;
  formGroups: FormGroup[] = [];
  submitted: boolean = false;

  //Multiselect Dropdown
  listOfOption: Array<{ label: string; value: string }> = [];
  size: NzSelectSizeType = 'default';
  multipleValue = [];
  yearofPassingValue = [];
  multipleSpecialization = [];

  //Rich Text Editor
  htmlContent = '';
  htmlContent_1 = '';


  // config: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   minHeight: '100px',
  //   maxHeight: '100px',
  //   placeholder: 'Type here...',
  //   translate: 'no',
  //   sanitize: false,
  //   toolbarPosition: 'top',
  //   defaultFontName: 'Arial',
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote',
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1',
  //     },
  //   ]
  // };


  fixed: any;
  range: any;
  yearofPassout: string[];
  degree: string;
  graduation: string;
  degreeOptions = [
    { "id": "0", "specification_name": "Any Degree / Graduation" },
    { "id": "1", "specification_name": "X Std" },
    { "id": "2", "specification_name": "XII Std" }
  ]
  courseOptions = ['Any Course', 'Pick From the List'];
  course: string;
  listOfSpecializations: any;
  specialization: string;
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

  constructor(private apiService: ApiService, private toastr: ToastrService, private fb: FormBuilder) {
    this.selectedOption = 'jobs';
  }

  ngOnInit(): void {
    this.getallEducation();
    this.getallCourses();
    this.listOfOption = [
      {
        'label': 'Java',
        'value': 'Java'
      },
      {
        'label': 'Python',
        'value': 'Python'
      },
      {
        'label': 'Angular',
        'value': 'Angular'
      }
    ];
    this.yearofPassout = ['2013', '2014', '2015'];
    this.jobForm = this.fb.group({
      jobRole: ['', Validators.required],
      jobTitle: ['', Validators.required],
      jobLocation: ['', Validators.required],
      jobType: ['', Validators.required],
      description: ['', Validators.required],
      requirement: ['', Validators.required],
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
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
      graduation: [null, Validators.required],
      degree: [null],
      course: [null],
      specialization: [this.multipleSpecialization],
    });
  }

  addEducationGroup(): void {
    const lastGroupIndex = this.formGroups.length - 1;
    const lastGroup = this.formGroups[lastGroupIndex];
    if (lastGroup.valid) {
      this.formGroups.push(this.createEducationGroup());
    } else {
      this.toastr.warning('Please fill in all required fields in the last added group.', 'Form Validation Error');
    }
  }

  removeEducationGroup(index: number): void {
    if (this.formGroups.length > 1 && index > 0) {
      this.formGroups.splice(index, 1);
      this.jobForm.setControl('educationGroups', this.fb.array(this.formGroups));
    }
  }


  // addEducationGroup(): void {
  //   const lastGroupIndex = this.formGroups.length - 1;
  //   const lastGroup = this.formGroups[lastGroupIndex];
  //  // const jobFormValues =  this.jobForm.value?.educationGroups;
  //   if (lastGroup.valid) {
  //     //console.log(lastGroup.get('graduation').value);
  //     lastGroup.disable();
  //     this.formGroups.push(this.createEducationGroup());
  //   } else {
  //     this.toastr.warning('Please fill in all required fields in the last added group.', 'Form Validation Error');
  //   }
  // }


  // removeEducationGroup(index: number): void {
  //   if (this.formGroups.length > 1 && index > 0) {
  //     this.formGroups.splice(index, 1);
  //     this.jobForm.setControl('educationGroups', this.fb.array(this.formGroups));
  //     const previousGroupIndex = index - 1;
  //     const previousGroup = this.formGroups[previousGroupIndex];
  //     if ((previousGroup.get('graduation').value === 'Any Graduation') || (previousGroup.get('graduation').value === 'SSLC') || (previousGroup.get('graduation').value === 'HSC')) {
  //       previousGroup.get('graduation').enable();
  //     }
  //     if ((previousGroup.get('graduation').value === 'Diploma')) {
  //       previousGroup.get('graduation').enable();
  //       previousGroup.get('specialization').enable();
  //     }
  //     if ((previousGroup.get('graduation').value === 'UG') || (previousGroup.get('graduation').value === 'PG')) {
  //       previousGroup.enable();
  //     }
  //   }
  // }

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

  ctcChange() {
    const fixedControl = this.jobForm.get('fixed');
    const startrangeControl = this.jobForm.get('startrange');
    const endrangeControl = this.jobForm.get('endrange');
    const stipendControl = this.jobForm.get('stipend');
    const ctcOptionControl = this.jobForm.get('ctcOption');
    if (this.selectedOption === 'jobs') {
      stipendControl.clearValidators();
      stipendControl.setValue(null);
      stipendControl.updateValueAndValidity();
      ctcOptionControl.setValidators(Validators.required);
      ctcOptionControl.updateValueAndValidity();
      this.selectedRangeOption = 'fixed';
    }
    if (this.selectedOption === 'internships') {
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



  onSubmit() {
    const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);
    if (this.jobForm.valid && areEducationGroupsValid) {
      const consolidatedData = {
        jobFormValues: this.jobForm.value,
        dynamicFormData: this.formGroups.map(formGroup => formGroup.value)
      };

      // Log or send consolidatedData to your backend
      console.log(consolidatedData);

      // Clear the form or navigate to another page if needed
      //this.jobForm.reset();
      //this.formGroups.forEach(formGroup => formGroup.reset());
    } else {
      /*console.log('Form Value:', this.jobForm.value);
console.log('Form Status:', this.jobForm.status);

// Check individual control validity
console.log('jobRole validity:', this.jobForm.get('jobRole').valid);
console.log('jobTitle validity:', this.jobForm.get('jobTitle').valid);
// ... check other controls

// Check dynamic group validity
console.log('Education Group validity:', this.formGroups[0].status);  // Adjust the index as needed
console.log('Education Groups FormGroup status:', this.jobForm.get('educationGroups').status);
console.log('Education Groups FormGroup validity:', this.jobForm.get('educationGroups').valid);
console.log('Form Errors:', this.jobForm.errors);
console.log('Full Form:', this.jobForm);
console.log('ngForm Status:', this.jobForm.status);*/


      // Mark all form controls as touched to display validation errors
      this.jobForm.markAllAsTouched();
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }



}