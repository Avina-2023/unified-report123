import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.scss']
})
export class JobDashboardComponent implements OnInit {

  dashboardCards: any = [
    {
      'name': 'jobs Available',
      'count': "60"
    },
    {
      'name': 'jobs Applied',
      'count': "62"
    },
    {
      'name': 'Profile Viewed',
      'count': "23"
    },
    {
      'name': 'Shortlisted',
      'count': "10"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
