import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-about',
  templateUrl: './landing-about.component.html',
  styleUrls: ['./landing-about.component.scss']
})
export class LandingAboutComponent implements OnInit {

  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
