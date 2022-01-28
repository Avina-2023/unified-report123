import { Component, OnInit, Input } from "@angular/core";
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-roundcanvas',
  templateUrl: './roundcanvas.component.html',
  styleUrls: ['./roundcanvas.component.scss']
})
export class RoundcanvasComponent implements OnInit {
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
  
    constructor() { 
  
    }
  
    ngOnInit() {
      this.score;
      setTimeout(() => {
        this.setStenScoreColors(Number(this.score));
      }, 10);
    
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