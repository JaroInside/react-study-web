import * as React from 'react';
import ReactLoading from 'react-loading';
import { ImageFigure, VideoFigure } from '../components';
import $ from 'jquery';
import { observer, inject } from 'mobx-react';
import { caption } from '../stores';
import { pcEvent } from '../event';

const About = inject("aboutData" , "deviceType")(observer(class About extends React.Component {

  constructor() {
    console.log('constructor');
    super();
    this.setValue();
  }

  setValue() {
    this.figureDom = null;
    this.touchStart = false;
    this.touchMove = false;
    this.navState = false;
  }

  setDom() {
    $('nav').stop().css({
      left: '100%'
    });
  }

  componentDidMount() {
    // 이벤트 바인딩
    console.log('componentDidMount');
    this.checkDeviceEvent();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.setValue();
    this.setDom();
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
    this.props.deviceType.device === 'PC' ? this.pcEventBind() : this.mobileEvent();
  }

  // PC Event. Hover 를 바인딩 하기 전에 안전장치로 언바인드 해준다.
  pcEventBind() {
    console.log('pcEvent');
    pcEvent.figureHoverEvent(this);
  }

  unbindPcEvent() {
    $('figure').unbind('mouseenter mouseleave');
  }

  mobileEvent() {
    this.mobileFigureEvent();
    this.mobileRootEvent();
    this.mobileDropMenuEvent();
  }

  mobileFigureEvent() {
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
      console.log('Touch End');
      e.stopPropagation();
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
      if(this.touchStart && !this.touchMove) {
        this.captionHide();
        $(this.figureDom).siblings().stop().fadeTo(0, 1);
        this.figureDom = null;
        let changeLeftValue = (this.navState) ? 100 : 0;
        this.navState = !this.navState;
        $('nav').stop().animate({
          left: `${changeLeftValue}%`
        },1000);
      }
      this.touchStart = false;
      this.touchMove = false;
    });
  }

  unbindMobileEvent() {
    $('#root, figure, .dropdown-menu').unbind('touchstart touchmove touchend');
    this.figureDom = null;
  }

  captionShow(_this) {
    const text = ($(_this).children().is('video')) ? $(_this).children('video').attr('data-caption') : $(_this).children('img').attr('data-caption');
    caption.caption = (text === undefined || text === '') ? null : text;
  }

  captionHide() {
    caption.caption = null;
  }

  render() {
    const figures = this.props.aboutData.data;
    const aboutPage = (figures.length !== 0) ? (
      <div className='columns'>
          {
            figures.map((figures) => {
              if(figures.data.type === 'image') {
                return (
                  <ImageFigure data={figures.data} key={figures.id} />
                );
              } else {
                return (
                  //<ImageFigure data={figures.data} key={figures.id} />
                  <VideoFigure data={figures.data} key={figures.id}/>
                );
              }
            })
          }
        </div>
    ) : (
      <div className='Loading'>
        <ReactLoading type='bars' color='#444'/>
      </div>
    );
    return (
      <main>
        {aboutPage}
        {/* <Caption /> */}
      </main>
    );
  }
}));

export default About;