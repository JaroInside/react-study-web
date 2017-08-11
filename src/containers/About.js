import * as React from 'react';
import { ImageFigure, Caption } from '../components';
import $ from 'jquery';
import { observer, inject } from 'mobx-react';
import { caption } from '../stores';
import { mobileTouch } from '../object';

const About = inject("aboutData" , "deviceType")(observer(class About extends React.Component {

  componentDidMount() {
    this.checkDeviceEvent();
  }

  componentWillUnmount() {
    this.unbindPcEvent();
    this.unbindMobileEvent();
  }

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    this.unbindPcEvent();
    this.unbindMobileEvent();
    this.checkDeviceEvent();
  }

  checkDeviceEvent() {
    // deviceType.device === 'PC' ? this.pcEvent(this) : this.mobileEvent(this);
  }

  pcEvent(_this) {
    console.log('pcEvent');
    this.unbindMobileEvent();
    $('figure').hover(
      function(){
        console.log('hoverstart');
        _this.captionShow(this);
        $(this).siblings().stop().fadeTo(0, 0.5);
        $(this).unbind('click').click(() => {
          const datalink = $(this).children('img').attr('data-link');
          if(datalink) {
            window.open(datalink,'_blank');
          } else {
            console.log('Not Link');
            // console.log($(this).children('img').attr('src'));
          }
        });
      },
      function() {
        $(this).siblings().stop().fadeTo(0, 1);
        _this.captionHide();
      }
    );
  }

  unbindPcEvent() {
    $('figure').unbind('mouseenter mouseleave');
  }

  mobileEvent(_this) {
    console.log('mobileEvent');
    this.unbindPcEvent();
    mobileTouch.mobileTapEvent($('figure'),
      function() {

      }, function() {

        $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
        _this.captionHide();
        mobileTouch.figure = null;

      }, function(e, dom){
        if(mobileTouch.touchStart && !mobileTouch.touchMove) {
          console.log(mobileTouch.figure);
          if(mobileTouch.figure === null)  {
            $(dom).siblings().stop().fadeTo(0, 0.5);
            _this.captionShow(dom);
            mobileTouch.figure = dom;
          } else if(mobileTouch.figure === dom) {
            // 두번째 클릭 이벤트
            $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
            _this.captionHide();
            const datalink = $(dom).children('img').attr('data-link');
            console.log('같은거 터치');
            if(datalink) {
              window.open(datalink,'_blank');
            } else {
              console.log('Not Link');
            }
            mobileTouch.figure = null;
            
          } else {
            // A 클릭했다가 B 클릭
            $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
            _this.captionShow(dom);
            $(dom).siblings().stop().fadeTo(0, 0.5);
            mobileTouch.figure = dom;
          }
        }
      }
    );

    mobileTouch.mobileTapEvent($('#root').not('figure'), 
      function() {

      }, function() {

      }, function(e){
        if(mobileTouch.touchStart && !mobileTouch.touchMove) {
          $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
          _this.captionHide();
          mobileTouch.figure = null;          
        }
      }
    );
  }

  unbindMobileEvent() {
    $('#root, figure').unbind('touchstart touchmove touchend');
    mobileTouch.figure = null;
  }

  captionShow(_this) {
    const text = $(_this).children('img').attr('data-caption');
    caption.caption = (text === undefined || text === '') ? null : text;
  }

  captionHide() {
    caption.caption = null;
  }

  // 모든 이벤트 해제
  unbindEvent() {

  }
  // Pc 이벤트 바인딩
  bindPcEvent() {

  }

  // pc hover event 함수 작성 - 이벤트 바인딩 전에 unbind도 추가
  pcHoverEvent(_dom, fn, fn2) {
  
  }

  // mobile 이벤트 바인딩
  bindMobileEvent() {

  }

  // mobile tap event 함수 작성  - 이벤트 바인딩 전에 unbind도 추가
  mobileTapEvent(_dom, fn, fn2, fn3) {

  }

  render() {
    const figures = this.props.aboutData.data;
    //console.log(this.props.deviceType.device);
    return (
      <main>
        <div className='columns'>
          {figures.map((figures) => {
            if(figures.data.type === 'image') {
              return (
                <ImageFigure data={figures.data} key={figures.id} />
              );
            } else {
              return (
                <ImageFigure data={figures.data} key={figures.id} />
              );
            }
          })}
        </div>
        <Caption />
      </main>
    );
  }
}));

export default About;