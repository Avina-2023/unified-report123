import { Component, Input, OnInit } from '@angular/core'; 
import { slide } from '../../../../animations'

@Component({
  selector: 'app-competency-areas',
  templateUrl: './competency-areas.component.html',
  styleUrls: ['./competency-areas.component.scss'],
  animations: slide
})
export class CompetencyAreasComponent implements OnInit { 
  @Input() getAllReportsData;
  competancyData = [];
  areasName = [];
  counter: number = 0;
  list: any = [1];


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
      const filterIndex = this.competancyData.findIndex(data => (data.competencyname == selectedCompetency.competencyname && data.score == selectedCompetency.score));
      this.counter = filterIndex != -1 ? filterIndex : this.counter;
    }
  }

  getCompetencyChartData() {
              // vertical chart data
      let competencyChartData = [];
      let unsort = [];
      let listCount = [];
      this.competancyData?.forEach((labNames, i) => {
        listCount.push(i+1);
        competencyChartData.push({name: labNames.competencyname, value: labNames.score, id: labNames?.competencyId})
        unsort.push({name: labNames.competencyname, value: labNames.score, id: labNames?.competencyId})
        });
        this.list = listCount;
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

  getAreasDataInitialize(i) {
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

resetAreas(i, competency) {
  let areaSingle = [];
  this.competancyData[i].skills.forEach((area, i) => {
    if (area) {
    area.areaColor = this.domain[i];
    area.area.forEach(element => {
      element.areaColor = this.domain[i];
      areaSingle.push(element);
    });
  }
  });
  this.competancyData[i].areaSkills = areaSingle;
}

onNext() {
  if (this.counter != this.list.length - 1) {
    this.counter++;
  }
}

onPrevious() {
  if (this.counter > 0) {
    this.counter--;
  }
}

dotChange(i) {
  this.counter = i;
}

}
