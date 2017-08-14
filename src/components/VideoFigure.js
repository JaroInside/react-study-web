import * as React from 'react';
import '../index.css';

const VideoFigure = (props) => {

  const data = props.data;
  const video = (data.link) ? 
      <video className='figureItem' autoPlay="" loop="loop" muted="" data-link={data.link} data-caption={data.caption} alt={data.alt}>
        <source src={data.src} type="video/mp4" />
      </video> :
      <video className='figureItem' autoPlay="" loop="loop" muted="" data-caption={data.caption} alt={data.alt}>
        <source src={data.src} type="video/mp4" />
      </video>;
  
  return (
    <figure>
      {video}
    </figure>
  );
}

export default VideoFigure;