import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[scrollTrack]'
})
export class ScrollTrackDirective {
  @Input() scrollTrack: any;

  lastScrollPosition: number = 0;
  msgData: any;

  constructor(private element:ElementRef) { }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    const currentScrollPosition = this.element.nativeElement.scrollTop
    console.log(currentScrollPosition,'scroll');
    if (this.lastScrollPosition < currentScrollPosition ) {
      this.msgData.sendMessage('hide',true)
    } else {
      this.msgData.sendMessage('hide',false)
    }
    this.lastScrollPosition = currentScrollPosition;
  }

}
