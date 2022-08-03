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
    AUTH: '/auth',
    LANDING: '/landing',
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
    }
  },

  // Routes
  ROUTES: {
    LOGIN: 'login',
    LANDING: 'landing',
    HOME: 'home',
    AUTH: 'auth',
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
    }
  }
};
