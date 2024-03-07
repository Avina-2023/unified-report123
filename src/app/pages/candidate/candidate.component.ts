import { Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
// import { RouteService } from 'path-to-your-route-service';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';


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
  @ViewChild('iconHover6') iconHover6: ElementRef;
  showJobs: boolean = true;
  isInternshipPage: boolean = false;
  // showJobs = true;
  isExpanded = false;
  isShowProfile = false;
  isSidebarDisabled = true;
  sideNavMode: MatDrawerMode = 'over'
  isShowing: boolean = false;
  routelinks = APP_CONSTANTS.ENDPOINTS
  blobtoken: string = environment.blobToken;
  candidateName = localStorage.getItem('name')
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com" ? true : false;
  profileimge: any = "";
  currentPermalink: any;
  Details: any;
  candidateEmail: any;
  profileImage: any;
  currentUrl: string;
  currentYear: number;
  event: any;
  fullSearchText: string = '';
  searchText: string = '';
   isIconHighlighted: boolean = false;

  constructor(
    public router: Router,
    // private routeService: RouteService,
    private apiservice: ApiService,
    private appconfig: AppConfigService,
    private msgData: SentDataToOtherComp,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private messenger: SentDataToOtherComp,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      }
    });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Get the current URL
      this.currentUrl = this.router.url;
      //console.log(this.currentUrl, 'currenturlparams');
      this.sidebarDisabled();
    });

  }

  ngOnInit() {

    // this.router.events.pipe(
    // filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.isIconHighlighted = event.url === '/candidateview/jobdescription';
    // });


    this.currentYear = new Date().getFullYear();
    const storedShowJobs = localStorage.getItem('showJobs');
    this.showJobs = storedShowJobs ? JSON.parse(storedShowJobs) : this.showJobs;
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
    });

  }


  ngAfterViewInit() {

    const urlRegex = new RegExp(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION);

    if (this.router.routerState.snapshot.url == '/candidateview/dashboard') {
      this.isIconActive(this.iconHover1.nativeElement, 'dashboard');
    }
    else if (this.router.routerState.snapshot.url == '/candidateview/findjobs') {
      this.isIconActive(this.iconHover2.nativeElement, 'jobs');
    }
    else if (this.router.routerState.snapshot.url == '/candidateview/findinternship') {
      this.isIconActive(this.iconHover3.nativeElement, 'internships');
    }

    // else if (this.router.routerState.snapshot.url == '/candidateview/jobdescription') {
    //   this.isIconActive(this.iconHover2.nativeElement, 'jobs');
      // }/^\/candidateview\/jobdescription$/;


    else if (urlRegex.test(this.router.routerState.snapshot.url)) {
    this.isIconActive(this.iconHover2.nativeElement, '');
    }
  }

  sidebarDisabled(){
    // if (this.router.routerState.snapshot.url == '/candidateview/home' || this.router.routerState.snapshot.url == '/candidateview/profile') {
    //   this.isSidebarDisabled = false;
    // }
    // else{
    //   this.isSidebarDisabled = true;
    // }

    if((this.currentUrl == '/candidateview/home') || (this.currentUrl == '/candidateview/profile')){
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

  gotoAccount(){
    this.router.navigateByUrl('/candidateview/profile');
    this.isShowProfile = !this.isShowProfile;
    //this.isSidebarDisabled = false;

    const menuIcons = this.menuIcons.nativeElement.querySelectorAll('.menu_icon');
    menuIcons.forEach((icon: any) => {
      //if (icon !== element) {
        icon.classList.remove('active-icon');
      //}
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
    const menuIcons = this.menuIcons.nativeElement.querySelectorAll('.menu_icon');
    // const sideIcons = this.menuIcons.nativeElement.querySelectorAll('.menu_icon');


    menuIcons.forEach((icon: any) => {
      if (icon !== element) {
        icon.classList.remove('active-icon');
      }
    });
    // Add "active-icon" to the clicked element
    element.classList.add('active-icon');

    // Now you can use the menuType parameter
    this.menutype_redirection(menuType)

  }

  menutype_redirection(menuType:any) {
   if (menuType === 'jobs') {
      this.router.navigateByUrl('/candidateview/findjobs');
      //this.isSidebarDisabled = true;
    }

    // if (menuType === 'jobsProfile') {
    //   this.router.navigateByUrl('/candidateview/findjobs');
    //   //this.isSidebarDisabled = true;
    //   this.isShowProfile = !this.isShowProfile;
    // }

    if (menuType === 'internships') {
      this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.INTERNSHIPLIST);
      this.isSidebarDisabled = true;
    }

    // if (menuType === 'jobsProfile') {
    //   this.router.navigateByUrl('/candidateview/findjobs');
    //   //this.isSidebarDisabled = true;
    //   this.isShowProfile = !this.isShowProfile;
    // }

    if (menuType === 'dashboard') {
      this.router.navigateByUrl('/candidateview/dashboard');
      //this.isSidebarDisabled = false;
    }

    // if (menuType === 'home') {
    //   this.router.navigateByUrl('/candidateview/home');
    //   //this.isSidebarDisabled = false;
    // }

    if (menuType === 'home') {
      // this.appconfig.clearLocalStorage();
      // this.apiservice.logout();
      window.location.href = 'https://reviewinfo.lntedutech.com';
      this.appconfig.clearLocalStorage();
      // window.location.replace('https://reviewinfo.lntedutech.com');
      //  this.appconfig.clearLocalStorage();
    }
  }

  navigateToInternshipList() {
    this.showJobs = false;
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.INTERNSHIPLIST);
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

  gotoCourses(data:any) {
    let microKey = this.Details?.privateKey;
    let microUrl = environment.MICROLEARN_URL + '?key=' + microKey
    window.open(microUrl, '_blank');
    if (data == 'learnProfile' ){
      this.isShowProfile = !this.isShowProfile;
    }
  }


  gotoDashboard() {
    this.router.navigate(['/candidateview/dashboard'])
  }

  gotoEvent(){
    let eventUrl = environment.CORPORATE_URL + '/events';
    window.open(eventUrl, '_blank');
  }
  // gotoJob(){
  //   this.router.navigate(['/candidateview/findjobs'])
  // }
  isActive(): boolean {
   return this.router.isActive(this.router.createUrlTree(['/candidateview/resumebuilder']), true);
  }
  onJobsClick(from) {
    if(from == 'jobs'){
     this.showJobs = true;
    }
    else{
     this.showJobs = false;
    }
    localStorage.setItem('showJobs', JSON.stringify(this.showJobs));
  }

//  headertextSearch(event: any) {
//   const keyPressed = event.key;
//   if (keyPressed === 'Backspace') {
//     if (this.fullSearchText.length > 0) {
//       this.fullSearchText = this.fullSearchText.slice(0, -1);
//     }
//   } else {
//     this.fullSearchText += keyPressed;
//     this.messenger.sendMessage(this.fullSearchText, true);
//   }
//   console.log(this.fullSearchText, 'input search appears');

//   if (this.router.routerState.snapshot.url === this.routelinks.CANDIDATEDASH.JOBSAPPLIED) {
//     this.router.navigate([this.routelinks.CANDIDATEDASH.JOBLIST]);
//   }

//   // Check if the user is on the "Saved Jobs" page and navigate to the "Jobs" page
//   if (this.router.routerState.snapshot.url === this.routelinks.CANDIDATEDASH.JOBSSAVED) {
//     this.router.navigate([this.routelinks.CANDIDATEDASH.JOBLIST]);
//   }

//   if (this.router.routerState.snapshot.url === this.routelinks.CANDIDATEDASH.RESUMEBUILDER) {
//     this.router.navigate([this.routelinks.CANDIDATEDASH.JOBLIST]);
//   }

//    if (this.router.routerState.snapshot.url === this.routelinks.CANDIDATEDASH.JOBDESCRIPTION) {
//     this.router.navigate([this.routelinks.CANDIDATEDASH.JOBLIST]);
//   }
//   }

headertextSearch(event: KeyboardEvent) {
  event.preventDefault();
  if (event.key === 'Enter' || event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'CapsLock' ||
      event.key.startsWith('Control') || event.key === 'Delete' || event.key === 'Escape' || event.key === 'Insert' || event.altKey || event.shiftKey || event.key === "Tab" )
  {
    event.preventDefault();
    return;
  }

  const keyPressed = event.key;
  if (keyPressed === 'Backspace') {
    if (this.fullSearchText.length > 0) {
      this.fullSearchText = this.fullSearchText.slice(0, -1);
      console.log(this.fullSearchText, 'input search updated');
      this.messenger.sendMessage(this.fullSearchText, true);
    }
  } else {
    this.fullSearchText += keyPressed;
    console.log(this.fullSearchText, 'input search updated');
    this.messenger.sendMessage(this.fullSearchText, true);
  }

  const currentUrl = this.router.routerState.snapshot.url;
  switch (currentUrl) {
    case this.routelinks.CANDIDATEDASH.JOBSAPPLIED:
    case this.routelinks.CANDIDATEDASH.JOBSSAVED:
    case this.routelinks.CANDIDATEDASH.RESUMEBUILDER:
    case this.routelinks.CANDIDATEDASH.JOBDESCRIPTION:
      this.router.navigate([this.routelinks.CANDIDATEDASH.JOBLIST]);
      break;
    default:
      break;
  }
}
}
