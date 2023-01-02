import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as pdf from "html2pdf.js";
import { ToastrService } from "ngx-toastr";



@Component({
  selector: 'app-resume-template-viewer',
  templateUrl: './resume-template-viewer.component.html',
  styleUrls: ['./resume-template-viewer.component.scss']
})
export class ResumeTemplateViewerComponent implements OnInit {
  @ViewChild('viewer') template1;
  @ViewChild('printer') templatesample;
  thumbnailimage: string;
  FILEURI: string;
  pdf: jsPDF;
  element: any;
  images: any;
  imgData: any;
  options: { width: number; elementHandlers: { '#my-html-template': any; }; };
  fileWidth: number;
  constructor(private toastr: ToastrService,private router: Router, private appConfig: AppConfigService,) { }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.innerWidth = window.innerWidth;

    this.fileWidth = window.innerWidth;
    // console.log(this.fileWidth);
  }


  ngOnInit() {
    // this.getInfo();
  }

  gotoResumePage() {
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.RESUMEBUILDER);
  }


  downloadAsPDF() {
    this.toastr.success('Please wait','PDF is downloading')
    var element = document.getElementById('inner_template');
    var opt = {
      // margin: [0.5,0,1,0],
      filename:  'Resume.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  {scale: 2,useCORS: true},
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all'] }
    };
    pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
      var number_of_pages = pdf.internal.getNumberOfPages()
      var pdf_pages = pdf.internal.pages
      for (var i = 1; i < pdf_pages.length; i++) {
          pdf.setPage(i)
          pdf.setFontSize(9);
          pdf.setTextColor(150);
          // for right align 
          // pdf.text('Page ' + i + ' of ' + number_of_pages, (pdf.internal.pageSize.getWidth() - 0.90 ), (pdf.internal.pageSize.getHeight()-0.35));
          // pdf.text('Page ' + i + ' of ' + number_of_pages, (pdf.internal.pageSize.getWidth() - 4.30 ), (pdf.internal.pageSize.getHeight()-0.25));
      }
    
      }, (err) => {
      }).save();
     
  }

  // generateCanvas() {
  //   var data = this.templatesample.nativeElement;
  //   return html2canvas(data,{useCORS: true})
  // }

  // generateCanvas() {
  //   var data = this.templatesample.nativeElement;
  
  //   // Get the dimensions of the HTML element
  //   let elementWidth = data.offsetWidth;
  //   let elementHeight = data.offsetHeight;
  //   console.log(`Element dimensions: ${elementWidth} x ${elementHeight}`);
  
  //   return html2canvas(data,{useCORS: true}).then((canvas) => {
  //     // Get the dimensions of the canvas element
  //     let canvasWidth = canvas.width;
  //     let canvasHeight = canvas.height;
  //     console.log(`Canvas dimensions: ${canvasWidth} x ${canvasHeight}`);
  
  //     // Check if the canvas dimensions match the element dimensions
  //     if (canvasWidth !== elementWidth || canvasHeight !== elementHeight) {
  //       // Adjust the layout of the HTML element to better fit within the PDF width
  //       // (e.g. reduce the width of any large elements, use a smaller font size, etc.)
  //       console.log("Adjusting layout...");
  //       data.style.width = "90%";
  //       data.style.fontSize = "10px";
  
  //       // Render the HTML element to the canvas again with the adjusted layout
  //       return html2canvas(data,{useCORS: true});
  //     } else {
  //       return canvas;
  //     }
  //   });
  // }

  // generateImage() {
  //   this.generateCanvas().then((canvas) => {
  //     this.thumbnailimage = canvas.toDataURL('image/png');
  //   })
  // }


  // generatePDF() {
  //   this.generateCanvas().then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //    // fileHeight -= 10; // decrease the file height by 10mm to reduce the bottom spacing
  //     // Calculate the maximum dimensions the file can have while still fitting within the PDF document
  //     let maxFileWidth = 210;
  //     let maxFileHeight = 297;
  //     if (fileWidth > maxFileWidth) {
  //       fileHeight = (fileHeight * maxFileWidth) / fileWidth;
  //       fileWidth = maxFileWidth;
  //     }
  //     if (fileHeight > maxFileHeight) {
  //       fileWidth = (fileWidth * maxFileHeight) / fileHeight;
  //       fileHeight = maxFileHeight;
  //     }

  //    // Center the file on the page
  //    let horizontalOffset = (210 - fileWidth) / 2;
  //   //let verticalOffset = (297 - fileHeight) / 2;
  //     let verticalOffset = 10; // adjust this value to control the top spacing
  //     this.FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     //[216, 297]
  //     //let PDF = new jsPDF('p', 'mm', 'legal');
  //     //let margin = 0;
  //     // Set the draw color to white and draw a rectangle that covers the entire page
  //    // PDF.setDrawColor(255, 255, 255);
  //     //PDF.rect(0, 0, 216, 297, 'F');
  //     //let position = 0;
  //     // PDF.addPage();
  //     //PDF.fromHTML(this.template1.nativeElement)
  //     // PDF.addImage(this.FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //    PDF.addImage(this.FILEURI, 'PNG', horizontalOffset, verticalOffset, fileWidth, fileHeight);
  //     //PDF.addImage(this.FILEURI, 'PNG', 0, 0, 210, 297);
  //     PDF.save('resume.pdf');
  //   })



  // }

  // generatePDF(){
  //   let element = document.getElementById('inner_template');

  //   html2pdf().set({
  //     html2canvas: {
  //       scale: 2
  //     },
  //     margin: [0,-15,23,-15],
  //     jsPDF: {
  //       unit: 'mm',
  //       format: 'a4',
  //       orientation: 'portrait',
  //     },
  //   }).from(element).save();
  // }


  /* downloadAsPDF() {
     //this.toastr.success('Please wait','PDF is downloading')
     var element = document.getElementById('inner_template');
     var opt = {
       margin: [0,-20,23,-20],
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
 
      
 
   }*/








}
