import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
//import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as pdf from "html2pdf.js";


@Component({
  selector: 'app-resume-template-viewer',
  templateUrl: './resume-template-viewer.component.html',
  styleUrls: ['./resume-template-viewer.component.scss']
})
export class ResumeTemplateViewerComponent implements OnInit {
  @ViewChild('viewer') template1;
  thumbnailimage: string;
  FILEURI: string;
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

  // generatePDF(){
  //   var data = document.getElementById('pdfconverting');
  //   this.generateCanvas().then((canvas)=>{
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     this.FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     PDF.addPage();
  //     let position = 0;
  //     //PDF.fromHTML(this.template1.nativeElement)
  //     PDF.addImage(this.FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

  //     PDF.save('resume.pdf');
  //   })
  // }


 downloadAsPDF() {
    //this.toastr.success('Please wait','PDF is downloading')
    var element = document.getElementById('inner_template');
    var opt = {
      margin: [20,-20],
      filename:  'resume.pdf',
      // image:        { type: 'jpeg', quality: 1 },
      // html2canvas:  {scale: 2},
      // jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {

      var number_of_pages = pdf.internal.getNumberOfPages()

      var pdf_pages = pdf.internal.pages

      for (var i = 1; i < pdf_pages.length; i++) {

          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(150);
          pdf.text('Page ' + i + ' of ' + number_of_pages, (pdf.internal.pageSize.getWidth()), (pdf.internal.pageSize.getHeight()));

      }

      }, (err) => {

      }).save();

     

  }



  




}
