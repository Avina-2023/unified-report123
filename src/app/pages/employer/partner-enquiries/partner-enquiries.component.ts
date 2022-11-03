import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';

@Component({
  selector: 'app-partner-enquiries',
  templateUrl: './partner-enquiries.component.html',
  styleUrls: ['./partner-enquiries.component.scss']
})
export class PartnerEnquiriesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['sno','name','designation', 'company', 'email', 'mobile', 'registeredDate'];
  dataSource = new MatTableDataSource<any>([]);
  totalPartnerCount :number;
  searchData :string ='';
  constructor(private ApiService: ApiService, private appconfig: AppConfigService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    var data = {"filterModel":{"createdBy":{"filterType":"set","values":["UapAdmin"]}}}
    this.fetchData(data);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  searchList(){
    var val = this.searchData.toLowerCase()
    var filter = { $regex: val, $options: 'i' }
    var data = {"filterModel":{
      "$or":{"filterType":"or","values":[{company:filter},{designation:filter}]},
      "createdBy":{"filterType":"set","values":["UapAdmin"]}
  }} 
    this.fetchData(data);
  }

  clearSearch(){
    this.searchData  ='';
    this.searchList()
  }


  fetchData(data:any){
    this.ApiService.partnerList(data).subscribe((partnerList: any) => {
      if (partnerList.success == false) {
        this.toastr.warning('Connection failed, Please try again.');
      } else {
        this.dataSource.data = partnerList.data;
        this.totalPartnerCount = partnerList.totalCount;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });
  }

  convertDate(date){
    date = new Date(date)
    
    return date.toDateString();
    //return new Date(date)
  }

}
