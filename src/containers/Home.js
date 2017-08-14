import * as React from 'react';
import { observer } from 'mobx-react';
import { mobileEvent } from '../event';

const Home = observer(class About extends React.Component {

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
    this.props.deviceType === 'PC' ? this.pcEventBind() : this.mobileEvent();
  }

  pcEvent() {
    console.log('pcEvent');
  }

  mobileEvent() {
    mobileEvent.setPageContext(this);
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
});

export default Home;