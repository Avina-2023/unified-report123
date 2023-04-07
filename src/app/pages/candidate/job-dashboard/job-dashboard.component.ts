import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { element } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { SentDataToOtherComp } from 'src/app/services/sendDataToOtherComp.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { environment } from 'src/environments/environment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-job-dashboard',
  templateUrl: './job-dashboard.component.html',
  styleUrls: ['./job-dashboard.component.scss'],
})
export class JobDashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // public date:any;


  public itemsPerPage: any = 100;
  public pageNumber: any = 1;
  public totallength:any
  public total:any;
  joblist = [];
  sampleContent = [];
  filterObj = {};
  sortData = 'relevance';

  public year: any;
  public email: any;
  public username: any;
  public candidateDahboard: any;
  public jobsAvailable: any;
  public jobApplied: any;
  public profileView: any;
  public shortlisted: any;
  public ChartData: any = [];
  public objDetails: any;
  public Details: any;
  public profilepercentage: any;
  public userstate: any;
  public usercountry: any;
  public usercity: any;
  public gender: any;
  public useremail:any;

  // apiData = [
  //   {
  //     "albumId": 1,
  //     "id": 1,
  //     "title": "accusamus beatae ad facilis cum similique qui sunt",
  //     "url": "https://via.placeholder.com/600/92c952",
  //     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  //   },
  //   {
  //     "albumId": 1,
  //     "id": 2,
  //     "title": "reprehenderit est deserunt velit ipsam",
  //     "url": "https://via.placeholder.com/600/771796",
  //     "thumbnailUrl": "https://via.placeholder.com/150/771796"
  //   },
  //   {
  //     "albumId": 1,
  //     "id": 3,
  //     "title": "officia porro iure quia iusto qui ipsa ut modi",
  //     "url": "https://via.placeholder.com/600/24f355",
  //     "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  //   },
  //   {
  //     "albumId": 1,
  //     "id": 4,
  //     "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
  //     "url": "https://via.placeholder.com/600/d32776",
  //     "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  //   },
  //   {
  //     "albumId": 1,
  //     "id": 5,
  //     "title": "natus nisi omnis corporis facere molestiae rerum in",
  //     "url": "https://via.placeholder.com/600/f66b97",
  //     "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  //   }];


//   limit: number = 10;
//   customOptions: OwlOptions = {
//     loop: true,
//     autoplay: true,
//     center: true,
//     dots: false,
//     autoHeight: true,
//     autoWidth: true,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       600: {
//         items: 1,
//       },
//       1000: {
//         items: 1,
//       }
//     }
//   }


//   carouselOptions = {
//     loop: true,
//     autoplay: true,
//     nav: true,
//     dots: true,
//     items: 3,
//     responsiveClass: true,
//     responsive: {
//       0: {
//         items: 1
//       },
//       768: {
//         items: 2
//       },
//       1024: {
//         items: 3
//       }
//     }
//   };
//   items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];


 
  
//   public  graduates = [{
//     id : 1,
//     list:'Create customized skill profile',
//     image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
// },{
//   id: 2,
//   list:'Showcase core skillset, assessment scores and other talent',
//   image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
// },{
//   id: 3,
//   list:'Be visible to top organisations',
//   image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
// },{
//   id: 4,
//   list:'Have a competitive edge over peers',
//   image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
// },{
//   id: 5,
//   list:'Get access to multiple jobs from top employers',
//   image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
// }]



public conetnt:any;
  blobToken = environment.blobToken;
  profileImage = ""
  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;
  public allyears = [];
  memberjoindate: any;
  timestamp: Date;
  formattedDate: string;
  // recentjobs:any = [
  //   {
  //     "id":1,
  //     "title": "software developer",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Full Time",
  //     "degree": "B.E",
  //     "location": "Chennai",
  //     "imgurl" : "/assets/images/amadis-logo.png",


  //   },
  //   {
  //     "id":2,
  //     "title": "UI Designer",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Full Time",
  //     "degree": "B.E",
  //     "location": "Hyderabad",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
      
  //   },
  //   {
  //     "id":3,
  //     "title": "UX Developer",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Part Time",
  //     "degree": "B.E",
  //     "location": "Bangalore",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
  //   },
  //   {
  //     "id":4,
  //     "title": "Tester",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Full Time",
  //     "degree": "B.E",
  //     "location": "Pune",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
  //   },{
  //     "id":5,
  //     "title": "Cloud",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Part Time",
  //     "degree": "B.E",
  //     "location": "Hyderabad",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
  //   },
  //   {
  //     "id":6,
  //     "title": "Manager",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Full Time",
  //     "degree": "B.E",
  //     "location": "Chennai",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
  //   },{
  //     "id":7,
  //     "title": "Developer",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Full Time",
  //     "degree": "B.E",
  //     "location": "Bangalore",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
  //   },
  //   {
  //     "id":8,
  //     "title": "Developer",
  //     "companyname" : "Amadis Technology",
  //     "jobtype":"Full Time",
  //     "degree": "B.E",
  //     "location": "Chennai",
  //     "imgurl" : "../../../../assets/images/amadis-logo.png",
  //   }
  // ]

  constructor(
    private router:Router,
    private apiService: ApiService,
    private appConfig: AppConfigService,
    private msgData : SentDataToOtherComp
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#26BBEF', '#FF9A78', '#10E596', '#FDBC64'],
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#26BBEF', '#FF9A78', '#10E596'],
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      fill: {
        opacity: 1,
        colors: ['#26BBEF', '#FF9A78', '#10E596'],
      },
    };

    this.yearOption()
  }


  // XlSlider: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   margin: 10,
  //   dots: false,
  //   autoWidth: true,
  //   autoHeight: true,
  //   navSpeed: 800,
  //   navText: ['', ''],
  //   nav: true,
  //   items: 20,
  //   autoplay: true,
  //   autoplayHoverPause: true,
  //   autoplayTimeout: 8000,
  //   autoplaySpeed: 5000,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     },
  //     1440: {
  //       items: 1
  //     },
  //     2640: {
  //       items: 1
  //     }
  //   },

  // }

  
  ngOnInit(): void {
    // console.log(this.recentjobs)
    this.getCandidateDashBoard('');
    this.username = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.CandidateDetails();
    this.getJobList()
    

  }



  yearOption(){
    var date1 = new Date().getFullYear();
    var date2 = new Date().getFullYear() - 1;
    var date3 = new Date().getFullYear() - 2;
    var yearArray = [];
    if(date1 >= 2022 ){
      yearArray.push({year:date1})
    }
    if(date2 >= 2022 ){
      yearArray.push({year:date2})
    }
    if(date3 >= 2022){
      yearArray.push({year:date3})
    }
   this.allyears = yearArray;
  }

  // candidate Dashboard Barchart
  getCandidateDashBoard(e) {
    if (e.value) {
      this.year = e.value;
    } else {
      this.year = this.appConfig.getCurrentYear();
    }
    this.email = localStorage.getItem('email');
    this.objDetails = {};
    if (Object.keys(this.objDetails).length === 0) {
      Object.assign(this.objDetails, { year: this.year, email: this.email });
    }
    this.apiService
      .candidateDashboard(this.objDetails)
      .subscribe((res: any) => {
        if (res.success) {
          this.candidateDahboard = res.data;
          this.jobsAvailable = this.candidateDahboard.jobAvailableCount;
          this.jobApplied = this.candidateDahboard.jobAppliedCount;
          this.profileView = this.candidateDahboard.profileViewedCount;
          this.shortlisted = this.candidateDahboard.shortlistedCount;
          this.ChartData = res.data.series;
          this.chartOptions.series.push(this.ChartData);
        }
      });
  }

  CandidateDetails() {
    var obj = {};
    obj = {
      email: this.apiService.encryptnew(
        this.email,
        environment.cryptoEncryptionKey
      ),
    };
    this.apiService.candidateDetails(obj).subscribe((res: any) => {
      if (res.success) {
        this.Details = res.data;
        console.log(this.Details, 'Candidate Details');
        this.profileImage = this.Details.personal_details.profileImage;
        this.msgData.sendMessage("profileImage",this.profileImage)
        if (this.profileImage && this.productionUrl == true) {
          this.appConfig.setLocalStorage('profileImage',this.profileImage + environment.blobToken);
          this.profileImage = this.profileImage + environment.blobToken
        } else if (this.profileImage && this.productionUrl == false) {
          this.appConfig.setLocalStorage('profileImage',this.profileImage);
          this.profileImage = this.profileImage

        }
        this.appConfig.setLocalStorage('candidateProfile',JSON.stringify(this.Details));
        this.profilepercentage = Math.ceil(this.Details.profilePercentage);
        this.appConfig.setLocalStorage('profilePercentage', this.profilepercentage);
        // this.usercity = this.Details.permanentaddress?.permanent_city;
        // this.userstate = this.Details.permanentaddress?.permanent_state;
        // this.usercountry = this.Details.permanentaddress?.permanent_country;
        this.useremail = this.Details?.email
        this.usercity = this.Details.contact_details?.permanent_city;
        this.userstate = this.Details.contact_details?.permanent_state;
        this.usercountry = this.Details.contact_details?.permanent_country;
        this.gender = this.Details.personal_details?.gender;
        this.memberjoindate = this.Details.account_Activated_at;
        this.timestamp = new Date(this.memberjoindate);
        this.formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(this.timestamp);
        console.log(this.formattedDate); // Output: "Dec 12, 2022"

      }
    });
  }

  gotoProfile(){
    let emailval = this.appConfig.getLocalStorage('email')
    let enc_email = encodeURIComponent(this.apiService.encryptnew(emailval,environment.cryptoEncryptionKey))
    // window.open(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email, 'profile_redir');
    window.location.assign(environment.SKILL_PROFILE_URL+'/externallogin?extId='+enc_email);
  }

  ViewAll(){
    this.router.navigate(['/candidateview/findjobs'])
  }

 

  customOptions: OwlOptions = {
    loop: false,
    autoplay: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    dots: false,
    navSpeed: 1000,
    navText: ["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    nav: false,
    center:false,
    autoHeight: false,
    autoWidth: false,
    responsive: {
      0: {
        items: 3
      }
    },
    
  }


  getJobList() {
		let params: any =
		{
		  "pageNumber": this.pageNumber,
        "itemsPerPage": this.itemsPerPage,
			"filter": this.filterObj,
			"sort": this.sortData,
			"specialization": "Computer Science Engineering",
			"email": this.appConfig.getLocalStorage("email")
			// "isApplied":false,
			// "isSelected":false
		}
		this.apiService.joblistingDashboard(params).subscribe((response: any) => {
			if (response.success) {
				this.joblist = response.data;
				console.log(response.data ,'job details')
        this.totallength = response.totalCount;
        this.total = Math.ceil(response.totalCount/this.itemsPerPage);
        console.log(this.total)
				this.joblist.forEach(element => {
					this.sampleContent.push(element.overview);
				});
			}
		});
	}


  // getJobList() {
	// 	let params: any =
	// 	{
		 
	// 	}
	// 	this.apiService.joblistingDashboard(params).subscribe((response: any) => {
	// 		if (response.success) {
	// 			this.joblist = response.data;
	// 			console.log(response.data)
  //       // this.totallength = response.totalCount;
  //       // this.total = Math.ceil(response.totalCount/this.itemsPerPage);
  //       // console.log(this.total)
	// 			// this.joblist.forEach(element => {
	// 			// 	this.sampleContent.push(element.overview);
	// 			// });
	// 		}
	// 	});
	// }
  

  
}
