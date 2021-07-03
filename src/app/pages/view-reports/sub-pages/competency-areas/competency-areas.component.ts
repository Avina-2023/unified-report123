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

  Skills = [50, 80, 90, 50, 70];
  labels = ["Aptitude", "Psychometric", "Coding", "Domain", "Communication"];


  constructor() { }

  ngOnInit(): void { 
  }

  onSelect(event) {
    console.log(event);
  }

}
