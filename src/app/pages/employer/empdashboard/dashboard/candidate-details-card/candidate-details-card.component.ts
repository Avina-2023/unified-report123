import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-details-card',
  templateUrl: './candidate-details-card.component.html',
  styleUrls: ['./candidate-details-card.component.scss']
})
export class CandidateDetailsCardComponent implements OnInit {

  constructor(
    public router:Router,
  ) { }

  ngOnInit() {
  }

  dashboard(){
    this.router.navigate(['/auth/partner/jobrequirment'])
  }
}
