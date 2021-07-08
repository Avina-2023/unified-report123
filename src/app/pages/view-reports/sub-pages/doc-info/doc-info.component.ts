import { environment } from 'src/environments/environment';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss']
})
export class DocInfoComponent implements OnInit, OnChanges {
  @Input() getAllReportsData;
  blobkey = environment.blobKey;
  profilePic: any;
  idCardImg: any;
  certificationList: any;
  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: false,
    rtl: false,
    lazyLoad: false
  } 
  constructor() { }

  ngOnInit(): void {
    this.getDocInfo();   
  }

  ngOnChanges() {
    this.getDocInfo();
  }

  getDocInfo() {
    console.log('Docs', this.getAllReportsData);
    this.profilePic = this.getAllReportsData && this.getAllReportsData.profileImage ? this.getAllReportsData.profileImage : null;
    this.idCardImg = this.getAllReportsData && this.getAllReportsData.IdcardImage ? this.getAllReportsData.IdcardImage : null;
    this.certificationList = this.getAllReportsData && this.getAllReportsData.selfDefinedCertificates && this.getAllReportsData.selfDefinedCertificates.length > 0 ? this.getAllReportsData.selfDefinedCertificates : null;
  } 
}
