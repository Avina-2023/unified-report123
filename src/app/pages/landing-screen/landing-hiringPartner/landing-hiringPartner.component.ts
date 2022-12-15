import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-hiringPartner',
  templateUrl: './landing-hiringPartner.component.html',
  styleUrls: ['./landing-hiringPartner.component.scss']
})
export class LandingHiringPartnerComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
