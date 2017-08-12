import { extendObservable } from 'mobx';
import $ from 'jquery';

class deviceType {

  constructor() {
    extendObservable(this, {
        device: 'PC'
    })
    this.checkDevice();
    $(window).resize(() => {
      this.checkDevice();
    });
  }
  checkDevice() {
    const filter = ['iphone','ipod','android','blackberry','windows ce','nokia','webos','opera mini','sonyericsson','opera mobi','iemobile', 'ipad'];
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
    if(this.device !== device) this.device = device;
  };

}

export default new deviceType();