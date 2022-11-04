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
  @ViewChild('mynation', { static: false }) paginator: MatPaginator;

  pagesize = 5;
  status = "all"
  displayedColumns: string[] = ['sno','img', 'employerName', 'industryType', 'spocName', 'spocEmail', 'createdDate', 'status', "action"];
  dataSource = new MatTableDataSource<any>([]);
  tableEmpty:Boolean=false;
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  totalPartnerDashboardCount:number;
  totalPartnerCount :number;
  activePartnerCount :number;
  inActivePartnerCount :number;
  pendingCount:number;
  searchData :string ='';
  fromDate : Date;
  toDate :Date;
  totalPages: number = 1;
  constructor(private ApiService: ApiService, private appconfig: AppConfigService, private toastr: ToastrService) {
    var data = {"filterModel":{"createdBy":{"filterType":"nin","values":["UapAdmin"]}}}
    this.fetchDashboardData();
    this.fetchData(data);
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  selectStatus() {
    var isApproved = this.status == 'active' ? true : this.status == 'inActive' ? false : "-";
    let data : any = {"filterModel":{"createdBy":{"filterType":"nin","values":["UapAdmin"]}}};
    if(this.status == "pending" ){
        data = {
          "filterModel": {
            "isApproved": {
              "filterType": "set",
              "values": [false]
            },
            "isActive": {
              "filterType": "set",
              "values": [false]
            },
            "createdBy":{"filterType":"nin","values":["UapAdmin"]}
          }
        };
    }else if (isApproved != "-") {
      data = {
        "filterModel": {
          "isActive": {
            "filterType": "set",
            "values": [isApproved]
          }, "isApproved": {
            "filterType": "set",
            "values": [true]
          },
          "createdBy":{"filterType":"nin","values":["UapAdmin"]}
        }
      };
    }
    this.fetchData(data);
  }

  fetchDashboardData(){
    this.ApiService.partnerListDashboard().subscribe((partnerListDash: any) => {
      if (partnerListDash.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.totalPartnerDashboardCount = partnerListDash.data.totalCount;
        this.activePartnerCount = partnerListDash.data.activeCount;
        this.inActivePartnerCount = partnerListDash.data.inActiveCount;
        this.pendingCount = partnerListDash.data.pendingCount;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  fetchData(data:any){
    this.ApiService.partnerList(data).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        partnerList.data.forEach((element,index) => {
          element.sno = index+1;
        });
        if(partnerList.data.length==0){
          this.tableEmpty=true
        }else{
          this.tableEmpty=false
        }
        this.dataSource.data = partnerList.data;
        this.totalPartnerCount = partnerList.totalCount;
        this.totalPages = Math.ceil(this.totalPartnerCount/5)
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage()
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  updateStatus(isActive, isApproved, email,userId,firstName) {
    this.ApiService.updatePartnerStatus({ isApproved: isApproved,isActive:isActive, email: email,userId:userId,firstName:firstName }).subscribe((partnerList: any) => {
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

  updatePartner(email) {
    this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.PARTNER.ADDPARTNER,{email:this.ApiService.encrypt(email)});
  }


  searchList() {
    if (this.fromDate == undefined && this.toDate == undefined) {
      this.searchOption();
    } else if (this.fromDate != undefined && this.toDate != undefined) {
      if (this.fromDate <= this.toDate) {
        this.searchOption();
      } else {
        this.toastr.warning('To date must be greater than or equal to from date');
      }
    } else {
      this.toastr.warning('Please enter from and to date');
    }
  }

  clearSearch(){
    this.searchData  ='';
    this.fromDate =null;
    this.toDate =null;
    this.selectStatus()
  }

  searchOption(){
    var val = this.searchData.toLowerCase()
    var filter = { $regex: val, $options: 'i' }
    var isApproved = this.status == 'active' ? true : this.status == 'inActive' ? false : "-";
    let data: any = { "filterModel": { "createdBy": { "filterType": "nin", "values": ["UapAdmin"] },"$or": { "filterType": "or", "values": [{ company: filter }, { industryType: filter }] } } };
    if (this.status == "pending") {
      data = {
        "filterModel": {
          "isApproved": {
            "filterType": "set",
            "values": [false]
          },
          "isActive": {
            "filterType": "set",
            "values": [false]
          },
          "createdBy": { "filterType": "nin", "values": ["UapAdmin"] },
          "$or": { "filterType": "or", "values": [{ company: filter }, { industryType: filter }] }
        }
      };
    } else if (isApproved != "-") {
      data = {
        "filterModel": {
          "isActive": {
            "filterType": "set",
            "values": [isApproved]
          }, "isApproved": {
            "filterType": "set",
            "values": [true]
          },
          "createdBy": { "filterType": "nin", "values": ["UapAdmin"] },
          "$or": { "filterType": "or", "values": [{ company: filter }, { industryType: filter }] }
        }
      };
    }
    if(this.fromDate !=undefined && this.toDate !=undefined){
     data.filterModel.createdAt={filterType: "date", type: "inRange", dateFrom: this.fromDate, dateTo: this.toDate};
    }
    this.fetchData(data);
  }

}
