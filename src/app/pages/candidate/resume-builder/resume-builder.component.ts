import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})

export class ResumeBuilderComponent implements OnInit {
  @ViewChild('resumeBuild', { static: false }) resumeDialogRef: TemplateRef<any>;
  constructor(public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
  }

  resumeDialog() {
    this.dialog.open(this.resumeDialogRef, {
			panelClass: 'resume_desk_dialog'
		});
	}

  resumeTemplate(){
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.RESUMETEMPLATE);
    //this.router.navigateByUrl('/candidateview/findjobs');
  }
  generatePDF(){
    console.log('hlo')
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas=>{
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    })
  }
}
