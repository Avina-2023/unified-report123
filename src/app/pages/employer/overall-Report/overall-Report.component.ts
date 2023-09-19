import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {AppConfigService} from 'src/app/utils/app-config.service'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-overall-Report',
  templateUrl: './overall-Report.component.html',
  styleUrls: ['./overall-Report.component.scss']
})
export class OverallReportComponent implements OnInit {

  constructor(
    private apiService:ApiService,
    private appConfig:AppConfigService
  ) { }

  ngOnInit() {
  }

}
