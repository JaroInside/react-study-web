import * as React from 'react';
import { ImageFigure, Caption } from '../components';
import $ from 'jquery';
import data from '../static/About/data' 
import { observer } from 'mobx-react';
import { deviceType, itemClick } from '../stores';
import { mobileTouch } from '../object';

const About = observer(class About extends React.Component {

  componentDidMount() {
    this.checkDeviceEvent();
  }

  componentWillUnmount() {
    this.unbindPcEvent();
    this.unbindMobileEvent();
  }

  componentDidUpdate() {
    this.unbindPcEvent();
    this.unbindMobileEvent();
    this.checkDeviceEvent();
  }

  checkDeviceEvent() {
    deviceType.device === 'PC' ? this.pcEvent(this) : this.mobileEvent(this);
  }

  pcEvent(_this) {
    console.log('pcEvent');
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
    mobileTouch.mobileTapEvent($('figure'),
      function() {

      }, function() {

        $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
        _this.captionHide();
        mobileTouch.figure = null;

      }, function(e, dom){
        if(mobileTouch.touchStart && !mobileTouch.touchMove) {
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
    $('#root').unbind('touchstart touchmove touchend');
  }

  captionShow(_this) {
    const caption = $(_this).children('img').attr('data-caption');
    itemClick.caption = (caption === undefined || caption === '') ? null : caption;
  }

  captionHide() {
    itemClick.caption = null;
  }

  render() {
    return (
      <main>
        <div className='columns'>
          {data.map((contact, i) => {
            if(data[i].type === 'image') {
              return (
                <ImageFigure data={data[i]} key={i} />
              );
            } else {
              return (
                <ImageFigure data={data[i]} key={i} />
              );
            }
          })}
        </div>
        <Caption />
        <h1 className='device'>connect to {deviceType.device.toLowerCase()}</h1>
      </main>
    );
  }
});

export default About;