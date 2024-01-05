import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-candidatedash',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  @ViewChild('confirmDialog', { static: false }) matDialogRef: TemplateRef<any>;
  @ViewChild('menuIcons') menuIcons: ElementRef;
  @ViewChild('iconHover1') iconHover1: ElementRef;
  @ViewChild('iconHover2') iconHover2: ElementRef;
  @ViewChild('iconHover3') iconHover3: ElementRef;
  @ViewChild('iconHover4') iconHover4: ElementRef;
  @ViewChild('iconHover5') iconHover5: ElementRef;
  isExpanded = false;
  isShowProfile = false;
  isSidebarDisabled = true;
  sideNavMode: MatDrawerMode = 'over'
  isShowing: boolean = false;
  routelinks = APP_CONSTANTS.ENDPOINTS
  candidateName = localStorage.getItem('name')
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com" ? true : false;
  profileimge: any = "";
  currentPermalink: any;
  Details: any;
  candidateEmail: any;
  profileImage: any;
  constructor(
    public router: Router,
    private apiservice: ApiService,
    private appconfig: AppConfigService,
    private msgData: SentDataToOtherComp,
    public dialog: MatDialog
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

      }
    })
  }

  ngOnInit() {
    this.profileimge = this.appconfig.getLocalStorage('profileImage');
    this.CandidateDetails();
    this.sidebarDisabled();
    this.msgData.getMessage().subscribe((data) => {
      if (data.data == 'profileImage' && data.value != "" && data.value != undefined) {
        if (data.value && this.productionUrl == true) {
          this.profileimge = data.value + environment.blobToken
        } else if (data.value && this.productionUrl == false) {
          this.profileimge = data.value
        }
      }
    })
  }


  ngAfterViewInit() {
    // Set "Home" as the default active icon
    if (this.router.routerState.snapshot.url == '/candidateview/home') {
      this.isIconActive(this.iconHover1.nativeElement, 'home');
    }

    else if (this.router.routerState.snapshot.url == '/candidateview/dashboard') {
      this.isIconActive(this.iconHover1.nativeElement, 'dashboard');
    }

    else if (this.router.routerState.snapshot.url == '/candidateview/findjobs') {
      this.isIconActive(this.iconHover2.nativeElement, 'jobs');
    }
  }

  sidebarDisabled(){
    if (this.router.routerState.snapshot.url == '/candidateview/home') {
      this.isSidebarDisabled = false;
    }
    else{
      this.isSidebarDisabled = true;
    }
  }

  CandidateDetails() {
    var obj = {};
    const userEmail = localStorage.getItem('email');
    obj = {
      email: this.apiservice.encryptnew(
        userEmail,
        environment.cryptoEncryptionKey
      ),
    };
    this.apiservice.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        this.Details = res.data;
        //console.log(this.Details, 'Candidate Details New');
        this.candidateEmail = this.Details?.email;
        this.candidateName = this.Details?.personal_details?.name;
        this.profileImage = this.Details?.personal_details?.profileImage
      }
    });
  }

  showProfileDashboard() {
    this.isShowProfile = !this.isShowProfile;
    const profileMenuElement = document.querySelector('.profile_menu');
    if (profileMenuElement) {
      profileMenuElement.classList.add('slide-left');
    }
  }

  closeDashboard() {
    this.isShowProfile = !this.isShowProfile;
  }


  addSlideAnimation(element: any, menuType: any) {
    const iconElement = element.querySelector('.icon');
    iconElement.classList.remove('slide-reverse');
    iconElement.classList.add('slide-animation');
  }

  removeSlideAnimation(element: any, menuType: any) {
    const iconElement = element.querySelector('.icon');
    iconElement.classList.remove('slide-animation');
    iconElement.classList.add('slide-reverse');
  }

  isIconActive(element: any, menuType: any) {
    // Remove "active-icon" from all other elements
    const menuIcons = this.menuIcons.nativeElement.querySelectorAll('.menu_icon');
    menuIcons.forEach((icon: any) => {
      if (icon !== element) {
        icon.classList.remove('active-icon');
      }
    });
    // Add "active-icon" to the clicked element
    element.classList.add('active-icon');

    // Now you can use the menuType parameter
    if (menuType === 'jobs') {
      this.router.navigateByUrl('/candidateview/findjobs');
      this.isSidebarDisabled = true;
    }
    if (menuType === 'dashboard') {
      this.router.navigateByUrl('/candidateview/dashboard');
      this.isSidebarDisabled = false;
    }
    if (menuType === 'home') {
      this.router.navigateByUrl('/candidateview/home');
      this.isSidebarDisabled = false;
    }
  }





  // ngOnChanges(){
  //   this.profileimge = this.appconfig.getLocalStorage('profileImage');

  // }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  logout() {
    this.dialog.open(this.matDialogRef, {
      disableClose: true
      // panelClass: 'spec_desk_dialog'
    });
  }
  confirm(value) {
    if (value) {
      this.dialog.closeAll()
      this.apiservice.logout();
    } else {
      this.dialog.closeAll()
    }
  }

  gotoProfile() {
    let emailval = this.appconfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiservice.encryptnew(emailval, environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL + '/externallogin?extId=' + enc_email);

  }
  gotoDashboard() {
    this.router.navigate(['/candidateview/dashboard'])
  }


}

