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
    this.props.deviceType === 'PC' ? this.pcEventBind() : this.mobileEventBind();
  }

  pcEventBind() {
    console.log('pcEvent');
  }

  mobileEventBind() {
    mobileEvent.setPageContext(this);
  }

  render() {
    return (
      <main>
        <div className='working'>
          <div className="fa fa-wrench fa-4x working-icon" aria-hidden="true"></div>
          <h2>작업중인 홈페이지입니다. <br/> 스터디 용도입니다.</h2>
          <h3>
            현재 적용중인 기술<br/>
            React, Mobx, Jquery, FireBase, Aws s3 static website hosting<br/>
            Jquery는 최대한 없에려고 노력중입니다.<br/>
            현재는 About, BookMark 메뉴만 활성화 되어있습니다.<br/>
            로그인은 FireBase를 이용하여 구현할 예정입니다.
          </h3>
        </div>
      </main>
    );
  }
});

export default Home;