import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landing-employers',
  templateUrl: './landing-employers.component.html',
  styleUrls: ['./landing-employers.component.scss']
})
export class LandingEmployersComponent implements OnInit {
  endPoints = APP_CONSTANTS.ENDPOINTS;
  HiringPartners: any;

  constructor(private ApiService: ApiService) {
    this.getFooterLogo();

   }

  ngOnInit() {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    autoplay: true,
    autoplaySpeed: 150,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };


  getFooterLogo(){
    this.ApiService.partnerfooterlist({}).subscribe((response: any) => {
        if(response.success){
           this.HiringPartners = response.data.HiringPartners;
        }
    })
  }
}
