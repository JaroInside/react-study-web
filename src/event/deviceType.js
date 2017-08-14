class deviceType {

  constructor() {
    this.device = this.checkDevice();
  }
  checkDevice() {
    const filter = ['iphone','ipod','android','blackberry','windows ce','nokia','webos','opera mini','sonyericsson','opera mobi','iemobile', 'ipad'];
    for(let i=0; i<filter.length; i++) {
      if (navigator.userAgent.toLowerCase().indexOf(filter[i]) !== -1) {
        return 'MOBILE';
      }
    }
    return 'PC';
  };

}

export default new deviceType();