const mobileTouch = {

  figureDom: null,
  touchStart: false,
  touchMove: false,

  mobileTapEvent: function(_dom,_startEvent, _moveEvent, _endEvent) {
    const self = this;
    _dom.unbind('touchstart').bind('touchstart', function(e){
      console.log('touchstart');
      e.stopPropagation();
      _startEvent(e, this);
      self.touchStart = true;
    });

    _dom.unbind('touchmove').bind('touchmove',function(e) {
      console.log('touchmove');
      e.stopPropagation();
      if(!self.touchStart) {
        return;
      }
      _moveEvent(e, this);
      self.touchMove = true;
    });

    _dom.unbind('touchend').bind('touchend', function(e){
      console.log('touchend');
      e.stopPropagation();
      _endEvent(e, this);
      self.touchStart = false;
      self.touchMove = false;
    });
  }
  
};

export default mobileTouch;