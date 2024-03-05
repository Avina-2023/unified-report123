import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  myNav:any
  routerData = APP_CONSTANTS.ROUTES;
  endPoints = APP_CONSTANTS.ENDPOINTS;
  visible:boolean = false
  constructor(public router:Router) { }



  ngOnInit() {
 
  }
  footerTrigger(){
    this.visible = !this.visible
  }

}
