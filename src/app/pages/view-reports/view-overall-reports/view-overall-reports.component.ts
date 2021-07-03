import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-overall-reports',
  templateUrl: './view-overall-reports.component.html',
  styleUrls: ['./view-overall-reports.component.scss']
})
export class ViewOverallReportsComponent implements OnInit {

  getAllReportsData: any;
  driveName: any;

  constructor(private toastr: ToastrService, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    const apiData = {
      email: "sr-venkadesh@lntecc.com"
    }
    this.ApiService.getReportsDataAPI(apiData).subscribe((response: any)=> {
      if (response && response.success) {
        this.getAllReportsData = response.data && response.data[0] ? response.data[0] : null;
      } else {
        this.toastr.error('No Reports Available');
        this.getAllReportsData = [];
      }
    });
  }

  getSelectedDriveName(e) {
    if (this.getAllReportsData) {
      this.getAllReportsData.selectedDriveName = e;
      this.driveName = e;      
    }    
  }
}
