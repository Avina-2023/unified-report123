import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landing-hiringPartner',
  templateUrl: './landing-hiringPartner.component.html',
  styleUrls: ['./landing-hiringPartner.component.scss']
})
export class LandingHiringPartnerComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;
  HiringPartners: any;

  constructor(private ApiService: ApiService) {
    this.getFooterLogo();
   }

  ngOnInit() {
  }
 
  getFooterLogo(){
    this.ApiService.partnerfooterlist({"type" : "HiringPartners"}).subscribe((response: any) => {
        if(response.success){
           this.HiringPartners = response.data.HiringPartners;
          //  this.InstitutionalPartners = response.data.InstitutionalPartners;
        }
    })
  }
}
