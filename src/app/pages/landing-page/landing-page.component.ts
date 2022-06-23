import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('register', {static: false}) register: TemplateRef<any>;
  sectiondialogRef: any;
  owlCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
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
  }

  
  NavtoRegister(){
    this.openregisterDialog();
  }


  openregisterDialog() {
    this.sectiondialogRef = this.matDialog.open(this.register, {
      width: '908px',
      height: '524px',
      panelClass: 'loginpopover',
      
    });
  }

}
