import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complexity-analysis',
  templateUrl: './complexity-analysis.component.html',
  styleUrls: ['./complexity-analysis.component.scss']
})
export class ComplexityAnalysisComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
  };


  public barChartLabels: string[];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = false;
  

  public barChartData: any[] = [
    { data: [], label: 'Volume Sales' },
    { data: [], label: 'Value Sales' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
