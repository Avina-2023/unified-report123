import { Component, OnInit, forwardRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface PaginationValue {
  page: number;
  pageSize: number;
}
@Component({
  selector: 'app-common-paginator',
  templateUrl: './common-paginator.component.html',
  styleUrls: ['./common-paginator.component.scss'],

})

export class CommonPaginatorComponent implements OnInit {
  public value = 1;
  public totalPages = 10;
  // public visibleRangeLength = 5;
  public visiblePages: number[];
  @Output() send = new EventEmitter;
  @Input() totalcount:any ;
  @Input() from:any;
  constructor() { }
  ngOnInit(): void {


  }
  ngOnChanges() {
    this.updateVisiblePages();
  }
  // select paginator number
  public selectPage(page: number): void {
    this.value = page;
    let pages = {
      "value":this.value,
      // "length":this.visibleRangeLength
    }
    this.send.emit(pages)
    this.updateVisiblePages();
  }
//  active and inactive paginator
  private updateVisiblePages(): void {
    const length = Math.min(this.totalcount);
    const startIndex = Math.max(
      Math.min(
        this.value - Math.ceil(length / 2),
        this.totalcount - length
      ),
      0
    );
    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }
}
