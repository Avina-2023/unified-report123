import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';


@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})


export class PartnerListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  status = "all"
  displayedColumns: string[] = ['img', 'employerName', 'createdDate', 'industryType', 'spocName', 'spocEmail', 'status', "action"];
  dataSource = new MatTableDataSource<any>([]);
  totalPartnerCount = 0;
  activePartnerCount = 0;
  inActivePartnerCount = 0;
  constructor(private ApiService: ApiService, private appconfig: AppConfigService, private toastr: ToastrService) {
    var data = {}
    this.ApiService.partnerList(data).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.dataSource.data = partnerList.data
        this.totalPartnerCount = partnerList.totalCount;
        this.activePartnerCount = partnerList.activeCount;
        this.inActivePartnerCount = partnerList.inActiveCount;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });

  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  selectStatus() {
    var isApproved = this.status == 'active' ? true : this.status == 'inActive' ? false : "-";
    let data = {};
    if (isApproved != "-") {
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
        this.dataSource.data = partnerList.data;
        this.totalPartnerCount = partnerList.totalCount;
        this.activePartnerCount = partnerList.activeCount;
        this.inActivePartnerCount = partnerList.inActiveCount;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  updateStatus(status, email) {
    this.ApiService.updatePartnerStatus({ isApproved: status, email: email }).subscribe((partnerList: any) => {
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

  updatePartner(partnerData) {
    this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER, partnerData);
  }

}
