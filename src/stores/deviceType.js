import { observable } from 'mobx';

const deviceType = observable({

  device: 'PC',
  isChange: false,
  checkDevice: function() {
    const filter = ['iphone','ipod','android','blackberry','windows ce','nokia','webos','opera mini','sonyericsson','opera mobi','iemobile'];
    let device = '';
    for(let i=0; i<filter.length; i++) {
      if (navigator.userAgent.toLowerCase().indexOf(filter[i]) !== -1) {
        if(this.device === 'PC') this.isChange = true;
        device = 'MOBILE';
        break;
      }
    }
    if(device === '') {
      if(this.device === 'MOBILE') this.isChange = true;
      device = 'PC';
    }
    this.device = device;
  }

});

export default deviceType;