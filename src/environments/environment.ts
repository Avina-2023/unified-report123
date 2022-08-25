// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  dev: false,
  qa: false,
  uat: false,
  production: true,
  local: false,
  encryptionKey: 'unifiedReports',
  // blobKey : "?sv=2020-02-10&ss=b&srt=sco&sp=rwdlactfx&se=2121-07-05T12:33:56Z&st=2021-07-05T04:33:56Z&spr=https&sig=LAL2dTXStLF0Qgyd6%2FiPjw5xjMR0kmR2kB7bZmudHdY%3D",
  blobKey : "",

  API_BASE_URL: 'https://uapqaedgeservice.lntedutech.com',
  NODE_EDGE_URL: 'https://uapqaedgeservice.lntiggnite.com',
  NODE_URL: 'https://uapcoreserviceqa.lntiggnite.com',
  PROCTOR_URL : 'http://lntproctordev.lntedutech.com/api/storage/',
  PROCTOR : 'https://lntproctordev.lntedutech.com',
  MONGOCHARTURL: 'https://charts.mongodb.com/charts-microcertuat-gzomw',
  OFFCAMPUSDRIVE:'https://campus-qa.lntedutech.com/l#/open/off-campus/profile',
  CAMPUS_URL:'https://campus-qa.lntedutech.com/l#/login'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
