import { extendObservable } from 'mobx';
import db from './firebase';

class bookMarkData {

  constructor() {
    extendObservable(this, {
        data: []
    })
    const ref = db.ref();
    ref.child('Bookmark').on('value' , (snapshot) => {
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

export default new bookMarkData();