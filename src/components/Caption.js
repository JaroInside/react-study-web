import * as React from 'react';
import { observer } from 'mobx-react';
import { itemClick } from '../stores';
import '../index.css';

const Caption = observer(() => {

  return (
    <div className='caption'>
      {itemClick.caption}
    </div>
  );
});

export default Caption;