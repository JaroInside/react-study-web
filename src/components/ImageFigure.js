import * as React from 'react';
import '../index.css';

const ImageFigure = (props) => {
  
  const data = props.data;
  const img = (data.link) ? 
      <img className='figureItem' src={data.src} data-link={data.link} data-caption={data.caption} alt={data.alt} />:
      <img className='figureItem' src={data.src} data-caption={data.caption} alt={data.alt} />;

  return (
    <figure>
      {img}
    </figure>
  );
}

export default ImageFigure;