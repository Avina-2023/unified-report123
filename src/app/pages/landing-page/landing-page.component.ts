import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
