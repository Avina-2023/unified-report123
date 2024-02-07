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
    EXTLOGIN: '/externallogin',
    HOME: '/home',
    // HOME: '/static',
    AUTH: '/auth',
    LANDING: '/landing',
    REGISTER: '/register',
    EMPLOYERS: '/employers',
    LANDINGPAGE: {
      LANDINGPAGE: '/',
      HOME: '/home',
      ABOUT: '/about',
      EMPLOYER: '/employer',
      FRESHGRADUATES: '/FreshGraduates',
      HIRINGPARTNER: '/hiringpartner',
      INSTITUTIONALPARTNERS: '/institutionalpartners',
      CONTACT: '/contact',
    },

    CNDIDATELANDING: '/candidateview',
    CANDIDATEDASH: {
      NEWDASHBOARD: '/candidateview/home',
      MYACCOUNT : '/candidateview/profile',
      DASHBOARD: '/candidateview/dashboard',
      JOBLIST: '/candidateview/findjobs',
      INTERNSHIPLIST: '/candidateview/findinternship',
      RESUMEBUILDER: '/candidateview/resumebuilder',
      RESUMETEMPLATE: '/candidateview/resumetemplate',
      JOBSSAVED: '/candidateview/savedjobs',
      INTERNSHIPSAVED: '/candidateview/savedinternships',
      JOBSAPPLIED: '/candidateview/appliedjobs',
      INTERNSHIPSAPPLIED: '/candidateview/appliedinternships',
      PAGINATION: '/candidateview/page',
      JOBDESCRIPTION: '/candidateview/jobdescription',
    },
    PASSWORD: {
      FORGOT: '/forgot-password',
      RESET: '/resetpwd',
      SETUP: '/setpwd',
    },
    REPORTS: {
      HOME: '/auth/reports',
      USERLIST: '/auth/reports/userlist',
      VIEWREPORTS: '/auth/reports/viewreport',
      HIRINGREPORT: '/auth/reports/hiring',
      DASHBOARD: '/auth/reports/dashboard',
      BEHAVIOURALDASHBOARD: '/auth/reports/behaviouraldashboard',
      BEHAVIOUR_MODULE: {
        BEHAVIOUR_MODULE_PAGE: '/auth/reports/behavioural',
        BEHAVIOUR_REPORT: '/auth/reports/behavioural/view',
        BEHAVIOUR_REPORT1: '/auth/reports/behavioural/viewBajajReport',
      },
    },
    CANDIDATE: {
      HOME: '/auth/candidate',
      VIEWOVERALLREPORT: '/auth/candidate/candidatereport',
    },
    SKILLMASTER: {
      HOME: '/auth/skillmaster',
      SKILLMASTERLIST: '/auth/skillmaster/skillmasterlist',
      SKILLBULKUPlOAD: '/auth/skillmaster/skillbulkupload',
    },
    PARTNER: {
      HOME: '/auth/partner',
      PARTNERLIST: '/auth/partner/partnerlist',
      ADDPARTNER: '/auth/partner/addpartner',
      PARTNERENQUIRY: '/auth/partner/partnerenquiry',
      REQUIRMENT: 'auth/partner/jobrequirment',
      UPLOADREQUIRMENT: 'auth/partner/uploadpostrequirment',
      ADDOPENJOBS: '/auth/partner/addopenjobs',
      VIEWOPENJOBS: '/auth/partner/viewopenjobs',
      STUDENTTRACKER:'/auth/partner/studenttracker',
      PARTNERTRACKER:'auth/partner/partnertracker'
    },
    // OPENJOBS: {
    //   HOME: '/auth/openjobs',
    //   // VIEWJOBS: 'auth/',
    // },
    OVERALLREPORTS: {
      HOME: '/auth/overall-reports',
      //OVERALLREPORTS: '/auth/report/overallreports'
    },
    VIEWDRIVE: {
      HOME: '/auth/drive',
      MANAGEDRIVE: '/auth/drive/managedrive',
      DRIVESETTINGS: '/auth/drive/drivesettings',
      VIEWCANDIDATE: '/auth/drive/candidatelist',
      VIEWCANDIDATEPROFILEBYEMPLOYER:
        '/auth/drive/viewCandidateProfilebyEmployer',
    },
    EMPDASHBOARD: {
      HOME: '/auth/dashboard',
      PROFILE: '/auth/dashboard/profile',
      CHANGEPWD: '/auth/dashboard/changePwd',
      CANDIDATESEARCH: '/auth/dashboard/candidatesearch',
    },
    EMPJOBS: {
      REQUIRMENT: 'auth/jobrequirment',
      POSTREQUIRMENT: 'auth/postrequirment',
    },
  },

  // Routes
  ROUTES: {
    LOGIN: 'login',
    EXTLOGIN: 'externallogin',
    PASSWORD: {
      FORGOT: 'forgot-password',
      RESET: 'resetpwd',
      SETUP: 'setpwd',
    },
    LANDING: 'landing',
    REGISTER: 'register',
    EMPLOYERS: 'employers',
    LANDINGPAGE: {
      LANDINGPAGE: '',
      HOME: 'home',
      ABOUT: 'about',
      EMPLOYER: 'employer',
      FRESHGRADUATES: 'FreshGraduates',
      HIRINGPARTNER: 'hiringpartner',
      INSTITUTIONALPARTNERS: 'institutionalpartners',
      CONTACT: 'contact',
    },
    HOME: 'home',
    AUTH: 'auth',
    CNDIDATELANDING: 'candidateview',
    CANDIDATEDASH: {
      NEWDASHBOARD: 'home',
      MYACCOUNT : 'profile',
      DASHBOARD: 'dashboard',
      JOBLIST: 'findjobs',
      INTERNSHIPLIST: 'findinternship',
      RESUMEBUILDER: 'resumebuilder',
      RESUMETEMPLATE: 'resumetemplate',
      JOBSSAVED: 'savedjobs',
      INTERNSHIPSAVED: 'savedinternships',
      JOBSAPPLIED: 'appliedjobs',
      INTERNSHIPSAPPLIED: 'appliedinternships',
      JOBDESCRIPTION: 'jobdescription',
      PAGINATION: 'page',
    },
    REPORTS: {
      HOME: 'reports',
      USERLIST: 'userlist',
      VIEWREPORTS: 'viewreport',
      HIRINGREPORT: 'hiring',
      DASHBOARD: 'dashboard',
      BEHAVIOURALDASHBOARD: 'behaviouraldashboard',
      BEHAVIOUR_MODULE: {
        HOME: 'behavioural',
        BEHAVIOUR_REPORT: 'view',
        BEHAVIOUR_REPORT1: 'viewBajajReport',
      },
    },
    CANDIDATE: {
      HOME: 'candidate',
      VIEWOVERALLREPORT: 'candidatereport',
    },
    SKILLMASTER: {
      HOME: 'skillmaster',
      SKILLMASTERLIST: 'skillmasterlist',
      SKILLBULKUPlOAD: 'skillbulkupload',
    },
    PARTNER: {
      HOME: 'partner',
      PARTNERLIST: 'partnerlist',
      ADDPARTNER: 'addpartner',
      PARTNERENQUIRY: 'partnerenquiry',
      REQUIRMENT: 'jobrequirment',
      UPLOADREQUIRMENT: 'uploadpostrequirment',
      ADDOPENJOBS: 'addopenjobs',
      VIEWOPENJOBS: 'viewopenjobs',
      STUDENTTRACKER:'studenttracker',
      PARTNERTRACKER:'partnertracker',
    },
    // OPENJOBS: {
    //   HOME: 'openjobs',
    //   ADDJOBS: 'addjobs',
    //   // VIEWJOBS: 'viewjobs',
    // },
    OVERALLREPORTS: {
      HOME: 'overall-reports',
      //OVERALLREPORTS: 'overallreports'
    },
    DRIVE: {
      HOME: 'drive',
      MANAGEDRIVE: 'managedrive',
      DRIVESETTINGS: 'drivesettings',
      VIEWCANDIDATE: 'candidatelist',
      VIEWCANDIDATEPROFILEBYEMPLOYER: 'viewCandidateProfilebyEmployer',
    },

    EMPDASHBOARD: {
      HOME: 'dashboard',
      COUNTCARD: 'count',
      DEMOGRAPHY: 'demography',
      DISCIPLINE: 'discipline',
      GRADUATION: 'Graduation',
      DEGREE: 'Degree',
      PROFILE: 'profile',
      CHANGEPWD: 'changePwd',
      POSTREQUIRMENT: 'postrequirment',
      REQUIRMENT: 'jobrequirment',
      // REQUIRMENT:'jobrequirment'
      CANDIDATESEARCH: 'candidatesearch',
    },
  },
};
