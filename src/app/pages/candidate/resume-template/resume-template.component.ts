import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';


@Component({
  selector: 'app-resume-template',
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.scss']
})
export class ResumeTemplateComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoResumePage(){
    this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.RESUMEBUILDER);
  }

  
}
