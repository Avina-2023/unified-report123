import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { log } from 'console';

interface EducationItem {
  specification: string;
  discipline: string[];
  editEducation: boolean; // Add this property
}

interface EligibilityItem {
  scoreType: string;
  marks: number;
  educationLevel: string[];
  showCustomCriteria: boolean; // Add this property
}


@Component({
  selector: 'app-drive-settings',
  templateUrl: './drive-settings.component.html',
  styleUrls: ['./drive-settings.component.scss']
})

export class DriveSettingsComponent implements OnInit {
  jobForm: FormGroup;
  educationForm: FormGroup;
  genderForm: FormGroup;
  startRow: any = 0;
  endRow: any = 5;
  editMode = false;
  showCustomCriteria = false;
  editGenderMode = false;
  editBacklogsMode = false;
  editModeVisible = true;
  editCriteriaMode = false;
  editCustomCriteria = false;
  editCriteriaModeVisible = true;
  editGenderModeVisible = true;
  editBacklogsModeVisible = true;
  editCustomCriteriaVisible = true;
  locations: any;
  filteredLocations: string[] = [];
  //Rich Text Editor
  htmlContent = '';
  htmlContent_1 = '';
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
  multipleLocation: any;
  listOfOption: any;
  selectedOption: any;
  selectedRangeOption: any;
  fixed: any;
  startrange: any;
  multipleSpecialization: any;
  endrange: any;
  lowerLimit: any;
  upperLimit: any;
  educations: any;
  allCourses: any;
  diplomaCourses: any;
  ugCourses: any;
  pgCourses: any;
  ugDegree: any;
  pgDegree: any;
  alldegree: any;
  ugDegrees: any[];
  pgDegrees: any[];
  phdDegrees: any[];
  degreeOptions: any[];
  allDisciplines: any;
  listOfSpecializations: any;
  disabledGraduations: any[];
  yearPassed: any[];
  yearofPassForm: FormGroup;
  customCriteriaForm: FormGroup;
  yearofPassingValue: any;
  editEducation = false;
  addneweducationGroup = false;
  editGroup = false;
  backlogsForm: FormGroup;

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editModeVisible = !this.editModeVisible;
  }

  toggleCriteriaEditMode() {
    this.editCriteriaMode = !this.editCriteriaMode;
    this.editCriteriaModeVisible = !this.editCriteriaModeVisible;
  }
  toggleGenderEditMode() {
    this.editGenderMode = !this.editGenderMode;
    this.editGenderModeVisible = !this.editGenderModeVisible;
  }

  toggleBacklogsEditMode(){
    this.editBacklogsMode = !this.editBacklogsMode;
    this.editBacklogsModeVisible = !this.editBacklogsModeVisible;
  }

  toggleCustomCriteria() {
    this.editCustomCriteria = !this.editCustomCriteria;
    this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
  }

  toggleEditEducation(educationItem: EducationItem, index: number) {
    this.addneweducationGroup = !this.addneweducationGroup;
    this.editGroup = !this.editGroup;
    // Check if any other edit form is currently open
    const isAnyEditFormOpen = this.jobReqData.education.some(item => item.editEducation);
    if (!isAnyEditFormOpen) {
      // No other edit form is open, proceed to toggle the clicked item's edit state
      this.jobReqData.education = this.jobReqData.education.map((item, i) => ({
        ...item,
        editEducation: i === index ? !item.editEducation : false,
      }));

      // Optionally, you may want to update the educationItem reference to the one in the updated array
      educationItem = this.jobReqData.education[index];
    } else {
      this.editGroup = !this.editGroup;
      // Another edit form is already open, provide feedback or take other actions
      console.log('Cannot open another edit option because another edit form is already open.');
      this.toastr.warning('Close the currently open edit form before opening another one.', 'Edit Form Restriction');
    }
  }


  toggleeditCustomCriteria(eligibilityItem: EligibilityItem, index:number){
    //this.showCustomCriteria = !this.showCustomCriteria;
    this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.editGroup = !this.editGroup;
    const isAnyEditFormOpen = this.jobReqData.eligibilityCriteria.some(item => item.showCustomCriteria);
    if (!isAnyEditFormOpen) {
      this.jobReqData.eligibilityCriteria = this.jobReqData.eligibilityCriteria.map((item, i) => ({
        ...item,
        showCustomCriteria: i === index ? !item.showCustomCriteria : false,
      }));
      eligibilityItem = this.jobReqData.eligibilityCriteria[index];
    } else {
      this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
      this.editGroup = !this.editGroup;
      // Another edit form is already open, provide feedback or take other actions
      console.log('Cannot open another edit option because another edit form is already open.');
      this.toastr.warning('Close the currently open edit form before opening another one.', 'Edit Form Restriction');
    }
}

  cancelEditMode(educationItem: EducationItem) {
    educationItem.editEducation = !educationItem.editEducation;
    location.reload();
  }

  currentJobID = localStorage.getItem('currentJobID');
  filterModel = {
    "startRow": this.startRow, "endRow": this.endRow,
    "filterModel": {
      "jobId": {
        "filterType": "text",
        "type": "contains",
        "filter": this.currentJobID,
      }
    },
  };

  //Multiselect Dropdown
  size: NzSelectSizeType = 'default';

  jobDetailsdata: any;
  valueone: any;
  jobReqData: any;
  formGroups: FormGroup[] = [];
  criteriaGroups: FormGroup[] = [];
  // jobData: any;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private appconfig: AppConfigService,
    private toastr: ToastrService,
    private http: ApiService,
  ) {

  }

  ngOnInit(): void {
    this.getJobDetails();
    this.jobProfileDetails();
    this.cityLocation();
    this.fetchData();
    this.skilllist();
    this.getallEducation();
    this.getallCourses();
    this.getalldegree();

    this.yearPassed = [];
    const currentYear = new Date().getFullYear() + 4;
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.yearPassed.push(i.toString());
    }
  }

  jobProfileDetails() {
    this.jobForm = this.fb.group({
      jobRole: ['', Validators.required],
      jobTitle: ['', Validators.required],
      jobLocation: ['', Validators.required],
      skillSet: ['', Validators.required],
      ctcOption: ['', Validators.required],
      fixed: [''],
      startrange: [''],
      endrange: [''],
      description: ['', Validators.required],
      requirement: ['', Validators.required]
    });

    this.jobForm.patchValue({
      jobRole: this.jobReqData?.jobRole,
      jobTitle: this.jobReqData?.jobTitle,
      jobLocation: this.jobReqData?.jobLocation,
      skillSet: this.jobReqData?.skillSet,
      fixed: this.jobReqData?.ctc,
      startrange: this.lowerLimit,
      endrange: this.upperLimit,
      description: this.jobReqData?.description[0].item,
      requirement: this.jobReqData?.requirement[0].item
      // Set other form control values here
    });


    //education data
    this.educationForm = this.fb.group({
      educationGroups: this.fb.array([this.createEducationGroup()])
    });
    this.formGroups = this.educationForm.get('educationGroups')['controls'];


    //yearofpass data

    this.yearofPassForm = this.fb.group({
      yearofPassout: [null]
    });

    this.yearofPassForm.patchValue({
      yearofPassout: this.jobReqData?.yearofPassout
    });

    //gender data

    this.genderForm = this.fb.group({
      gender: ['']
    });

    this.genderForm.patchValue({
      gender: this.jobReqData?.gender ? this.jobReqData?.gender : ''
    });


    //backlogs data

    this.backlogsForm = this.fb.group({
      noOfBacklogs: ['', Validators.required]
    });

    this.backlogsForm.patchValue({
      noOfBacklogs: this.jobReqData?.noOfBacklogs ? this.jobReqData?.noOfBacklogs : ''
    });


    //custom criteria data

    this.customCriteriaForm = this.fb.group({
      customCriteriaGroups: this.fb.array([this.createCriteriaGroup()])
    });
    this.criteriaGroups = this.customCriteriaForm.get('customCriteriaGroups')['controls'];




  }


  createEducationGroup(): FormGroup {
    return this.fb.group({
      level: [null, Validators.required],
      specification: [null],
      // course: [null],
      discipline: [this.multipleSpecialization],
    });
  }


  createCriteriaGroup(): FormGroup {
    return this.fb.group({
      scoreType: ['', Validators.required],
      marks: ['', Validators.required],
      educationLevel: ['', Validators.required],
    });
  }


  addEducationGroup(): void {
    this.addneweducationGroup = !this.addneweducationGroup;
    if (!this.addneweducationGroup) {
      this.formGroups.push(this.createEducationGroup());
      console.log('group added');
    } else {
      console.log('group already added');
    }
    this.updateDisabledGraduations();
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

  isGraduationDisabled(educationLevel: string): boolean {

    const forbiddenLevelsInJobReqData = this.jobReqData.education.map(edu => edu.level.toLowerCase());
    const forbiddenLevels = ['sslc', 'hsc', 'any graduation'];

    return forbiddenLevelsInJobReqData.includes(educationLevel.toLowerCase()) &&
      forbiddenLevels.includes(educationLevel.toLowerCase());
  }

  getallEducation() {
    this.http.getallEducations().subscribe((data: any) => {
      this.educations = data[0];
    })
  }

  getallCourses() {
    this.http.getallCollegeCourses().subscribe((data: any) => {
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

  getalldegree() {
    this.http.getDegreeList().subscribe((data: any) => {
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
    });
  }



  onGraduationChange(selectedGraduation: string, index: number) {
    //this.updateDisabledGraduations();
    const currentFormGroup = this.formGroups[index];
    //console.log(selectedGraduation);
    // Clear values in the current form group
    currentFormGroup.get('specification').setValue(null);
    //currentFormGroup.get('course').setValue(null);
    currentFormGroup.get('discipline').setValue(null);
    if (selectedGraduation === null) {
      console.log('value empty');
      // this.updateDisabledGraduations();
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
    if (selectedCourse !== null && typeof selectedCourse === 'string' && selectedCourse !== 'Any Degree / Graduation' && selectedCourse !== 'X Std' && selectedCourse !== 'XII Std') {
      console.log(selectedCourse, 'selectedCoursevalues');
      const params = { "degree": selectedCourse };
      this.http.getDepartmentcourses(params).subscribe((response: any) => {
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
    if (currentFormGroup.get('level').value === 'UG' || currentFormGroup.get('level').value === 'PG' || currentFormGroup.get('level').value === 'Diploma' || currentFormGroup.get('level').value === 'Phd') {
      return false; // Do not apply disabled
    } else {
      return true; // Apply disabled
    }
  }

  onCtcOptionChange() {
    const fixedControl = this.jobForm.get('fixed');
    const startrangeControl = this.jobForm.get('startrange');
    const endrangeControl = this.jobForm.get('endrange');
    const stipendControl = this.jobForm.get('stipend');
    if (this.selectedRangeOption === 'fixed') {
      fixedControl.setValidators(Validators.required);
      fixedControl.setValue(this.jobReqData?.ctc); // Set the value of the selected control
      startrangeControl.clearValidators();
      endrangeControl.clearValidators();
      startrangeControl.setValue(null); // Set the opposite control's value to null
      endrangeControl.setValue(null);
    } else if (this.selectedRangeOption === 'range') {
      startrangeControl.setValidators(Validators.required);
      endrangeControl.setValidators(Validators.required);
      startrangeControl.setValue(this.lowerLimit); // Set the value of the selected control
      endrangeControl.setValue(this.upperLimit);
      fixedControl.clearValidators();
      fixedControl.setValue(null); // Set the opposite control's value to null
    }

    fixedControl.updateValueAndValidity();
    startrangeControl.updateValueAndValidity();
    endrangeControl.updateValueAndValidity();
  }


  skilllist() {
    const data: any = {};
    this.http.getSkill(data).subscribe((res: any) => {
      if (res.success) {
        this.listOfOption = res.data.map(item => item.skillName);
        //console.log(res, 'skilllist');
      }
    });
  }


  cityLocation() {
    const data: any = {};
    this.http.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.locations = res.data.map(item => item.city);
        //console.log(this.locations, 'locations');

        //this.locations = ['Select', ...res.data.map(item => item.city)];


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
    console.log(searchText, 'searchText');
    //console.log('Search text:', searchText);
    this.http.getCities(data).subscribe((res: any) => {
      if (res.success) {
        this.locations = res.data.map((item) => item.city);
      }
    });
  }

  fetchData() {
    this.http.viewjobRequirments(this.filterModel).subscribe((response: any) => {
      if (response.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.jobReqData = response.data[0];
        console.log(this.jobReqData, 'final Job data');
        if (this.jobReqData) {
          this.selectedOption = this.jobReqData?.workType;
          this.selectedRangeOption = this.jobReqData?.ctcType;
          if (this.selectedRangeOption === 'range') {
            //console.log(this.jobReqData?.ctc , 'ethics');
            const ctcString = this.jobReqData?.ctc;
            if (ctcString) {
              const ctcArray = ctcString.split(' - ');
              this.lowerLimit = parseInt(ctcArray[0], 10);
              this.upperLimit = parseInt(ctcArray[1], 10);
            }

          }
          // console.log(this.selectedRangeOption, 'ctctype');
          this.jobProfileDetails();
        }
        //this.totallength = this.jobReqData.length
        //this.total = Math.ceil(response.totalCount.count/this.defaultRowPerPage);
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }



  getJobDetails() {
    this.jobDetailsdata = this.appconfig.getLocalStorage('currentJobData');
    this.valueone = JSON.parse(this.jobDetailsdata);
    console.log(this.valueone, 'jobdataaaaaaa');
  }



  dashboard() {
    this.router.navigate(['/auth/partner/jobrequirment']);
  }
  navigateToCandidateList() {
    this.router.navigate(['/auth/drive/candidatelist']);
  }


  saveEducation(index: number) {
    const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);

    if (areEducationGroupsValid) {
      const updatedEducation = this.formGroups.map(formGroup => formGroup.value);
      if (this.jobReqData && this.jobReqData.education && this.jobReqData.education[index]) {
        // Update the education data at the specified index
        this.jobReqData.education[index] = updatedEducation[0];
        // Remove the "editEducation" property from each object
        this.jobReqData.education = this.jobReqData.education.map(edu => {
          const { editEducation, ...eduWithoutEdit } = edu;
          return eduWithoutEdit;
        });
        var eduObj = {
          "jobId": this.jobReqData?.jobId,
          "companyId": this.jobReqData?.companyId,
          "education": this.jobReqData.education
        };

        this.updateJobData(eduObj);
        //console.log(eduObj, 'educationobject');
        /*this.http.UploadPostJob(eduObj).subscribe((data: any) => {
          if (data.success == false) {
            this.toastr.warning(data.message);
          } else {
            this.toastr.success(data.message);
            location.reload();
            //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
          }
        }, (err) => {
          this.toastr.warning('Connection failed, Please try again.');
        });*/


      }
    }

    else {
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  DeleteEducation(educationItem: any, index: number) {
    // Assuming jobReqData.education is your array of education items
    if (this.jobReqData && this.jobReqData.education) {
      // Use the index parameter to splice the array and remove the item at the specified index
      this.jobReqData.education.splice(index, 1);
    }
    // console.log(this.jobReqData.education, 'deletededucation');
    var deletedObj = {
      "jobId": this.jobReqData?.jobId,
      "companyId": this.jobReqData?.companyId,
      "education": this.jobReqData.education
    };
    this.deleteFields(deletedObj);
  }

  deleteCustomCriteria(index: number) {
    // Assuming jobReqData.education is your array of education items
    if (this.jobReqData && this.jobReqData?.eligibilityCriteria) {
      // Use the index parameter to splice the array and remove the item at the specified index
      this.jobReqData?.eligibilityCriteria.splice(index, 1);
    }
     //console.log(this.jobReqData?.eligibilityCriteria, 'deltedvalue');
    var deletedObj = {
      "jobId": this.jobReqData?.jobId,
      "companyId": this.jobReqData?.companyId,
      "eligibilityCriteria": this.jobReqData?.eligibilityCriteria
    };
    this.deleteFields(deletedObj);
  }
  
  
  


  deleteFields(deletedObj){
    this.http.UploadPostJob(deletedObj).subscribe((data: any) => {
      if (data.success == false) {
        this.toastr.warning(data.message);
      } else {
        //this.toastr.success(data.message);
        this.toastr.success('Deleted Successfully');
        location.reload();
        //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }



  saveaddMoreItem(index: number) {
    const areEducationGroupsValid = this.formGroups.every(formGroup => formGroup.valid);
    if (areEducationGroupsValid) {
      const updatedEducation = this.formGroups.map(formGroup => formGroup.value);
      this.jobReqData.education = [...this.jobReqData.education, ...updatedEducation];
      console.log(this.jobReqData.education, 'combined data');
      var addedEduObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "education": this.jobReqData.education
      };
      this.updateJobData(addedEduObj);
      /*this.http.UploadPostJob(addedEduObj).subscribe((data: any) => {
        if (data.success == false) {
          this.toastr.warning(data.message);
        } else {
          this.toastr.success(data.message);
          location.reload();
          //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });*/
    }
    else {
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  cancelAddItem(index: number) {
    console.log('cancelled');
    location.reload();

  }


  updateJobProfile() {

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


    if (this.jobForm.valid) {
      var obj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "jobRole": this.jobForm.value?.jobRole,
        "jobTitle": this.jobForm.value?.jobTitle,
        "jobLocation": this.jobForm.value?.jobLocation,
        "skillSet": this.jobForm.value?.skillSet,
        "description": descriptionItems,
        "requirement": requirementItems
      }

      if (this.selectedOption === 'Jobs') {
        obj['workType'] = this.selectedOption;
        obj['ctcType'] = this.jobForm.value?.ctcOption;
        obj['ctc'] = isFixed ? this.jobForm.value?.fixed : `${startRange} - ${endRange}`;
        //console.log(obj, 'object');
      } else if (this.selectedOption === 'Internships') {
        obj['workType'] = this.selectedOption;
        obj['ctc'] = this.jobForm.value?.stipend;
        //console.log(obj, 'object');
      }

      //console.log(obj, 'obj')
      this.updateJobData(obj);

      /*this.http.UploadPostJob(obj).subscribe((data: any) => {
        // console.log(data)
        if (data.success == false) {
          this.toastr.warning(data.message);
        } else {
          this.toastr.success(data.message);
          location.reload();
          //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });*/


    }

    else {
      this.jobForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  cancelBtn() {
    this.editMode = !this.editMode;
    this.editModeVisible = !this.editModeVisible;
    //if (this.jobForm.invalid) {
    location.reload();
    // }
  }


  cancelYear() {
    this.editCriteriaMode = !this.editCriteriaMode;
    this.editCriteriaModeVisible = !this.editCriteriaModeVisible;
    location.reload();
  }
  cancelGender() {
    this.editGenderMode = !this.editGenderMode;
    this.editCriteriaModeVisible = !this.editCriteriaModeVisible;
    location.reload();

    /*if (this.jobReqData && this.jobReqData?.gender) {
      this.jobReqData?.gender = '';
    }
    // console.log(this.jobReqData.gender, 'deletedgender');
    var deletedgenderObj = {
      "jobId": this.jobReqData?.jobId,
      "companyId": this.jobReqData?.companyId,
      "gender": this.jobReqData?.gender
    };
    this.deleteFields(deletedgenderObj);
  }*/

  }
  cancelBacklogs(){
    this.editBacklogsMode = !this.editBacklogsMode;
    this.editBacklogsModeVisible = !this.editBacklogsModeVisible;
    location.reload();
  }
  saveYear() {
    // console.log('saveyear');
    if (this.yearofPassForm.valid) {
      var saveYearObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "yearofPassout": this.yearofPassForm?.value?.yearofPassout
      };
      this.updateJobData(saveYearObj);
      //console.log(saveYearObj);
    }
    else {
      this.yearofPassForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }


  saveGender() {
    if (this.genderForm.valid) {
      var genderObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "gender": this.genderForm?.value?.gender
      };
      //this.updateJobData(genderObj);
      console.log(genderObj);
    }
    else {
      this.genderForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  saveBacklogs() {
    if (this.backlogsForm.valid) {
      var backlogsObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "noOfBacklogs": this.backlogsForm?.value?.noOfBacklogs
      };
      //this.updateJobData(backlogsObj);
      console.log(backlogsObj);
    }
    else {
      this.backlogsForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }


  saveCustomCriteria(index: number) {
    const arecriteriaGroupsValid = this.criteriaGroups.every(formGroup => formGroup.valid);
    if (arecriteriaGroupsValid) {
      const updatedCriteria = this.criteriaGroups.map(formGroup => formGroup.value);
      var criteriaObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "eligibilityCriteria": updatedCriteria
      };
	  //console.log(criteriaObj, 'criteria values');
    this.updateJobData(criteriaObj);
      }
    else {
      this.criteriaGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  addmoreCustomCriteria(index: number) {
    const arecriteriaGroupsValid = this.criteriaGroups.every(formGroup => formGroup.valid);
    if (arecriteriaGroupsValid) {
      const updatedCriteria = this.criteriaGroups.map(formGroup => formGroup.value);
      this.jobReqData.eligibilityCriteria = [...this.jobReqData.eligibilityCriteria, ...updatedCriteria];
      console.log(this.jobReqData.eligibilityCriteria, 'combined criteria');
      var criteriaObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "eligibilityCriteria": this.jobReqData?.eligibilityCriteria
      };
	  //console.log(criteriaObj, 'criteria values');
    this.updateJobData(criteriaObj);
      }
    else {
      this.criteriaGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  cancelCustomCriteria(i){
    location.reload();
  }

  updateJobData(obj) {
    this.http.UploadPostJob(obj).subscribe((data: any) => {
      if (data.success == false) {
        this.toastr.warning(data.message);
      } else {
        this.toastr.success(data.message);
        location.reload();
        //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }




} 
