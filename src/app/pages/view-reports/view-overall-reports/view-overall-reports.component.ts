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

  constructor(private toastr: ToastrService, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.ApiService.getReportsData().subscribe((response: any)=> {
      console.log('response', response);
      if (response && response.success) {
        this.getAllReportsData = response.data;
      } else {
        this.toastr.error('No Reports Available');
        this.getAllReportsData = [];
      }
    });
  }

}
