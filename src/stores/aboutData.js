import { extendObservable } from 'mobx';
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

class aboutData {

  constructor() {
    extendObservable(this, {
        data: []
    })
    const ref = db.ref();
    ref.child('About').on('value' , (snapshot) => {
      const list = snapshot.val();
      const datas = [];
      if (list !== null) {
        for (const key of Object.keys(list)) {
          datas.push({
            id: key,
            data: list[key]
          });
        }
      } else {
        console.log('null');
      }
      this.data = datas;
    });
  }

};

export default new aboutData();