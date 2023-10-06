import { Component, OnInit } from '@angular/core'; 
import { ColDef, GridApi } from 'ag-grid-community';
import { GridOptions } from '@ag-grid-enterprise/all-modules';
import { ApiService } from 'src/app/services/api.service';
import { ActionButtonViewJobsComponent } from './action-button-viewJobs/action-button-viewJobs.component';

interface Tab {
  title: string;
  items: string[];
}
@Component({ 
  selector: 'app-view-jobs', 
  templateUrl: './view-jobs.component.html', 
  styleUrls: ['./view-jobs.component.scss'] 
})
export class ViewJobsComponent implements OnInit {
  private gridApi!: GridApi;
  dynclass: string = 'navyblue';
  active: number = 0;
  icncolor: string = '#1B4E9B';
  tabs: any = [
    { title: 'All' },
    { title: 'Approved' },
    { title: 'Pending' },
    { title: 'Rejected' },
  ];
  public gridOptions: GridOptions;
  constructor() { }

  ngOnInit() {
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }
  onTabChange(index: number) {
    const pall = ['navyblue', 'green', 'lightblue', 'red'];
    const icn = ['#1B4E9B', '#49AE31', '#27BBEE', '#EF2917'];
    console.log('Selected tab index:' + index);
    this.dynclass = pall[index];
    this.icncolor = icn[index];
    this.active = index;
    console.log(index, 'MYINDEX VALUE');
    let statusmodel = { 
      jobStatus: {
        filterType: 'text',
        type: 'contains',
        filter: '',
      },
    };
    // if (index == 0) {
    //   statusmodel.jobStatus.filter = 'All';
    // }else
    if (index == 1) {
      statusmodel.jobStatus.filter = 'Approved';
    } else if (index == 2) {
      statusmodel.jobStatus.filter = 'Pending';
    } else if (index == 3) {
      statusmodel.jobStatus.filter = 'Rejected';
    } 
    // else if (index == 4) {
    //   statusmodel.jobStatus.filter = 'Shortlisted';
    // }
    this.gridApi.setFilterModel(statusmodel);
  }

}
