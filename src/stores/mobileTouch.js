import { observable } from 'mobx';

const mobileTouch = observable({
  figureDom: null,
  touchStart: false,
  touchMove: false
});

export default mobileTouch;