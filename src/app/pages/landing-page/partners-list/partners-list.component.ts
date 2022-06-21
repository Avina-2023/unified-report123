import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.scss']
})
export class PartnersListComponent implements OnInit {
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  // leftNavDisabled = false;
  // rightNavDisabled = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    nav: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 3,
      },
      200: {
        items: 3,
      },
      400: {
        items: 3,
      },
    
    }
  };
  footerImag = [
    {
      image: 'assets/images/landing/L&T.png'
    },
    {
      image: 'assets/images/landing/L&T_NXT.png'
    },
    {
      image: 'assets/images/landing/L&T_Services_Stacked.png'
    },
    {
      image: 'assets/images/landing/LTI.png'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  
  // moveLeft() {
  //   this.ds.moveLeft();
  // }
  // moveRight() {
  //   this.ds.moveRight();
  // }
  // leftBoundStat(reachesLeftBound: boolean) {
  //   this.leftNavDisabled = reachesLeftBound;
  // }

  // rightBoundStat(reachesRightBound: boolean) {
  //   this.rightNavDisabled = reachesRightBound;
  // }

}
