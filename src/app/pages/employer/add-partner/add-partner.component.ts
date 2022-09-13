import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getRoute()
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      // console.log(param.params.id,'param.params.id')
      if (param && param.params && param.params.id) {
        let email = param.params.id
          ? this.ApiService.decrypt(param.params.id)
          : param.params.id;
        console.log(email)
      }
    });
  }

}
