import { Routes, RouterModule } from '@angular/router';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { CandidateComponent } from './candidate.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeTemplateViewerComponent } from './resume-template-viewer/resume-template-viewer.component';
import {JobSavedListComponent} from './job-display-pages/job-saved-list/job-saved-list.component';
import { JobAppliedListComponent } from './job-display-pages/job-applied-list/job-applied-list.component';
import { JobDashboardComponent } from './job-dashboard/job-dashboard.component';
import { JobDescriptionComponent } from './job-description/job-description.component';

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
        path: `${APP_CONSTANTS.ROUTES.CANDIDATEDASH.RESUMEBUILDER}`, component: ResumeBuilderComponent
      },
      {
        path: `${APP_CONSTANTS.ROUTES.CANDIDATEDASH.RESUMETEMPLATE}`, component: ResumeTemplateViewerComponent
      },
      {
        path:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBSSAVED}`,component:JobSavedListComponent
      },
      {
        path:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBSAPPLIED}`,component:JobAppliedListComponent
      },
      {
        path:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.JOBDESCRIPTION}`,component:JobDescriptionComponent
      },
      {
        path:'',redirectTo:`${APP_CONSTANTS.ROUTES.CANDIDATEDASH.DASHBOARD}`,pathMatch:'full'
      }
    ]
   },

];

export const CandidateRoutes = RouterModule.forChild(routes);
