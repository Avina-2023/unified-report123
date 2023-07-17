import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-viewCandidateProfilebyEmployer',
  templateUrl: './viewCandidateProfilebyEmployer.component.html',
  styleUrls: ['./viewCandidateProfilebyEmployer.component.scss'],
})
export class ViewCandidateProfilebyEmployerComponent implements OnInit {
  @ViewChild('headerRef', { static: true })
  headerRef!: ElementRef<HTMLDivElement>;
  routerlink = APP_CONSTANTS.ENDPOINTS;
  personalDetailsMap: any;
  details: { label: string; sectionId: string }[] = [
    { label: 'Personal Details', sectionId: 'personal' },
    { label: 'Contact Details', sectionId: 'contact' },
    { label: 'Education Details', sectionId: 'education' },
    { label: 'Work Experience Details', sectionId: 'work-experience' },
    { label: 'Project Details', sectionId: 'project' },
    { label: 'Accomplishment Details', sectionId: 'accomplishment' },
    { label: 'Disciplinary Details', sectionId: 'disciplinary' },
  ];
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
  //  elementRef: any;
  constructor(
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private elementRef: ElementRef,
    public router: Router
  ) {}
  ngOnInit() {
    this.CandidateDetails();
    this.jobDetailsdata = JSON.parse(this.appConfig.getLocalStorage('currentJobData'));
  }

  scrollTo(direction: 'left' | 'right') {
    const container =
      this.headerRef.nativeElement.querySelector('.scroll-container');
    const scrollAmount = 200; // Adjust as needed
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    }
  }

  CandidateDetails() {
    var obj = {};
    // obj = {
    //   email: this.apiService.encryptnew(
    //     this.email,
    //     environment.cryptoEncryptionKey
    //   ),
    // };
    obj = {
      email: this.apiService.encryptnew(
        'gokul47@dispostable.com',
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        // if (Array.isArray(res.data)) {
        this.candidateData = res.data;
        console.log(this.candidateData, 'candidate data');
        this.getStateAPI();
        // this.getAllPresentCities;
        // } else {
        //   this.candidateData = [res.data];
        //   console.log(this.candidateData, 'candidate data');
        // }
      }
      this.appConfig.setLocalStorage(
        'candidateProfile',
        JSON.stringify(this.candidateData)
      );
    });
  }

  scrollToSection(sectionId: string) {
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
          if (
            element.id == this.candidateData.personal_details.domicile_state
          ) {
            this.form_domicile_state = element.name;
          }
          if (element.id == this.candidateData.contact_details.present_state) {
            this.form_present_state = element.name;
          }
        });
      },
      (err) => {}
    );
  }

  getAllPresentCities(id, cityId, callback) {
    const ApiData = {
      state_id: id,
    };
    let city;
    this.updatedCitySubscription = this.apiService
      .districtList(ApiData)
      .subscribe(
        (datas: any) => {
          console.log(datas, 'citydata');

          this.allPresentCityList = datas.data;
          this.allPresentCityList.forEach((element) => {
            if (element.id == this.candidateData.contact_details.preset_city) {
              this.form_present_city = element.name;
            }
          });
          callback(city);
        },
        (err) => {
          callback(null);
        }
      );
  }

  // getAllPermanentCities(id, cityId, callback) {
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
}
