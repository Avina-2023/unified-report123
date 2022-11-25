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
  @Input() value: PaginationValue = { page: 1, pageSize: 5 };
  @Input() total = 3;
  @Input() visibleRangeLength = 3;
  // @Output() valueChange = new EventEmitter<PaginationValue>();

  public visiblePages: number[];
  constructor() { }


 
  writeValue(value: PaginationValue): void {
    if (!value) return;

    this.value = value;
    this.updateTotalPages();
    this.updateVisiblePages();
  }

  public totalPages: number;
 

  ngOnInit(): void {
    this.updateVisiblePages();
    // console.log(this.valueChange)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total || changes.value) this.updateTotalPages();
  }

  public selectPage(page: number): void {
    console.log(page)
    this.value = { ...this.value, page };
    this.updateVisiblePages();

  }
  public selectPageSize(pageSize: string): void {
    this.value = { page: 1, pageSize: +pageSize };
    this.updateTotalPages();
    this.updateVisiblePages();
    // this.valueChange.emit(this.value);

    
  }


  private updateVisiblePages(): void {
    const length = Math.min(this.totalPages, this.visibleRangeLength);
    const startIndex = Math.max(
      Math.min(
        this.value.page - Math.ceil(length / 2),
        this.totalPages - length
      ),
      0
    );

    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }

  private updateTotalPages(): void {
    this.totalPages = Math.ceil(this.total / this.value.pageSize);
  }
  // ngOnInit(): void {
    //this.updateVisiblePages()
  // }

  // public selectPage(page: number) {
  //   console.log('hlo', page)
  //   this.value = page;
  //   this.updateVisiblePages()
  // }
  // private updateVisiblePages(): void {
  //   const length = Math.min(this.totalPages, this.visibleRangeLength);
  //   const startIndex = Math.max(
  //     Math.min(
  //       this.value - (length / 2),
  //       this.totalPages - length),0);
  //   this.visiblePages = Array.from(
  //     new Array(length).keys(),
  //     (item) => item + startIndex + 1
  //   )

  // }
}
