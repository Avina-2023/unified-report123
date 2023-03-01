import { Component, OnInit, HostListener, ViewChild, ElementRef,} from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';

@Component({
  selector: 'app-landing-employers',
  templateUrl: './landing-employers.component.html',
  styleUrls: ['./landing-employers.component.scss']
})
export class LandingEmployersComponent implements OnInit {
  @ViewChild('trackScroll', { static: false }) divScroll: ElementRef;
  endPoints = APP_CONSTANTS.ENDPOINTS;
  HiringPartners: any;
  lastScrollPosition: number;


  constructor(private ApiService: ApiService, private msgData:SentDataToOtherComp) {
    this.getFooterLogo();

   }
   @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log(window.pageYOffset,'px')
    console.log($event,'px')

    const currentScrollPosition = this.divScroll.nativeElement.scrollTop
    // if (currentScrollPosition > '0'){
    //   let myElement = document.querySelector('.header') as HTMLDivElement;
    //   myElement.style.background = 'white';
    //   //alert('test');
    // }
    // if (currentScrollPosition == '0'){
    //   let myElement = document.querySelector('.header') as HTMLDivElement;
    //   myElement.style.background = 'transparent';
    //   //alert('test');
    // }
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
    {
      let myElement = document.querySelector('.header') as HTMLDivElement;
      myElement.style.background = '#fff';
      //alert('test');
    }
  }
  customOptions: OwlOptions = {
    center: true,
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
      300: {
        items: 2,
      },
      600: {
        items: 3,
      },

    },
    nav: false,
  };


  getFooterLogo(){
    this.ApiService.partnerfooterlist({}).subscribe((response: any) => {
        if(response.success){
           this.HiringPartners = response.data.HiringPartners;
        }
    })
  }
}
