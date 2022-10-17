import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staticpage',
  templateUrl: './staticpage.component.html',
  styleUrls: ['./staticpage.component.scss']
})
export class StaticpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.location.href = "/about/index.html";
  }
}
