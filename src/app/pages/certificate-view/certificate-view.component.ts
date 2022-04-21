import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificate-view',
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.scss']
})
export class CertificateViewComponent implements OnInit {

  certificateData:any;
  blobToken = environment.blobKey;
  nocard:boolean = false;

  constructor(private apiServiceService: ApiService, private route:ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe(param=>{
       if(param?.certificationID){
        this.getCertificateDetail(param?.certificationID);
       }
      //  else{
      //   this.nocard = true
      //  }
    })
  }
  getCertificateDetail(certificationID){
    // this.apiServiceService.getCertificateDetails(certificationID).subscribe((result:any)=>{
      // if(result.success){
        // this.certificateData = result.data;
        this.certificateData = {};
        // this.nocard = false;
      // }
      // else{
      //   this.nocard = true;
      // }
    // });
  }

}
