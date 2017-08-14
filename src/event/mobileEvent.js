import $ from 'jquery';
import { caption } from '../stores';

class mobileEvent {

  constructor() {
    this.pageContext = null;
    this.figureDom = null;
    this.touchStart = false;
    this.touchMove = false;
    this.navState = false;
    this.navMenuTime = 500;
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
        if($(this.figureDom).children().is('video')) {
          $(this.figureDom).children('video').get(0).currentTime = 0;
          $(this.figureDom).children('video').get(0).pause();
        }
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
      const childrenDom = $(dom).children();
      if(this.touchStart && !this.touchMove) {
        if(this.figureDom === null)  {
          this.captionShow(dom);
          if(childrenDom.is('video')) $(dom).children('video').get(0).play();
          $(dom).siblings().stop().fadeTo(0, 0.5);
          this.figureDom = dom;
        } else if(this.figureDom === dom) {
          // // 두번째 클릭 이벤트
          this.captionHide();
          if(childrenDom.is('video')) {
            $(dom).children('video').get(0).currentTime = 0;
            $(dom).children('video').get(0).pause();
          }
          $(this.figureDom).siblings().stop().fadeTo(0, 1);
          const datalink = childrenDom.is('img') ? $(dom).children('img').attr('data-link') : $(dom).children('video').attr('data-link');
          console.log('같은거 터치');
          if(datalink) {
            window.open(datalink,'_blank');
          } else {
            console.log('Not Link');
          }
          this.figureDom = null;
        } else {
          // A 클릭했다가 B 클릭
          this.captionShow(dom);
          if($(this.figureDom).children().is('video')) {
            $(this.figureDom).children('video').get(0).currentTime = 0;
            $(this.figureDom).children('video').get(0).pause();
          }
          $(this.figureDom).siblings().stop().fadeTo(0, 1);
          if(childrenDom.is('video')) $(dom).children('video').get(0).play();
          $(dom).siblings().stop().fadeTo(0, 0.5);
          this.figureDom = dom;
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