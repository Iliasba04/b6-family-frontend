// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //backendUri : 'http://[::1]:3000',
  backendUri : 'https://b6-family-dues-backend.vercel.app',

  firebaseConfig : {
    apiKey: "AIzaSyAnoxPDoWFzhgdpUTvBe4Od2igwlCIl5aw",
    authDomain: "b6-family-bd.firebaseapp.com",
    databaseURL: "https://b6-family-bd-default-rtdb.firebaseio.com/",
    projectId: "b6-family-bd",
    storageBucket: "b6-family-bd.appspot.com",
    messagingSenderId: "1085059937760",
    appId: "1:1085059937760:web:4268f8b23fff5284cfa785",
    measurementId: "G-NWKM1ER2Q7"
  }
  
};