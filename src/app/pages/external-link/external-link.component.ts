import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';


@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss']
})
export class ExternalLinkComponent implements OnInit {
  codec = new HttpUrlEncodingCodec;
  apiresponse = {

      "success": true,
      "message": "login successfully",
      "data": {
          "section_flags": {
              "personal_details": true,
              "contact_details": true,
              "dependent_details": true,
              "education_details": true,
              "experience_details": true,
              "project_details": true,
              "accomplishment_details": true,
              "document_details": true,
              "disciplinary_details": true,
              "previewed": false,
              "submitted": true
          },
          "dependent_details": [
              {
                  "name_of_your_family": "asd",
                  "family_date_of_birth": "2023-02-01T00:00:00+05:30",
                  "occupation": "Z",
                  "dependent_other": null,
                  "differently_abled": null,
                  "status": null,
                  "relationship": "Mother"
              },
              {
                  "name_of_your_family": "VGEYA",
                  "family_date_of_birth": "1977-03-17T00:00:00+05:30",
                  "occupation": "HOMEMAKER",
                  "dependent_other": null,
                  "differently_abled": null,
                  "status": null,
                  "relationship": "Father"
              },
              {
                  "name_of_your_family": "cheya",
                  "family_date_of_birth": "2020-02-04T00:00:00+05:30",
                  "occupation": "home maker",
                  "dependent_other": "sister",
                  "differently_abled": null,
                  "status": null,
                  "relationship": "Others"
              }
          ],
          "email": "gokul47@dispostable.com",
          "userId": "qbpcgu",
          "acknowledgement": {
              "acknowledgement": {
                  "terms_conditions": true,
                  "ack_place": "Chennai",
                  "ack_date": "2023-07-29T16:03:17+05:30"
              },
              "signature_image": {
                  "name": "Signature",
                  "label": "Signature",
                  "file_path": "https://microcertstg.blob.core.windows.net/container1/employerDetails/5143210101301219-signature (7).png"
              }
          },
          "profilePercentage": 100,
          "personal_details": {
              "aadharno": "6666 6666 6666",
              "dob": "2001-03-20T00:00:00+05:30",
              "gender": "Male",
              "hobbies_intrest": [
                  {
                      "hobbiesAndInterests": "cycling"
                  },
                  {
                      "hobbiesAndInterests": "resding"
                  },
                  {
                      "hobbiesAndInterests": "gym"
                  },
                  {
                      "hobbiesAndInterests": "gardening"
                  }
              ],
              "mobile": "9993393939 ",
              "category": "SC",
              "mother_tongue": "Tamil",
              "domicile_state": "2",
              "marital_status": "Single",
              "no_of_children": null,
              "profileImage": "https://microcertstg.blob.core.windows.net/container1/employerDetails/6905388174544187-cap and flag.jpg",
              "languages_known": [
                  {
                      "language": "tamil",
                      "is_read": 1,
                      "is_write": 1,
                      "is_speak": 1
                  },
                  {
                      "language": "english",
                      "is_read": 1,
                      "is_write": 1,
                      "is_speak": 1
                  },
                  {
                      "language": "hindi",
                      "is_read": 0,
                      "is_write": 0,
                      "is_speak": 1
                  },
                  {
                      "language": "urdhu",
                      "is_read": 0,
                      "is_write": 1,
                      "is_speak": 0
                  }
              ],
              "passport_number": "12345678890",
              "name_as_in_passport": "gokulA",
              "profession_as_in_passport": "techy",
              "date_of_issue": "2023-03-20T00:00:00+05:30",
              "valid_upto": "2023-03-31T00:00:00+05:30",
              "place_of_issue": "chennai",
              "country_valid_for": "India",
              "serious_illness": "covid",
              "no_of_days": null,
              "physical_disability": "false",
              "height": "170",
              "weight": "75",
              "blood_group": "3",
              "name": "gokul47"
          },
          "contact_details": {
              "present_line_street_addres": "no92,gandistreet",
              "present_line2_street_addre": "VIRUGAMBAKKAM",
              "present_address_line_3": "CHENNAI",
              "preset_city": 5,
              "present_state": "2",
              "present_zip": "600092",
              "present_country": "101",
              "is_sameas_presentaddr": false,
              "permanent_line1_street_add": "no92,gandistreet",
              "permanent_line2_street_add": "virugambakkam",
              "permanent_city": 5,
              "permanent_state": "2",
              "permanent_zip": "600092",
              "permanent_address_line_3": "chennai",
              "permanent_country": "101"
          },
          "experience_details": {
              "work_details": {
                  "total_exp_years": "2",
                  "total_exp_months": "2"
              },
              "is_anywork_exp": true,
              "employments": [
                  {
                      "employment_name_address": "THNTNTYN",
                      "duration_from": "2023-07-12T00:00:00+05:30",
                      "duration_to": "2023-07-28T18:30:00.000Z",
                      "achievement": "RYTEHRGTHYRNTRGTRT5EG",
                      "is_working_here": false,
                      "postion_field": "TYNTYNYT",
                      "hr_contact_no": "8009087685",
                      "hr_email": "5Y5Y5TR@GMAIL.COM",
                      "hr_name": "YNTYN"
                  }
              ],
              "is_intern_status": false,
              "intern": [
                  {
                      "employer_name": null,
                      "from_date": null,
                      "to_date": null,
                      "work_responsiability": null
                  }
              ],
              "skills": [
                  {
                      "skill": "angular",
                      "skilllevel_selected": "Skillfull"
                  },
                  {
                      "skill": "sql",
                      "skilllevel_selected": "Skillfull"
                  }
              ]
          },
          "education_details": {
              "educations": [
                  {
                      "level": "SSLC",
                      "specification": null,
                      "discipline": null,
                      "institute": "johns",
                      "other_collegename": null,
                      "other_collegestate": null,
                      "board_university": "State Board",
                      "start_date": "2020-09-01T00:00:00+05:30",
                      "end_date": "2022-11-01T00:00:00+05:30",
                      "year_of_passing": "2022-11-01T00:00:00+05:30",
                      "is_highLevelEdu": false,
                      "reasonForbacklog": null,
                      "noActivebacklog": "0",
                      "historyOfbacklog": "1",
                      "percentage": "65",
                      "final_percentage": "65",
                      "cg_percentage": "65",
                      "rank": null,
                      "gap": "false"
                  },
                  {
                      "level": "HSC",
                      "specification": null,
                      "discipline": "Science",
                      "institute": "hbjh",
                      "other_collegename": null,
                      "other_collegestate": null,
                      "board_university": "State Board",
                      "start_date": "2010-06-01T00:00:00+05:30",
                      "end_date": "2012-07-01T00:00:00+05:30",
                      "year_of_passing": "2012-07-01T00:00:00+05:30",
                      "is_highLevelEdu": false,
                      "reasonForbacklog": null,
                      "noActivebacklog": "0",
                      "historyOfbacklog": "0",
                      "percentage": "89",
                      "final_percentage": "78",
                      "cg_percentage": "67",
                      "rank": null,
                      "gap": "false"
                  },
                  {
                      "level": "UG",
                      "specification": "B.Tech",
                      "discipline": "Electrical",
                      "institute": "Others",
                      "other_collegename": "veffvevev",
                      "other_collegestate": "3",
                      "board_university": "karnataaka pvt",
                      "start_date": "2017-07-01T00:00:00+05:30",
                      "end_date": "2019-07-01T00:00:00+05:30",
                      "year_of_passing": "2023-07-01T00:00:00+05:30",
                      "is_highLevelEdu": false,
                      "reasonForbacklog": "personal",
                      "noActivebacklog": "0",
                      "historyOfbacklog": "0",
                      "percentage": "89",
                      "final_percentage": "78",
                      "cg_percentage": "67",
                      "rank": null,
                      "gap": "true"
                  },
                  {
                      "level": "PG",
                      "specification": "M.Tech",
                      "discipline": "Construction Management",
                      "institute": "Others",
                      "other_collegename": "test",
                      "other_collegestate": "1",
                      "board_university": "wefw",
                      "start_date": "2017-07-01T00:00:00+05:30",
                      "end_date": "2019-06-01T00:00:00+05:30",
                      "year_of_passing": "2019-08-01T00:00:00+05:30",
                      "is_highLevelEdu": true,
                      "reasonForbacklog": null,
                      "noActivebacklog": "0",
                      "historyOfbacklog": "0",
                      "percentage": "89",
                      "final_percentage": "78",
                      "cg_percentage": "67",
                      "rank": null,
                      "gap": "false"
                  }
              ]
          },
          "project_details": {
              "projects": []
          },
          "accomplishment_details": {
              "certifications": [],
              "awards": [],
              "journals": [],
              "assesments": [
                  {
                      "assesments": [],
                      "assementvalue": false
                  }
              ]
          },
          "document_details": {
              "preWrittenPhrase": "Hard-working and passionate Secondary Social Studies teacher with 10+ years of experience in creating positive environments in which teenagers can learn and grow. Incorporates interdisciplinary knowledge into the classroom to engage students of all learning orientations. ",
              "resume": [
                  {
                      "file_path": "https://microcertstg.blob.core.windows.net/container1/employerDetails/7844065173951456-LNT - Holidays List 2023.pdf"
                  }
              ]
          },
          "disciplinary_details": {
              "bgv_details": {
                  "convicted_by_Court": "0",
                  "arrested": "0",
                  "prosecuted": "0",
                  "detention": "0",
                  "fined_by_court": "0",
                  "debarred_exam_university": "0",
                  "debarred_psc_company": "0",
                  "court_case_pending": "0",
                  "university_case_pending": "0",
                  "disciplinary_proceedings": "1",
                  "full_particulars": "test"
              }
          }
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZ29rdWw0N0BkaXNwb3N0YWJsZS5jb20iLCJ1c2VySWQiOiJxYnBjZ3UifSwiaWF0IjoxNjkxMzg5NDY0LCJleHAiOjE2OTE0MDAyNjQsImlzcyI6Imh0dHBzOi8vd3d3LmxhcnNlbnRvdWJyby5jb20vIn0.bxVhQ-KUZZ_c-r_3909Ue4QBgLHVPGio2Z8jOxmgOns",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZ29rdWw0N0BkaXNwb3N0YWJsZS5jb20iLCJ1c2VySWQiOiJxYnBjZ3UifSwiaWF0IjoxNjkxMzg5NDY0LCJleHAiOjE2OTE0MjU0NjQsImlzcyI6Imh0dHBzOi8vd3d3LmxhcnNlbnRvdWJyby5jb20vIn0.1kpnF1-CT25Ib9Qd8BO2fN0Ik3YVOZzoQUjfp1c7eN0"

  }
  constructor(private route: ActivatedRoute, public toast: ToastrService,public appConfig: AppConfigService, public apiService:ApiService,
  ) {
    this.appConfig.clearLocalStorage();
  }

  ngOnInit(): void {

    this.getRoute();
  }

  getRoute() {
    this.route.queryParams.subscribe((param: any) => {
      // https://skillexchange-dev.lntedutech.com/externallogin?extId=U2FsdGVkX1%2Fq5aiOn6Qd1lBnI2bWggDKiWsOIN62K4k%3D&jobId=dslfjsdf&view=appliedjobs
      let extId = param.extId;
      let view = param.view;
      let jobid = param.jobid;
      if (extId && extId != undefined && extId != "") {
       console.log(this.apiService.decrypt(decodeURIComponent(extId)),'eeee');
        this.apiService.student_login({ key: decodeURIComponent(extId) }).subscribe((data: any) => {
          // data = this.apiresponse//mocking
          if (data.success) {

            this.appConfig.setLocalStorage('c_token', data && data.token ? data.token : '');
            this.appConfig.setLocalStorage('email', data && data.data.email ? data.data.email : '');
            this.appConfig.setLocalStorage('name',data && data.data.personal_details?data.data.personal_details.name:'N/A')
            this.appConfig.setLocalStorage('profileImage',data && data.data.personal_details?data.data.personal_details.profileImage:'')
            this.appConfig.setLocalStorage('candidateProfile',data && data.data?JSON.stringify(data.data):'')

            if (view === 'findjobs'){
                this.appConfig.setLocalStorage('showJobs' , true  )
            }
            if (view === 'findinternship'){
                this.appConfig.setLocalStorage('showJobs' , false)
            }
            // if(!view && !jobid)
            // {this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.DASHBOARD);}

            if(view){
              this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.CNDIDATELANDING+'/'+view);
            }



            if(jobid){
              let dataval = {
                "jobId": jobid,
                "email": data.data.email
              }
              this.apiService.getJobDetail(dataval).subscribe((data:any)=>{
                if (data.success) {
                  this.appConfig.setLocalStorage('jobDesc',JSON.stringify(data.data))
                  let jobId = this.appConfig.base64Encryption(data.data.jobId);
                  this.appConfig.routeNavigation(`${APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION}/${jobId}`);
                } else {
                  this.toast.warning(data.message)
                  // this.appConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.DASHBOARD);
                }
              })
            }
            // this.loginRedirection(data.data,);
          } else {
            this.toast.warning(data.message)
            //this.appConfig.warning(data.message)
            this.appConfig.routeNavigation('/login');
          }
        }, (error) => {
          console.log(error)
        });
      } else {
        this.appConfig.routeNavigation('/login');
      }
    });
  }

  loginRedirection(data: any) {
    // this.appConfig.routeNavigation('/candidateview/dashboard');
  }

}
