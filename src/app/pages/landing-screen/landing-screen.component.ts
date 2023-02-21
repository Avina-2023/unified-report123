import { Component, OnInit,Renderer2, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.scss']
})
export class LandingScreenComponent implements OnInit {
  private lastScrollPosition = 0;
  scrollCheck: any;
  constructor(private renderer: Renderer2, private el: ElementRef, private msgData:SentDataToOtherComp) {

    this.msgData.getMessage().subscribe((arg) => {
      console.log(arg)
      // const navbar = this.navbar.nativeElement;
      // this.renderer.addClass(navbar, 'hide');
    });
  }
  @ViewChild('headwrap', {static: false}) navbar: ElementRef;


  ngOnInit() {

this.msgData.getMessage().subscribe((data)=>{
  if(data.data=='hide'){
    console.log(data.value,'jjjj');
this.scrollCheck = data.value
    // if(data.value){
    //   this.renderer.addClass(this.navbar, 'hide');
    // }else{
    //   this.renderer.removeClass(this.navbar, 'hide');
    // }

  }
})
  }


}
