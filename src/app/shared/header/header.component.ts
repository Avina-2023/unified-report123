import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isaccess: boolean;

  constructor(private apiservice: ApiService,private appConfig: AppConfigService) { }

  ngOnInit(): void {
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  logOut() {
   return this.apiservice.logout();
  }
}
