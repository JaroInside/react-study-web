import * as React from 'react';
import '../index.css';

const ImageFigure = (props) => {

  const data = props.data;
  const device = props.device;

  const img = (data.link) ? 
      <img className='figureItem' src={data.src} data-link={data.link} data-caption={data.caption} alt={data.alt} />:
      <img className='figureItem' src={data.src} data-caption={data.caption} alt={data.alt} />;

  function test() {
    console.log('MOBILE');
  }

  return (
    <figure onClick={device === 'MOBILE'? test : null}>
      {img}
    </figure>
  );
}

export default ImageFigure;