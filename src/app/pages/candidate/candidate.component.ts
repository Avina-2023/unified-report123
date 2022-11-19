import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-candidatedash',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  isExpanded = false
  sideNavMode: MatDrawerMode = 'over'
  isShowing: boolean = false;
  routelinks = APP_CONSTANTS.ENDPOINTS
  constructor(public router:Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {

      }
    })
  }

  ngOnInit() {

  }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
