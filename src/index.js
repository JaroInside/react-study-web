import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { aboutData, caption } from './stores';
import { deviceType } from './event';
import { App } from './containers';

ReactDOM.render(
  <Provider aboutData={aboutData} caption={caption} >
    <App deviceType={deviceType}/>
  </Provider>,
  document.getElementById('root'));