import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competency-areas',
  templateUrl: './competency-areas.component.html',
  styleUrls: ['./competency-areas.component.scss']
})
export class CompetencyAreasComponent implements OnInit { 
  @Input() getAllReportsData;
  competancyData = [];
  areasName = [];
  view: any[] = [350, 350]; 
  viewhori: any[] = [400, 125];   
  showXAxis = true;
  showXAxishori = false;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true; 
  showYAxisLabel = true; 
  showGridLines = true;
  showGridLineshori = false;
  roundEdges = false; 
  colorScheme = {
    domain: ['#c84656', '#dfbd3f', '#68d886', '#95c923', '#fec623']
  };
  colorSchemeHori = {
    domain: ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694']
  };

  Skills = [];
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
    // console.log('adad', this.getAllReportsData);    
    let horiSkilles = [];
    let areas = [];
    this.competancyData = this.getAllReportsData?.competencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {
      this.competancyData?.forEach(labNames => {
        this.competencieslabels.push(labNames?.competencyname);
        this.Skills.push(labNames?.score)
        // console.log( this.competencieslabels,' this.competencieslabels')
        });
        horiSkilles.push(this.competancyData ? this.competancyData[0].skills:'');
        horiSkilles?.forEach(element => {
          element?.forEach(skillsName => {
            this.skilllabels.push(skillsName?.skillname)
            this.Skills1.push(skillsName?.score);
            areas.push(skillsName.area);
           });

           if(areas){
            areas.forEach(listOfAreas => {
                listOfAreas.forEach(element => {
                this.areasName.push(element);
                console.log(this.areasName)
                console.log(this.areasName)
                });
            });
          }
        });
      }    
    }

}
