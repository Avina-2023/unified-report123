import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss']
})



export class JobListingComponent implements OnInit {
@ViewChild('moreItems', { static: false }) matDialogRef: TemplateRef<any>;
  title = 'edutech';
  education = ['B.Tech','B.Sc','B.Com','BE'];
  joblist = [{
  'jobtitle': 'Software Developer',
  'companyname': 'CGI',
	'companyimage': 'https://th.bing.com/th/id/OIP.2RFYnlpATodcawtlDkFNdgHaDe?w=345&h=164&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Computer Science',
	'education': 'B.Tech',
	'location': 'Chennai',
	'jobtype': 'Full Time',
	'saved' : 'true'
},
{
  'jobtitle': 'Autocad Engineer',
  'companyname': 'L&T Construction',
	'companyimage': 'https://th.bing.com/th/id/OIP.QsIcm-Plhh1XTltDTSf3fwHaDi?w=336&h=167&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Mechanical',
	'education': 'B.Tech',
	'location': 'Maharashtra',
	'jobtype': 'Full Time',
	'saved' : 'false'
},
{
  'jobtitle': 'Junior Programmer',
  'companyname': 'L&T Construction',
	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Information Technology',
	'education': 'B.Tech',
	'location': 'Bangalore',
	'jobtype': 'Full Time',
	'saved' : 'true'
}
,
{
  'jobtitle': 'Junior Developer',
  'companyname': 'L&T Construction',
	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Information Technology',
	'education': 'B.Tech',
	'location': 'Chennai',
	'jobtype': 'Full Time',
	'saved' : 'true'
},
{
  'jobtitle': 'Autocad Engineer',
  'companyname': 'CGI',
	'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Mechanical',
	'education': 'B.Tech',
	'location': 'Maharashtra',
	'jobtype': 'Full Time',
	'saved' : 'false'
},
{
  'jobtitle': 'Junior Programmer',
  'companyname': 'L&T Construction',
	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Information Technology',
	'education': 'B.Tech',
	'location': 'Bangalore',
	'jobtype': 'Full Time',
	'saved' : 'true'
},
{
  'jobtitle': 'Autocad Engineer',
  'companyname': 'CGI',
	'companyimage': 'https://assets.lsegissuerservices.com/original-73476028-ad6b-4a9b-8521-980f068c3467.png',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Mechanical',
	'education': 'B.Tech',
	'location': 'Maharashtra',
	'jobtype': 'Full Time',
	'saved' : 'false'
},
{
  'jobtitle': 'Junior Programmer',
  'companyname': 'L&T Construction',
	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Information Technology',
	'education': 'B.Tech',
	'location': 'Bangalore',
	'jobtype': 'Full Time',
	'saved' : 'true'
},
{
  'jobtitle': 'Junior Tester',
  'companyname': 'L&T Construction',
	'companyimage': 'https://th.bing.com/th/id/OIP.JweEEKICsgNe-l4Uwnyh2gHaC3?w=343&h=135&c=7&r=0&o=5&pid=1.7',
	'jobdescription': 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
	'specialization': 'Information Technology',
	'education': 'B.Tech',
	'location': 'Bangalore',
	'jobtype': 'Full Time',
	'saved' : 'true'
}
];

filter_info = {
	"data": [
	{
		"subContent": [
			{
				"name": "Bachelor Degree in Computer Science",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Electrical",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Electronics",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Electronics & Communication",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Mathematics",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Mechanical",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Mechanical",
				"totalCount": 3
			},
			{
				"name": "Bachelor Degree in Science",
				"totalCount": 1
			},
			{
				"name": "Bachelor Degree in Space",
				"totalCount": 1
			}
		],
		"iconName": "school",
		"fieldName": "Education"
	},
	{
		"subContent": [
			{
				"name": null,
				"totalCount": 1
			},
			{
				"name": "Computer Science Engineering",
				"totalCount": 1
			},
			{
				"name": "Electrical Engineering",
				"totalCount": 1
			},
			{
				"name": "Electronics Engineering",
				"totalCount": 1
			},
			{
				"name": "Mechanical Engineering",
				"totalCount": 6
			},
			{
				"name": "Space Engineering",
				"totalCount": 1
			}
		],
		"iconName": "workspace_premium",
		"fieldName": "Specialization"
	},
	{
		"subContent": [
			{
				"name": "Java",
				"totalCount": 1
			},
			{
				"name": "Python",
				"totalCount": 10
			}
		],
		"iconName": "emoji_objects",
		"fieldName": "Skill Set"
	},
	{
		"subContent": [
			{
				"name": null,
				"totalCount": 1
			},
			{
				"name": "",
				"totalCount": 3
			},
			{
				"name": "Fulltime",
				"totalCount": 3
			},
			{
				"name": "Halftime",
				"totalCount": 2
			},
			{
				"name": "Parttime",
				"totalCount": 2
			}
		],
		"iconName": "business_center",
		"fieldName": "Job Type"
	},
	{
		"subContent": [
			{
				"name": null,
				"totalCount": 1
			},
			{
				"name": "Bangalore",
				"totalCount": 1
			},
			{
				"name": "Chennai",
				"totalCount": 5
			},
			{
				"name": "Gurgaon",
				"totalCount": 1
			},
			{
				"name": "Hyderabad",
				"totalCount": 2
			},
			{
				"name": "Mumbai",
				"totalCount": 1
			}
		],
		"iconName": "location_on",
		"fieldName": "Location"
	},
	{
		"subContent": [
			{
				"name": "Airport",
				"totalCount": 1
			},
			{
				"name": "Airport & Logistics",
				"totalCount": 5
			},
			{
				"name": "Electrical & Logistics",
				"totalCount": 1
			},
			{
				"name": "Logistics",
				"totalCount": 3
			},
			{
				"name": "Space Logistics",
				"totalCount": 1
			}
		],
		"iconName": "work_outline",
		"fieldName": "Industries"
	},
	{
		"subContent": [
			{
				"name": "Beumer India Pvt Ltd.",
				"totalCount": 3
			},
			{
				"name": "L&T India Pvt Ltd.",
				"totalCount": 2
			},
			{
				"name": "Umar India Pvt Ltd.",
				"totalCount": 1
			},
			{
				"name": "Wipro India Pvt Ltd.",
				"totalCount": 1
			},
			{
				"name": "CTS India Pvt Ltd.",
				"totalCount": 1
			},
			{
				"name": "TCS India Pvt Ltd.",
				"totalCount": 1
			},
			{
				"name": "Mindtree India Pvt Ltd.",
				"totalCount": 1
			},
			{
				"name": "Yamini India Pvt Ltd.",
				"totalCount": 1
			}
		],
		"iconName": "business",
		"fieldName": "Top Companies"
	}
]
}

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  getdata(value:string){
    alert(value);
  }

  openDialog() {
    this.dialog.open(this.matDialogRef);
  }
}