import { Component, Input, OnInit } from "@angular/core";
import * as moment from "moment";
import { AppConfigService } from "src/app/utils/app-config.service";

@Component({
  selector: "app-behavioural-pdf-report-download",
  templateUrl: "./behavioural-pdf-report-download.component.html",
  styleUrls: ["./behavioural-pdf-report-download.component.scss"]
})

export class BehaviouralPdfReportDownloadComponent implements OnInit {
  isaccess:any;
  @Input() data;
  highestEducation: any;
  getAllBasicData: any;
  getAllBehaviourData: any;
  getAllBehaviourAPIDetails: any;
  constructor(private appconfig: AppConfigService,) { 

  }

  ngOnInit() {
    this.isaccess = this.appconfig.isComingFromMicroCert();
    if(this.data){
      console.log(this.data,'asdadasd')
      this.getReportData();
    }
  }

  getReportData(){
    this.getAllBehaviourData = this.data.data ? this.data.data : null;
          this.getAllBehaviourAPIDetails = this.data ? this.data : null;
          console.log( this.getAllBehaviourAPIDetails,this.data.data )
          this.getAllBasicData = this.data.basicDetails ? this.data.basicDetails : null;
          console.log(this.data.data.basicDetails ,'this.getAllBasicData')
          this.highestEducation = this.getAllBasicData && this.getAllBasicData.education ? this.getAllBasicData.education : [];
          if (this.highestEducation.length > 0) {
            let i = this.highestEducation.length - 1;
            this.highestEducation = this.highestEducation[i];
          }
  }

  momentForm(date) {
    if (date) {
      const split = moment(date).format('DD/MM/YYYY');
      return split;
    }
  }
}
