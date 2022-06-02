import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-blooms-taxonomy',
  templateUrl: './blooms-taxonomy.component.html',
  styleUrls: ['./blooms-taxonomy.component.scss']
})
export class BloomsTaxonomyComponent implements OnInit {
  @Input()getTaxonomyDetails;
  @ViewChild('matDialog1', {static: false}) matDialogRef1: TemplateRef<any>;
  @Input() testName;
  TimeTakenMins: number;
  timeTakenSec: any;
  driveId: any;
  email: any;
  data: any;
  constructor(public matDialog: MatDialog,private ApiService: ApiService,private toast: ToastrService,private appConig : AppConfigService) {
    this.driveId = this.appConig.getSessionStorage('driveInfo') ? this.appConig.getSessionStorage('driveInfo') : '';
    this.email = this.appConig.getSessionStorage('email') ? this.appConig.getSessionStorage('email') : '';
   }

  ngOnInit(): void {
  }

  getTimetaken(takenTime){
    if(takenTime){
      let convertTime1 = takenTime.toString();
      let SplitTime1 = convertTime1.split(/([.])/);
      this.TimeTakenMins = parseInt(SplitTime1[0]);
      let sec = '0.' + SplitTime1[2];
      let conIntoSec = parseFloat(sec) * 60;
      this.timeTakenSec = conIntoSec.toFixed(0);
    }else {
      this.TimeTakenMins = 0;
      this.timeTakenSec = 0;
    }
  }

  open(){
    const dialogRef = this.matDialog.open(this.matDialogRef1, {
      width: '992px',
      height: '554px',
      autoFocus: false,
      closeOnNavigation: true,
    });
    this.getTaxonomyWiseComplexityAnalysis();
  }

  getTaxonomyWiseComplexityAnalysis(){
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.testName,
    }
    this.ApiService.getTaxonomyWiseComplexityAnalysis(data).subscribe((res:any)=>{
      if(res.success){
          this.data = res.data;
      }else{
        this.toast.warning(res.message)
      }
    })
  }

  closeBox() {
    this.matDialog.closeAll();
  }

}
