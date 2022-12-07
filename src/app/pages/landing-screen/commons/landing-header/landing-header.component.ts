import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {

  routerData = APP_CONSTANTS.ROUTES;
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
