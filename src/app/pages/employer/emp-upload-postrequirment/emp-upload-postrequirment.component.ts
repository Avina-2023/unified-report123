import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emp-upload-postrequirment',
  templateUrl: './emp-upload-postrequirment.component.html',
  styleUrls: ['./emp-upload-postrequirment.component.scss'],
})
export class EmpUploadPostrequirmentComponent implements OnInit {
  file: any;
  fileName: '';
  userdetails: any;

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getEmployerDetails();
  }

  getEmployerDetails() {
    var obj = {
      userId: this.apiService.encryptnew(
        localStorage.getItem('email'),
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.getEmployerDetails(obj).subscribe((result: any) => {
      if (result.success) {
        this.userdetails = result;
      } else {
        console.log('failed to load employer details');
      }
    });
  }

  downloadTemplate() {
    const excel = `assets/templates/joblist upload.csv`;
    window.open(excel, '_blank');
  }

  onFileSelected(event) {
    console.log(event);
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }
  }

  saveUploadModel() {
    if (this.file.type == 'text/csv') {
      var UsercompanyId = this.userdetails.data.userId;
      var UsercompanyName = this.userdetails.data.company;
      var UsercompanyLogo = this.userdetails.data.companyImgURL;
      var UsercompanyEmail = this.userdetails.data.email;
      var UserjobList = this.file;
      const fd = new FormData();
      fd.append('companyId', UsercompanyId);
      fd.append('companyName', UsercompanyName);
      fd.append('companyLogo', UsercompanyLogo);
      fd.append('companyEmail', UsercompanyEmail);
      fd.append('jobList', UserjobList);
      this.apiService.uploadExcelFile(fd).subscribe((data: any) => {
        this.toastr.success('File uploaded successfully');
      });
    } else {
      this.toastr.warning('Please upload the correct CSV file');
    }
  }
}
