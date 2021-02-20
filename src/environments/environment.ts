// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: 'C4cbd859f9b45234585ffd5cea5a69831b50a10d8ad6bcd2e9001dd9cd6145aa8',
  client_secret: 'ecbe49391db86adef22bfccf95bd774dc88e2e7a8091e2625dfe39420e047c45',
  redirect_uri: 'http://localhost:4200/landing',
  scope: 'spark:all spark:kms',
  TIMEOUT: 3600
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
