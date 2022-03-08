import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isaccess: boolean;

  constructor(private apiservice: ApiService,private appConfig: AppConfigService,private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  logOut() {
  this.toastr.warning('You have been logged out successfully');
   return this.apiservice.logout();

  }
}
