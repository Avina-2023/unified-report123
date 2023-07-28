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
import { NavigationExtras, Router } from '@angular/router';
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

  //  elementRef: any;
  constructor(
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    public router: Router
  ) {}
  ngOnInit() {
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

  CandidateDetails() {
    var obj = {};
    obj = {
      email: this.apiService.encryptnew(
        this.candidateStatus.email,
        environment.cryptoEncryptionKey
      ),
    };
    // obj = {
    //   email: this.apiService.encryptnew(
    //     'gokul47@dispostable.com',
    //     environment.cryptoEncryptionKey
    //   ),
    // };
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
      height: 'auto',
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
    const city = this.candidateData.contact_details.permanent_city;
    const state = this.candidateData.contact_details.permanent_state;
    const country = 'India'; // Assuming the country is always India for this example

    // Check if the state length is too long and construct the tooltip content accordingly
    if (state.length > 15) {
      return `${city}, ${state}, ${country}`;
    } else {
      return `${city}, ${state}, ${country}`;
    }
  }
}
