import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  jobdata: any;
  
  constructor(
    private ApiService: ApiService,
    private appconfig: AppConfigService
  ) { }

  ngOnInit() {
    //on click on edit in ag-grid table it'll get data particular rowdata from localstorage
    let localjobData = JSON.parse(this.appconfig.getLocalStorage('openJobData'));
    this.jobdata = this.appconfig.jobData ? this.appconfig.jobData : localjobData;
    console.log(this.jobdata,'data for edit job page');
  }

}
