import * as React from 'react';
import { ImageFigure, Caption } from '../components';
import $ from 'jquery';
import { observer, inject } from 'mobx-react';
import { caption } from '../stores';

const About = inject("aboutData" , "deviceType")(observer(class About extends React.Component {

  constructor() {
    console.log('constructor');
    super();
    this.figureDom = null;
    this.touchStart = false;
    this.touchMove = false;
  }

  componentDidMount() {
    // 이벤트 바인딩
    console.log('componentDidMount');
    this.checkDeviceEvent();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.checkDeviceEvent();
  }

  checkDeviceEvent() {
    this.props.deviceType.device === 'PC' ? this.pcEvent() : this.mobileEvent();
  }

  // PC Event. Hover 를 바인딩 하기 전에 안전장치로 언바인드 해준다.
  pcEvent() {
    console.log('pcEvent');
    $('figure').unbind('mouseenter mouseleave')
    .hover(
      (e) => {
        console.log('Hover Start');
        e.stopPropagation();
        const dom = e.currentTarget;
        this.captionShow(dom);
        $(dom).siblings().stop().fadeTo(0, 0.5);
        $(dom).unbind('click').click(() => {
          const datalink = $(dom).children('img').attr('data-link');
          if(datalink) {
            window.open(datalink,'_blank');
          } else {
            console.log('Not Link');
            // console.log($(this).children('img').attr('src'));
          }
        });
      } , 
      (e) => {
        console.log('Hover End');
        e.stopPropagation();
        const dom = e.currentTarget;
        this.captionHide();
        $(dom).siblings().stop().fadeTo(0, 1);
      }
    );
  }

  unbindPcEvent() {
    $('figure').unbind('mouseenter mouseleave');
  }

  mobileEvent() {

    $('figure').unbind('touchstart touchmove touchend')
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
      const dom = e.currentTarget;
      if(this.touchStart && !this.touchMove) {
        if(this.figureDom === null)  {
          this.captionShow(dom);
          $(dom).siblings().stop().fadeTo(0, 0.5);
          this.figureDom = dom;
        } else if(this.figureDom === dom) {
          // // 두번째 클릭 이벤트
          this.captionHide();
          $(this.figureDom).siblings().stop().fadeTo(0, 1);
          const datalink = $(dom).children('img').attr('data-link');
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
          $(this.figureDom).siblings().stop().fadeTo(0, 1);
          $(dom).siblings().stop().fadeTo(0, 0.5);
          this.figureDom = dom;
        }
      }
      this.touchStart = false;
      this.touchMove = false;
    });

  }

  unbindMobileEvent() {
    $('#root, figure').unbind('touchstart touchmove touchend');
    this.figureDom = null;
  }

  captionShow(_this) {
    const text = $(_this).children('img').attr('data-caption');
    caption.caption = (text === undefined || text === '') ? null : text;
  }

  captionHide() {
    caption.caption = null;
  }

  render() {
    const figures = this.props.aboutData.data;
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