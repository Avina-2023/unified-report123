import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-freshGraduate',
  templateUrl: './landing-freshGraduate.component.html',
  styleUrls: ['./landing-freshGraduate.component.scss']
})
export class LandingFreshGraduateComponent implements OnInit {
  @ViewChild('trackScroll', { static: false }) divScroll: ElementRef;
  endPoints = APP_CONSTANTS.ENDPOINTS;
  HiringPartners: any;
  lastScrollPosition: number;



  constructor(private msgData:SentDataToOtherComp) { }
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

}
