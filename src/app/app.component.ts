import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';
import { AppConfigService } from './utils/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Unified Reports';
  loading: boolean = true;

  constructor(private _loading: LoadingService,  private appConfig : AppConfigService){
    
  }

ngOnInit() {
  this.listenToLoading();
}
     /**
   * Listen and display the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
