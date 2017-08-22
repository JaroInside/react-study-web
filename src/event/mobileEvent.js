import $ from 'jquery';
import moment from 'moment';
import { caption } from '../stores';

class mobileEvent {

  constructor() {
    this.pageContext = null;
    this.figureDom = null;
    this.touchStart = false;
    this.touchMove = false;
    this.navState = false;
    this.navMenuTime = 500;

    this.swipe = null;
    this.startSwipePoint = {
      X: null,
      Y: null
    };
    this.moveSwipePoint = {
      X: null,
      Y: null
    }

    this.startSwipeTime = null;
    this.endSwipeTime = null;
    this.setEvent();
  };

  setEvent() {

    //let moved = false;

    $.event.special.sameTap = {
	    setup    : setup,
      teardown : teardown
	  };

    $.event.special.tap = {
      setup    : setup,
      teardown : teardown
    };

    function setup() {
      console.log('tap');
      $(this)
      .bind('touchend', handler );
    }

    function teardown() {
      $(this)
      .unbind('touchend', handler );
    }

    function handler() {
      var elem = $(this);
      console.log(elem);
        elem.triggerHandler( 'tap' );
    }

  }

  setPageContext(_this) {
    $('#root, figure').unbind('touchstart touchmove touchend');
    this.pageContext = _this;
    this.navState = false;
    $('nav').stop().animate({
      left: '100%'
    },this.navMenuTime);
    console.log(this.pageContext.props.location.pathname);
  }

  tapEvent(_event) { 
    $(_event.dom).unbind('touchstart touchmove touchend')
    .bind('touchstart' , (e) => {
      console.log('Touch Start');
      e.stopPropagation();
      _event.start(this, e);
      this.touchStart = true;
    })
    .bind('touchmove' , (e) => {
      console.log('Touch Move');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      _event.move(this, e);
      this.touchMove = true;
    })
    .bind('touchend' , (e) => {
      console.log('Touch End');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.touchStart && !this.touchMove) {
        _event.end_notMove(this, e);
        console.log('무브가 일어나지 않은 터치');
      } else {
        _event.end_move(this, e);
        console.log('무브가 일어난 터치');
      }
      this.touchStart = false;
      this.touchMove = false;
    });
  }

  setFigureEvent() {
    const event = {
      dom: 'figure',
      start: function(_this, e) {},
      move: function(_this, e) {},
      end_notMove: function(_this, e) {},
      end_move: function(_this, e) {}
    };
    event.start = function(_this, e) {
      _this.startSwipeTime = moment();
      _this.startSwipePoint.X = e.targetTouches[0].pageX;
      _this.startSwipePoint.Y = e.targetTouches[0].pageY;
      _this.moveSwipePoint.X = e.targetTouches[0].pageX;
      _this.moveSwipePoint.Y = e.targetTouches[0].pageY;
      _this.swipe = true;
    };
    event.move = function(_this, e) {
      if(_this.figureDom !== null) {
        _this.captionHide();
        _this.figureVideoPause(_this.figureDom);
        $(_this.figureDom).siblings().stop().fadeTo(0, 1);
        _this.figureDom = null;
      }
      const nowX = e.targetTouches[0].pageX;
      const nowY = e.targetTouches[0].pageY;
      let angle = (180 / Math.PI) * Math.atan2((nowX - _this.moveSwipePoint.X), (nowY - _this.moveSwipePoint.Y));
      angle = angle < 0 ? 360 + angle : angle;
      _this.swipe = (_this.swipe && (angle >= 260 && angle <= 280));
      _this.moveSwipePoint.X = nowX;
      _this.moveSwipePoint.Y = nowY;
    };
    event.end_notMove = function(_this, e) {
      if(_this.figureDom === null)  {
        _this.figureDom = e.currentTarget;
        _this.captionShow(_this.figureDom);
        _this.figureVideoPlay(_this.figureDom);
        $(_this.figureDom).siblings().stop().fadeTo(0, 0.5);
      } else if(_this.figureDom === e.currentTarget) {
        // // 두번째 클릭 이벤트
        _this.captionHide();
        _this.figureVideoPause(_this.figureDom);
        $(_this.figureDom).siblings().stop().fadeTo(0, 1);
        const datalink = $(_this.figureDom).children().is('img') ? 
                            $(_this.figureDom).children('img').attr('data-link') : 
                            $(_this.figureDom).children('video').attr('data-link');
        console.log('같은거 터치');
        if(datalink) {
          window.open(datalink,'_blank');
        } else {
          console.log('Not Link');
        }
        _this.figureDom = null;
      } else {
        // A 클릭했다가 B 클릭
        _this.figureVideoPause(_this.figureDom);
        $(_this.figureDom).siblings().stop().fadeTo(0, 1);
        _this.figureDom = e.currentTarget;
        _this.captionShow(_this.figureDom);
        _this.figureVideoPlay(_this.figureDom);
        $(_this.figureDom).siblings().stop().fadeTo(0, 0.5);
      }
    };
    event.end_move = function(_this, e) {
      _this.endSwipeTime = moment();
      if(_this.endSwipeTime.diff(_this.startSwipeTime, 'millesecond') > 500) _this.swipe = false;
      const dist = Math.sqrt( ((_this.moveSwipePoint.X - _this.startSwipePoint.X) ** 2) + ( (_this.moveSwipePoint.Y - _this.startSwipePoint.Y) ** 2 ) );
      let angle = (180 / Math.PI) * Math.atan2((_this.moveSwipePoint.X - _this.startSwipePoint.X), (_this.moveSwipePoint.Y - _this.startSwipePoint.Y));
      angle = angle < 0 ? 360 + angle : angle;
      if(dist < 70 || (angle > 280 && angle < 260 ) ) _this.swipe = false;
      if(_this.swipe) {
        _this.navState = true;
        $('nav').stop().animate({
          left: '0%'
        },_this.navMenuTime);
      }
    };
    return event;
  }

  mobileFigureEvent() {
    this.tapEvent(this.setFigureEvent());
    $('figure').bind('tap',function(){
      console.log('11');
    });
  }

  setRootEvent() {
    const event = {
      dom: '#root',
      start: function(_this, e) {},
      move: function(_this, e) {},
      end_notMove: function(_this, e) {},
      end_move: function(_this, e) {}
    };
    event.move = function(_this, e) {
      if(_this.figureDom !== null) {
        _this.captionHide();
        $(_this.figureDom).siblings().stop().fadeTo(0, 1);
        _this.figureDom = null;
      }
    };
    event.end_notMove = function(_this, e) {
      _this.captionHide();
      _this.figureVideoPause(_this.figureDom);
      $(_this.figureDom).siblings().stop().fadeTo(0, 1);
      _this.figureDom = null;
    };
    return event;
  }

  mobileRootEvent() {
    this.tapEvent(this.setRootEvent());
  }

  setDropMenuEvent() {
    const event = {
      dom: '.dropdown-menu',
      start: function(_this, e) {},
      move: function(_this, e) {},
      end_notMove: function(_this, e) {},
      end_move: function(_this, e) {}
    };
    event.move = function(_this, e) {
      if(_this.figureDom !== null) {
        _this.captionHide();
        $(_this.figureDom).siblings().stop().fadeTo(0, 1);
        _this.figureDom = null;
      }
    };
    event.end_notMove = function(_this, e) {
      _this.captionHide();
      $(_this.figureDom).siblings().stop().fadeTo(0, 1);
      _this.figureDom = null;
      let changeLeftValue = (_this.navState) ? 100 : 0;
      _this.navState = !_this.navState;
      $('nav').stop().animate({
        left: `${changeLeftValue}%`
      },_this.navMenuTime);
    };
    return event;
  }

  mobileDropMenuEvent() {
    this.tapEvent(this.setDropMenuEvent());
  }

  setNavMenuEvent() {
    const event = {
      dom: '.sidemenu',
      start: function(_this, e) {},
      move: function(_this, e) {},
      end_notMove: function(_this, e) {},
      end_move: function(_this, e) {}
    };
    event.start = function(_this, e) {
      
    };
    event.move = function(_this, e) {

    };
    event.end_notMove = function(_this, e) {

    };
    event.end_move = function(_this, e) {
      _this.endSwipeTime = moment();
      if(_this.endSwipeTime.diff(_this.startSwipeTime, 'millesecond') > 500) _this.swipe = false;
      const dist = Math.sqrt( ((_this.moveSwipePoint.X - _this.startSwipePoint.X) ** 2) + ( (_this.moveSwipePoint.Y - _this.startSwipePoint.Y) ** 2 ) );
      let angle = (180 / Math.PI) * Math.atan2((_this.moveSwipePoint.X - _this.startSwipePoint.X), (_this.moveSwipePoint.Y - _this.startSwipePoint.Y));
      angle = angle < 0 ? 360 + angle : angle;
      if(dist < 70 || (angle > 280 && angle < 260 ) ) _this.swipe = false;
      if(_this.swipe) {
        _this.navState = true;
        $('nav').stop().animate({
          left: '0%'
        },_this.navMenuTime);
      }
    }
    return event;
  }

  figureVideoPlay(_dom) {
    if($(_dom).children().is('video')) $(_dom).children('video').get(0).play();
  }

  figureVideoPause(_dom) {
    if($(_dom).children().is('video')) {
      $(_dom).children('video').get(0).currentTime = 0;
      $(_dom).children('video').get(0).pause();
    }
  }

  captionShow(_dom) {
    const text = ($(_dom).children().is('video')) ? 
      $(_dom).children('video').attr('data-caption') 
    : $(_dom).children('img').attr('data-caption');
    caption.text = (text === undefined || text === '') ? null : text;
  }

  captionHide() {
    caption.text = null;
  }
}

export default new mobileEvent();