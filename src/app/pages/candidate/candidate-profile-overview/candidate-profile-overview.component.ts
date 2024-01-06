import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-candidate-profile-overview',
  templateUrl: './candidate-profile-overview.component.html',
  styleUrls: ['./candidate-profile-overview.component.scss']
})
export class CandidateProfileOverviewComponent implements OnInit {
  Details: any;
  candidateEmail: any;
  candidateName: any;
  profileImage: any;
  city: any;
  profilePercent: any;
  getAllStates: any;
  form_domicile_state: any;
  form_present_state: any;
  updatedCitySubscription: any;
  allPresentCityList: any;
  form_present_city: any;
  profileSummary: any;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private appConfig: AppConfigService
  ) {
    this.getCandidateDetails();
   }

  ngOnInit(): void {
  }


  getCandidateDetails() {
    var obj = {};
    const userEmail = localStorage.getItem('email');
    obj = {
      email: this.apiService.encryptnew(
        userEmail,
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        this.Details = res.data;
        console.log(this.Details, 'Candidate Data');
        this.candidateEmail = this.Details?.email;
        this.candidateName = this.Details?.personal_details?.name;
        this.profileImage = this.Details?.personal_details?.profileImage;
        this.city = this.Details?.contact_details?.permanent_city;
        this.profilePercent = this.Details?.profilePercentage;
        this.profileSummary = this.Details?.document_details?.preWrittenPhrase;
        this.getStateAPI(this.Details);
      }
    });
  }


  getStateAPI(data:any){
   this.Details = data;
   console.log( this.Details, 'candidatedata');
   const countryData = {
    country_id: '101',
  };
  this.apiService.getallStates().subscribe(
    (data: any) => {
      this.getAllStates = data[0];
      this.getAllStates.forEach((element) => {
        if (element.id == this.Details?.contact_details?.present_state) {
          this.form_domicile_state = element.name;
          this.getCityName(
            element.id,
            this.Details?.contact_details?.preset_city
          );
        }
        if (element.id == this.Details?.contact_details?.present_state) {
          this.form_present_state = element.name;
          //console.log(this.form_present_state, 'stateName');
        }
      });
    },
    (err) => {}
  );

  }

  getCityName(id, cityId) {
    const ApiData = {
      state_id: id,
    };
    let city;
    this.updatedCitySubscription = this.apiService.districtList(ApiData).subscribe((datas: any) => {
          this.allPresentCityList = datas.data;  
          datas.data.forEach((element) => { 
            if (element.id == cityId) { 
              this.form_present_city = element.name; 
              //  return element.name;
              //console.log(this.form_present_city, 'cityname');
              
            }
          });
        }, 
        (err) => { 
          console.log(err);
        }
      );
  }

}
