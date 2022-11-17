import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
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
}
