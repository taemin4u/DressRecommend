// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// const app = firebase.initializeApp(firebaseConfig);

// export default app;
// export const authService = firebase.auth();

// const firebaseConfig = {
//   apiKey: 'AIzaSyBAyLe6HihYvIGkAc_Vh7nwPqlMBRG2NCI',
//   authDomain: 'twitter-9e63d.firebaseapp.com',
//   projectId: 'twitter-9e63d',
//   storageBucket: 'twitter-9e63d.appspot.com',
//   messagingSenderId: '686499909063',
//   appId: '1:686499909063:web:50a9b0bf564a6926235de2',
//   measurementId: 'G-4L4XNC88X9',
// };

const app = firebase.initializeApp(firebaseConfig);
export default app;
export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
