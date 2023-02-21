import { Component,ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';

@Component({
  selector: 'app-landing-InstitutionalPartner',
  templateUrl: './landing-InstitutionalPartner.component.html',
  styleUrls: ['./landing-InstitutionalPartner.component.scss']
})
export class LandingInstitutionalPartnerComponent implements OnInit {
  @ViewChild('trackScroll', { static: false }) divScroll: ElementRef;
  endPoints = APP_CONSTANTS.ENDPOINTS;
  InstitutionalPartners: any;
  lastScrollPosition: any;

  constructor(private ApiService: ApiService, private msgData:SentDataToOtherComp) {    this.getFooterLogo();
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
    //   myElement.style.background = 'white';
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
    this.ApiService.partnerfooterlist({"type" : "InstitutionalPartners"}).subscribe((response: any) => {
        if(response.success){
          this.InstitutionalPartners = response.data.InstitutionalPartners;
        }
    })
  }
}
