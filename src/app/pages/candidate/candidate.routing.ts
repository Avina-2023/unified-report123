import { Routes, RouterModule } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { CandidateComponent } from './candidate.component';
import { JobListingComponent } from './job-listing/job-listing.component';

const routes: Routes = [
  {
    path: '', component: CandidateComponent,
    children: [
      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATEDASH.DASHBOARD}`, component: JobListingComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBLIST}`, component: JobListingComponent
      },
    ]


   },

];

export const CandidateRoutes = RouterModule.forChild(routes);
