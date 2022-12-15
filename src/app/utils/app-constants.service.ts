export const APP_CONSTANTS = {
  MIMETypes: {
    TXT: 'text/plain',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingm1.document',
    DOC: 'application/ msword',
    PDF: 'application/pdf',
    JPG: 'image/jpeg',
    BMP: 'image/bmp',
    PNG: 'image/png',
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetm1.sheet',
    RTF: 'application/rtf',
    PPT: 'application/vnd.ms-powerpoint',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationm1.presentation',
  },

  // Route endpoints
  ENDPOINTS: {
    LOGIN: '/login',
    HOME: '/home',
    // HOME: '/static',
    AUTH: '/auth',
    LANDING: '/landing',
    REGISTER:"/register",
    EMPLOYERS:"/employers",
    LANDINGPAGE:{
      LANDINGPAGE:"/",
      HOME:"/home",
      ABOUT:"/about",
      EMPLOYER:"/employer",
      FRESHGRADUATES:"/FreshGraduates",
      HIRINGPARTNER:"/hiringpartner",
      INSTITUTIONALPARTNERS:"/institutionalpartners",
      CONTACT:"/contact"
    },

    CNDIDATELANDING:'/candidateview',
    CANDIDATEDASH:{
      DASHBOARD:'/candidateview/dashboard',
      JOBLIST:'/candidateview/findjobs',
      RESUMEBUILDER:'/candidateview/resumebuilder',
      RESUMETEMPLATE:'/candidateview/resumetemplate',
      JOBSSAVED:'/candidateview/savedjobs',
      JOBSAPPLIED:'/candidateview/appliedjobs',
      PAGINATION :'/candidateview/page',
      JOBDESCRIPTION:'/candidateview/jobdescription',
    },
    PASSWORD: {
      FORGOT: '/forgot-password',
      RESET: '/resetpwd',
      SETUP: '/setpwd'
    },
    REPORTS: {
      HOME: '/auth/reports',
      USERLIST: '/auth/reports/userlist',
      VIEWREPORTS: '/auth/reports/viewreport',
      HIRINGREPORT:'/auth/reports/hiring',
      DASHBOARD:'/auth/reports/dashboard',
      BEHAVIOUR_MODULE: {
        BEHAVIOUR_MODULE_PAGE: '/auth/reports/behavioural',
        BEHAVIOUR_REPORT: '/auth/reports/behavioural/view'
      }
    },
    CANDIDATE:{
      HOME:'/auth/candidate',
      VIEWOVERALLREPORT: '/auth/candidate/candidatereport'
    },
    SKILLMASTER:{
      HOME:'/auth/skillmaster',
      SKILLMASTERLIST:"/auth/skillmaster/skillmasterlist",
      SKILLBULKUPlOAD:'/auth/skillmaster/skillbulkupload'
    },
    PARTNER:{
      HOME:'/auth/partner',
      PARTNERLIST:'/auth/partner/partnerlist',
      ADDPARTNER:"/auth/partner/addpartner",
      PARTNERENQUIRY: "/auth/partner/partnerenquiry"
    },
    VIEWDRIVE:{
      HOME: '/auth/drive',
      MANAGEDRIVE:'/auth/drive/managedrive',
      DRIVESETTINGS:'/auth/drive/drivesettings'
    },

    EMPDASHBOARD:{
      HOME:'/auth/dashboard',
      PROFILE:'/auth/dashboard/profile',
      CHANGEPWD:'/auth/dashboard/changePwd'
    },
    EMPJOBS:{
      REQUIRMENT:'auth/jobrequirment'
    }
  },

  // Routes
  ROUTES: {
    LOGIN: 'login',
    PASSWORD: {
      FORGOT: 'forgot-password',
      RESET: 'resetpwd',
      SETUP: 'setpwd'
    },
    LANDING: 'landing',
    REGISTER:"register",
    EMPLOYERS:"employers",
    LANDINGPAGE:{
      LANDINGPAGE:"",
      HOME:"home",
      ABOUT:"about",
      EMPLOYER:"employer",
      FRESHGRADUATES:"FreshGraduates",
      HIRINGPARTNER:"hiringpartner",
      INSTITUTIONALPARTNERS:"institutionalpartners",
      CONTACT:"contact"
    },
    HOME: 'home',
    AUTH: 'auth',
    CNDIDATELANDING:'candidateview',
    CANDIDATEDASH:{
      DASHBOARD:'dashboard',
      JOBLIST:'findjobs',
      RESUMEBUILDER:'resumebuilder',
      RESUMETEMPLATE:'resumetemplate',
      JOBSSAVED:'savedjobs',
      JOBSAPPLIED:'appliedjobs',
      JOBDESCRIPTION:'jobdescription',
      PAGINATION:'page',
    },
    REPORTS: {
      HOME: 'reports',
      USERLIST: 'userlist',
      VIEWREPORTS: 'viewreport',
      HIRINGREPORT:'hiring',
      DASHBOARD:'dashboard',
      BEHAVIOUR_MODULE: {
        HOME: 'behavioural',
        BEHAVIOUR_REPORT: 'view'
      }
    },
    CANDIDATE:{
      HOME:'candidate',
      VIEWOVERALLREPORT:'candidatereport'
    },
    SKILLMASTER:{
      HOME:'skillmaster',
      SKILLMASTERLIST:"skillmasterlist",
      SKILLBULKUPlOAD:'skillbulkupload'
    },
    PARTNER:{
      HOME:'partner',
      PARTNERLIST:'partnerlist',
      ADDPARTNER:"addpartner",
      PARTNERENQUIRY:"partnerenquiry"
    },
    DRIVE:{
      HOME: 'drive',
      MANAGEDRIVE:'managedrive',
      DRIVESETTINGS:'drivesettings'
    },

    EMPDASHBOARD:{
      HOME:'dashboard',
      COUNTCARD:'count',
      DEMOGRAPHY:'demography',
      DISCIPLINE:'discipline',
      GRADUATION:'Graduation',
      DEGREE :'Degree',
      PROFILE:'profile',
      CHANGEPWD:'changePwd',
      REQUIRMENT:'jobrequirment'
    }
  }
};
