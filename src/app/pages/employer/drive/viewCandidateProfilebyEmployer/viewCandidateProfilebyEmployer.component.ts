import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from '../../../../utils/app-constants.service';

@Component({
  selector: 'app-viewCandidateProfilebyEmployer',
  templateUrl: './viewCandidateProfilebyEmployer.component.html',
  styleUrls: ['./viewCandidateProfilebyEmployer.component.scss'],
})
export class ViewCandidateProfilebyEmployerComponent implements OnInit {
  routerlink = APP_CONSTANTS.ENDPOINTS;
  personalDetailsMap: any;
  constructor() {}

  ngOnInit() {}
}
