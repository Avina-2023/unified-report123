import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { AppConfigService } from "src/app/utils/app-config.service";
import * as pdf from "html2pdf.js";
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
  img: string;
  constructor(private appconfig: AppConfigService) {}

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
      return (this.img = '/assets/images/pdfDownload/thought_factor.svg');
    } else if (name == 'INTERPERSONAL') {
      return (this.img = '/assets/images/pdfDownload/interpersonal_factor.svg');
    } else if (name == 'CORE/PERSONAL') {
      return (this.img = '/assets/images/pdfDownload/personal_factor.svg');
    } else if (name == 'EMOTION') {
      return (this.img = '/assets/images/pdfDownload/emotion_factor.svg');
    } else {
      return (this.img = '');
    }
  }

  factorsImage(name){
    if (name == 'THOUGHT') {
      return (this.img = '/assets/images/pdfDownload/THOUGHT_FACTOR.png');
    } else if (name == 'INTERPERSONAL') {
      return (this.img = '/assets/images/pdfDownload/INTERPERSONAL_FACTOR.png');
    } else if (name == 'CORE/PERSONAL') {
      return (this.img = '/assets/images/pdfDownload/COREPERSONAL_FACTOR.png');
    } else if (name == 'EMOTION') {
      return (this.img = '/assets/images/pdfDownload/EMOTION_FACTOR.png');
    } else {
      return (this.img = '');
    }
  }

  downloadAsPDF() {
    var element = document.getElementById('element-to-print');
    // pdf(element);

    var opt = {
      margin: 0,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    pdf().from(element).set(opt).save();

    // console.log(worker,'asdasdasd')

    //   var printContents = document.getElementById('pdfTable').innerHTML;
    //   var popupWin = window.open(
    //     'Angular Large Table to pdf',
    //     '_blank',
    //     'width=768,height=auto'
    //   );

    //   popupWin.document.write(
    //     '<html><head>' +
    //       '<link rel="stylesheet" href="' +
    //       './behavioural-pdf-report-download.component.scss"/>' +

    //       '</head><body onload="window.print();window.close()">' +
    //       printContents +
    //       '</body></html>'
    //   );
    //   popupWin.document.close();
  }
}


