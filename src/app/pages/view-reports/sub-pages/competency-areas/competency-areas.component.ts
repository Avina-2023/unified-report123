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
  domain = ['#8ac1ed', '#a4dea5', '#f7d096', '#e89694', '#8ac1ed', '#a4dea5', '#f7d096', '#e89694', '#8ac1ed', '#a4dea5', '#f7d096', '#e89694', '#8ac1ed', '#a4dea5', '#f7d096', '#e89694'];
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
      console.log('adad', selectedCompetency);
      
      // this.getSkillChartData(selectedCompetency);
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

  selectedHorizontalArrayIndex(event, i) {
    let skill = this.competancyData[i].skills.find((data: any)=> {
      if (data.skillname == event.name && data.score == event.value) {
        return data;
      }
    });
    this.getParticularAreaData(skill.area, i);
  }

  getParticularAreaData(area, i) {
    this.competancyData[i].areaSkills = [];
    this.competancyData[i].areaSkills = area;
  }

  getCompetancyData(){
    this.competancyData = this.getAllReportsData?.competencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {
      this.getCompetencyChartData();
      this.getAreasDataInitialize(this.competancyData);
    }
  }

  getAreasDataInitialize(area) {
    this.competancyData.forEach(skills => {
      if (skills) {
        let areaSingle = [];
        skills.skills.forEach((area, i) => {
          if (area) {
          area.areaColor = this.domain[i];
          area.area.forEach(element => {
            element.areaColor = this.domain[i];
            areaSingle.push(element);
          });
        }
        });
        skills.areaSkills = areaSingle;
      }
    });
}

}
