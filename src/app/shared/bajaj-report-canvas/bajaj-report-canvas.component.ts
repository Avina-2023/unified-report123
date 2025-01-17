import { Component, OnInit ,Input} from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-bajaj-report-canvas',
  templateUrl: './bajaj-report-canvas.component.html',
  styleUrls: ['./bajaj-report-canvas.component.scss']
})
export class BajajReportCanvasComponent implements OnInit {
  @Input ()bgColor:string;
@Input ()score:number;
  // Doughnut
  public doughnutOption: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: false
    },
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return '';

      },
      }
    }
  }
  public loopingArray: any = [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  ];
  public doughnutChartLabels: Label[] = ['', '', ''];
  public doughnutChartData: MultiDataSet = [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  ];
  public chartColors: Color[] = [{
    backgroundColor: []
  }];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    this.score;
    this.setStenScoreColors(Number(this.score));
  }

  setStenScoreColors(stenScore) {
    let array = [];
    for (let index = 0; index < 10; index++) {
        if ((index + 1) <= stenScore) {
        array.push(this.bgColor);
      } else {
        array.push('rgba(195, 197, 202, 1)');
      }
    }
    this.chartColors[0].backgroundColor = array;
  }

}
