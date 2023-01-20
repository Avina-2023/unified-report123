import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})


export class ResumeBuilderComponent implements OnInit {
  @ViewChild('resumeBuild', { static: false }) resumeDialogRef: TemplateRef<any>;
  @ViewChild('preview') preview:ElementRef;
  thumbnailimage: string;
  FILEURI: string;
  constructor(public dialog: MatDialog,private router:Router,private appconfig:AppConfigService,private apiservice:ApiService) { }

  profilePercentage: any;
  options: any;

  ngOnInit() {
    this.profilePercentage = JSON.parse(localStorage.getItem('profilePercentage'));
    // console.log(this.profilePercentage);
  }

  resumeDialog() {
    this.dialog.open(this.resumeDialogRef, {
			panelClass: 'resume_desk_dialog'
		});
	}

  resumeTemplate(){
    if(this.profilePercentage == '100'){
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.RESUMETEMPLATE);
    }
    else{
      this.resumeDialog();
    }
    //this.router.navigateByUrl('/candidateview/findjobs');
  }

  gotoProfile(){
    let emailval = this.appconfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiservice.encryptnew(emailval,environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email);

  }

  // generateCanvas(){
  //   var data = this.preview.nativeElement;
  //   return  html2canvas(this.preview.nativeElement)
  // }
  // generateImage(){
  //   this.generateCanvas().then((canvas)=>{
  //     this.thumbnailimage = canvas.toDataURL('image/png');
  //   })
  // }
  // generatePDF(){
  //   //var data = document.getElementById('pdfconverting');
  //   this.generateCanvas().then((canvas)=>{
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     this.FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(this.FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('resume.pdf');
  //   })
  // }
}
