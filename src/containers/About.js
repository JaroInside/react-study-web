import * as React from 'react';
import { ImageFigure } from '../components';
import $ from 'jquery';
import data from '../static/About/data' 
import { observer } from 'mobx-react';
import { deviceType } from '../stores';
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
    console.log('componentDidUpdate');
    this.checkDeviceEvent();
  }

  checkDeviceEvent() {
    if(deviceType.device === 'PC') this.pcEvent();
    else this.mobileEvent();
  }

  pcEvent() {
    console.log('pcEvent');
    this.unbindMobileEvent();
    $('figure').hover(
      function(){
        console.log('hoverstart');
        $(this).siblings().stop().fadeTo(0, 0.5);
        $(this).children('figcaption').stop().show(0);
        $(this).click(() => {
          const datalink = $(this).children('img').attr('data-link');
          if(datalink) {
            window.open(datalink,'_blank');
          } else {
            console.log('Not Link');
          }
        });
      },
      function() {
        $(this).siblings().stop().fadeTo(0, 1);
        $(this).children('figcaption').stop().hide(0);
        $(this).unbind('click');
      }
    );
  }

  unbindPcEvent() {
    $('figure').unbind('mouseenter mouseleave');
  }

  // touch이벤트로 바꿀것
  mobileEvent() {
    console.log('mobileEvent');
    this.unbindPcEvent();
    mobileTouch.mobileTapEvent($('figure'),
      function() {

      }, function() {

        $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
        $(mobileTouch.figure).children('figcaption').stop().hide(0);
        mobileTouch.figure = null;

      }, function(e, _self){
        if(mobileTouch.touchStart && !mobileTouch.touchMove) {
          if(mobileTouch.figure === null)  {
            $(_self).siblings().stop().fadeTo(0, 0.5);
            $(_self).children('figcaption').stop().show(0);
            mobileTouch.figure = _self;
          } else if(mobileTouch.figure === _self) {
            // 두번째 클릭 이벤트
            $(mobileTouch.figure).siblings().stop().fadeTo(0, 1);
            $(mobileTouch.figure).children('figcaption').stop().hide(0);
            const datalink = $(_self).children('img').attr('data-link');
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
            $(mobileTouch.figure).children('figcaption').stop().hide(0);
            $(_self).siblings().stop().fadeTo(0, 0.5);
            $(_self).children('figcaption').stop().show(0);
            mobileTouch.figure = _self;
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
          $(mobileTouch.figure).children('figcaption').stop().hide(0);
          mobileTouch.figure = null;          
        }
      }
    );
  }

  unbindMobileEvent() {
    $('#root').unbind('touchstart touchmove touchend');
  }

  render() {
    return (
      <main>
        <h1 className='device'>{deviceType.device.toLowerCase()}</h1>
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
      </main>
    );
  }
});

export default About;
