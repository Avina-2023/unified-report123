import { AgChartOptions } from 'ag-charts-community';
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
  value = 50;
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
    { data: [23,12,56,27,43,89,41], backgroundColor: ['#FFC4A3', '#FFBC43', '#C84557', '#BAD252', '#2F9E77', '#1E9FAA', '#C89072', '#786965', '#5F5C5A', '#A889DF', '#AD7CA4', '#847EA6', '#6E87B2', '#8D8C88', '#EF9E6D', '#D29999','#1E94BE','#FFC325','#FFA2A2'], },

  ];
  public barChartLabels: string[] = ['Hydraulics', 'Water Resources', 'Technician','Site Management','python','Java','Angular'];
  selectedMail: any;
  noCard: boolean = true;
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
        this.noCard = true;
      }else{
          this.noCard = false;
      }

    })

  }

}
