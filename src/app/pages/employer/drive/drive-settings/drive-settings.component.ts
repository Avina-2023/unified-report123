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


interface HiringItem {
  stage: string;
  title: string;
  venue: string;
  date: Date;
  editHiringProcess: boolean;
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
  infoForm: FormGroup;
  startRow: any = 0;
  endRow: any = 5;
  editMode = false;
  editadditionalInfoMode = false;
  addneweducationGroupCriteria = false;
  criteriaEditGroup = false;
  showCustomCriteria = false;
  editGenderMode = false;
  editBacklogsMode = false;
  editModeVisible = true;
  editCriteriaMode = false;
  editCustomCriteria = false;
  editCriteriaModeVisible = true;
  editGenderModeVisible = true;
  editInfoModeVisible = true;
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
  editHiringProcess = false;
  addneweducationGroup = false;
  editGroup = false;
  addnewhiringProcessGroup = false;
  editHiringGroup = false;
  backlogsForm: FormGroup;
  hiringForm: FormGroup;
  disabledSpecifications: any[];
  elementRef: any;

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editModeVisible = !this.editModeVisible;
    this.jobProfileDetails();
  }

  toggleInfoEditMode() {
    this.editadditionalInfoMode = !this.editadditionalInfoMode;
    this.editInfoModeVisible = !this.editInfoModeVisible;
  }
  toggleCriteriaEditMode() {
    this.editCriteriaMode = !this.editCriteriaMode;
    this.editCriteriaModeVisible = !this.editCriteriaModeVisible;
  }
  toggleGenderEditMode() {
    this.editGenderMode = !this.editGenderMode;
    this.editGenderModeVisible = !this.editGenderModeVisible;
  }

  toggleBacklogsEditMode() {
    this.editBacklogsMode = !this.editBacklogsMode;
    this.editBacklogsModeVisible = !this.editBacklogsModeVisible;
  }



  toggleCustomCriteria() {
    this.editCustomCriteria = !this.editCustomCriteria;
    this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;
  }

  toggleEditEducation(educationItem: EducationItem, index: number) {
    // this.addneweducationGroup = !this.addneweducationGroup;
    // this.editGroup = !this.editGroup;
    // Check if any other edit form is currently open
    const isAnyEditFormOpen = this.jobReqData.education.some(item => item.editEducation);
    if (!isAnyEditFormOpen && !this.addneweducationGroup && !this.editGroup) {
      this.addneweducationGroup = !this.addneweducationGroup;
    this.editGroup = !this.editGroup;
      // No other edit form is open, proceed to toggle the clicked item's edit state
      this.jobReqData.education = this.jobReqData.education.map((item, i) => ({
        ...item,
        editEducation: i === index ? !item.editEducation : false,
      }));

      // Optionally, you may want to update the educationItem reference to the one in the updated array
      educationItem = this.jobReqData.education[index];
    } else {
      //this.editGroup = !this.editGroup;
      // Another edit form is already open, provide feedback or take other actions
      console.log('Cannot open another edit option because another edit form is already open.');
      this.toastr.warning('Close the currently open edit form before opening another one.', 'Edit Form Restriction');
    }
  }





  toggleeditCustomCriteria(eligibilityItem: EligibilityItem, index: number) {
    //this.showCustomCriteria = !this.showCustomCriteria;
    const isAnyEditFormOpen = this.jobReqData.eligibilityCriteria.some(item => item.showCustomCriteria);
    if (!isAnyEditFormOpen &&  !this.addneweducationGroupCriteria && !this.criteriaEditGroup) {
      this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;
    this.criteriaEditGroup = !this.criteriaEditGroup;
    
      this.jobReqData.eligibilityCriteria = this.jobReqData.eligibilityCriteria.map((item, i) => ({
        ...item,
        showCustomCriteria: i === index ? !item.showCustomCriteria : false,
      }));
      eligibilityItem = this.jobReqData.eligibilityCriteria[index];
    } else {
      // this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
      // this.criteriaEditGroup = !this.criteriaEditGroup;
      // Another edit form is already open, provide feedback or take other actions
      console.log('Cannot open another edit option because another edit form is already open.');
      this.toastr.warning('Close the currently open edit form before opening another one.', 'Edit Form Restriction');
    }
  }


  toggleeditHiringProcess(hiringItem: HiringItem, index: number) {
    // Check if any other edit form is currently open
    
    const isAnyEditFormOpen = this.jobReqData.hiringProcess.some(item => item.editHiringProcess);
    if (!isAnyEditFormOpen && !this.editHiringGroup && !this.addnewhiringProcessGroup ) {
     this.addnewhiringProcessGroup = !this.addnewhiringProcessGroup;
    this.editHiringGroup = !this.editHiringGroup;
      // No other edit form is open, proceed to toggle the clicked item's edit state
      this.jobReqData.hiringProcess = this.jobReqData.hiringProcess.map((item, i) => ({
        ...item,
        editHiringProcess: i === index ? !item.editHiringProcess : false,
      }));

      // Optionally, you may want to update the hiringItem reference to the one in the updated array
      hiringItem = this.jobReqData.hiringProcess[index];
    } else {
      //this.editHiringGroup = !this.editHiringGroup;
      // Another edit form is already open, provide feedback or take other actions
      console.log('Cannot open another edit option because another edit form is already open.');
      this.toastr.warning('Close the currently open edit form before opening another one.', 'Edit Form Restriction');
    }
  }
  
  cancelEditMode(educationItem: EducationItem) {
    educationItem.editEducation = !educationItem.editEducation;
    this.fetchData();
    this.addneweducationGroup = !this.addneweducationGroup;
    this.editGroup = !this.editGroup;
   // location.reload();
  }

  cancelHiringProcess(hiringItem: HiringItem) {
    this.fetchData();
    hiringItem.editHiringProcess = !hiringItem.editHiringProcess;
    this.addnewhiringProcessGroup = !this.addnewhiringProcessGroup;
    this.editHiringGroup = !this.editHiringGroup;
    //location.reload();
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
  hiringFormGroups: FormGroup[] = [];
  educationLevels = [
    'Class X',
    'Class XII',
    'Diploma',
    'UG',
    'PG',
    'Phd',
    'Through Out'
  ];
  stageLevels = [
    'Stage 1',
    'Stage 2',
    'Stage 3',
    'Stage 4',
    'Stage 5',
    'Stage 6',
    'Stage 7',
    'Stage 8',
    'Stage 9',
    'Stage 10'
  ]
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

  // isObjectEmpty(obj: any): boolean {
  //   return Object?.keys(obj)?.length === 0;
  // }

  isObjectEmpty(obj: any): boolean {
    return obj === undefined || obj === null || Object.keys(obj).length === 0;
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
      requirement: ['', Validators.required],
      lastDatetoApply: ['', Validators.required]
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
      requirement: this.jobReqData?.requirement[0].item,
      lastDatetoApply: this.jobReqData?.lastDatetoApply
    });


    //education data
    this.educationForm = this.fb.group({
      educationGroups: this.fb.array([this.createEducationGroup()])
    });
    this.formGroups = this.educationForm.get('educationGroups')['controls'];


    //yearofpass data

    this.yearofPassForm = this.fb.group({
      yearofPassout: [null, Validators.required]
    });

    this.yearofPassForm.patchValue({
      yearofPassout: this.jobReqData?.yearofPassout
    });

    //gender data

    this.genderForm = this.fb.group({
      gender: ['', Validators.required]
    });

    this.genderForm.patchValue({
      gender: this.jobReqData?.gender ? this.jobReqData?.gender : ''
    });


    //backlogs data

    this.backlogsForm = this.fb.group({
      noofBacklog: ['', Validators.required]
    });

    this.backlogsForm.patchValue({
      noofBacklog: this.jobReqData?.noofBacklog ? this.jobReqData?.noofBacklog : ''
    });


    //custom criteria data

    this.customCriteriaForm = this.fb.group({
      customCriteriaGroups: this.fb.array([this.createCriteriaGroup()])
    });
    this.criteriaGroups = this.customCriteriaForm.get('customCriteriaGroups')['controls'];




    //hiring Process data
    this.hiringForm = this.fb.group({
      hiringGroups: this.fb.array([this.createHiringGroup()])
    });
    this.hiringFormGroups = this.hiringForm.get('hiringGroups')['controls'];


    //info data

    this.infoForm = this.fb.group({
      additionalInformation: ['', Validators.required]
    });

    this.infoForm.patchValue({
      //additionalInformation: this.jobReqData?.additionalInformation?.length == 0 ? '' : this.jobReqData?.additionalInformation[0]?.note
      additionalInformation: this.jobReqData?.additionalInformation?.note
    });




  }


  createEducationGroup(): FormGroup {
    return this.fb.group({
      level: [null, Validators.required],
      specification: [null],
      // course: [null],
      discipline: [this.multipleSpecialization],
    });
  }

  createHiringGroup(): FormGroup {
    return this.fb.group({
      stage: [null, Validators.required],
      title: [null, Validators.required],
      venue: [null, Validators.required],
      date: ['', Validators.required],
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
    if (this.addneweducationGroup && this.editGroup) {
      this.formGroups.push(this.createEducationGroup());
      console.log('group added');
    } else {
      console.log('group already added');
    }
    //this.updateDisabledGraduations();
  }


  // getCurrentDate(): string {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = (today.getMonth() + 1).toString().padStart(2, '0');
  //   const day = today.getDate().toString().padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // }

  getCurrentDate(): Date {
    return new Date();
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
    else {
      this.listOfSpecializations = [];
    }
  }



  addhiringGroup(): void {
    this.addnewhiringProcessGroup = !this.addnewhiringProcessGroup;
    //this.editHiringGroup = !this.editHiringGroup;
    if (!this.addnewhiringProcessGroup) {
      this.hiringFormGroups.push(this.createHiringGroup());
      console.log('group added');
    } else {
      console.log('group already added');
    }
    //this.updateDisabledGraduations();
  }

  // updateDisabledGraduations(): void {
  //   this.disabledGraduations = [];
  //   for (const group of this.formGroups) {
  //     const graduationValue = group.get('level').value;
  //     if (graduationValue && !this.disabledGraduations.includes(graduationValue)) {
  //       this.disabledGraduations.push(graduationValue);
  //     }
  //   }
  // }

  isGraduationDisabled(educationLevel: string): boolean {
    const forbiddenLevelsInJobReqData = this.jobReqData?.education.map(edu => edu?.level?.toLowerCase());
    const forbiddenLevels = ['sslc', 'hsc', 'any graduation'];
    return forbiddenLevelsInJobReqData?.includes(educationLevel?.toLowerCase()) &&
      forbiddenLevels?.includes(educationLevel?.toLowerCase());
  }


  isOptionDisabled(option: string, currentIndex: number): boolean {
    //   const forbiddenSpecsInJobReqData = this.jobReqData?.education.map(edu => edu?.specification?.toLowerCase());
    //  return forbiddenSpecsInJobReqData?.includes(option?.toLowerCase());

    const forbiddenSpecsInJobReqData = this.jobReqData?.education?.map(edu => edu?.specification);
    // console.log(forbiddenSpecsInJobReqData, 'forbiddendata');
    const currentFormGroup = this.formGroups[currentIndex];
    const currentGroupValue = currentFormGroup.get('level').value;
    //console.log(currentGroupValue, 'currentGroupValue');
    const ugLevelCount = this.jobReqData?.education.filter(entry => entry.level === 'UG').length;
    const ugDegreeCount = this.jobReqData?.education.filter(entry => entry.level === 'UG' && entry.specification === 'Any Degree').length;
    const pgLevelCount = this.jobReqData?.education.filter(entry => entry.level === 'PG').length;
    const pgDegreeCount = this.jobReqData?.education.filter(entry => entry.level === 'PG' && entry.specification === 'Any Degree').length;

    const phdLevelCount = this.jobReqData?.education.filter(entry => entry.level === 'Phd').length;
    const phdDegreeCount = this.jobReqData?.education.filter(entry => entry.level === 'Phd' && entry.specification === 'Any Degree').length;
    //console.log(ugLevelCount, 'ugCount');
    // return option?.toLowerCase()!== 'any degree' && forbiddenSpecsInJobReqData?.includes(option?.toLowerCase()) || (option?.toLowerCase() == "any degree" && (ugLevelCount > 1) && currentGroupValue === 'UG') || (option?.toLowerCase() !== "any degree" && (ugLevelCount > 1) && (ugDegreeCount > 1) && currentGroupValue === 'UG');

    return option !== 'Any Degree' && forbiddenSpecsInJobReqData?.includes(option) ||
      (option == "Any Degree" && (ugLevelCount > 1) && currentGroupValue === 'UG') ||
      (option !== "Any Degree" && (ugLevelCount > 1) && (ugDegreeCount > 1) && currentGroupValue === 'UG') ||
      (option == "Any Degree" && (pgLevelCount > 1) && currentGroupValue === 'PG') ||
      (option !== "Any Degree" && (pgLevelCount > 1) && (pgDegreeCount > 1) && currentGroupValue === 'PG') ||
      (option == "Any Degree" && (phdLevelCount > 1) && currentGroupValue === 'Phd') ||
      (option !== "Any Degree" && (phdLevelCount > 1) && (phdDegreeCount > 1) && currentGroupValue === 'Phd');

  }


  isSpecDisabled(option: string, currentIndex: number): boolean {
    const forbiddenSpecsInJobReqData = this.jobReqData?.education.map(edu => edu?.specification?.toLowerCase());
    //console.log(forbiddenSpecsInJobReqData, 'forbiddendata');
    const currentFormGroup = this.formGroups[currentIndex];
    const currentGroupValue = currentFormGroup.get('level').value;
    //console.log(currentGroupValue, 'currentGroupValue');
    const ugLevelCount = this.jobReqData?.education.filter(entry => entry.level === 'UG').length;
    const ugDegreeCount = this.jobReqData?.education.filter(entry => entry.level === 'UG' && entry.specification === 'Any Degree').length;
    //console.log(ugLevelCount, 'ugCount');
    const pgLevelCount = this.jobReqData?.education.filter(entry => entry.level === 'PG').length;
    const pgDegreeCount = this.jobReqData?.education.filter(entry => entry.level === 'PG' && entry.specification === 'Any Degree').length;

    const phdLevelCount = this.jobReqData?.education.filter(entry => entry.level === 'Phd').length;
    const phdDegreeCount = this.jobReqData?.education.filter(entry => entry.level === 'Phd' && entry.specification === 'Any Degree').length;



    // return option?.toLowerCase()!== 'any degree' && forbiddenSpecsInJobReqData?.includes(option?.toLowerCase()) || (option?.toLowerCase() == "any degree" && (ugLevelCount > 0) && currentGroupValue === 'UG') || (option?.toLowerCase() !== "any degree" && (ugLevelCount > 0) && (ugDegreeCount > 0) && currentGroupValue === 'UG');
    return option?.toLowerCase() !== 'any degree' && forbiddenSpecsInJobReqData?.includes(option?.toLowerCase()) ||
      (option?.toLowerCase() == "any degree" && (ugLevelCount > 0) && currentGroupValue === 'UG') ||
      (option?.toLowerCase() !== "any degree" && (ugLevelCount > 0) && (ugDegreeCount > 0) && currentGroupValue === 'UG') ||
      (option?.toLowerCase() == "any degree" && (pgLevelCount > 0) && currentGroupValue === 'PG') ||
      (option?.toLowerCase() !== "any degree" && (pgLevelCount > 0) && (pgDegreeCount > 0) && currentGroupValue === 'PG') ||
      (option?.toLowerCase() == "any degree" && (phdLevelCount > 0) && currentGroupValue === 'Phd') ||
      (option?.toLowerCase() !== "any degree" && (phdLevelCount > 0) && (phdDegreeCount > 0) && currentGroupValue === 'Phd');
  }







  isEducationLevelDisabled(educationLevel: string): boolean {
    // Check if the education level is already present in jobReqData.eligibilityCriteria
    return this.jobReqData?.eligibilityCriteria?.some(criteria => criteria?.educationLevel === educationLevel);
  }

  ishiringLevelDisabled(hiringLevel: string): boolean {
    
    return this.jobReqData?.hiringProcess?.some(criteria => criteria?.stage === hiringLevel);
    
 
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

    if (selectedCourse == 'Any Degree') {
      this.listOfSpecializations = ['Any Specialization'];
      currentFormGroup.get('discipline').setValue(['Any Specialization']);
    }


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

  onCtcOptionChange() {
    const fixedControl = this.jobForm.controls['fixed'].value;
    const startrangeControl = this.jobForm.get('startrange');
    const endrangeControl = this.jobForm.get('endrange');
    const stipendControl = this.jobForm.get('stipend');
    if (this.selectedRangeOption === 'fixed') {
      console.log('ctc changed to fixed');
      console.log(fixedControl, 'fixed ctc');
      console.log(startrangeControl, 'start range ctc');
      console.log(endrangeControl, 'end range ctc');
      
      fixedControl.setValidators(Validators.required);
      fixedControl.setValue(this.jobReqData?.ctc); // Set the value of the selected control
      startrangeControl.clearValidators();
      endrangeControl.clearValidators();
      startrangeControl.setValue(null); // Set the opposite control's value to null
      endrangeControl.setValue(null);
    } else if (this.selectedRangeOption === 'range') {
      console.log('ctc changed to range');
      console.log(fixedControl, 'fixed ctc');
      console.log(startrangeControl, 'start range ctc');
      console.log(endrangeControl, 'end range ctc');
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
        this.addneweducationGroup = !this.addneweducationGroup;
        this.editGroup = !this.editGroup;
      }
    }
    else {
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  saveHiringProcess(index: number) {
    const arehiringGroupsValid = this.hiringFormGroups.every(formGroup => formGroup.valid);

    if (arehiringGroupsValid) {
      const updatedHiring = this.hiringFormGroups.map(formGroup => formGroup.value);
      if (this.jobReqData && this.jobReqData.hiringProcess && this.jobReqData.hiringProcess[index]) {
        // Update the education data at the specified index
        this.jobReqData.hiringProcess[index] = updatedHiring[0];
        // Remove the "editEducation" property from each object
        this.jobReqData.hiringProcess = this.jobReqData.hiringProcess.map(hire => {
          const { editHiringGroup, ...eduWithoutEdit } = hire;
          return eduWithoutEdit;
        });
        var hireObj = {
          "jobId": this.jobReqData?.jobId,
          "companyId": this.jobReqData?.companyId,
          "hiringProcess": this.jobReqData.hiringProcess
        };
        //console.log(hireObj, 'hiring object');
        this.updateJobData(hireObj);
        this.addnewhiringProcessGroup = !this.addnewhiringProcessGroup;
        this.editHiringGroup = !this.editHiringGroup;
      }
    }
    else {
      this.hiringFormGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  addHireItem(index: number) {
    const arehiringGroupsValid = this.hiringFormGroups.every(formGroup => formGroup.valid);
    if (arehiringGroupsValid) {
      const updatedHiring = this.hiringFormGroups.map(formGroup => formGroup.value);
      if (this.jobReqData?.hiringProcess) {
        this.jobReqData.hiringProcess = [...this.jobReqData.hiringProcess, ...updatedHiring];
      }
      else {
        this.jobReqData.hiringProcess = updatedHiring;
      }
      var hireObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "hiringProcess": this.jobReqData?.hiringProcess
      };
      //console.log(hireObj, 'hiring object');
      this.updateJobData(hireObj);
      this.addnewhiringProcessGroup = !this.addnewhiringProcessGroup;

    }
    else {
      this.hiringFormGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  DeleteEducation(educationItem: any, index: number) {
    if(!this.addneweducationGroup && !this.editGroup){
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
    //this.addneweducationGroup = !this.addneweducationGroup;
    //this.editGroup = !this.editGroup;
  }
  else{
    this.toastr.warning('Close the currently open edit form before deleting another one.', 'Delete Form Restriction');
  }
  }


  DeleteHiring(hiringItem: any, index: number) {
    if (!this.editHiringGroup && !this.addnewhiringProcessGroup){
    if (this.jobReqData && this.jobReqData.hiringProcess) {
      // Use the index parameter to splice the array and remove the item at the specified index
      this.jobReqData.hiringProcess.splice(index, 1);
    }
    // console.log(this.jobReqData.education, 'deletededucation');
    var deletedhireObj = {
      "jobId": this.jobReqData?.jobId,
      "companyId": this.jobReqData?.companyId,
      "hiringProcess": this.jobReqData.hiringProcess
    };
    this.deleteFields(deletedhireObj);
  }

  else{
    this.toastr.warning('Close the currently open edit form before deleting another one.', 'Delete Form Restriction');
  }

  }


  deleteCustomCriteria(index: number) {

    if(!this.addneweducationGroupCriteria && !this.criteriaEditGroup){
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
    // this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    // this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;
    // this.criteriaEditGroup = !this.criteriaEditGroup;
  }
  else{
    this.toastr.warning('Close the currently open edit form before deleting another one.', 'Delete Form Restriction');
  }
  }

  deleteBacklogs() {
    if (this.jobReqData && this.jobReqData?.noofBacklog) {
      var deletedObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "noofBacklog": ''
      };
      this.deleteFields(deletedObj);
    }
  }

  deleteGender() {

    if (this.jobReqData && this.jobReqData?.gender) {
      var deletedObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "gender": ''
      };
      this.deleteFields(deletedObj);
    }

  }

  deleteadditionalInfo() {

    if (this.jobReqData && this.jobReqData?.additionalInformation) {
      var deletedInfo = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "additionalInformation": {}
      };
      //console.log(deletedInfo);
      this.deleteFields(deletedInfo);
    }

  }





  deleteFields(deletedObj) {
    this.http.UploadPostJob(deletedObj).subscribe((data: any) => {
      if (data.success == false) {
        this.toastr.warning(data.message);
      } else {
        //this.toastr.success(data.message);
        this.toastr.success('Deleted Successfully');
        this.fetchData();
        //location.reload();
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
      this.addneweducationGroup = !this.addneweducationGroup;
      //this.editGroup = !this.editGroup;
    }
    else {
      this.formGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  cancelAddItem(index: number) {
    this.fetchData();
    this.addneweducationGroup = !this.addneweducationGroup;
    //this.editGroup = !this.editGroup;
  }
  cancelAddHireItem(index:number){
    this.fetchData();
    this.addnewhiringProcessGroup = !this.addnewhiringProcessGroup;

  }


  updateJobProfile() {
    const isFixed = this.jobForm.value.fixed;
    const startRange = this.jobForm.value.startrange;
    const endRange = this.jobForm.value.endrange;
    const htmlDescription = this.jobForm.value?.description;
    const htmljobRequirements = this.jobForm.value?.requirement;


    /*const inputDate = new Date(this.jobForm.value?.lastDatetoApply);
      // Set time zone offset to zero (UTC)
      inputDate.setMinutes(inputDate.getMinutes() - inputDate.getTimezoneOffset());
      // Set the UTC hours, minutes, and seconds to 23:59:59
      inputDate.setUTCHours(23, 59, 59);
      // Convert to UTC and get the ISO string
      const ISTDateString = inputDate.toISOString();*/

    const inputDate = new Date(this.jobForm.value?.lastDatetoApply);
    // Set the hours, minutes, and seconds to 23:59:59
    inputDate.setHours(23, 59, 59);
    // Convert to UTC and get the ISO string
    const ISTDateString = inputDate.toISOString();



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
        "requirement": requirementItems,
        "lastDatetoApply": ISTDateString
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
      this.editMode = !this.editMode;
      this.editModeVisible = !this.editModeVisible;



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
    //location.reload();
    // }
  }


  cancelYear() {
    this.editCriteriaMode = !this.editCriteriaMode;
    this.editCriteriaModeVisible = !this.editCriteriaModeVisible;
    this.fetchData();
    //location.reload();
  }
  cancelGender() {
    this.editGenderMode = !this.editGenderMode;
    this.editGenderModeVisible = !this.editGenderModeVisible;
    this.fetchData();
   // location.reload();

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
  cancelBacklogs() {
    this.editBacklogsMode = !this.editBacklogsMode;
    this.editBacklogsModeVisible = !this.editBacklogsModeVisible;
    this.fetchData();
    //location.reload();
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
      this.editCriteriaMode = !this.editCriteriaMode;
    this.editCriteriaModeVisible = !this.editCriteriaModeVisible;
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
      this.updateJobData(genderObj);
      //console.log(genderObj);
      this.editGenderMode = !this.editGenderMode;
    this.editGenderModeVisible = !this.editGenderModeVisible;
    }
    else {
      this.genderForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }


  saveadditionalInfo() {
    if (this.infoForm.valid) {
      const infoDescription = this.infoForm.value?.additionalInformation;
      const infoObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "additionalInformation": {
          note: infoDescription
        }
      };
      this.updateJobData(infoObj);
      //console.log(infoObj);
      this.editadditionalInfoMode = !this.editadditionalInfoMode;
    this.editInfoModeVisible = !this.editInfoModeVisible;
    }
    else {
      this.infoForm.markAllAsTouched();
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }


  canceladditionalInfo(){
    this.editadditionalInfoMode = !this.editadditionalInfoMode;
    this.editInfoModeVisible = !this.editInfoModeVisible;
    this.fetchData();
  }




  saveBacklogs() {
    if (this.backlogsForm.valid) {
      var backlogsObj = {
        "jobId": this.jobReqData?.jobId,
        "companyId": this.jobReqData?.companyId,
        "noofBacklog": this.backlogsForm?.value?.noofBacklog
      };
      this.updateJobData(backlogsObj);
      //console.log(backlogsObj);
      this.editBacklogsMode = !this.editBacklogsMode;
    this.editBacklogsModeVisible = !this.editBacklogsModeVisible;
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
      if (this.jobReqData && this.jobReqData.eligibilityCriteria && this.jobReqData.eligibilityCriteria[index]) {
        this.jobReqData.eligibilityCriteria[index] = updatedCriteria[0];
        this.jobReqData.eligibilityCriteria = this.jobReqData.eligibilityCriteria.map(cri => {
          const { showCustomCriteria, ...eduWithoutCriteria } = cri;
          return eduWithoutCriteria;
        });
        var criteriaObj = {
          "jobId": this.jobReqData?.jobId,
          "companyId": this.jobReqData?.companyId,
          "eligibilityCriteria": this.jobReqData.eligibilityCriteria
        };
        //console.log(criteriaObj, 'criteria values');
        this.updateJobData(criteriaObj);
        this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;
    this.criteriaEditGroup = !this.criteriaEditGroup;
      }

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

      this.editCustomCriteria = !this.editCustomCriteria;
    this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;


    }
    else {
      this.criteriaGroups.forEach(formGroup => formGroup.markAllAsTouched());
      this.toastr.warning('Please fill in all required fields.', 'Form Validation Error');
    }
  }

  cancelCustomCriteria(i) {
   // location.reload();
   this.fetchData();
   this.editCustomCriteria = !this.editCustomCriteria;
    this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;
    
  }
  cancelnewCustomCriteria(i){
    //location.reload();
    this.fetchData();
    this.editCustomCriteriaVisible = !this.editCustomCriteriaVisible;
    this.addneweducationGroupCriteria = !this.addneweducationGroupCriteria;
    this.criteriaEditGroup = !this.criteriaEditGroup;
  }

  updateJobData(obj) {
    this.http.UploadPostJob(obj).subscribe((data: any) => {
      if (data.success == false) {
        this.toastr.warning(data.message);
      } else {
        this.toastr.success(data.message);
        this.fetchData();
        //location.reload();
        //this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.PARTNER.REQUIRMENT);
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }




}
