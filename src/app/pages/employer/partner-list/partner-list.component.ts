import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})


export class PartnerListComponent implements OnInit {
  status = "all"
  displayedColumns: string[] = ['img', 'employerName', 'createdDate', 'industryType', 'spocName', 'spocEmail', 'status', "action"];
  dataSource: any;

  constructor(private ApiService: ApiService, private toastr: ToastrService) {
    var data = {}
    this.ApiService.partnerList(data).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.dataSource = partnerList
        console.log("---->",partnerList)
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });

  }

  ngOnInit(): void {
  }

  selectStatus() {
    var isApproved = this.status == 'active' ? true : this.status == 'inActive' ? false : "-";
    let data = {};
    if ( isApproved !="-") {
      data = {
        "filterModel": {
          "isApproved": {
            "filterType": "set",
            "values": [isApproved]
          }
        }
      };
    }
    this.ApiService.partnerList(data).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.dataSource = partnerList
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  updateStatus(status,email){
    this.ApiService.updatePartnerStatus({isApproved:status,email:email}).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.selectStatus()
        this.toastr.success('Status updated Successfully');
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }



}
