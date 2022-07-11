import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('register', {static: false}) register: TemplateRef<any>;
  @ViewChild('jobseekers', {static: false}) jobseekers: TemplateRef<any>;
  // @ViewChild('skillexchange', {static: false}) skillexchange: TemplateRef<any>;
  baseUrl= environment.OFFCAMPUSDRIVE
  sectiondialogRef: any;
  // skillBanner:any;
  owlCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    nav: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      }
    }
  }

  graduates = [{
      list:'Create customized skill profile',
      image:'assets/images/landing/newLanding/checkNew.png'
  },{
    list:'Showcase core skillset, assessment scores and other talent',
    image:'assets/images/landing/newLanding/checkNew.png'
  },{
    list:'Be visible to top organisations',
    image:'assets/images/landing/newLanding/checkNew.png'
  },{
    list:'Have a competitive edge over peers',
    image:'assets/images/landing/newLanding/checkNew.png'
  },{
    list:'Get access to multiple jobs from top employers',
    image:'assets/images/landing/newLanding/checkNew.png'
  }

]

employers = [{
  list:'Have access to a large talent pool',
  image:'assets/images/landing/newLanding/checkNew.png'
},{
list:'Have access to certified, pre-assessed and skilled candidates',
image:'assets/images/landing/newLanding/checkNew.png'
},{
list:'Enable just-in-time hiring',
image:'assets/images/landing/newLanding/checkNew.png'
},{
list:'Select from ready-to-be-deployed candidates',
image:'assets/images/landing/newLanding/checkNew.png'
},{
list:'Shortlist from skill-based profiles',
image:'assets/images/landing/newLanding/checkNew.png'
}

]

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   // this.skillExchangeBanner();
    // }, 100);
  
  }

  
  NavtoRegister(){
    this.openregisterDialog();
  }

  navToCampus(){
    window.open(this.baseUrl, '_blank');
  }


  openregisterDialog() {
    this.sectiondialogRef = this.matDialog.open(this.register, {
      width: '908px',
      height: '524px',
      panelClass: 'loginpopover',
    });
  }

  openJobSeekers(){
    this.openJobSeekersDialog();
  }

  openJobSeekersDialog() {
    this.sectiondialogRef = this.matDialog.open(this.jobseekers, {
      width: '908px',
      height: '524px',
      panelClass: 'loginpopover',
      
    });
  }


  // skillExchangeBanner(){
  //   this.skillBanner = this.matDialog.open(this.skillexchange, {
  //     width: '100%',
  //     height: '524px',
  //     panelClass: 'loginpopover',
  //   });
  // }

}
