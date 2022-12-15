import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-freshGraduate',
  templateUrl: './landing-freshGraduate.component.html',
  styleUrls: ['./landing-freshGraduate.component.scss']
})
export class LandingFreshGraduateComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
