import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competency-areas',
  templateUrl: './competency-areas.component.html',
  styleUrls: ['./competency-areas.component.scss']
})
export class CompetencyAreasComponent implements OnInit { 
  @Input() getAllReportsData;
  competancyData = [];
  view: any[] = [350, 350]; 
  // viewhori: any[] = [400, 125];   
  // showXAxis = true;
  // showXAxishori = false;
  // showYAxis = true;
  // gradient = false;
  // showLegend = false;
  // showXAxisLabel = true; 
  // showYAxisLabel = true; 
  // showGridLines = true;
  // showGridLineshori = false;
  // roundEdges = false; 
  // colorScheme = {
  //   domain: ['#c84656', '#dfbd3f', '#68d886', '#95c923', '#fec623']
  // };
  // colorSchemeHori = {
  //   domain: ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694']
  // };

  Skills = [50, 80, 90, 50, 70];
  Skills1 = [];
  competencieslabels = [];
  skilllabels = [];


  constructor() { 
  }

  ngOnInit(): void {
  this.getCompetancyData();
  }

  ngOnChanges() {
    this.getCompetancyData();
  }


  onSelect(event) {
    console.log(event);
  }

  getCompetancyData(){
    console.log('adad', this.getAllReportsData);    
    let horiSkilles = [];
    this.competancyData = this.getAllReportsData?.competencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {
      this.competancyData?.forEach(labNames => {
        this.competencieslabels.push(labNames?.competencyname);
        console.log( this.competencieslabels,' this.competencieslabels')
        });
        horiSkilles.push(this.competancyData ? this.competancyData[0].skills:'');
        horiSkilles?.forEach(element => {
          element?.forEach(element1 => {
            this.skilllabels.push(element1?.skillname)
            this.Skills1.push(element1?.score)
           });
        });
      }    
    }

}
