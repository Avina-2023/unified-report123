import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {

  jobCards = [
    { count: 300, title: 'Total No of Jobs Posted', Img:'../../../../assets/images/job-post.png' },
    { count: 400, title: 'Total No of Students Applied',Img:'../../../../assets/images/stu-applied.png' },
    { count: 500, title: 'Total No of Students Shortlisted',Img:'../../../../assets/images/stu-shortlist.png' },
    { count: 600, title: 'Total No of Profile Viewed',Img:'../../../../assets/images/profile-viewed.png' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
