import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { AppConfigService } from "src/app/utils/app-config.service";
import * as pdf from "html2pdf.js";
import { Subscription } from "rxjs/internal/Subscription";
import { SentDataToOtherComp } from "src/app/services/sendDataToOtherComp.service";
import { LoadingService } from "src/app/services/loading.service";
import { ToastrService } from "ngx-toastr";
import { NavigationEnd, Router } from "@angular/router";
@Component({
  selector: 'app-behavioural-pdf-report-download',
  templateUrl: './behavioural-pdf-report-download.component.html',
  styleUrls: ['./behavioural-pdf-report-download.component.scss'],
})
export class BehaviouralPdfReportDownloadComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  isaccess: any;
  @Input() data;
  @Input() email;
  highestEducation: any;
  getAllBasicData: any;
  getAllBehaviourData: any;
  getAllBehaviourAPIDetails: any;
  benchmarkInfo = true;
  img: string;
  subscription: Subscription;
  InAppReport: any;
  orgdetails: any;
  orgId: any;
  desirabilitydata:any;
  desirabilitydataIndexdata:any
  responseBiasProfileContentdata:any
  responseBiasProfileContentdescription:any
  responseBiasProfileContentDesirabillityIndexData :any;
  // responseBiasProfileContentData:any;
  getreportsnapshotlength:any;
  responseBias
  benchMarkScore = [
    {score:"1-2",label:"DEVELOPMENT SCOPE",color:"red"},
    {score:"3-4-5",label:"LESS INCLINED",color:"yellow"},
    {score:"6-7-8",label:"MORE INCLINED",color:"orange"},
    {score:"9-10",label:"STRENGTH",color:"green"}
  ];
  benchMarkScoredata =  [
    {score:"1-3",label:"LOW",color:"red",bias:"Strong Bias",biascore:"81-100%",biaslabel:"Strong",colorcode:"#DE001C"},
    {score:"4-7",label:"AVERAGE",color:"orange",bias:"Mild Bias",biascore:"71-80%",biaslabel:"Mild",colorcode:"#F7A500"},
    {score:"8-10",label:"HIGH",color:"green",bias:"Low Bias",biascore:"> 70%",biaslabel:"Low",colorcode:"#0DB200"},
  ];

  scoreValue:any;


  removeheading: any;
  roles: any;

  constructor(private toastr: ToastrService,private appconfig: AppConfigService, private sendData: SentDataToOtherComp,) {
    this.roles = this.appconfig.getLocalStorage('role') ? this.appconfig.getLocalStorage('role') : '';
  }

  ngOnInit() {
      this.subscription = this.sendData.getMessage().subscribe(message => {
        this.InAppReport = message.data;
        if(this.data && this.InAppReport == true){
          this.getReportData();
          this.downloadAsPDF();
        }
      });

    this.isaccess = this.appconfig.isComingFromMicroCert();

    if(this.roles != 'undefined' && this.roles != null && this.roles != ''){
      this.orgdetails = JSON.parse(this.roles);
      this.orgId = this.orgdetails[0].orgId;
    }

  }

  ngOnDestroy(){
    this.subscription ? this.subscription.unsubscribe() : '';
  }

  getReportData() {
    this.getAllBehaviourData = this.data.data ? this.data.data : null;
    this.getAllBehaviourAPIDetails = this.data ? this.data : null;
    this.desirabilitydata = this.data ? this.data :null;

    this.responseBiasProfileContentdata = this.desirabilitydata.data.responseBiasProfileDescription.topicName
    this.responseBiasProfileContentdescription = this.desirabilitydata.data.responseBiasProfileDescription.description
    this.desirabilitydataIndexdata = this.desirabilitydata.data.desirabilityIndex
    this.responseBiasProfileContentDesirabillityIndexData = this.desirabilitydata.data.responseBiasProfileContent[0]
    this.scoreValue = this.desirabilitydata.data.responseBiasProfileContent[0].score
    this.getAllBasicData = this.data.basicDetails
      ? this.data.basicDetails
      : null;
    this.highestEducation =
      this.getAllBasicData && this.getAllBasicData.education
        ? this.getAllBasicData.education
        : [];
    if (this.highestEducation.length > 0) {
      let i = this.highestEducation.length - 1;
      this.highestEducation = this.highestEducation[i];
    }
  }

  momentForm(date) {
    if (date) {
      const split = moment(date).format('DD/MM/YYYY');
      return split;
    }
  }

  reportImage(name) {
    if (name == 'THOUGHT') {
      return this.img = '/assets/images/pdfDownload/Thought-1.png';
    } else if (name == 'INTERPERSONAL') {
      return this.img = '/assets/images/pdfDownload/Interpersonal-1.png';
    } else if (name == 'PERSONAL') {
      return this.img = '/assets/images/pdfDownload/Core-1.png';
    } else if (name == 'EMOTION') {
      return this.img = '/assets/images/pdfDownload/Emotion-1.png';
    } else {
      return this.img = '';
    }
  }

  factorsImage(name){
    if (name == 'THOUGHT') {
      return this.img = '/assets/images/pdfDownload/THOUGHT_FACTOR.png';
    } else if (name == 'INTERPERSONAL') {
      return this.img = '/assets/images/pdfDownload/INTERPERSONAL_FACTOR.png';
    } else if (name == 'PERSONAL') {
      return this.img = '/assets/images/pdfDownload/COREPERSONAL_FACTOR.png';
    } else if (name == 'EMOTION') {
      return this.img = '/assets/images/pdfDownload/EMOTION_FACTOR.png';
    } else {
      return this.img = '';
    }
  }

  factorsSkillsImage(name){
    if (name == 'Detail-Oriented') {
      return this.img = '/assets/images/pdfDownload/detailOriented.svg';
    } else if (name == 'Critical Thinking') {
      return this.img = '/assets/images/pdfDownload/criticalThinking.svg';
    } else if (name == 'Creative Thinking') {
      return this.img = '/assets/images/pdfDownload/creativeThinking.svg';
    } else if (name == 'Communication Skills') {
      return this.img = '/assets/images/pdfDownload/communicationSkills.svg';
    } else if (name == 'Teamwork') {
      return this.img = '/assets/images/pdfDownload/team-Work.svg';
    } else if (name == 'Positive Attitude') {
      return this.img = '/assets/images/pdfDownload/positiveAttitude.svg';
    } else if (name == 'Self-Reliance') {
      return this.img = '/assets/images/pdfDownload/selfReliant.svg';
    }else if (name == 'Receptiveness') {
      return this.img = '/assets/images/pdfDownload/receptiveness.svg';
    } else if (name == 'Growth Mind-Set') {
      return this.img = '/assets/images/pdfDownload/growthMindset.svg';
    } else if (name == 'Adaptability') {
      return this.img = '/assets/images/pdfDownload/adaptablity.svg';
    } else if (name == 'Emotional Self-Awareness') {
      return this.img = '/assets/images/pdfDownload/emotionalAwarness.svg';
    }
    else if (name == 'Anxiety Management') {
      return this.img = '/assets/images/pdfDownload/anxietyMgmnt.svg';
    } else if (name == 'Empathy') {
      return this.img = '/assets/images/pdfDownload/empathy.svg';
    }else {
      return this.img = '';
    }
  }

  downloadAsPDF() {
    this.toastr.success('Please wait','PDF is downloading')
    var element = document.getElementById('element-to-print');
    var opt = {
      margin: [0,0],
      filename:  (this.getAllBasicData?.firstname ? this.getAllBasicData?.firstname : '')+'('+this.email+')'+'.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  {scale: 2},
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
      var number_of_pages = pdf.internal.getNumberOfPages()
      var pdf_pages = pdf.internal.pages
      for (var i = 1; i < pdf_pages.length; i++) {
          pdf.setPage(i)
          pdf.setFontSize(9);
          pdf.setTextColor(150);
          // for right align
          // pdf.text('Page ' + i + ' of ' + number_of_pages, (pdf.internal.pageSize.getWidth() - 0.90 ), (pdf.internal.pageSize.getHeight()-0.35));

          var textdata = 'Page ' +( i+1 - 1) + ' of ' + (number_of_pages);
          pdf.text(textdata, (pdf.internal.pageSize.getWidth() - 1.15 ), (pdf.internal.pageSize.getHeight()-0.30));

          // pdf.text('Page ' + i + ' of ' + number_of_pages, (pdf.internal.pageSize.getWidth() - 4.30 ), (pdf.internal.pageSize.getHeight()-0.25));
      }

      }, (err) => {
      }).save();

  }

  splitHeading(glimpse){
      if(glimpse.includes("THOUGHT FACTOR")){
        let heading = "THOUGHT FACTOR";
        this.removeheading = glimpse.replace("THOUGHT FACTOR", "  ");
        return heading;
      }else if (glimpse.includes("INTERPERSONAL FACTOR")){
        let heading = "INTERPERSONAL FACTOR";
        this.removeheading = glimpse.replace("INTERPERSONAL FACTOR", "  ");
        return heading;

      }else if (glimpse.includes("CORE/PERSONAL FACTOR")){
        let heading = "CORE/PERSONAL FACTOR";
        this.removeheading = glimpse.replace("CORE/PERSONAL FACTOR", "  ");
        return heading;

      }else{
        let heading = "EMOTION FACTOR";
        this.removeheading = glimpse.replace("EMOTION FACTOR", "  ");
        return heading;
      }

  }
}


