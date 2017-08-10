import { observable } from 'mobx';
import moment from 'moment';

const time = observable({

  day: moment().format('ddd MMM Do YYYY'),
  time: moment().format('h:mm:ss a'),
  setTime: function() {
    setInterval(() => {
      this.updateTime();
    },1000);
  },
  updateTime: function() {
    const now = moment();
    this.day = now.format('ddd MMM Do YYYY');
    this.time = now.format('h:mm:ss a');
  }

});

export default time;