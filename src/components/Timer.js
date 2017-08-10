import * as React from 'react';
import { observer } from 'mobx-react';
import { time } from '../stores';
import '../index.css';

const Timer = observer(() => {

  time.setTime();

  return (
    // <div className='clock-circle'>
		// 	<div className='clock-face'>
		// 		<div id='hour' className='hero-hour'></div>
		// 		<div id='minute' className='hero-minute'></div>
		// 		<div id='second' className='hero-second'></div>
		// 	</div>
    // </div>
    <div className='clock'>
      <div className='digital-clock'>{time.day}</div>
      <div className='digital-clock'>{time.time}</div>
    </div>
  );
})

export default Timer;