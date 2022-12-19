import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


@Component({
  selector: 'app-resume-template-viewer',
  templateUrl: './resume-template-viewer.component.html',
  styleUrls: ['./resume-template-viewer.component.scss']
})
export class ResumeTemplateViewerComponent implements OnInit {
  @ViewChild('viewer') template1;
  thumbnailimage: string;
  constructor(private router:Router,private appConfig: AppConfigService,) { }

  ngOnInit() {
    // this.getInfo();
  }

  gotoResumePage(){
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.RESUMEBUILDER);
  }

  generateCanvas(){
    var data = this.template1.nativeElement;
    return  html2canvas(data)
  }

  generateImage(){
    this.generateCanvas().then((canvas)=>{
      this.thumbnailimage = canvas.toDataURL('image/png');
    })
  }

  generatePDF(){
    var data = document.getElementById('pdfconverting');
    this.generateCanvas().then((canvas)=>{
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('resume.pdf');
    })
  }





}
