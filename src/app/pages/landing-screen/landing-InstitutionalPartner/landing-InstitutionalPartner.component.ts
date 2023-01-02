import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landing-InstitutionalPartner',
  templateUrl: './landing-InstitutionalPartner.component.html',
  styleUrls: ['./landing-InstitutionalPartner.component.scss']
})
export class LandingInstitutionalPartnerComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;
  InstitutionalPartners: any;

  constructor(private ApiService: ApiService) {    this.getFooterLogo();
  }
  ngOnInit() {
  }

  getFooterLogo(){
    this.ApiService.partnerfooterlist({"type" : "InstitutionalPartners"}).subscribe((response: any) => {
        if(response.success){
          this.InstitutionalPartners = response.data.InstitutionalPartners;
        }
    })
  }
}
