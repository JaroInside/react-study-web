import { extendObservable } from 'mobx';
import moment from 'moment';

class time {
  constructor() {
    extendObservable(this, {
        day: moment().format('ddd MMM Do YYYY'),
        time: moment().format('h:mm:ss a')
    });
    this.setTime();
  }

  setTime() {
    setInterval(() => {
      this.updateTime();
    },1000);
  };
  updateTime() {
    const now = moment();
    this.day = now.format('ddd MMM Do YYYY');
    this.time = now.format('h:mm:ss a');
  };

}

// const time = observable({

//   day: moment().format('ddd MMM Do YYYY'),
//   time: moment().format('h:mm:ss a'),
//   setTime: function() {
//     setInterval(() => {
//       this.updateTime();
//     },1000);
//   },
//   updateTime: function() {
//     const now = moment();
//     this.day = now.format('ddd MMM Do YYYY');
//     this.time = now.format('h:mm:ss a');
//   }

// });

export default new time();