import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';
import { log } from 'console';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-viewCandidateProfilebyEmployer',
  templateUrl: './viewCandidateProfilebyEmployer.component.html',
  styleUrls: ['./viewCandidateProfilebyEmployer.component.scss'],
})
export class ViewCandidateProfilebyEmployerComponent implements OnInit {
  @ViewChild('headerRef', { static: true }) headerRef!: ElementRef<HTMLDivElement>;
  routerlink = APP_CONSTANTS.ENDPOINTS;
  personalDetailsMap: any;
  details: string[] = [
    'Personal Details',
    'Contact Details',
    'Education Details',
    'Work Experience Details',
    'Project Details',
    'Accomplishment Details',
    'Disciplinary Details'
  ];
  candidateData: any[] = [];
  email: any;
  constructor(private apiService: ApiService, private appConfig: AppConfigService) { }

  ngOnInit() {

    this.CandidateDetails();
  }

  // toggleDetails(event: MouseEvent) {
  //   const target = event.target as HTMLDivElement;
  //   const index = Array.from(this.headerRef.nativeElement.children).indexOf(target);
  //   target.classList.toggle('active');
  //   const contentElements = document.querySelectorAll('.details-content');
  //   contentElements[index].classList.toggle('active');
  // }

  scrollTo(direction: 'left' | 'right') {
    const container = this.headerRef.nativeElement.querySelector('.scroll-container');
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
        if (Array.isArray(res.data)) {
        this.candidateData = res.data;
        console.log(this.candidateData, 'candidate data')
      }
      else {
        this.candidateData = [res.data];
        console.log(this.candidateData, 'candidate data');
      }
    }
      this.appConfig.setLocalStorage('candidateProfile', JSON.stringify(this.candidateData));
    });
  }


}
