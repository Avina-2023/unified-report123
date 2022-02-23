import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { slide } from 'src/app/animations';
import _ from 'lodash';
@Component({
  selector: 'app-behavioural-competency-areas',
  templateUrl: './behavioural-competency-areas.component.html',
  styleUrls: ['./behavioural-competency-areas.component.scss'],
  animations: slide,
})
export class BehaviouralCompetencyAreasComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  @Input() getAllReportsData;
  competancyData = [];
  areasName = [];
  counter: number = 0;
  list: any = [0];
  competenciesChartData = [];
  skillsChartData = [];
  competenciesName: any;
  unSortedVerticalData: any;
  unSortedHorizontalData: any;
  domain = [
    '#FF8C00',
    '#0085B6',
    '#9DBC5B',
    '#28B59A',
    '#03B8CB',
    '#FF8C00',
    '#0085B6',
    '#9DBC5B',
    '#28B59A',
    '#03B8CB',
  ];
  verticaldomain = [
    '#FF8C00',
    '#0085B6',
    '#9DBC5B',
    '#28B59A',
    '#03B8CB',
    '#FF8C00',
    '#0085B6',
    '#9DBC5B',
    '#28B59A',
    '#03B8CB',
  ];


  selectedHorizontalChartIndex = '0';
  verticalChartData: any[];
  hideControls = true;
 
  constructor() {}

  ngOnInit(): void {
    this.getCompetancyData();
  }

  ngOnChanges() {
    this.getCompetancyData();
  }




  ngAfterViewInit() {
    if(this.myDiv.nativeElement.innerHTML.length > 0){
      this.setColorCodesBasedOnLabel(this.myDiv.nativeElement.innerHTML.toString().trim())
    }
  }
  onSelect(event) {}

  getParticularCompetencySkills(e) {
    this.getHorizontalDataByCompetencyId(e);
  }

  getHorizontalDataByCompetencyId(id) {
    const selectedCompetency = this.competancyData.find((data: any) => {
      if (data && data.competencyname == id) {
        this.setColorCodesBasedOnLabel(data.competencyname);
        // this.getparticulardesc(data.competencyname)m
        return data;
      }
    });
    if (selectedCompetency) {
      const filterIndex = this.competancyData.findIndex(
        (data) =>
          data.competencyname == selectedCompetency.competencyname &&
          data.score == selectedCompetency.score
      );
      this.counter = filterIndex != -1 ? filterIndex : this.counter;
    }
  }

  selectedHorizontalArrayIndex(event, i) {
    let skill = this.competancyData[i].skills.find((data: any) => {
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

  // getparticulardesc(name){
  //   this.behaviouraldef.forEach(element => {
  //     let filtered_array = _.filter(
  //       element, function(o) {
  //          return o.heading == name;
  //       }
  //   );
  //   console.log(filtered_array)
  //   });

  // }

  getCompetancyData() {
    this.competancyData = this.getAllReportsData?.behavioralCompetencyDetails;
    if (this.competancyData && this.competancyData.length > 0) {
      // this.competancyData.forEach(element => {
      //   element.competencyname = element.competencyName;
      // });
      this.convertToPercentage();
      this.getAreasDataInitialize(this.competancyData);
      this.setColorCodesToVericalChart();
    }
  }

  convertToPercentage() {
    this.competancyData.forEach((element) => {
      if (element.score && element.maxscore) {
        element.actualScore = element.score;
        element.score = this.conversionFormula(100, 100);
      }
      element.skills.forEach((skills) => {
      
        // if (skills.stenScore) {
        skills.score = skills.stenScore ? skills.stenScore : 0;
        // }
        skills.area.forEach((area) => {
          if (area.score && area.maxscore) {
            area.actualScore = area.score;
            area.score = this.conversionFormula(area.score, area.maxscore);
          }
        });
      });
     
    });
  }

  conversionFormula(score: number, maxscore: number) {
    let percentage: number = (Number(score) / Number(maxscore)) * 100;
    percentage = Number(percentage.toFixed(2));
    return Number.isInteger(percentage) ? percentage : percentage.toFixed(2);
  }

  setColorCodesToVericalChart() {
    this.verticalChartData = [];
    let listCount = [];
    this.competancyData.forEach((element, j) => {
      listCount.push(j + 1);
      this.verticalChartData.push(element);
    });
    this.list = listCount;
    this.verticalChartData.forEach((element, i) => {
      if (element && element.score) {
        // element.areaColor = this.verticaldomain[i];
        element.areaColor = this.setColorCodesBasedOnLabel(element.competencyname);
      }
    });
  }
  getAreasDataInitialize(i) {
    this.competancyData.forEach((skills,j) => {
      if (skills) {
        let areaSingle = [];
        skills.skills.forEach((area, i) => {
          if (area) {
            // area.areaColor = this.domain[i];
            area.area.forEach((element) => {
              // element.areaColor = this.domain[i];
              areaSingle.push(element);
            });
          }
        });
        skills.areaSkills = areaSingle;
      }
    });
  }

  resetAreas(i) {
    let areaSingle = [];
    this.competancyData[i].skills.forEach((area, i) => {
      if (area) {
        // area.areaColor = this.domain[i];
        area.area.forEach((element) => {
          // element.areaColor = this.domain[i];
          areaSingle.push(element);
        });
      }
    });
    this.competancyData[i].areaSkills = areaSingle;
  }


  // onNext() {
  //   if(this.myDiv.nativeElement.innerHTML.length > 0){
  //     if (this.counter != this.list.length - 1) {
  //       this.counter++;
  //     }
  //   }
  //   setTimeout(() => {
  //     this.setColorCodesBasedOnLabel(this.myDiv.nativeElement.innerHTML.toString().trim());   
  //   }, 10);
 
  
  // }

  // onPrevious() {
  //   if(this.myDiv.nativeElement.innerHTML.length > 0){
  //     if (this.counter > 0) {
  //       this.counter--;
  //     }
  //   }
  //   setTimeout(() => {
  //     this.setColorCodesBasedOnLabel(this.myDiv.nativeElement.innerHTML.toString().trim());   
  //   }, 10);
  // }

  // dotChange(i,label) {
  //   this.counter = i;
  //   this.setColorCodesBasedOnLabel(label)
  // }

  setColorCodesBasedOnLabel(labelName: any) {
    const dynamicColor = labelName ? labelName : sessionStorage.getItem('Cname');
    if(dynamicColor == 'Thought Factor'){
        this.domain = ['#96C32E'];
        return '#96C32E';
    } if(dynamicColor == 'Emotion Factor'){
      this.domain = ['#C35BDC'];
        return '#C35BDC'
    } if(dynamicColor == 'Core/Personal Factor'){
      this.domain = ['#5885BF'];
      return '#5885BF'
      }if(dynamicColor == 'Interpersonal Factor'){
        this.domain = ['#F7A53E'];
        return '#F7A53E'
    }
    else {
      this.domain = ['#03B8CB'];
        return '#03B8CB'
    }
  }
}
