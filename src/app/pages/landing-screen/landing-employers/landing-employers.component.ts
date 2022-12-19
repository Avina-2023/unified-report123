import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-landing-employers',
  templateUrl: './landing-employers.component.html',
  styleUrls: ['./landing-employers.component.scss']
})
export class LandingEmployersComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    autoplay: true,
    autoplaySpeed: 150,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  sliderdata1 = [
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Lnt.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Lnt-Nxt.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Lnt-Tech.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/LTI-lets-solve.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/mindtree.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/ABB_logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/rane_logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Otis-Logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Aditya_Birla.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Inspirisys_logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Oppo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/MMC_Infotech.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Movate_logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/prime.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Amadis-LOGO.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Corrohealth-logo.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Omega_logo.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Jouve_Logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Prime-Logo.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Vaken_logo.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Bankzone_logo.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/grootan.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/rudram.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Bankbazaar-Logo.png',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/BeumerGroup_Logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/AhamHousingFinance_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Amaindia-logo.jpg',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/Ideas2IT_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/techberg_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/bet_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/codebios_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/altimetrik_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/maruti_logo.webp',
    },
    {
      img1: 'https://assets.lntedutech.com/Skillexchange/partners/sba_logo.webp',
    },
  ];
}
