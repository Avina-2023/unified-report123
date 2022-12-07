import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-InstitutionalPartner',
  templateUrl: './landing-InstitutionalPartner.component.html',
  styleUrls: ['./landing-InstitutionalPartner.component.scss']
})
export class LandingInstitutionalPartnerComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
