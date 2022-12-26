import { Component, ElementRef, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-landing-Home',
  templateUrl: './landing-Home.component.html',
  styleUrls: ['./landing-Home.component.scss'],
})
export class LandingHomeComponent implements OnInit {
  sliderhtml1: any;
  sliderhtml2: any;
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor(public elementRef: ElementRef) {
    // this.sliderLoad()
  }

  ngOnInit() {

  }

  slidehover(slideElem: HTMLElement, e) {
    let x = (e.pageX*-1/50);
    let y = (e.pageY*-1/50);
    slideElem.getElementsByTagName('img')[0].style.transform =
      'translate3d(' +
      x * 0.05 +
      'px, ' +
      y * 0.05 +
      'px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
  }
  removeslidehover(slideElem: HTMLElement, e) {
    slideElem.getElementsByTagName('img')[0].style.transform =
      'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
  }

  bannerOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 10,
    autoplay:true,
    autoplaySpeed:100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
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

  bannerslider = [
    {
      title: 'Connecting Skilled Talent with Industry',
      subtitle:
        'Skill Exchange is a one-of-a-kind platform that provides talented and skilled new graduates smooth transitioning from college to the professional world!',
      bannerimg:
        'https://assets.lntedutech.com/Skillexchange/banner-image1.png',
    },
    {
      title: 'Enabling Industry to Access Ready-to-Deploy Fresh Graduates',
      subtitle:
        'Access to millions of Skill profiles to connect and recruit the fresh minds of India to fulfill hiring needs and showcase productivity from day one!',
      bannerimg:
        'https://assets.lntedutech.com/Skillexchange/banner-image2.png',
    },
  ];

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

  sliderdata2 = [
    {
      title: 'Anna University, Chennai',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/Annauniversity-logo.jpg',
    },
    {
      title: 'Indian Institute of Technology, Madras',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/iitmadras.jpg',
    },
    {
      title: 'College of Engineering, Guindy (Anna University)',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/coe-guindy.jpg',
    },
    {
      title: 'Madras Institute of Technology (Anna University)',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/mit-chennai.jpg',
    },
    {
      title: 'Alagappa College of Technology, Guindy (Anna University)',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/Actech.jpg',
    },
    {
      title: 'School of Architecture and Planning (Anna University)',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/arch.jpg',
    },
    {
      title:
        'BS Abdur Rahman Crescent Institute of Scienece and Technology, Chennai',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/crescent.jpg',
    },

    {
      title: 'Chitkara University, Punjab',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/Chitkarauniversity.jpg',
    },
    {
      title: 'Gujarat Technological University',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/gtu.jpg',
    },
    {
      title: 'JECRC University, Jaipur',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/jecrcUniversity.jpg',
    },
    {
      title: 'KSR College of Technology, Tiruchengode',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/ksrct.jpg',
    },
    {
      title: 'KPR Institute of Engineering and Technology, Coimbatore',
      img: 'https://assets.lntedutech.com/Skillexchange/inst-partners/kpriet.jpg',
    },
  ];
}
