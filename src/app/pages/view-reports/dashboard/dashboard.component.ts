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
  sdk = new ChartsEmbedSDK({
    baseUrl: environment.MONGOCHARTURL,
    showAttribution: false
  });
  constructor( private appConfig: AppConfigService,private sendData: SentDataToOtherComp) {
   
  }

  ngOnInit(): void {
    this.sendData.sendMessage(true,'go');
    this.isaccess = this.appConfig.isComingFromMicroCert(); 
    if(this.isaccess){
      setTimeout(() => {
        this.GetMongoCharts(); 
      }, 500);
    }   
  }


  GetMongoCharts(){
    this.dashboard = this.sdk.createDashboard({
      dashboardId: '62751917-2c86-4776-81b4-5b281737ef06',
      // height: 100
      // filter:{batchid:this.BatchValue}
  
    });
    this.dashboard.render(document.getElementById('mongocharts')).then(() =>{
    });
  }

}
