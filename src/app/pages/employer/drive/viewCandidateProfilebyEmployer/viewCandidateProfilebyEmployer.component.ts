import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-viewCandidateProfilebyEmployer',
  templateUrl: './viewCandidateProfilebyEmployer.component.html',
  styleUrls: ['./viewCandidateProfilebyEmployer.component.scss'],
})
export class ViewCandidateProfilebyEmployerComponent implements OnInit {
  @ViewChild('conditions', { static: false }) termsconditions: TemplateRef<any>;
  @ViewChild('headerRef', { static: true })
  headerRef!: ElementRef<HTMLDivElement>;
  routerlink = APP_CONSTANTS.ENDPOINTS;
  personalDetailsMap: any;
  journalentry = { journalEntityUrl: '' };
  shouldTruncate: boolean = false;
  details: { label: string; sectionId: string }[] = [
    { label: 'Personal Details', sectionId: 'personal' },
    { label: 'Contact Details', sectionId: 'contact' },
    { label: 'Education Details', sectionId: 'education' },
    { label: 'Work Experience Details', sectionId: 'work-experience' },
    { label: 'Project Details', sectionId: 'project' },
    { label: 'Accomplishment Details', sectionId: 'accomplishment' },
    // { label: 'Disciplinary Details', sectionId: 'disciplinary' },
  ];
  activeSection: string = 'personal';
  candidateData: any;
  email: any;
  getAllStates: any;
  personal_details: any;
  form_present_state: any;
  personalDetails: any;
  form_domicile_state: any;
  contactDetails: any;
  contactDetailsMap: any;
  form_present_city: any;
  updatedCitySubscription: any;
  workDetails: any;
  form_employment_name_address: any;
  form_training_employer_name: any;
  allPresentCityList: any;
  jobDetailsdata: any;
  candidateStatus: any;
  isPopupOpen: boolean;
  shortlistDisabled: boolean = false;

  @ViewChild('matDialog', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('confirmmatDialog') confirmmatDialogRef!: TemplateRef<any>;
  @ViewChild('rejectDialog') rejectDialogRef!: TemplateRef<any>;
  @ViewChild('confirmrejectmatDialog')
  confirmrejectmatDialogRef!: TemplateRef<any>;
  params: any;
  statusdata: any;
  jobId: any;
  jobStatus: any;
  jobdata: any;
  // progressBar: any;
  // progressText: any;
  //  elementRef: any;
  assessmentIndex = 0;
  selectedAssessment: any;

  currentIndex = 0;
  currentCertification: any;

  AssesmentDetails: any;

  CertificationDetails: any = [
    {
      Name: 'Concepts Risk Management',
      Score: '90',
      imgurl:
        'https://lmsassetspremium.lntedutech.com/portalicons/concept-of-project-risk.webp',
    },
    {
      Name: 'Material Handling System',
      Score: '60',
      imgurl:
        'https://lmsassetspremium.lntedutech.com/portalicons/material-handling-system.webp',
    },
    {
      Name: 'Conflict Management',
      Score: '77',
      imgurl:
        'https://lmsassetspremium.lntedutech.com/portalicons/lean-construction.webp',
    },
  ];

  //  externalData:any = [
  //   {
  //     "_id": "64ba71383c22320012f5c6c7",
  //     "section_flags": {
  //         "personal_details": true,
  //         "contact_details": true,
  //         "dependent_details": true,
  //         "education_details": true,
  //         "experience_details": true,
  //         "project_details": true,
  //         "accomplishment_details": true,
  //         "document_details": true,
  //         "disciplinary_details": true,
  //         "previewed": false,
  //         "submitted": true
  //     },
  //     "sendOtp": false,
  //     "checkOtp": false,
  //     "driveIds": [],
  //     "isApproved": false,
  //     "terms": false,
  //     "activationEmail": true,
  //     "dependent_details": [
  //         {
  //             "name_of_your_family": "testing dependent",
  //             "family_date_of_birth": "2023-08-07T18:30:00.000Z",
  //             "occupation": "test",
  //             "relationship": "Others",
  //             "dependent_other": "Test",
  //             "differently_abled": null,
  //             "status": null
  //         }
  //     ],
  //     "assessments" : [
  //       {
  //           "org_id" : "16",
  //           "test_name" : "Tao QP",
  //           "score" : "19",
  //           "max_score" : "60",
  //           "assessment_date" : "2023-07-28T16:09:00.000Z",
  //           "type" : "aptitude"
  //       },
  //       {
  //           "assessment_id" : 489,
  //           "assessment_name" : "step-plus-for-l-and-t",
  //           "score" : 23.54,
  //           "max_score" : 63,
  //           "source_system" : "STEP",
  //           "completed_status" : "YES",
  //           "assessment_date" : "2023-07-27T15:24:36.000Z",
  //           "type" : "english"
  //       },
  //       {
  //           "test_name" : "Coding",
  //           "score" : 0,
  //           "max_score" : 70,
  //           "assessment_date" : "2023-08-21T05:27:02.000Z",
  //           "type" : "Coding"
  //       }
  //   ],
  //     "courses": [
  //       {
  //         "courseName" : "PROD Course - Concrete Updated001",
  //         "coursePercentage" : "50",
  //         "courseId" : "m8e6bxe9",
  //         "courseImgUrl" : "https://lxpdevstorage.blob.core.windows.net/container1/images/8767635887412857-Concrete.jpg",
  //         "type" : "Lxp"
  //     },
  //     {
  //         "courseName" : "Four Level - Design of Structural Steel",
  //         "coursePercentage" : "70",
  //         "courseId" : "ajj8y8d0",
  //         "courseImgUrl" : "https://lxpdevstorage.blob.core.windows.net/container1/images/5576570247112613-Codes for foundation.jpg",
  //         "type" : "Lxp"
  //     },
  //     {
  //         "courseName" : "Applied Industrial IoT(2Credit)",
  //         "coursePercentage" : "90",
  //         "courseId" : "oyme1jgr",
  //         "courseImgUrl" : "https://lxpdevstorage.blob.core.windows.net/container1/images/6898463953642624-Applied Industrial IoT.png",
  //         "type" : "Lxp"
  //     }
  //     ],
  //     "email": "krish@dispostable.com",
  //     "userId": "mcxf9b",
  //     "lastName": "krish",
  //     "roleId": "AST",
  //     "userSecretkey": "286200477112388",
  //     "createdAt": "2023-07-21T11:51:20.242Z",
  //     "updatedAt": "2023-08-23T06:38:09.758Z",
  //     "isActive": true,
  //     "orgId": "1",
  //     "__v": 0,
  //     "account_Activated_at": "2023-08-23T06:38:09.758Z",
  //     "privateKey": "a5e30d21684237b0aa11f6a6136488f62dbee4f937c076aa49d04e2edb582b48",
  //     "acknowledgement": {
  //         "acknowledgement": {
  //             "terms_conditions": true,
  //             "ack_place": "chennai",
  //             "ack_date": "2023-08-25T10:37:03+05:30"
  //         },
  //         "signature_image": {
  //             "name": "Signature",
  //             "label": "Signature",
  //             "file_path": "https://microcertstg.blob.core.windows.net/container1/employerDetails/2988087876323875-onlineexam.png"
  //         }
  //     },
  //     "profilePercentage": 100,
  //     "personal_details": {
  //         "aadharno": "9999 9999 9999",
  //         "dob": "1996-10-05T00:00:00+05:30",
  //         "gender": "Male",
  //         "hobbies_intrest": [
  //             {
  //                 "hobbiesAndInterests": "Walking"
  //             }
  //         ],
  //         "mobile": "9989898989",
  //         "category": "Other",
  //         "mother_tongue": "Tamil",
  //         "domicile_state": "1",
  //         "marital_status": "Single",
  //         "no_of_children": null,
  //         "profileImage": "https://microcertstg.blob.core.windows.net/container1/employerDetails/8449637167686908-download-compresskaru.com (2).png",
  //         "languages_known": [
  //             {
  //                 "language": "sanskrit",
  //                 "is_read": 1,
  //                 "is_write": 1,
  //                 "is_speak": 1
  //             }
  //         ],
  //         "no_of_days": null,
  //         "physical_disability": "false",
  //         "height": null,
  //         "weight": null,
  //         "blood_group": null,
  //         "name": "krish"
  //     },
  //     "contact_details": {
  //         "present_line_street_addres": "Surat",
  //         "preset_city": 22,
  //         "present_state": "3",
  //         "present_zip": "600202",
  //         "present_country": "101",
  //         "is_sameas_presentaddr": true,
  //         "permanent_line1_street_add": "Surat",
  //         "permanent_line2_street_add": null,
  //         "permanent_city": "PAPUM PARE",
  //         "permanent_state": "Arunachal Pradesh",
  //         "permanent_zip": "600202",
  //         "permanent_address_line_3": null,
  //         "permanent_country": "India"
  //     },
  //     "experience_details": {
  //         "work_details": {
  //             "total_exp_years": null,
  //             "total_exp_months": null
  //         },
  //         "is_anywork_exp": false,
  //         "employments": [
  //             {
  //                 "employment_name_address": null,
  //                 "duration_from": null,
  //                 "duration_to": null,
  //                 "achievement": null,
  //                 "is_working_here": false,
  //                 "postion_field": null,
  //                 "hr_contact_no": null,
  //                 "hr_email": null,
  //                 "hr_name": null
  //             }
  //         ],
  //         "is_intern_status": false,
  //         "intern": [
  //             {
  //                 "employer_name": null,
  //                 "from_date": null,
  //                 "to_date": null,
  //                 "work_responsiability": null
  //             }
  //         ],
  //         "skills": [
  //             {
  //                 "skill": "python",
  //                 "skilllevel_selected": "Novice"
  //             },
  //             {
  //                 "skill": "Java",
  //                 "skilllevel_selected": "Novice"
  //             },
  //             {
  //                 "skill": "3D Modelling",
  //                 "skilllevel_selected": "Novice"
  //             }
  //         ]
  //     },
  //     "education_details": {
  //         "educations": [
  //             {
  //                 "level": "SSLC",
  //                 "specification": null,
  //                 "discipline": null,
  //                 "institute": "St.Mary's MHSS",
  //                 "other_collegename": null,
  //                 "other_collegestate": null,
  //                 "board_university": "State Board",
  //                 "start_date": "2012-01-01T00:00:00+05:30",
  //                 "end_date": "2015-05-01T00:00:00+05:30",
  //                 "year_of_passing": "2015-05-01T00:00:00+05:30",
  //                 "is_highLevelEdu": false,
  //                 "reasonForbacklog": null,
  //                 "noActivebacklog": "0",
  //                 "historyOfbacklog": "0",
  //                 "percentage": "87",
  //                 "final_percentage": "87",
  //                 "cg_percentage": "87",
  //                 "rank": null,
  //                 "gap": "false"
  //             },
  //             {
  //                 "level": "Diploma",
  //                 "specification": "Diploma Engineering",
  //                 "discipline": "Electrical",
  //                 "institute": "Acharya Institute Of Technology",
  //                 "other_collegename": null,
  //                 "other_collegestate": null,
  //                 "board_university": "Central",
  //                 "start_date": "2021-03-01T00:00:00+05:30",
  //                 "end_date": "2023-05-01T00:00:00+05:30",
  //                 "year_of_passing": "2023-05-01T00:00:00+05:30",
  //                 "is_highLevelEdu": false,
  //                 "reasonForbacklog": null,
  //                 "noActivebacklog": "0",
  //                 "historyOfbacklog": "0",
  //                 "percentage": "80",
  //                 "final_percentage": "100",
  //                 "cg_percentage": "80",
  //                 "rank": null,
  //                 "gap": "false"
  //             },
  //             {
  //                 "level": "UG",
  //                 "specification": "B.E.",
  //                 "discipline": "Electrical",
  //                 "institute": "aayira vaisyar polytechnic college",
  //                 "other_collegename": null,
  //                 "other_collegestate": null,
  //                 "board_university": null,
  //                 "start_date": "2015-01-01T00:00:00+05:30",
  //                 "end_date": "2019-07-01T00:00:00+05:30",
  //                 "year_of_passing": "2019-07-01T00:00:00+05:30",
  //                 "is_highLevelEdu": true,
  //                 "reasonForbacklog": null,
  //                 "noActivebacklog": "0",
  //                 "historyOfbacklog": "0",
  //                 "percentage": "100",
  //                 "final_percentage": "100",
  //                 "cg_percentage": "100",
  //                 "rank": null,
  //                 "gap": "false"
  //             }
  //         ]
  //     },
  //     "project_details": {
  //         "projects": [
  //             {
  //                 "typeList": "Academy",
  //                 "teamSize": "2",
  //                 "projectTitle": "test",
  //                 "periodFrom": "2023-07-03T18:30:00.000Z",
  //                 "periodTo": "2023-07-31T18:30:00.000Z",
  //                 "projectDescription": "test",
  //                 "projectOrganization": "test"
  //             }
  //         ]
  //     },
  //     "accomplishment_details": {
  //         "certifications": [],
  //         "awards": [],
  //         "journals": [],
  //         "assesments": [
  //             {
  //                 "assesments": [],
  //                 "assementvalue": false
  //             }
  //         ]
  //     },
  //     "document_details": {
  //         "preWrittenPhrase": "Detail-oriented Technical Writer with 7+ years of experience in writing end-user documentation, specializing in user help guides. Excellent writing, analytical thinking, research, and time management skills. Rewrote over 80% of user help guides for 30+ products at Company X, resulting in a 42% decrease in product-related customer support calls",
  //         "resume": [
  //             {
  //                 "file_path": "https://microcertstg.blob.core.windows.net/container1/employerDetails/40277924963909273-registration page 1 with comments (2).pdf"
  //             }
  //         ]
  //     },
  //     "disciplinary_details": {
  //         "bgv_details": {
  //             "convicted_by_Court": "0",
  //             "arrested": "0",
  //             "prosecuted": "0",
  //             "detention": "0",
  //             "fined_by_court": "0",
  //             "debarred_exam_university": "0",
  //             "debarred_psc_company": "0",
  //             "court_case_pending": "0",
  //             "university_case_pending": "0",
  //             "disciplinary_proceedings": "0",
  //             "full_particulars": ""
  //         }
  //     }
  // }
  // ];

  // emailId: string = 'ltidemouser1@dispostable.com';
  candidateResultData: any;
  candidateCourseData: any;
  courseResultData: any;
  courseImg: any;
  courseImg1: any;
  testname: any;
  hideSection: boolean;
  route: any;

  constructor(
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // Check the 'from' query parameter
      const from = queryParams['from'];

      // Check if 'from' is equal to 'CS'
      if (from === 'CS') {
        // Set a boolean variable to hide the section
        this.hideSection = true;
      } else {
        // Set the boolean variable to show the section
        this.hideSection = false;
      }
    });

    this.jobDetailsdata = JSON.parse(
      this.appConfig.getLocalStorage('currentJobData')
    );
    this.candidateStatus = JSON.parse(
      this.appConfig.getLocalStorage('C_Candidate_status')
    );
    this.CandidateDetails();
    // let localjobData = JSON.parse(
    //   this.appConfig.getLocalStorage('currentJobData')
    // );
    // this.startProgressBarUpdate();
    // this.getCandidateResults();
    // this.getCourseDetails();
    this.currentCertification = this.CertificationDetails[this.currentIndex];

    // this.getCandidateCourseDetails();
  }

  showPrevious() {
    if (this.assessmentIndex > 0) {
      this.assessmentIndex--;
      this.selectedAssessment = this.AssesmentDetails[this.assessmentIndex];
    }
  }

  showNext() {
    console.log(this.AssesmentDetails);
    if (this.assessmentIndex < this.AssesmentDetails.length - 1) {
      this.assessmentIndex++;
      this.selectedAssessment = this.AssesmentDetails[this.assessmentIndex];
    }
  }

  prevCertification() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentCertification = this.courseResultData[this.currentIndex];
    }
  }

  nextCertification() {
    if (this.currentIndex < this.courseResultData.length - 1) {
      this.currentIndex++;
      this.currentCertification = this.courseResultData[this.currentIndex];
    }
  }

  getLeftValue(): string { 
    const score = +this.selectedAssessment.max_score; 
    const leftPercentage = (score / 100) * 100; 
    return leftPercentage + '%';
  }

  scrollTo(direction: 'left' | 'right') {
    const container = this.headerRef.nativeElement;
    const containerWidth = container.offsetWidth;
    const scrollAmount = containerWidth;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    }
  }

  // CandidateDetails() {
  //   var obj = {};
  //   obj = {
  //     email: this.apiService.encryptnew(
  //       this.candidateStatus.email,
  //       environment.cryptoEncryptionKey
  //     ),
  //   };
  //   // obj = {
  //   //   email: this.apiService.encryptnew(
  //   //     'gokul47@dispostable.com',
  //   //     environment.cryptoEncryptionKey
  //   //   ),
  //   // };
  //   this.apiService.candidateDetails(obj).subscribe((res: any) => {
  //     if (res.success) {
  //       // if (Array.isArray(res.data)) {
  //       this.candidateData = res.data;
  //       console.log(this.candidateData, 'candidate data');
  //       this.getStateAPI();
  //       // this.getAllPresentCities;
  //       // } else {
  //       //   this.candidateData = [res.data];
  //       //   console.log(this.candidateData, 'candidate data');
  //       // }
  //     }
  //     this.appConfig.setLocalStorage(
  //       'candidateProfile',
  //       JSON.stringify(this.candidateData)
  //     );
  //   });
  // }

  CandidateDetails() {
    var obj = {};
    obj = {
      email: this.apiService.encryptnew(
        this.candidateStatus.email,
        environment.cryptoEncryptionKey
      ),
    };

    this.apiService.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        // if (Array.isArray(res.data)) {
        // this.candidateData = this.externalData[0];
        this.candidateData = res.data;
        console.log(this.candidateData, 'candidate data');
        this.getStateAPI();
        this.assesmentdata();
        this.courseData();
      }

      this.appConfig.setLocalStorage(
        'candidateProfile',
        JSON.stringify(this.candidateData)
      );
    });
  }

  assesmentdata() { 
    this.candidateResultData = this.candidateData.assessments; 
    // this.AssesmentDetails = [...this.candidateResultData.Aptitude,...this.candidateResultData.Coding,...this.candidateResultData.English];
    this.AssesmentDetails = this.candidateResultData; 
    console.log(this.candidateResultData, ' this.AssesedcandidateData'); 
    console.log(this.AssesmentDetails, 'AssesmentDetails'); 
    this.selectedAssessment = this.AssesmentDetails[this.assessmentIndex]; 
  } 

  courseData() { 
    this.courseResultData = this.candidateData.courses; 
    console.log(this.courseResultData, 'courseResultData'); 
    this.currentIndex = 0; 
    this.currentCertification = this.courseResultData[0]; 
    console.log(this.currentCertification,'currentCertificationcurrentCertification');
    this.courseImg1 = this.currentCertification.courseImgUrl + environment.SAS_Token;
  } 

  scrollToSection(sectionId: string) {
    this.activeSection = sectionId;
    const section = this.elementRef.nativeElement.querySelector(
      '#' + sectionId
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  tocandidtedrive() {
    this.router.navigate(['/auth/drive/candidatelist']);
  }

  todashboard() {
    this.router.navigate(['/auth/partner/jobrequirment']);
  }

  getStateAPI() {
    const datas = {
      country_id: '101',
    };
    this.apiService.getallStates().subscribe(
      (data: any) => {
        this.getAllStates = data[0];
        this.getAllStates.forEach((element) => {
          if (element.id == this.candidateData.contact_details.present_state) {
            this.form_domicile_state = element.name;
            this.getCityName(
              element.id,
              this.candidateData.contact_details.preset_city
            );
          }
          if (element.id == this.candidateData.contact_details.present_state) {
            this.form_present_state = element.name;
          }
        });
      },
      (err) => {}
    );
  }

  getCityName(id, cityId) {
    const ApiData = {
      state_id: id,
    };
    let city;
    this.updatedCitySubscription = this.apiService
      .districtList(ApiData)
      .subscribe(
        (datas: any) => {
          debugger;

          console.log(datas, 'citydata');
          this.allPresentCityList = datas.data;
          datas.data.forEach((element) => {
            if (element.id == cityId) {
              this.form_present_city = element.name;
              // return element.name;
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  confirmShortlist(dialogRef: any) {
    dialogRef.close();
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  okclose() {
    this.dialog.closeAll();
    this.shortlistDisabled = true;
  }

  matDialogOpen() {
    const dialogRef = this.dialog.open(this.matDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
    });
  }

  matDialogreject() {
    const dialogRef = this.dialog.open(this.rejectDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
    });
  }
  confirmDialog(status) {
    const data = {
      email: this.candidateStatus.email,
      jobId: this.jobDetailsdata.jobId,
      jobStatus: status,
    };

    this.apiService.getStatusupdated(data).subscribe((response: any) => {
      if (response.success) {
        this.statusdata = response.data;
        this.candidateStatus.jobStatus = status;
        //  this.messenger.sendMessage('grid-refresh', true);
      }
    });
    const dialogRef = this.dialog.open(this.confirmmatDialogRef, {
      width: '400px',
      height: '240px',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
    });
    console.log('confirm');
  }
  confirmrejectDialog(status) {
    const data = {
      email: this.candidateStatus.email,
      jobId: this.jobDetailsdata.jobId,
      jobStatus: status,
    };

    this.apiService.getStatusupdated(data).subscribe((response: any) => {
      if (response.success) {
        this.statusdata = response.data;
        this.candidateStatus.jobStatus = status;
        //  this.messenger.sendMessage('grid-refresh', true);
      }
    });

    const dialogRef = this.dialog.open(this.confirmrejectmatDialogRef, {
      width: '400px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: false,
      panelClass: 'popupModalContainerForForms',
    });
  }
  // (id, cityId, callback) {
  //   const ApiData = {
  //     state_id: id,
  //   };
  //   let city;
  //   this.updatedCitySubscription1 = this.skillexService
  //     .districtList(ApiData)
  //     .subscribe(
  //       (datas: any) => {
  //         // this.hideCityDropDown = false;

  //         this.allPermanentCityList = datas.data;
  //         this.allPermanentCityList.forEach((element) => {
  //           if (element.id == cityId) {
  //             city = element.name;
  //           }
  //         });
  //         callback(city);
  //       },
  //       (err) => {
  //         callback(null);
  //       }
  //     );
  // }
  getPermanentAddressTooltip(): string {
    const city = this.candidateData?.contact_details?.permanent_city;
    const state = this.candidateData?.contact_details?.permanent_state;
    const country = 'India'; // Assuming the country is always India for this example

    // Check if the state length is too long and construct the tooltip content accordingly
    if (state?.length > 15) {
      return `${city}, ${state}, ${country}`;
    } else {
      return `${city}, ${state}, ${country}`;
    }
  }

  // getCandidateResults(){
  //   var objDetails = {};
  //   objDetails= {
  //     "emailId": this.candidateStatus?.email,
  //   }
  //   this.apiService.candidateResultDetails(objDetails).subscribe((response:any)=>{
  //     if(response.success){
  //       this.candidateResultData = response.data[0]
  //       // this.AssesmentDetails = [...this.candidateResultData.Aptitude,...this.candidateResultData.Coding,...this.candidateResultData.English];
  //       this.AssesmentDetails = [...this.candidateResultData.Aptitude];
  //       console.log(this.candidateResultData,' this.AssesedcandidateData');
  //       console.log(this.AssesmentDetails,'AssesmentDetails');
  //       this.selectedAssessment = this.AssesmentDetails[this.assessmentIndex]
  //     }
  //   })
  // }

  //working

  // getCandidateCourseDetails() {
  //   var courseObj = {
  //     "userEmail": this.candidateStatus?.email
  //   };
  //   this.apiService.getcourseTracking(courseObj).subscribe((response: any) => {
  //     if (response.success) {
  //       this.courseResultData = response.data;
  //       // this.courseImg = this.courseResultData.courseImgUrl + environment.SAS_Token
  //       console.log(this.courseResultData, 'courseResultData');
  //       this.currentIndex = 0;
  //       this.currentCertification = this.courseResultData[0];
  //        console.log(this.currentCertification,'currentCertificationcurrentCertification');
  //       this.courseImg1 = this.currentCertification.courseImgUrl + environment.SAS_Token
  //     }
  //   });
  // }

  // getCandidateCourseDetails() {
  //   var courseObj = {
  //     "userEmail": this.candidateStatus?.email
  //   };
  //   this.apiService.getcourseTracking(courseObj).subscribe((response: any) => {
  //     if (response.success) {
  //       this.courseResultData = response.data;
  //       console.log(this.courseResultData, 'courseResultData');

  //       // Push additional values to the courseResultData array
  //       this.courseResultData.push(
  //         {
  //           "courseName": "PROD Course - Concrete Updated001",
  //           "coursePercentage": "0",
  //           "courseId": "m8e6bxe9",
  //           "courseImgUrl": "https://lxpdevstorage.blob.core.windows.net/container1/images/8767635887412857-Concrete.jpg"
  //         },
  //         {
  //           "courseName": "Four Level - Design of Structural Steel",
  //           "coursePercentage": "0",
  //           "courseId": "ajj8y8d0",
  //           "courseImgUrl": "https://lxpdevstorage.blob.core.windows.net/container1/images/5576570247112613-Codes for foundation.jpg"
  //         },
  //         {
  //           "courseName": "Applied Industrial IoT(2Credit)",
  //           "coursePercentage": "0",
  //           "courseId": "oyme1jgr",
  //           "courseImgUrl": "https://lxpdevstorage.blob.core.windows.net/container1/images/6898463953642624-Applied Industrial IoT.png"
  //         }
  //       );

  //       this.currentIndex = 0;
  //       this.currentCertification = this.courseResultData[0];
  //     }
  //   });
  // }

  // for demo purpose

  // getCandidateCourseDetails() {
  //   var courseObj = {
  //     "userEmail": this.candidateStatus?.email
  //   };
  //   this.apiService.getcourseTracking(courseObj).subscribe((response: any) => {
  //     if (response.success) {
  //       this.courseResultData = response.data.concat(this.externalData);
  //       this.currentIndex = 0;
  //       this.currentCertification = this.courseResultData[0];
  //       this.courseImg1 = this.currentCertification.courseImgUrl + environment.SAS_Token;
  //     }
  //   });
  // }
}
