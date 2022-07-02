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
    // loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    // autoplay: true,
    // animateIn: 'fadeIn',
    // animateOut: 'fadeOut',
    // autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: true,
    navSpeed: 1000,
    navText: ['', ''],
    nav: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1
      }
    }
  }

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
