import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';


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
  
}
