import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-employers',
  templateUrl: './landing-employers.component.html',
  styleUrls: ['./landing-employers.component.scss']
})
export class LandingEmployersComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { }

  ngOnInit() {
  }

}
