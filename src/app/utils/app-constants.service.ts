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
    REPORTS: {
      HOME: '/auth/reports',
    }
  },

  // Routes
  ROUTES: {
    LOGIN: 'login',
    HOME: 'home',
    AUTH: 'auth',
    REPORTS: {
      HOME: 'reports',
    }
  }
};
