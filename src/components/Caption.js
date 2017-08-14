import * as React from 'react';
import { observer, inject } from 'mobx-react';
import '../index.css';

const Caption = inject('caption')(observer(({caption}) => {
  return (
    <div className='caption'>
      {caption.text}
    </div>
  );
}));

export default Caption;