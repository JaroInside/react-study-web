import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { aboutData, caption, deviceType } from './stores';
import { App } from './containers';

ReactDOM.render(
  <Provider aboutData={aboutData} caption={caption} deviceType={deviceType} >
    <App />
  </Provider>,
  document.getElementById('root'));