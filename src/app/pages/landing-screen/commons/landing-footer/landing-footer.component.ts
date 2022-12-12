import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss']
})
export class LandingFooterComponent implements OnInit {
  routerData = APP_CONSTANTS.ROUTES;
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
