import $ from 'jquery';

class pcEvent {

  figureHoverEvent(_this) {
    console.log(_this.props.location.pathname);
    $('figure').unbind('mouseenter mouseleave')
    .hover(
      (e) => {
        console.log('Figure Hover Start');
        e.stopPropagation();
        const dom = e.currentTarget;
        const childrenDom = $(dom).children();
        if(childrenDom.is('video')) $(dom).children('video').get(0).play();
        _this.captionShow(dom);
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
        _this.captionHide();
        $(dom).siblings().stop().fadeTo(0, 1);
      }
    );
  }
}

export default new pcEvent();