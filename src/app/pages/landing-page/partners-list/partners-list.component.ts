import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.scss']
})
export class PartnersListComponent implements OnInit {
  EcosystemPartners:any;
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    dots: false,
    navSpeed: 2000,
    navText: ["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    nav: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 3,
      },
    } 
  };

  customOptionsMobile: OwlOptions = {
    loop: true,
    autoplay: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    dots: false,
    navSpeed: 2000,
    navText: ["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    nav: true,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
    }
  };
  hiringShow: any = true;
  ecosystemShow: any;
  institutionalShow: any;
  HiringPartners: any;
  InstitutionalPartners: any;

  constructor(private ApiService: ApiService,) { 
    this.getFooterLogo();
  }

  ngOnInit(): void {
   
  }

  hiring(){
    this.hiringShow = true;
    this.ecosystemShow = false;
    this.institutionalShow = false

  }
  ecosystem(){
    this.ecosystemShow = true;
    this.hiringShow = false;
    this.institutionalShow = false;
  }
  institutional(){
    this.institutionalShow = true
    this.ecosystemShow = false;
    this.hiringShow = false;
  }

  getFooterLogo(){
    this.ApiService.partnerfooterlist({}).subscribe((response: any) => {
        if(response.success){
           this.EcosystemPartners = response.data.EcosystemPartners;
           this.HiringPartners = response.data.HiringPartners;
           this.InstitutionalPartners = response.data.InstitutionalPartners;
        }
    })
  }
}
