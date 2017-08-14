import * as React from 'react';
import { observer, inject } from 'mobx-react';
import $ from 'jquery';

const Home = inject("deviceType")(observer(class About extends React.Component {

  constructor() {
    console.log('constructor');
    super();
    this.setValue();
  }

  setValue() {
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
    this.props.deviceType.device === 'PC' ? this.pcEvent() : this.mobileEvent();
  }

  pcEvent() {
    console.log('pcEvent');
  }

  unbindPcEvent() {
  }

  mobileEvent() {
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
      this.touchMove = true;
    })
    .bind('touchend', (e) => {
      console.log('Touch End');
      e.stopPropagation();
      if(this.touchStart && !this.touchMove) {
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
    $('.dropdown-menu').unbind('touchstart touchmove touchend');
  }

  render() {
    return (
      <main>
        <div className='working'>
          <div className="fa fa-wrench fa-4x working-icon" aria-hidden="true"></div>
          <h2>작업중인 홈페이지입니다. <br/> 스터디 용도입니다.</h2>
          <h3>현재 사용기술</h3>
          <h3>React, Mobx, Jquery</h3>
        </div>
      </main>
    );
  }
}));

export default Home;