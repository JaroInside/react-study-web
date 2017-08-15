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

    this.swipe = false;
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

  mobileFigureEvent() {
    $('figure').unbind('touchstart touchmove touchend')
    .bind('touchstart', (e) => {
      console.log('Figure Touch Start');
      e.stopPropagation();
      this.touchStart = true;
    })
    .bind('touchmove', (e) => {
      console.log('Figure Touch Move');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.figureDom !== null) {
        this.captionHide();
        this.figureVideoPause(this.figureDom);
        $(this.figureDom).siblings().stop().fadeTo(0, 1);
        this.figureDom = null;
      }
      this.touchMove = true;
    })
    .bind('touchend', (e) => {
      console.log('Figure Touch End');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      const dom = e.currentTarget;
      if(this.touchStart && !this.touchMove) {
        if(this.figureDom === null)  {
          this.figureDom = dom;
          this.captionShow(this.figureDom);
          this.figureVideoPlay(this.figureDom);
          $(this.figureDom).siblings().stop().fadeTo(0, 0.5);
        } else if(this.figureDom === dom) {
          // // 두번째 클릭 이벤트
          this.captionHide();
          this.figureVideoPause(this.figureDom);
          $(this.figureDom).siblings().stop().fadeTo(0, 1);
          const datalink = $(this.figureDom).children().is('img') ? 
                              $(this.figureDom).children('img').attr('data-link') : 
                              $(this.figureDom).children('video').attr('data-link');
          console.log('같은거 터치');
          if(datalink) {
            window.open(datalink,'_blank');
          } else {
            console.log('Not Link');
          }
          this.figureDom = null;
        } else {
          // A 클릭했다가 B 클릭
          this.figureVideoPause(this.figureDom);
          $(this.figureDom).siblings().stop().fadeTo(0, 1);
          this.figureDom = dom;
          this.captionShow(this.figureDom);
          this.figureVideoPlay(this.figureDom);
          $(this.figureDom).siblings().stop().fadeTo(0, 0.5);
        }
        console.log('무브가 일어나지 않은 터치');
      } else {
        console.log('무브가 일어난 터치');
      }
      this.touchStart = false;
      this.touchMove = false;
    });
  }

  mobileRootEvent() {
    $('#root').unbind('touchstart touchmove touchend')
    .bind('touchstart', (e) => {
      console.log('Touch Start');
      e.stopPropagation();      
      this.touchStart = true;
    })
    .bind('touchmove', (e) => {
      console.log('Touch Move');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.figureDom !== null) {
        this.captionHide();
        $(this.figureDom).siblings().stop().fadeTo(0, 1);
        this.figureDom = null;
      }
      this.touchMove = true;
    })
    .bind('touchend', (e) => {
      console.log('Touch End');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.touchStart && !this.touchMove) {
        this.captionHide();
        this.figureVideoPause(this.figureDom);
        $(this.figureDom).siblings().stop().fadeTo(0, 1);
        this.figureDom = null;
        console.log('무브가 일어나지 않은 터치');
      } else {
        console.log('무브가 일어난 터치');
      }
      this.touchStart = false;
      this.touchMove = false;
    });
  }

  mobileDropMenuEvent() {
    $('.dropdown-menu').unbind('touchstart touchmove touchend')
    .bind('touchstart', (e) => {
      console.log('Touch Start');
      e.stopPropagation();      
      this.touchStart = true;
    })
    .bind('touchmove', (e) => {
      console.log('Touch Move');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.figureDom !== null) {
        this.captionHide();
        $(this.figureDom).siblings().stop().fadeTo(0, 1);
        this.figureDom = null;
      }
      this.touchMove = true;
    })
    .bind('touchend', (e) => {
      console.log('Touch End');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.touchStart && !this.touchMove) {
        this.captionHide();
        $(this.figureDom).siblings().stop().fadeTo(0, 1);
        this.figureDom = null;
        let changeLeftValue = (this.navState) ? 100 : 0;
        this.navState = !this.navState;
        $('nav').stop().animate({
          left: `${changeLeftValue}%`
        },this.navMenuTime);
      }
      this.touchStart = false;
      this.touchMove = false;
    });
  }

  mobileSwipeEvent() {
    $('figure')
    .bind('touchstart', (e) => {
      console.log('Figure Touch Start');
      e.stopPropagation();
      this.startSwipeTime = moment();
      this.startSwipePoint.X = e.targetTouches[0].pageX;
      this.startSwipePoint.Y = e.targetTouches[0].pageY;
      this.moveSwipePoint.X = e.targetTouches[0].pageX;
      this.moveSwipePoint.Y = e.targetTouches[0].pageY;
      this.touchStart = true;
    })
    .bind('touchmove', (e) => {
      console.log('Figure Touch Move');
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      const nowX = e.targetTouches[0].pageX;
      const nowY = e.targetTouches[0].pageY;

      const startDist = Math.sqrt( ((nowX - this.startSwipePoint.X) ** 2) + ( (nowY - this.startSwipePoint.Y) ** 2 ) );
      let angle = (180 / Math.PI) * Math.atan2((nowX - this.startSwipePoint.X), (nowY - this.startSwipePoint.Y));
      angle = angle < 0 ? 360 + angle : angle;

      this.touchMove = true;

    })
    .bind('touchend', (e) => {
      console.log('Figure Touch End');
      this.endSwipeTime = moment();
      if(this.endSwipeTime.diff(this.startSwipeTime, 'millesecond') > 500) this.swipe = false;
      console.log(this.endSwipeTime.diff(this.startSwipeTime, 'millesecond'));
      e.stopPropagation();
      if(!this.touchStart) {
        return;
      }
      if(this.touchStart && !this.touchMove) {
        console.log('무브가 일어나지 않은 터치');
      } else {
        console.log('무브가 일어난 터치');
        if(this.swipe) console.log('스와이프 일어남');
      }
      
      this.touchStart = false;
      this.touchMove = false;
    });
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