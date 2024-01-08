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

  blobKey: '',

  // API_BASE_URL: 'https://uapedgeservicedev.lntedutech.com',

  // NODE_EDGE_URL: 'https://uapedgeservicedev.lntedutech.com',

  API_BASE_URL: 'https://skilledgedev.lntedutech.com',

  API_BASE_URL_RE: 'https://reportedgedev.lntedutech.com',

  NODE_EDGE_URL: 'https://skilledgedev.lntedutech.com',

  NODE_URL: 'https://uapcoreservicesdev.lntedutech.com',

  PROCTOR_URL: 'http://lntproctordev.lntedutech.com/api/storage/',

  PROCTOR: 'https://lntproctordev.lntedutech.com',

  MONGOCHARTURL: 'https://charts.mongodb.com/charts-microcertuat-gzomw',

  OFFCAMPUSDRIVE: 'https://campus-qa.lntedutech.com/l#/open/off-campus/profile',

  CAMPUS_URL: 'http://campus-dev.lntedutech.com/l#/login',

  SKILL_EDGE_URL: 'https://skilledgedev.lntedutech.com',

  SKILL_PROFILE_URL: 'https://profile-dev.lntedutech.com',

  MICROLEARN_API_URL: 'https://edgeportaldev.lntedutech.com',

  MICROLEARN_URL: 'https://microlearndev.lntedutech.com/Home',

  CORPORATE_URL: 'https://review.lntedutech.com',



  cryptoEncryptionKey: '(!@#Passcode!@#)',

  blobToken:
    '?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2221-11-23T19:12:41Z&st=2021-11-23T11:12:41Z&spr=https,http&sig=R6%2BlZGrzjuFs1aAy2uUG%2BNkjVig5%2F8disv01i86VK8M%3D',

  SAS_Token:
    '?sv=2018-03-28&ss=b&srt=sco&sp=racwdl&st=2021-04-12T03%3A36%3A39Z&se=2171-04-12T03%3A41%3A39Z&spr=https%2Chttp&sig=jl7SfT41958EUB7YDb48xwU65cZcsnTN8vdttEhBad8%3D',
};

/*

 * For easier debugging in development mode, you can import the following file

 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.

 *

 * This import should be commented out in production mode because it will have a negative impact

 * on performance if an error is thrown.

 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
