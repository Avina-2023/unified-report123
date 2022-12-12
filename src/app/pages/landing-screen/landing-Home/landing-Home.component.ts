import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-landing-Home',
  templateUrl: './landing-Home.component.html',
  styleUrls: ['./landing-Home.component.scss']
})
export class LandingHomeComponent implements OnInit {
   sliderhtml1:any;
   sliderhtml2:any;
   endPoints = APP_CONSTANTS.ENDPOINTS;

  constructor() { 
    this.sliderLoad()

  }

  ngOnInit() {
  }

  sliderLoad(){

    var sliderdata1 = [
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Lnt.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Lnt-Nxt.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Lnt-Tech.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/LTI-lets-solve.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/mindtree.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/ABB_logo.png"
      },
      {

      "img1": "https://assets.lntedutech.com/Skillexchange/partners/rane_logo.png"
    },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Otis-Logo.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Aditya_Birla.png"
      },
      {

      "img1": "https://assets.lntedutech.com/Skillexchange/partners/Inspirisys_logo.png"
    },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Oppo.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/MMC_Infotech.png"
      },
      {

      "img1": "https://assets.lntedutech.com/Skillexchange/partners/Movate_logo.png"
    },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/prime.png"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Amadis-LOGO.jpg"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Corrohealth-logo.jpg"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Omega_logo.jpg"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Jouve_Logo.png"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Prime-Logo.jpg"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Vaken_logo.jpg"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Bankzone_logo.jpg"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/grootan.png"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/rudram.png"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Bankbazaar-Logo.png"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/BeumerGroup_Logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/AhamHousingFinance_logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Amaindia-logo.jpg"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/Ideas2IT_logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/techberg_logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/bet_logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/codebios_logo.webp"
      },
      {

        "img1": "https://assets.lntedutech.com/Skillexchange/partners/altimetrik_logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/maruti_logo.webp"
      },
      {
        "img1": "https://assets.lntedutech.com/Skillexchange/partners/sba_logo.webp"
      }

    ]

    var sliderdata2 = [
      {
        "title": "Anna University,<br> Chennai",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/Annauniversity-logo.jpg",

      },
      {
        "title": "Indian Institute of Technology, Madras",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/iitmadras.jpg",

      },
      {
        "title": "College of Engineering, Guindy (Anna University)",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/coe-guindy.jpg",

      },
      {

        "title": "Madras Institute of Technology (Anna University)",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/mit-chennai.jpg",

      },
      {
        "title": "Alagappa College of Technology, Guindy (Anna University)",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/Actech.jpg",

      },
      {
        "title": "School of Architecture and Planning (Anna University)",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/arch.jpg",

      },
      {
        "title": "BS Abdur Rahman Crescent Institute of Scienece and Technology, Chennai",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/crescent.jpg",
      },

      {
        "title": "Chitkara University,<br> Punjab",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/Chitkarauniversity.jpg",

      },
      {
        "title": "Gujarat Technological University",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/gtu.jpg",

      },
      {
        "title": "JECRC University,<br>Jaipur",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/jecrcUniversity.jpg",

      },
      {
        "title": "KSR College of Technology, Tiruchengode",
        "img": "https://assets.lntedutech.com/Skillexchange/inst-partners/ksrct.jpg",

      },
      {   "title":"KPR Institute of Engineering and Technology, Coimbatore",
        "img":"https://assets.lntedutech.com/Skillexchange/inst-partners/kpriet.jpg",

      }
    ]



   this.sliderhtml1 = ''

    for (let x of sliderdata1) {
      this.sliderhtml1 += `<li class="section-partners__item swiper-slide">
          <div class="section-partners__image">
            <img src=${x.img1} alt="" />
          </div>
        </li>`
    }

    this.sliderhtml2 = ''
    for (let x of sliderdata2) {
      this.sliderhtml2 += `<li class="section-team__item swiper-slide swiper-slide-active" role="group" aria-label="1 / 7">
      <div class="section-team__item-wrapper">
        <div class="section-team__item-image">
          <img src=${x.img} alt="">
        </div>
        <div class="section-team__item-text">
          <p class="section-team__item-name">${x.title}</p>
          </div>
      </div>
    </li>`
    }
  }

}
