import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-complexity-analysis',
  templateUrl: './complexity-analysis.component.html',
  styleUrls: ['./complexity-analysis.component.scss']
})
export class ComplexityAnalysisComponent implements OnInit, OnChanges {
  @Input()getComplexityDetails;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
            xAxes: [{
                stacked: true,
                grid: {
                  drawTicks: false
                },
                ticks: {
                  max : 100,
                  min : 0,
                  stepSize:10,
                },
                gridLines:{
                  offsetGridLines: false,
                  display:true,
                  borderDash: [7, 3],
                  color: "rgba(112, 112, 112, .4)",
                },
                
            }],
            yAxes: [{
                stacked: true,
                grid: {
                  drawTicks: false
                },
                
                gridLines:{
                  offsetGridLines: false,
                  display: false,
                  borderDash: [1, 3],
                  color: "#b3b3b3"
                }
            }]
        },
    layout:{
      padding: {
        left: 0,
        right: 50,
        top: 20,
        bottom: 0
    }
    },  
    plugins: {
      datalabels: {
        anchor: "center",
        // align: "end",
        color: '#FFFFFF',
        display: function(context) {
          if (context.dataset.data[context.dataIndex]) {
            return true;
          }
          return false;
      },
        font: {
          size: 14,
          weight: "normal"
        },
      }
    },  
  };


  barChartLabels:any = [];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = false;
  

  public barChartData: any[] = [
    { data: [], label: 'Correct Answer' },
    { data: [], label: 'Incorrect Answer' },
    { data: [], label: 'Unanswered' },
    { data: [], label: 'Unseen' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.chartValueMapping();
  }

  chartValueMapping() {
    let correct:any = [];
    let inCorrect:any = [];
    let unAnswered:any = [];
    let unseen:any = [];
    let barLabels = []
    if(this.getComplexityDetails && this.getComplexityDetails.complexityData){
      this.getComplexityDetails.complexityData.forEach(element => {
        barLabels.push(element.complexity);
        correct.push(element.correct)
        inCorrect.push(element.inCorrect)
        unAnswered.push(element.unAnswered)
        unseen.push(element.unseen)
        });
    }


    this.barChartLabels = barLabels;
    this.barChartData = [
      {
        data: correct,
        label: 'Correct Answer',
        barThickness: 30,
        backgroundColor: ['#7AC169', '#7AC169', '#7AC169', '#7AC169'],
        hoverBackgroundColor: ['#7AC169', '#7AC169', '#7AC169', '#7AC169']
      },       
      {
        data: inCorrect,
        label: 'Incorrect Answer',
        barThickness: 30,
        backgroundColor: ['#C15D5D', '#C15D5D', '#C15D5D', '#C15D5D'],
        hoverBackgroundColor: ['#C15D5D', '#C15D5D', '#C15D5D', '#C15D5D']
      },
      {
        data: unAnswered,
        label: 'Unanswered',
        barThickness: 30,
        backgroundColor: ['#588FB7', '#588FB7', '#588FB7', '#588FB7'],
        hoverBackgroundColor: ['#588FB7', '#588FB7', '#588FB7', '#588FB7']
      },
      {
        data: unseen,
        label: 'Unseen',
        barThickness: 30,
        backgroundColor: ['#D3D3D3', '#D3D3D3', '#D3D3D3', '#D3D3D3'],
        hoverBackgroundColor: ['#D3D3D3', '#D3D3D3', '#D3D3D3', '#D3D3D3']
      },
    ]
  }
}
