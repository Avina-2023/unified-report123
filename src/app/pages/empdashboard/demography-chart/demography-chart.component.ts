import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-demography-chart',
  templateUrl: './demography-chart.component.html',
  styleUrls: ['./demography-chart.component.scss']
})
export class DemographyChartComponent implements OnInit {
  router: any;
  tooltip: any;
  countrycode = 'Andhra_Pradesh_2_'
  @Input() item:any;
  constructor() { }

  ngOnInit(): void {

  }
  onClick(value) {
    console.log(value);
    var state = value.split(" ").join("");
    this.router.navigate(["state", state]);
  }

  over_state(value) {
    console.log(this.item)
    this.tooltip = {name:"test",total:599};
    console.log("hello");
    console.log(value);
  }

  out_state(value) {
    this.tooltip = "";
    console.log(value);
  }


}

