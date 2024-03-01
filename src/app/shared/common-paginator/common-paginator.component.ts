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
  @Input() totalcount:any;
  @Input() from:any;
  partner:any;
  emp:any;
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
    console.log(pages)
    this.updateVisiblePages();
  }
//  active and inactive paginator
  // private updateVisiblePages(): void {
  //   const length = Math.min(this.totalcount);
  //   const startIndex = Math.max(
  //     Math.min(
  //       this.value - Math.ceil(length / 2),
  //       this.totalcount - length
  //     ),
  //     0
  //   );
  //   this.visiblePages = Array.from(
  //     new Array(length).keys(),
  //     (item) => item + startIndex + 1
  //   );
  // }
  private updateVisiblePages(): void {
  const totalPagesToShow = 5; // Number of pages to show at a time
  const visiblePages = [];
  const currentPage = this.value;
  const totalPageCount = this.totalcount;

  // Calculate the start and end index of the visible pages
  let startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);
  let endPage = Math.min(startPage + totalPagesToShow - 1, totalPageCount);

  // Adjust startPage and endPage if they go out of bounds
  if (endPage - startPage + 1 < totalPagesToShow) {
    startPage = Math.max(endPage - totalPagesToShow + 1, 1);
  }

  // Populate the visible pages array
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  this.visiblePages = visiblePages;
}

}
