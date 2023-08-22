import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
@Component({
  selector: 'app-common-banner',
  templateUrl: './common-banner.component.html',
  styleUrls: ['./common-banner.component.scss']
})
export class CommonBannerComponent implements OnInit {
  checkRouter: string;
  username: any;
  getCurrentUrl:any
  @Input() name: string;
  @Input() subname:string;
  constructor(private router: Router, private activatedRoute:ActivatedRoute,private location: Location) {
    this.checkRouter = this.router.url;
  }

  ngOnInit(): void {
     this.getCurrentUrl =this.activatedRoute.snapshot.routeConfig.path
    this.username = localStorage.getItem('name');
  }

  goBack(){
    this.location.back();
  }


}
