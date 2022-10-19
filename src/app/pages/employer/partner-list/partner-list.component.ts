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
  totalPartnerCount :number;
  activePartnerCount :number;
  inActivePartnerCount :number;
  pendingCount:number;
  searchData :string ='';
  fromDate : Date;
  toDate :Date;
  constructor(private ApiService: ApiService, private appconfig: AppConfigService, private toastr: ToastrService) {
    var data = {"filterModel":{"createdBy":{"filterType":"nin","values":["UapAdmin"]}}}
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

  fetchData(data:any){
    this.ApiService.partnerList(data).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.dataSource.data = partnerList.data;
        this.totalPartnerCount = partnerList.totalCount;
        this.activePartnerCount = partnerList.activeCount;
        this.inActivePartnerCount = partnerList.inActiveCount;
        this.pendingCount = partnerList.pendingCount;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  updateStatus(isActive, isApproved, email,id,firstName) {
    this.ApiService.updatePartnerStatus({ isApproved: isApproved,isActive:isActive, email: email,id:id,firstName:firstName }).subscribe((partnerList: any) => {
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

  convertDate(date){
    date = new Date(date)
    
    return date.toDateString();
    //return new Date(date)
  }

  searchList() {
    if(this.fromDate == undefined && this.toDate == undefined){
      this.searchOption();
    }else if( this.fromDate !=undefined && this.toDate !=undefined){
      this.searchOption();
    }else{
      this.toastr.warning('Please enter from and to date');
    }
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
