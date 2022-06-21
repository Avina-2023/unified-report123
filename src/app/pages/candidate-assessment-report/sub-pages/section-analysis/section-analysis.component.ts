import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from '../../../../services/api.service';
@Component({
  selector: 'app-section-analysis',
  templateUrl: './section-analysis.component.html',
  styleUrls: ['./section-analysis.component.scss']
})
export class SectionAnalysisComponent implements OnInit {
  @ViewChild('matDialog1', {static: false}) matDialogRef1: TemplateRef<any>;
  @Input()getSectionAnalysisDetails;
  @Input() testName;
  TimeTakenMins: number;
  timeTakenSec: any;
  data:any;
  driveId: any;
  email: any;
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
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true,
    });
    this.getSectionWiseComplexityAnalysis();
  }

  getSectionWiseComplexityAnalysis(){
    let data = {
      "driveId": this.driveId,
      "email":  this.email,
      "testName": this.testName,
    }
    this.ApiService.getSectionWiseComplexityAnalysis(data).subscribe((res:any)=>{
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
