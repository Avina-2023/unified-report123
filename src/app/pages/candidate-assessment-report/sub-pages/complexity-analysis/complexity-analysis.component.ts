import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-complexity-analysis',
  templateUrl: './complexity-analysis.component.html',
  styleUrls: ['./complexity-analysis.component.scss']
})
export class ComplexityAnalysisComponent implements OnInit {
  @Input()getComplexityDetails;
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
    let correct:any = []
    let inCorrect:any = []
    let unAnswered:any = []
    let unseen:any = []
    console.log(this.getComplexityDetails,'getComplexityDetails')
    this.getComplexityDetails.complexityData.forEach(element => {
    this.barChartLabels.push(element.complexity);
  
    correct.push(element.correct)
    inCorrect.push(element.inCorrect)
    unAnswered.push(element.unAnswered)
    unseen.push(element.unseen)
    // this.barChartData = [{
    //   data: element,
    // }
       
    // ]
    
    });
    // console.log(correct,'correct')
    // console.log(inCorrect,'inCorrect')
    // console.log(unAnswered,'unAnswered')
    // console.log(unseen,'unseen')
  }

}
