import { Component, Input, OnInit, SimpleChange } from '@angular/core';
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

  ngOnChanges(changes: SimpleChange) {
    // console.log(changes,"---demograp")
    if (changes['item']?.currentValue) {
        this.item = changes['item']?.currentValue
    }
  }
  onClick(value) {
    // console.log(value);
    var state = value.split(" ").join("");
    this.router.navigate(["state", state]);
  }

  over_state(value) {
    // console.log(this.item)
    let result = this.item.find(el => el.name == value);

    this.tooltip = result?result:{name:value,total:0};

  }

  out_state(value) {
    this.tooltip = "";
    // console.log(value);
  }


}

