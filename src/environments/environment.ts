// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBooks: 'https://www.googleapis.com/books/v1/',
  firebase: {
    apiKey: ' AIzaSyBzcjWsPNmarYWd-xS0uhClRAPnGsxjzS4',
    authDomain: 'bzg-trent-books-app.firebaseapp.com',
    databaseURL: 'https://bzg-trent-books-app.firebaseio.com/',
    projectId: 'bzg-trent-books-app'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
