import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss']
})
export class NoDataFoundComponent implements OnInit {

  @Input() from:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  findjobs(){
    this.router.navigate(['/candidateview/findjobs'])
  }

}
