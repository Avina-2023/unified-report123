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

  behaviouraldef = [
    {
   
      "heading": "THOUGHT FACTOR",
      "children": [{  
        "subheading": "DETAIL-ORIENTED:",
          "child": [{
            "para":"The ability to be thorough in accomplishing any task by paying attention to even the minutest details. They are focused on quality and hence strive continuously to improve the process. Individuals who are detail-oriented tend to provide useful information to others on time and double-check the work to ensure accuracy."
          }]
       
      },
      {
        "subheading": "CREATIVE THINKING:",
        "child": [{
        "para": "The individual’s ability to think in an unconventional, diverse, and innovative way towards any challenging situations. The need to constantly challenge the status quo. Creative thinkers enjoy their varied approaches to deal with problem situations. They are aware when a new approach is required; they also can come up with a unique solution",
        }]
      },
  
      {
        "subheading": "CRITICAL THINKING:",
        "child": [{
        "para": "The ability to critically assess statements and arguments; examine beliefs, assumptions, and opinions and weigh them against facts. They are solely driven by rationality, factual details, and knowledge. They can break the problems into abstract parts and look for an underlying cause of the problem and come up with an effective solution.",
        }]
      },
    ]
  },

{
    "heading": "CORE/PERSONAL FACTOR",
    "children": [{  
      "subheading": "RECEPTIVENESS ",
      "child": [{ 
        "para":"The ability to be inquisitive, frank, open and sincere as an Individual. Can express one's views and ideas with openness and sincerity. They are also receptive and open to the ideas and suggestions provided by others."
      }]
     
    },
    {
      "subheading": "GROWTH MIND-SET:",
      "child": [{
      "para": "The individual’s ability to have an optimistic outlook and strong belief in oneself. Is open to learning and constantly works towards growth opportunities. An individual with a growth mind-set tends to view intelligence and knowledge as something that can be developed/improved over time. They show a strong tendency to embrace challenges willingly as well as uses feedback to improve and learn.",
      }]
    },
  
  ]
},
{

  "heading": "INTERPERSONAL FACTOR",
  "children": [{  
    "subheading": "TEAMWORK:",
    "child": [{ 
      "para":"The ability to adapt and work cooperatively with others under varying circumstances. They are characterised as adaptable, flexible, and work accordingly with the team to resolve any challenges and crises. A team player actively participates in the development of team goals and plans and appreciates and acknowledges what the other team member can bring to the table."
    }]
   
  },
  {
    "subheading": "COMMUNICATION SKILLS:",
    "child": [{
    "para": "The ability to communicate and express with clarity, in a well-organized and logically sequenced way. Individuals with good communication skills are also aware of and receptive to both verbal and non-verbal means of communication. They display the ability to communicate problems in a timely manner.",
    }]
  },

]
},
{

  "heading": "EMOTION",
  "children": [{  
    "subheading": "POSITIVE ATTITUDE:",
    "child": [{ 
      "para":"A positive mental state that makes one likeable and puts others at ease in any relationship. The individual’s ability to have a frame of mind that looks at any situation in a favourable way."
    }]
   
  },
  {
    "subheading": "EMPATHY:",
    "child": [{
    "para": "The ability to sense and also be sensitive to others feelings and concerns, taking into consideration their perspective; appreciating differences in how people feel about things.",
    }]
  },

  {
    "subheading": "EMOTIONAL SELF-AWARENESS:",
    "child": [{
    "para": "The ability to be aware of one’s own emotion/feeling at any given time, and the impact it has on other people and their mood.",
    }]
  },
  {
    "subheading": "ANXIETY MANAGEMENT:",
    "child": [{
    "para": "Refers to the individual’s ability to handle stressful feelings and anxieties, and to react appropriately to the current situation.",
    }]
  },
  {
    "subheading": "ADAPTABILITY:",
    "child": [{
    "para": "The ability to change/adjust to different and varying circumstances and people. Is flexible and open to new situations and approaches. They display a willingness to learn new ways to achieve work-related tasks and view change in a positive way.",
    }]
  },

]
}
]
  selectedHorizontalChartIndex = '0';
  verticalChartData: any[];
  hideControls = true;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.behaviouraldef)
    this.getCompetancyData();
  }

  ngOnChanges() {
    this.getCompetancyData();

  }


  ngAfterViewInit() {
    console.log(this.myDiv.nativeElement.innerHTML);
    if(this.myDiv.nativeElement.innerHTML){
      this.setColorCodesBasedOnLabel(this.myDiv.nativeElement.innerHTML)
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
    console.log(skill)
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
      // console.log(skills,'element')
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

  onNext() {
    if(this.myDiv.nativeElement.innerHTML){
      
      if (this.counter != this.list.length - 1) {
        this.setColorCodesBasedOnLabel(this.myDiv.nativeElement.innerHTML.toString().trim());
        this.counter++;
      }
  
    }
    
  }

  onPrevious() {
    if(this.myDiv.nativeElement.innerHTML){
 
      if (this.counter > 0) {
        this.setColorCodesBasedOnLabel(this.myDiv.nativeElement.innerHTML.toString().trim());
        this.counter--;
        // this.setColorCodesBasedOnLabel(sessionStorage.getItem('Cname'))
      }
    }

  }

  dotChange(i,label) {
    this.counter = i;
    this.setColorCodesBasedOnLabel(label)
  }

  // getcompetencyname(competencyname){
  //   console.log(competencyname,'set')
  //   sessionStorage.setItem('Cname',competencyname);
  // }

  setColorCodesBasedOnLabel(labelName: any) {
    const dynamicColor = labelName ? labelName : sessionStorage.getItem('Cname');
    if(dynamicColor == 'Thought Factor'){
        this.domain = ['#8EC031'];
        return '#8EC031';
    } if(dynamicColor == 'Emotion Factor'){
      this.domain = ['#FFBB48'];
        return '#FFBB48'
    } if(dynamicColor == 'Core/Personal Factor'){
      this.domain = ['#5460A7'];
      return '#5460A7'
      }if(dynamicColor == 'Interpersonal Factor'){
        this.domain = ['#F08145'];
        return '#F08145'
    }
    else {
      this.domain = ['#03B8CB'];
        return '#03B8CB'
    }
  }
}
