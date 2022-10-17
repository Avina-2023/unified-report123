import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-demography-chart',
  templateUrl: './demography-chart.component.html',
  styleUrls: ['./demography-chart.component.scss']
})
export class DemographyChartComponent implements OnInit {
  router: any;
  tooltip: string;
  countrycode = 'Andhra_Pradesh_2_'
  constructor() { }

  ngOnInit(): void {

  }
  onClick(value) {
    console.log(value);
    var state = value.split(" ").join("");
    this.router.navigate(["state", state]);
  }

  over_state(value) {
    this.tooltip = value;
    console.log("hello");
    console.log(value);
  }

  out_state(value) {
    this.tooltip = "";
    console.log(value);
  }


}

