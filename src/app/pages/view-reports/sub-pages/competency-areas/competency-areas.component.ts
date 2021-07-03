import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competency-areas',
  templateUrl: './competency-areas.component.html',
  styleUrls: ['./competency-areas.component.scss']
})
export class CompetencyAreasComponent implements OnInit { 
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

  single = [
    {
      "name": "Aptitude",
      "value": 50
    },
    {
      "name": "Psychometric",
      "value": 80
    },
    {
      "name": "Coding",
      "value": 90
    },
    {
      "name": "Domain",
      "value": 50
    },
    {
      "name": "Communication",
      "value": 70
    }
  ];

  Skills = [
    {
      "name": "Situational",
      "value": 50
    },
    {
      "name": "Verbal",
      "value": 80
    },
    {
      "name": "Numerical",
      "value": 90
    },
    {
      "name": "Diagramatic",
      "value": 50
    } 
  ];


  constructor() { }

  ngOnInit(): void { 
  }

  onSelect(event) {
    console.log(event);
  }

}
