import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss']
})
export class JobListItemComponent implements OnInit {
  public isActive:boolean = true;
  public isDisabled:boolean = true;
  
   @Input() data:any;
   @Input() visibleItems:any
   @Input() savedButton = false;
  constructor() { }
  ngOnInit() {
   console.log('murali',this.data)
  }

}
