import { Routes, RouterModule } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { CandidateComponent } from './candidate.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import {JobSavedListComponent} from './job-display-pages/job-saved-list/job-saved-list.component';
import {JobListItemComponent} from './job-display-pages/job-list-item/job-list-item.component'
import { JobAppliedListComponent } from './job-display-pages/job-applied-list/job-applied-list.component';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
const routes: Routes = [
  {
    path: '', component: CandidateComponent,
    children: [
      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATEDASH.DASHBOARD}`, component: JobDashboardComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBLIST}`, component: JobListingComponent
      },
      {
        path:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBSSAVED}`,component:JobSavedListComponent
      },
      {
        path:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBSAPPLIED}`,component:JobAppliedListComponent
      },
      {
        path:'',redirectTo:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.DASHBOARD}`,pathMatch:'full'
      }
    ]
   },

];

export const CandidateRoutes = RouterModule.forChild(routes);