import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(    private appConfig: AppConfigService) { }

  ngOnInit(): void {
  }
  routeToHome() {
    this.appConfig.routeNavigation('/');
  }
}
