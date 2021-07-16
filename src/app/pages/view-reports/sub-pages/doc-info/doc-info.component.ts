import { environment } from 'src/environments/environment';
import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { imgslide } from '../../../../animations'
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss'],
  animations: imgslide
})
export class DocInfoComponent implements OnInit, OnChanges {
  @ViewChild(DragScrollComponent) ds: DragScrollComponent;
  @Input() getAllReportsData;
  blobkey = environment.blobKey;
  profilePic: any;
  idCardImg: any;
  certificationList: any; 
  selectedURL: any;
  counter: number = 0;
  leftNavDisabled = false;
  rightNavDisabled = false; 
  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getDocInfo();   
  }

  ngOnChanges() {
    this.getDocInfo();
  }

  getDocInfo() {
    console.log('Docs', this.getAllReportsData);
    this.profilePic = this.getAllReportsData && this.getAllReportsData.profileImage ? this.getAllReportsData.profileImage : null;
    this.idCardImg = this.getAllReportsData && this.getAllReportsData.IdcardImage ? this.getAllReportsData.IdcardImage : null;
    this.certificationList = this.getAllReportsData && this.getAllReportsData.selfDefinedCertificates && this.getAllReportsData.selfDefinedCertificates.length > 0 ? this.getAllReportsData.selfDefinedCertificates : null;
  } 
  openDialog(group, templateRef: TemplateRef<any>) {
    if (group.type.includes('image') || true) {
      this.selectedURL = group['url'] + this.blobkey;
      this.dialog.open(templateRef, {   
        panelClass: 'uploadInProgress', 
        height: '60%', 
        width: '35%', 
        disableClose: true });  
    } else {

    }
  }
  closeDialog() {
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
