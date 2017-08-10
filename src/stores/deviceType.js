import { observable } from 'mobx';

const deviceType = observable({

  device: 'PC',
  checkDevice: function() {
    const filter = ['iphone','ipod','android','blackberry','windows ce','nokia','webos','opera mini','sonyericsson','opera mobi','iemobile'];
    let device = '';
    for(let i=0; i<filter.length; i++) {
      if (navigator.userAgent.toLowerCase().indexOf(filter[i]) !== -1) {
        device = 'MOBILE';
        break;
      }
    }
    if(device === '') {
      device = 'PC';
    }
    this.device = device;
  }

});

export default deviceType;