import * as React from 'react';
import { observer, inject } from 'mobx-react';
//import { caption } from '../stores';
import '../index.css';

const Caption = inject('caption')(observer(({caption}) => {
  return (
    <div className='caption'>
       {caption.caption} 
    </div>
  );
}));

export default Caption;