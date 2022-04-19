
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-candidate-skills',
  templateUrl: './candidate-skills.component.html',
  styleUrls: ['./candidate-skills.component.scss']
})
export class CandidateSkillsComponent implements OnInit {
  barChartPlugins:any
  candidateSkills:any = [];
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
  constructor( private route: ActivatedRoute,private apiService: ApiService,) {
  
   }

  ngOnInit(): void {
      this.getRoute();

  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        this.selectedMail = param.params.id;
        this.getCandidateData(this.selectedMail);
      }
    });
  }



  getCandidateData(email){
    let data = {
      email : email ? email : ''
    }
    this.apiService.getCandidateSkills(data).subscribe((results:any)=>{
      if(results.success){
        this.candidateSkills = results && results.data ? results.data[0] : '';
        this.top3jobs =  this.candidateSkills.jobrole.slice(0, 3);
        this.formateBarChartData();
        this.noCard = true;
      }else{
          this.noCard = false;
      }
    })
  }



   formateBarChartData(){
    this.jobFitGap = this.candidateSkills.jobrole.splice(3);
    this.jobFitGap.forEach(element => {
      this.barChartLabels.push(element.jobname);
      this.barChartValue.push(element.calculationScore);
      this.barChartColorCode.push(element.colorCode);
      this.barChartData = [
        {
          data: this.barChartValue,
          backgroundColor:this.barChartColorCode,
          hoverBackgroundColor:this.barChartColorCode,
          barThickness: 50,
        }
      ];
     });
   }

}
