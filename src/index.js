import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { aboutData, bookMarkData, caption } from './stores';
import { deviceType } from './event';
import { App } from './containers';
console.log(bookMarkData);
ReactDOM.render(
  <Provider aboutData={aboutData} bookMarkData={bookMarkData} caption={caption} >
    <App deviceType={deviceType}/>
  </Provider>,
  document.getElementById('root'));