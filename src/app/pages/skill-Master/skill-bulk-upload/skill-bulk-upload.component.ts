import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from '../../../services/api.service';
import { APP_CONSTANTS } from '../../../utils/app-constants.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-skill-bulk-upload',
  templateUrl: './skill-bulk-upload.component.html',
  styleUrls: ['./skill-bulk-upload.component.scss']
})
export class SkillBulkUploadComponent implements OnInit {
  @ViewChild('uploadModel', { static: false }) uploadModel: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  skillMasterListSubscription: Subscription;
  tabSelect = 0;
  fileName = '';
  file: any;
  panelOpenState = false;
  instructionCheck = false;
  validateCheck = false;
  updateCheck = false;
  uploadcheck = false;
  totalCount = 0;
  validateErrorList = [];
  displayedColumns: string[] = ['Skill Name', 'Domain', 'Error', 'Position At'];
  dataSource = new MatTableDataSource<any>([]);
  roles:any;
  orgdetails:any;
  roleCode:any;
  
  constructor(public matDialog: MatDialog, private ApiService: ApiService, private appconfig: AppConfigService, private toastr: ToastrService) {
    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
    this.orgdetails = JSON.parse(this.roles);
    this.roleCode = this.orgdetails && this.orgdetails[0].roles && this.orgdetails[0].roles[0].roleCode;
    if(this.roleCode != "IADM"){
      this.appconfig.routeNavigation('error');
    }
   }

  ngOnInit(): void {
  }

  trimFilename(fileName) {
    if (fileName) {
      let replaceFilename = '';
      replaceFilename = fileName.length > 15 ? fileName.slice(0, 15) + '...' : fileName;
      return replaceFilename;
    }
    return '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changeTab(value) {
    this.tabSelect = value.index;
  }

  nextTab() {
    this.instructionCheck = true;
    this.tabSelect = this.tabSelect + 1;
  }

  previousTab() {
    this.tabSelect = this.tabSelect - 1;
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
    }

  }

  cancleUpload() {
    this.fileName = "";
    this.file = "";
  }


  openUploadModel() {
    this.uploadcheck = false;
    const dialogRef = this.matDialog.open(this.uploadModel, {
      width: '500px',
      height: '270px',
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true,
      panelClass: 'uploadModel'
    });
  }


  uploadModelClose() {
    this.matDialog.closeAll();
  }

  saveUploadModel() {
    if (this.file.type == 'text/csv' || this.file.type == 'ms-excel' || this.file.type == 'application/octet-stream') {
      const fd = new FormData();
      var email = this.appconfig.getLocalStorage('email') ? this.appconfig.getLocalStorage('email') : '';
      var nameIndex = (email.indexOf("@"));
      var name = email.slice(0, nameIndex);
      fd.append("skillFile", this.file);
      fd.append("email", email);
      fd.append("userName", name);
      this.ApiService.skillUploadValidator(fd).subscribe((data: any) => {
        if (data.success == false) {
          this.toastr.warning('Please upload a file with correct headers');
          this.matDialog.closeAll();
        } else {
          if (data.totalCount === 0) {
            this.cancleUpload();
            this.tabSelect = 3;
            this.instructionCheck = false;
            this.updateCheck = true;
            this.matDialog.closeAll();
            this.toastr.success('File uploaded successfully');
          } else {
            this.toastr.warning('Failed to upload the file');
            this.validateCheck = true;
            this.uploadcheck = true;
            this.tabSelect = 2;
            this.validateErrorList = data.data;
            this.dataSource.data = this.validateErrorList;
            this.totalCount = data.totalCount
          }
        }
      }, (err) => {
        this.toastr.warning('Connection failed, Please try again.');
      });
    } else {
      this.uploadModelClose();
      this.toastr.warning('Please upload the correct CSV file');
    }
  }

  navtostep2() {
    this.tabSelect = 1;
    this.instructionCheck = false;
    this.validateCheck = false;
    this.updateCheck = false;
    this.cancleUpload();
  }

  navtoAddSkillList() {
    this.cancleUpload();
    this.tabSelect = 0;
    this.instructionCheck = false;
    this.validateCheck = false;
    this.updateCheck = false;
  }

  navtoViewSkillList() {
    this.cancleUpload();
    this.appconfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.SKILLMASTER.SKILLMASTERLIST);
  }

  downloadTemplate() {
    const excel = `assets/templates/skillmaster.csv`;
    window.open(excel, '_blank');
  }

}
