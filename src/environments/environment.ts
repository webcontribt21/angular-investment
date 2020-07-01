// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const { version: appVersion } = require('../../package.json');

import * as p from '../../package.json';

export const environment = {
  production: false,
  name: 'local',
  appVersion: p.version,
  apiEndpoint: 'https://api.****-dev.com/',
  websiteDomain: 'https://www.****-dev.de',
  onboardingDomain: 'https://onboarding.****-dev.de',
  sentryUrl: '',
  domain: '****-dev.de',
  intercomId: 'tfi4wnf4',
  gtmId: 'GTM-N5MSZJF',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
