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
  stateDetails:any= [
    {
        "total": 1,
        "name": "Assam"
    },
    {
        "total": 2,
        "name": "Telangana"
    },
    {
        "total": 5005,
        "name": "Tamil Nadu"
    },
    {
        "total": 29,
        "name": "-"
    },
    {
        "total": 1,
        "name": "Andhra Pradesh"
    }
]
  constructor() { }

  ngOnInit(): void {

  }
  onClick(value) {
    // console.log(value);
    var state = value.split(" ").join("");
    this.router.navigate(["state", state]);
  }

  over_state(value) {
    let result = this.item.find(el => el.name == value);

    this.tooltip = result?result:{name:value,total:0};

  }

  out_state(value) {
    this.tooltip = "";
    // console.log(value);
  }


}

