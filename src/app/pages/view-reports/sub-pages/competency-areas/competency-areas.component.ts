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
  domain: ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694'];
  selectedHorizontalChartIndex = '0';
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

  getParticularCompetencySkills(e) {
    this.getHorizontalDataByCompetencyId(e);
  }

  getHorizontalDataByCompetencyId(id) {
    const selectedCompetency = this.competancyData.find((data: any)=> {
      if (data && data.competencyId == id) {
        return data;
      };
    });
    if (selectedCompetency) {
      this.getSkillChartData(selectedCompetency);
    }
  }

  getCompetencyChartData() {
              // vertical chart data
      let competencyChartData = [];
      let unsort = [];
      this.competancyData?.forEach(labNames => {
        competencyChartData.push({name: labNames.competencyname, value: labNames.score, id: labNames?.competencyId})
        unsort.push({name: labNames.competencyname, value: labNames.score, id: labNames?.competencyId})
        });       
        this.unSortedVerticalData = unsort;
        this.competenciesChartData = competencyChartData;
  }

  getSkillChartData(data) {
      // Horizontan chart data 
      let horiSkilles = [];
      let areas = [];
      let skillchartdata= [];
      let unsortHorizontal = [];
      this.areasName = [];
      this.competenciesName = data ? data : '';
      horiSkilles.push(data &&  data.skills ? data.skills : '');
      
      if (horiSkilles) {
        horiSkilles?.forEach(element => {
          element?.forEach((skillsName, i) => {
            skillchartdata.push({name: skillsName?.skillname, value: skillsName?.score});
            unsortHorizontal.push({name: skillsName?.skillname, value: skillsName?.score});
            areas.push(skillsName.area);
           });
      this.unSortedHorizontalData = unsortHorizontal;
      this.skillsChartData = skillchartdata;
           if(areas){
             this.getAreas(areas);
          }
        });
      } else {
        this.unSortedHorizontalData = [];
        this.skillsChartData = [];
      }
    }    

    getAreas(areas) {
      let areaArray = []
      areas.forEach(listOfAreas => {
        listOfAreas.forEach(element => {
          areaArray.push(element);
        });
    });
    this.areasName = areaArray;
  }

  getCompetancyData(){
    this.competancyData = this.getAllReportsData?.competencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {
      this.getCompetencyChartData();
      let skillData = this.competancyData && this.competancyData[0] ? this.competancyData[0] : '';
      this.getSkillChartData(skillData);
    }
  }

}
