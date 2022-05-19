import { Component, OnInit } from '@angular/core';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard:any;
  isaccess: boolean;
  adminDashboardId = "62751917-2c86-4776-81b4-5b281737ef06";
  ASAPDashboardId = "627e1615-ac96-47e5-872a-4accc918dfe0";
  sdk = new ChartsEmbedSDK({
    baseUrl: environment.MONGOCHARTURL,
    showAttribution: false
  });
  OrgInfo: any;
  constructor(private appConfig: AppConfigService,private sendData: SentDataToOtherComp) {

 
  }

  ngOnInit(): void {
    this.sendData.sendMessage(true,'go');
    this.isaccess = this.appConfig.isComingFromMicroCert(); 
    this.OrgInfo = this.appConfig.getLocalStorage('role') ? this.appConfig.getLocalStorage('role') : '';
    if(this.OrgInfo){
      this.getRole(this.OrgInfo);
    }   
  }


  GetMongoCharts(id){
    this.dashboard = this.sdk.createDashboard({
      dashboardId: id,
    });
    this.dashboard.render(document.getElementById('mongocharts')).then(() =>{
    });
  }

  getRole(orgInfo){
    let org = JSON.parse(orgInfo);
     if(org && org[0].orgName === 'L&T asap'){
      if(this.isaccess){
        setTimeout(() => {
          this.GetMongoCharts(this.ASAPDashboardId); 
        }, 500);
      } 
     }else {
      if(this.isaccess){
        setTimeout(() => {
          this.GetMongoCharts(this.adminDashboardId); 
        }, 500);
      } 
     }
  }

}
