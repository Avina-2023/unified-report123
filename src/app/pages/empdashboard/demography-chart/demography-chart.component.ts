import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
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
  // public pieChart: GoogleChartInterface = {
  //   chartType: GoogleChartType.PieChart,
  //   dataTable: [
  //     ['Task', 'Hours per Day'],
  //     ['Work',     11],
  //     ['Eat',      2],
  //     ['Commute',  2],
  //     ['Watch TV', 2],
  //     ['Sleep',    7]
  //   ],
  //   //firstRowIsData: true,
  //   options: {'title': 'Tasks'},
  // };
  datatableval = [['Country', 'Population'],
  ['Tamil Nadu', 'Tamil Nadu: 1,363,800,000'],
  ['Orissa', 'Orissa: 1,242,620,000'],
  ['Kerala', 'Kerala: 317,842,000'],
  ['Jarkand', 'Jarkand: 247,424,598'],
  ['Punjab', 'Punjab: 201,032,714'],
  ['Karnataka', 'Karnataka: 186,134,000'],
  ['Bihar', 'Bihar: 500'],
  // ['Andhra Pradesh','Andhra Pradesh:89039']
]
  public geoChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: this.datatableval,
    
    options: {
      region: 'IN', // INDIA
      colorAxis: {colors: ['#00F919', '#0FFFE4', '#1FA20F','#156930','#033E3B']},
      resolution: 'provinces',
      backgroundColor: '#00000',
      datalessRegionColor: '#00000',
      defaultColor: '#00000',
      // width: 600,
      height: 530,
    }
    
    
  };

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

