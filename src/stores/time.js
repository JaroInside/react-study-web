import { observable } from 'mobx';
import moment from 'moment';

const time = observable({

  day: moment().format('ddd MMM Do YYYY'),
  time: moment().format('h:mm:ss a'),
  setTime: function() {
    setInterval(() => {
      const now = moment();
      this.day = now.format('ddd MMM Do YYYY');
      this.time = now.format('h:mm:ss a');
    },1000);
  }

});

export default time;