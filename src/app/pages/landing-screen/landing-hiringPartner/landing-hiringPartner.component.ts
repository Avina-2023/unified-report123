import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';

@Component({
  selector: 'app-landing-hiringPartner',
  templateUrl: './landing-hiringPartner.component.html',
  styleUrls: ['./landing-hiringPartner.component.scss']
})
export class LandingHiringPartnerComponent implements OnInit {
  @ViewChild('trackScroll', { static: false }) divScroll: ElementRef;
  endPoints = APP_CONSTANTS.ENDPOINTS;
  HiringPartners: any;
  lastScrollPosition: any;

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

  getFooterLogo(){
    this.ApiService.partnerfooterlist({"type" : "HiringPartners"}).subscribe((response: any) => {
        if(response.success){
           this.HiringPartners = response.data.HiringPartners;
          //  this.InstitutionalPartners = response.data.InstitutionalPartners;
        }
    })
  }
}
