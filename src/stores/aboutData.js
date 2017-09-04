import { extendObservable } from 'mobx';
import firebase from './firebase';

class aboutData {

  constructor() {
    extendObservable(this, {
        data: []
    })
    const db = firebase.database();
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