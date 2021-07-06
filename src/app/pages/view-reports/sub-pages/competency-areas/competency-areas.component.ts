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

  competenciesChartData = [];
  skillsChartData = [];
  competenciesName: any;
  unSortedVerticalData: any;
  unSortedHorizontalData: any;
  constructor() { 
  }

  ngOnInit(): void {
  this.getCompetancyData();
  }

  ngOnChanges() {
    this.getCompetancyData();
  }


  onSelect(event) {
  }

  getCompetancyData(){
    let horiSkilles = [];
    let areas = [];
    this.competancyData = this.getAllReportsData?.competencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {

      // vertical chart data
      let competencyChartData = [];
      let unsort = [];
      this.competancyData?.forEach(labNames => {
        competencyChartData.push({name: labNames.competencyname, value: labNames.score})
        unsort.push({name: labNames.competencyname, value: labNames.score})
        });       
        this.unSortedVerticalData = unsort;
        this.competenciesChartData = competencyChartData;
        this.competenciesName = this.competenciesChartData && this.competenciesChartData[0];

      // Horizontan chart data 
        let skillchartdata= [];
        let unsortHorizontal = [];
        horiSkilles.push(this.competancyData && this.competancyData[0] && this.competancyData[0].skills ? this.competancyData[0].skills :'');
        horiSkilles?.forEach(element => {
          element?.forEach((skillsName, i) => {
            skillchartdata.push({name: skillsName?.skillname, value: skillsName?.score});
            unsortHorizontal.push({name: skillsName?.skillname, value: skillsName?.score});
            areas.push(skillsName.area);
           });
      this.unSortedHorizontalData = unsortHorizontal;
      this.skillsChartData = skillchartdata;
           if(areas){
            areas.forEach(listOfAreas => {
                listOfAreas.forEach(element => {
                this.areasName.push(element);
                });
            });
          }
        });
      }    
    }

}
