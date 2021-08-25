import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
  }

  logOut() {
   return this.apiservice.logout();
  }
}
