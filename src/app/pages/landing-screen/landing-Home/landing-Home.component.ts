import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';


@Component({
  selector: 'app-landing-Home',
  templateUrl: './landing-Home.component.html',
  styleUrls: ['./landing-Home.component.scss'],
})
export class LandingHomeComponent implements OnInit {
  @ViewChild('trackScroll', { static: false }) divScroll: ElementRef;

  sliderhtml1: any;
  sliderhtml2: any;
  endPoints = APP_CONSTANTS.ENDPOINTS;
  HiringPartners: any;
  InstitutionalPartners: any;
  lastScrollPosition: number;

  percent: number = 0;
  disconnect: any;
  pictures: {};



  constructor(public elementRef: ElementRef,private ApiService: ApiService, private msgData:SentDataToOtherComp) {
    // this.sliderLoad()
    this.getFooterLogo();
  }



  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log(window.pageYOffset,'px')
    console.log($event,'px')

    const currentScrollPosition = this.divScroll.nativeElement.scrollTop
    if (currentScrollPosition > '0'){
      let myElement = document.querySelector('.header') as HTMLDivElement;
      myElement.style.background = 'white';
      //alert('test');
    }
    if (currentScrollPosition == '0'){
      let myElement = document.querySelector('.header') as HTMLDivElement;
      myElement.style.background = 'transparent';
      //alert('test');
    }
    console.log(currentScrollPosition,'scroll');
    if (this.lastScrollPosition < currentScrollPosition ) {
      this.msgData.sendMessage('hide',true)
    }

    else {
      this.msgData.sendMessage('hide',false)
    }
    this.lastScrollPosition = currentScrollPosition;

  }

  ngOnInit() {

    document.querySelectorAll<HTMLDivElement>('.section-numbers__item').forEach((div, index) => new IntersectionObserver(([entry]) => entry.isIntersecting && div.animate([{ opacity: 0 }, { opacity: 1 }], { duration: (index * 0.5 + 1) * 1000, fill: 'forwards' }) && this.disconnect()).observe(div));
    {
      let myElement = document.querySelector('.header') as HTMLDivElement;
      myElement.style.background = 'transparent';
      //alert('test');
    }

    // this.pictures = [
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Aishwarya_Joshi.mp4',
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Blaer_Testimonial.mp4',
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Charles_Godwin.mp4',
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Daniel_Jacob.mp4',
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Jaimon_Antony.mp4',
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Rajendran.mp4',
    //     'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Vikas_K.mp4'
    // ]

    this.pictures = [
      {
        url:'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Aishwarya_Joshi.mp4',
        title:'Aishwarya Joshi Business Strategist - Praaditya Procurement Services Pvt. Ltd.'
      },
      {
        url:'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Blaer_Testimonial.mp4',
      title:'Abinesh Ekambaram Co-Founder & Managing Director - BLAER MOTORS PRIVATE LIMITED'
      },
      {
      url:'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Charles_Godwin.mp4',
      title:'Charles Godwin P HR Leader - Zoho Corporation'
      },
      {
        url:'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Daniel_Jacob.mp4',
        title:'Daniel Jacob Vice President - HR - EC Group International'
      },
      {
      url:'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Jaimon_Antony.mp4',
      title:'Jaimon Antony Head HR - ESAB Corporation'
      },
      {
      url: 'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Rajendran.mp4',
      title:'Rajendran Dandapani President - Zoho Schools of Learning'
      },
      {
      url:'https://assets.lntedutech.com/Skillexchange/TestimonialVideos/Vikas_K.mp4',
      title:'Vikas K Director - Prime Villas Pvt Ltd'
      }
  ]
      // console.log(this.pictures);
  }


  track(value: number): void {
    this.percent = value;
    console.log(value,'ddd');

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

  getFooterLogo(){
    this.ApiService.partnerfooterlist({}).subscribe((response: any) => {
        if(response.success){
           this.HiringPartners = response.data.HiringPartners;
           this.InstitutionalPartners = response.data.InstitutionalPartners;
        }
    })
  }
}
