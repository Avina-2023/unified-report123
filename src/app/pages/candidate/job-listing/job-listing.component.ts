import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { I } from '@angular/cdk/keycodes';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-job-listing',
	templateUrl: './job-listing.component.html',
	styleUrls: ['./job-listing.component.scss']
})



export class JobListingComponent implements OnInit {

	@ViewChild('moreItems', { static: false }) matDialogRef: TemplateRef<any>;
	@ViewChild('mobFilter', { static: false }) mobDialogRef: TemplateRef<any>;
	sampleContent = [];
	title = 'edutech';
	education = ['B.Tech', 'B.Sc', 'B.Com', 'BE'];
	joblist = [];
	//  [{
	// 	'jobtitle': 'Software Developer',
	// 	'companyname': 'CGI',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.2RFYnlpATodcawtlDkFNdgHaDe?w=345&h=164&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Computer Science',
	// 	'education': 'B.Tech',
	// 	'location': 'Chennai',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Autocad Engineer',
	// 	'companyname': 'L&T Construction',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.QsIcm-Plhh1XTltDTSf3fwHaDi?w=336&h=167&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Mechanical',
	// 	'education': 'B.Tech',
	// 	'location': 'Maharashtra',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Junior Programmer',
	// 	'companyname': 'L&T Construction',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Information Technology',
	// 	'education': 'B.Tech',
	// 	'location': 'Bangalore',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// }
	// 	,
	// {
	// 	'jobtitle': 'Junior Developer',
	// 	'companyname': 'L&T Construction',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Information Technology',
	// 	'education': 'B.Tech',
	// 	'location': 'Chennai',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Autocad Engineer',
	// 	'companyname': 'CGI',
	// 	'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Mechanical',
	// 	'education': 'B.Tech',
	// 	'location': 'Maharashtra',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Junior Programmer',
	// 	'companyname': 'L&T Construction',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Information Technology',
	// 	'education': 'B.Tech',
	// 	'location': 'Bangalore',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Autocad Engineer',
	// 	'companyname': 'CGI',
	// 	'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Mechanical',
	// 	'education': 'B.Tech',
	// 	'location': 'Maharashtra',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Junior Programmer',
	// 	'companyname': 'L&T Construction',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Information Technology',
	// 	'education': 'B.Tech',
	// 	'location': 'Bangalore',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// },
	// {
	// 	'jobtitle': 'Junior Tester',
	// 	'companyname': 'L&T Construction',
	// 	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	// 	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	// 	'specialization': 'Information Technology',
	// 	'education': 'B.Tech',
	// 	'location': 'Bangalore',
	// 	'jobtype': 'Full Time',
	// 	'isSelected': false
	// }
	// ];

	// filter_info = any[];

	filter_info = { "data": [] }
	// filter_info = {
	// 	"data": [
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "B.Tech",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "B.Sc.",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "B.Com",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "BE",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "MBA",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Graduation not required",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Medical",
	// 					"totalCount": 3
	// 				},
	// 				{
	// 					"name": "CA",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "M.Com",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "M.Com",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "BE",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "MBA",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Graduation not required",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Medical",
	// 					"totalCount": 3
	// 				},
	// 				{
	// 					"name": "CA",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "M.Com",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "M.Com",
	// 					"totalCount": 1
	// 				}

	// 			],
	// 			"iconName": "school",
	// 			"fieldName": "Education"
	// 		},
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "Mechanical Engineering",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Computer Science Engineering",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Electrical Engineering",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Electronics Engineering",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Mechatronics Engineering",
	// 					"totalCount": 6
	// 				},
	// 				{
	// 					"name": "Space Engineering",
	// 					"totalCount": 1
	// 				}
	// 			],
	// 			"iconName": "workspace_premium",
	// 			"fieldName": "Specialization"
	// 		},
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "Java",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Python",
	// 					"totalCount": 10
	// 				},
	// 				{
	// 					"name": "Javascript",
	// 					"totalCount": 8
	// 				},
	// 				{
	// 					"name": "Angular",
	// 					"totalCount": 4
	// 				},
	// 				{
	// 					"name": "Node JS",
	// 					"totalCount": 8
	// 				},
	// 				{
	// 					"name": "PHP",
	// 					"totalCount": 4
	// 				}
	// 			],
	// 			"iconName": "emoji_objects",
	// 			"fieldName": "Skill Set"
	// 		},
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "Fulltime",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Part - Time",
	// 					"totalCount": 3
	// 				},
	// 				{
	// 					"name": "Contract",
	// 					"totalCount": 3
	// 				},
	// 				{
	// 					"name": "Intern/Apprenticeship",
	// 					"totalCount": 2
	// 				}
	// 			],
	// 			"iconName": "business_center",
	// 			"fieldName": "Job Type"
	// 		},
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "Kolkata",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Bangalore",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Chennai",
	// 					"totalCount": 5
	// 				},
	// 				{
	// 					"name": "Gurgaon",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Hyderabad",
	// 					"totalCount": 2
	// 				},
	// 				{
	// 					"name": "Mumbai",
	// 					"totalCount": 1
	// 				}
	// 			],
	// 			"iconName": "location_on",
	// 			"fieldName": "Location"
	// 		},
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "Airport",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Airport & Logistics",
	// 					"totalCount": 5
	// 				},
	// 				{
	// 					"name": "Electrical & Logistics",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Logistics",
	// 					"totalCount": 3
	// 				},
	// 				{
	// 					"name": "Space Logistics",
	// 					"totalCount": 1
	// 				}
	// 			],
	// 			"iconName": "work_outline",
	// 			"fieldName": "Industries"
	// 		},
	// 		{
	// 			"subContent": [
	// 				{
	// 					"name": "Beumer India Pvt Ltd.",
	// 					"totalCount": 3
	// 				},
	// 				{
	// 					"name": "L&T India Pvt Ltd.",
	// 					"totalCount": 2
	// 				},
	// 				{
	// 					"name": "Umar India Pvt Ltd.",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Wipro India Pvt Ltd.",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "CTS India Pvt Ltd.",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "TCS India Pvt Ltd.",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Mindtree India Pvt Ltd.",
	// 					"totalCount": 1
	// 				},
	// 				{
	// 					"name": "Yamini India Pvt Ltd.",
	// 					"totalCount": 1
	// 				}
	// 			],
	// 			"iconName": "business",
	// 			"fieldName": "Top Companies"
	// 		}
	// 	]
	// }

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
		this.dialog.open(this.matDialogRef);
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
			"email ": "deenabandhutekarla@gmail.com",
			"jobId ": item.jobId
		}
		this.apiservice.saveJobsDashboard(jobParams).subscribe((res: any) => {
			if (res.success) {
				console.log('jobs', res)
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

	getJobList() {
		let params: any =
		{
			"pageNumber": 1,
			"itemsPerPage": 9,
			"filter": this.filterObj,
			"sort": this.sortData,
			"specialization": "Computer Science Engineering",
			"email": "deenabandhutekarla@gmail.com"
			// "isApplied":false,
			// "isSelected":false
		}
		this.apiservice.joblistingDashboard(params).subscribe((response: any) => {

			if (response.success) {
				this.joblist = response.data;

				this.joblist.forEach(element => {
					this.sampleContent.push(element.jobDescription);
				});
			} else {
				//console.log('data.message');
			}

		});
	}


	getJobFilter() {
		let filterparams: any = {};
		this.apiservice.jobfilterDashboard(filterparams).subscribe((res: any) => {

			if (res.success) {
				//console.log('filterData', res);
				this.filter_info = res;
			}
			else {
				//console.log(res.message);
			}

		});
	}

  gotojob(item){
    this.router.navigate([APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION], {
      state: item
    });
    // this.appconfig.routeNavigationWithParam(APP_CONSTANTS.ENDPOINTS.CANDIDATEDASH.JOBDESCRIPTION,item)
    console.log(item)
  }


}


