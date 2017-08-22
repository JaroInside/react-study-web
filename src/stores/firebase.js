import * as firebase from 'firebase';
import firebaseconfig from '../config';

const config = {
  apiKey: firebaseconfig.apiKey,
  authDomain: firebaseconfig.authDomain,
  databaseURL: firebaseconfig.databaseURL,
  projectId: firebaseconfig.projectId,
  storageBucket: firebaseconfig.storageBucket,
  messagingSenderId: firebaseconfig.messagingSenderId
};
firebase.initializeApp(config);
const db = firebase.database();

export default db;