import * as React from 'react';
import ReactLoading from 'react-loading';
import { ImageFigure, VideoFigure } from '../components';
import { observer, inject } from 'mobx-react';
import { pcEvent, mobileEvent } from '../event';

const About = inject("aboutData")(observer(class About extends React.Component {

  componentDidMount() {
    // 이벤트 바인딩
    console.log('componentDidMount');
    this.checkDeviceEvent();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    if(this.props.deviceType === 'MOBILE') mobileEvent.captionHide();
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

  // PC Event. Hover 를 바인딩 하기 전에 안전장치로 언바인드 해준다.
  pcEventBind() {
    console.log('pcEvent');
    pcEvent.setPageContext(this);
    pcEvent.figureHoverEvent();
  }

  mobileEventBind() {
    mobileEvent.setPageContext(this);
    mobileEvent.mobileFigureEvent();
    mobileEvent.mobileRootEvent();
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
      </main>
    );
  }
}));

export default About;