import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-behavioural-landing-page',
  templateUrl: './behavioural-landing-page.component.html',
  styleUrls: ['./behavioural-landing-page.component.scss']
})
export class BehaviouralLandingPageComponent implements OnInit, OnDestroy {

  getAllBehaviourData: any;
  getBehaviourReportAPISubscription: Subscription;
  constructor(
    private toastr: ToastrService,
    private ApiService: ApiService,
    private appconfig: AppConfigService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRoute();
  }

  getRoute() {
    this.route.paramMap.subscribe((param: any) => {
      if (param && param.params && param.params.id) {
        let email = param.params.id
          ? this.ApiService.decrypt(param.params.id)
          : param.params.id;
        this.getBehaviouralReportData(email);
      }
    });
  }

  getBehaviouralReportData(data) {
      const apiData = {
        email: data,
      };
     this.getBehaviourReportAPISubscription = this.ApiService.getBehaviourReport(apiData).subscribe((response: any) => {
      console.log('res', response);
      if (response && response.success) {
          this.getAllBehaviourData = response.data ? response.data : null;
        } else {
          this.toastr.error('No Reports Available');
          this.getAllBehaviourData = null;
        }
      }, (err)=> {
        console.log('err', err);
      });
  }

  ngOnDestroy() {
    this.getBehaviourReportAPISubscription ? this.getBehaviourReportAPISubscription.unsubscribe() : '';
  }
}
