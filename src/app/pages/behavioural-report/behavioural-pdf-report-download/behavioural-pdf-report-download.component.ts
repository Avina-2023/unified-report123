import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { AppConfigService } from "src/app/utils/app-config.service";
import * as pdf from "html2pdf.js";
import { Subscription } from "rxjs/internal/Subscription";
import { SentDataToOtherComp } from "src/app/services/sendDataToOtherComp.service";
@Component({
  selector: 'app-behavioural-pdf-report-download',
  templateUrl: './behavioural-pdf-report-download.component.html',
  styleUrls: ['./behavioural-pdf-report-download.component.scss'],
})
export class BehaviouralPdfReportDownloadComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  isaccess: any;
  @Input() data;
  highestEducation: any;
  getAllBasicData: any;
  getAllBehaviourData: any;
  getAllBehaviourAPIDetails: any;
  benchmarkInfo = true;
  img: string;
  subscription: Subscription;
  InAppReport: any;
  benchMarkScore = [
    {score:"1-2",label:"DEVELOPMENT SCOPE",color:"red"},
    {score:"3-4-5",label:"LESS INCLINED",color:"yellow"},
    {score:"6-7-8",label:"MORE INCLINED",color:"orange"},
    {score:"9-10",label:"STRENGTH",color:"green"}
  ];

  constructor(private appconfig: AppConfigService, private sendData: SentDataToOtherComp,) {
    this.subscription = this.sendData.getMessage().subscribe(message => {
      this.InAppReport = message;
      if(this.InAppReport == true){
            this.downloadAsPDF();
      }
    });
  }

  ngOnInit() {
    this.isaccess = this.appconfig.isComingFromMicroCert();
    if (this.data) {
      this.getReportData();
    }
  }

  getReportData() {
    this.getAllBehaviourData = this.data.data ? this.data.data : null;
    this.getAllBehaviourAPIDetails = this.data ? this.data : null;
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
    } else if (name == 'CORE/PERSONAL') {
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
    } else if (name == 'CORE/PERSONAL') {
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
    var element = document.getElementById('element-to-print');
    var opt = {
      margin: 0,
      filename: 'pre-assessed-candidate-report.pdf',
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  {scale: 2},
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
     
  var totalPages = pdf.internal.getNumberOfPages();
  console.log(totalPages,'totale pages')
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.addImage('/assets/images/pdfDownload/Interpersonal-1.png', "PNG", 0, 0, 100, 100);
      // pdf.setFontSize(40);
      // pdf.setTextColor(0);
 
      } 
      }).save();
  }
}


