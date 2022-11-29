import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-job-saved-list',
  templateUrl: './job-saved-list.component.html',
  styleUrls: ['./job-saved-list.component.scss']
})
export class JobSavedListComponent implements OnInit {
  public pageNumber: any ;
  public itemsPerPage: any;
  public savedjobs:any;
  public totallength:any
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
        "pageNumber": this.pageNumber? this.pageNumber : 1,
        "itemsPerPage": this.itemsPerPage ? this.itemsPerPage :5,
        "email":email,
        "isSelected": true,
        "sort": "s",
        "specialization": "s"
      };
    this.apiService.candidateJoblist(objDetails).subscribe((res: any) => {
       this.savedjobs = res.data;
      if (res.success) {
        this.savedjobs = res.data;
        this.totallength = this.savedjobs.length
        this.total = Math.ceil(res.totalCount/this.itemsPerPage);
      }
      else {
        this.toastr.warning('Connection failed, Please try again.');
      }
    })
  }
}
