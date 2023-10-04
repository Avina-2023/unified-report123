import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ApiService } from 'src/app/services/api.service';
import {AppConfigService} from 'src/app/utils/app-config.service'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-overall-Report',
  templateUrl: './overall-Report.component.html',
  styleUrls: ['./overall-Report.component.scss']
})
export class OverallReportComponent implements OnInit {
  overallreportdata: any;
  colorconfig = [
    {
      color: '#DC3545',
      bgcolor: '#DC354514'
    },
    {
      color: '#007BFF',
      bgcolor: '#007BFF14'
    },
    {
      color: '#FFC107',
      bgcolor: '#FFC10714'
    },
    {
      color: '#7388A9',
      bgcolor: '#FFC10714'
    }
  ]

  constructor(
    private apiService:ApiService,
    private appConfig:AppConfigService
  ) { }

  ngOnInit() {
    this.getOverAllReport();
  }

  getOverAllReport(){
    this.apiService.getOverAllReport(data).subscribe((response: any) => {
      if (response.success){
        this.overallreportdata = response.data
        console.log(this.overallreportdata,'overallreportdata');
      }
    })
  }

}
