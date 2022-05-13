import { environment } from 'src/environments/environment';
import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { imgslide } from '../../../../animations'
import { DragScrollComponent } from 'ngx-drag-scroll';
import { AppConfigService } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss'],
  animations: imgslide
})
export class DocInfoComponent implements OnInit, OnChanges {
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  @ViewChild('viewPDF', {static: false}) viewPDF: TemplateRef<any>;
  @ViewChild('viewImg', {static: false}) viewImg: TemplateRef<any>;
  @Input() getAllReportsData;
  blobkey = environment.blobKey;
  profilePic: any;
  idCardImg: any;
  certificationList: any;
  selectedURL: any;
  counter: number = 0;
  leftNavDisabled = false;
  rightNavDisabled = false;
  isaccess: any;
  constructor( private dialog: MatDialog,private appConfig: AppConfigService ) { }

  ngOnInit(): void {
    this.getDocInfo();
    this.isaccess = this.appConfig.isComingFromMicroCert();
  }

  ngOnChanges() {
    this.getDocInfo();
  }

  getDocInfo() {
    this.profilePic = this.getAllReportsData && this.getAllReportsData.profileImage ? this.getAllReportsData.profileImage : null;
    this.idCardImg = this.getAllReportsData && this.getAllReportsData.IdcardImage ? this.getAllReportsData.IdcardImage : null;
    this.certificationList = this.getAllReportsData && this.getAllReportsData.selfDefinedCertificates && this.getAllReportsData.selfDefinedCertificates.length > 0 ? this.getAllReportsData.selfDefinedCertificates : null;
  }
    // this.selectedURL = 'assets/images/high.jpg' + this.blobkey;
    openDialog(group, templateRef: TemplateRef<any>) {
    if (group.type && group.type.includes('image/')) {
      this.selectedURL = group['url'] + this.blobkey;
      this.dialog.open(this.viewImg, {
        panelClass: 'uploadInProgress',
        // height: '80%',
        // width: '35%',
        disableClose: false });
    }
    if (group.type && group.type.includes('pdf')) {
      this.selectedURL = group['url'] + this.blobkey;
      this.dialog.open(this.viewPDF, {
      panelClass: 'pdfView',
      height: '100%',
      // width: '35%',
      disableClose: false });
    }
    if(group.type && group.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')){
      this.selectedURL = group['url'] + this.blobkey;
    }
  }

  profileDialog(group, templateRef: TemplateRef<any>) {
      this.selectedURL = group + this.blobkey;
      this.dialog.open(templateRef, {
        panelClass: 'uploadInProgress',
        // height: '80%',
        // width: '35%',
        disableClose: false });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  closeDialog1() {
    this.dialog.closeAll();
  }


  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }

}
