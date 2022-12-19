import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { I } from '@angular/cdk/keycodes';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
	selector: 'app-job-listing',
	templateUrl: './job-listing.component.html',
	styleUrls: ['./job-listing.component.scss']
})



export class JobListingComponent implements OnInit {
  public pageNumber: any = 1;
  public itemsPerPage: any = 9;
  public totallength:any
  public total:any;
	@ViewChild('moreItems', { static: false }) matDialogRef: TemplateRef<any>;
	@ViewChild('mobFilter', { static: false }) mobDialogRef: TemplateRef<any>;
	sampleContent = [];
	title = 'edutech';
	education = ['B.Tech', 'B.Sc', 'B.Com', 'BE'];
	joblist = [];
	// filter_info = any[];

	filter_info = { "data": [] }
	filterItems: any;
	selectedValues: any[] = [];
	data: any;
	filterObj = {};
	sortData = 'relevance';
	jobId: any = '';

	
	constructor(public dialog: MatDialog, private apiservice: ApiService, private appconfig: AppConfigService, public router:Router) { }

	ngOnInit() {
		this.getJobList();
		this.getJobFilter();
	}


	openDialog(displayValue) {
		this.filterItems = displayValue;
		this.dialog.open(this.matDialogRef, {
			panelClass: 'spec_desk_dialog'
		});
	}

	mobDialog() {
		this.dialog.open(this.mobDialogRef);
		this.fil_elements(this.filter_info.data, this.filter_info.data[0].subContent, 0, this.filter_info.data[0].key);

	}


	filterRemoval(data, filterKey) {

		if ((this.filterObj.hasOwnProperty(filterKey)) && (this.filterObj[filterKey].includes(data.name))) {
			if (this.filterObj[filterKey].length > 1) {
				this.filterObj[filterKey] = this.filterObj[filterKey].filter(item => item != data.name);

			}
			else {
				delete this.filterObj[filterKey];


			}
		}
	}

	checkboxChecked(event, data, filterKey, from?: any) {

		if (event?.checked) {
			data.is_checked = true
			data.key = filterKey;
			this.selectedValues.push(data);
			//console.log(this.selectedValues);
			// this.getJobList();

			if (this.filterObj.hasOwnProperty(filterKey)) {
				this.filterObj[filterKey].push(data.name);
				//console.log(this.filterObj[filterKey]);
				// console.log('if');
				// console.log(this.filterObj);


			}
			else {
				this.filterObj[filterKey] = [data.name];
				// console.log('else');
				// console.log(this.filterObj);


			}

		}
		else {
			data.is_checked = false;
			this.selectedValues = this.selectedValues.filter(item => item.name !== data.name);
			this.filterRemoval(data, filterKey);
			// console.log(this.filterObj);

		}
		if (from == 'direct') { this.getJobList(); }
	}
	applyfilter() {
		this.getJobList();
	}

	closeSelectedValues(data, index) {
		data.is_checked = false
		this.selectedValues.splice(index, 1);
		this.filterRemoval(data, data.key);
		//console.log(this.filterObj);
		this.getJobList();

	}

	fil_elements(data, subcontent, i, filterKey) {
		data.forEach((element, ind) => {
			if (ind == i) {
				element.active = true
			} else {
				element.active = false
			}
		});
		for (i = 0; i < subcontent.length; i++) {
			subcontent[i].key = filterKey;
		}
		this.filterItems = subcontent;
		// this.getJobList();
	}

	bookMarkIcon(item) {
		item.isSelected = !item.isSelected;

		let jobParams: any =
		{
			"email": this.appconfig.getLocalStorage("email"),
			"jobId": item.jobId
		}
		this.apiservice.saveJobsDashboard(jobParams).subscribe((res: any) => {
			if (res.success) {
				// console.log('jobs', res)
			}
		});
	}

	clearFilters(response) {
		response.forEach(element => {
			element.subContent.forEach(item => {
				item.is_checked = false;
			});
		});
		this.selectedValues.splice(0);
		this.filterObj = {};
		this.getJobList();

	}


	// API Call
  some(pages){
    let {pageindex,length} = pages
    this.pageNumber=pages.value;
    // this.pageNumber=pages.length
    // console.log(pages)
    this.	getJobList()
    }


	getJobList() {
		let params: any =
		{
		  "pageNumber": this.pageNumber,
        "itemsPerPage": this.itemsPerPage,
			"filter": this.filterObj,
			"sort": this.sortData,
			"specialization": "Computer Science Engineering",
			"email": this.appconfig.getLocalStorage("email")
			// "isApplied":false,
			// "isSelected":false
		}
		this.apiservice.joblistingDashboard(params).subscribe((response: any) => {
			if (response.success) {
				this.joblist = response.data;
        this.totallength = response.totalCount;
        this.total = Math.ceil(response.totalCount/this.itemsPerPage);
        console.log(this.total)
				this.joblist.forEach(element => {
					this.sampleContent.push(element.overview);
				});
			}
		});
	}


	getJobFilter() {
		let filterparams: any = {};
		this.apiservice.jobfilterDashboard(filterparams).subscribe((res: any) => {
			if (res.success) {
				this.filter_info = res;
			}
		});
	}

	gotojob(item) {
    let extras:NavigationExtras = {state:{itemData:item}}
    this.appconfig.setLocalStorage('jobDesc',JSON.stringify(item))
		this.router.navigateByUrl(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION, extras);
	}


}


