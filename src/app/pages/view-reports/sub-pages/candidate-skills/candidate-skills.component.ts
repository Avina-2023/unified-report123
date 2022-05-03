
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-candidate-skills',
  templateUrl: './candidate-skills.component.html',
  styleUrls: ['./candidate-skills.component.scss']
})
export class CandidateSkillsComponent implements OnInit {
  @Input() getAllReportsData;
  @Input() candidateSkills;
  barChartPlugins:any
  candidateSkillData:any = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 230,
        right:25,
      }
    },

    scales : {
      yAxes: [{
        // display:true,
          ticks: {
            callback: (label: any) => {
              return label.length > 20 ? label.substr(0, 20) + '...' : label;
            },
            mirror: true,
            padding: 140,
            fontSize:16,
          },
      }],
      xAxes: [{

        ticks: {
          max : 100,
          min : 0,
          stepSize:10,

        }

        }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 10,
        }
      }
    }


  };
  public barChartData: ChartDataSets[] = [
    { data: [], backgroundColor: [],hoverBackgroundColor:[],},

  ];
  public barChartLabels: string[] = [];
  selectedMail: any;
  noCard: boolean = true;
  top3jobs: any;
  jobFitGap: any;
  barChartValue: any = [];
  barChartColorCode: any=[];
  personalInfo: any;
  constructor() {
   }

  ngOnInit(): void {
      this.getCandidateData();
  }

  getCandidateData(){
        this.candidateSkillData = this.candidateSkills;
        this.top3jobs =  this.candidateSkillData.jobrole.slice(0, 3);
        this.formateBarChartData();

  }


   formateBarChartData(){
    this.jobFitGap = this.candidateSkills.jobrole.splice(3);
    console.log( this.jobFitGap,' this.jobFitGap')
    this.jobFitGap.forEach(element => {
      this.barChartLabels.push(element.jobname);
      this.barChartValue.push(element.calculationScore);
      this.barChartColorCode.push(element.colorCode);
      this.barChartData = [
        {
          data: this.barChartValue,
          backgroundColor:this.barChartColorCode,
          hoverBackgroundColor:this.barChartColorCode,
          barThickness: 30,
        }
      ];
     });
   }
}
