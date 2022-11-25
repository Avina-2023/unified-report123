import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-job-saved-list',
  templateUrl: './job-saved-list.component.html',
  styleUrls: ['./job-saved-list.component.scss']
})
export class JobSavedListComponent implements OnInit {
  public pageNumber: any = 1;
  public itemsPerPage: any = 5;
  public savedjobs:any;
  public total:any;
  constructor(private apiService: ApiService, private toastr: ToastrService) { }
  ngOnInit() {
    this.savedJobList()
  }
  some(pages){
    let {pageindex,length} = pages
    this.pageNumber=pages.value
    this.savedJobList()
    }

  savedJobList() {
    const email = localStorage.getItem('email')
    var objDetails = {};
      objDetails= {
        "pageNumber": this.pageNumber,
        "itemsPerPage": this.itemsPerPage,
        "email":email,
        "isSelected": true,
        "sort": "s",
        "specialization": "s"
      };
    this.apiService.candidateJoblist(objDetails).subscribe((res: any) => {
       this.savedjobs = res.data;
      if (res.success) {
        this.savedjobs = res.data;
        this.total = Math.ceil(res.totalCount/this.itemsPerPage);
      }
      else {
        this.toastr.warning('Connection failed, Please try again.');
      }
    })
  }
}
