import { extendObservable } from 'mobx';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDzzc-aseC_soTs1KCf1UEc2QQbOVNS8ZU",
  authDomain: "study-firebase-ec464.firebaseapp.com",
  databaseURL: "https://study-firebase-ec464.firebaseio.com",
  projectId: "study-firebase-ec464",
  storageBucket: "study-firebase-ec464.appspot.com",
  messagingSenderId: "952414646008"
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
          datas.push(list[key]);
        }
      }
      console.log(datas);
      this.data = datas;
      console.log(this.data);
    });
  }

};

export default new aboutData();