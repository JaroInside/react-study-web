import * as React from 'react';
import { observer } from 'mobx-react';
import { time } from '../stores';
import '../index.css';

const Timer = observer(() => {

  return (
    <div className='clock'>
      <div>{time.day}</div>
      <div>{time.time}</div>
    </div>
  );
})

export default Timer;