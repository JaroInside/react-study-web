import $ from 'jquery';
import { caption } from '../stores';

class pcEvent {

  constructor() {
    this.pageContext = null;
    this.setCursorPointer();
  }

  setCursorPointer() {
    $.event.special.click = {
      setup: function() {
        $(this).css( 'cursor', 'pointer' );
        return false;
      },
      teardown: function() {
        $(this).css( 'cursor', '' );
        return false;
      }
    };
  }

  setPageContext(_this) {
    $('figure').unbind('mouseenter mouseleave');
    this.pageContext = _this;
    console.log(this.pageContext.props.location.pathname);
  }

  figureHoverEvent() {
    $('figure').unbind('mouseenter mouseleave')
    .hover(
      (e) => {
        console.log('Figure Hover Start');
        e.stopPropagation();
        const dom = e.currentTarget;
        const childrenDom = $(dom).children();
        if(childrenDom.is('video')) $(dom).children('video').get(0).play();
        this.captionShow(dom);
        $(dom).siblings().stop().fadeTo(0, 0.5);
        $(dom).unbind('click').click(() => {
          const datalink = childrenDom.is('img') ? $(dom).children('img').attr('data-link') : $(dom).children('video').attr('data-link');
          (datalink) ? window.open(datalink,'_blank') : console.log('Not Link');
        });
      } , 
      (e) => {
        console.log('Figure Hover End');
        e.stopPropagation();
        const dom = e.currentTarget;
        if($(dom).children().is('video')) {
          $(dom).children('video').get(0).currentTime = 0;
          $(dom).children('video').get(0).pause();
        }
        this.captionHide();
        $(dom).siblings().stop().fadeTo(0, 1);
      }
    );
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

export default new pcEvent();