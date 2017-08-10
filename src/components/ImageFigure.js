import * as React from 'react';
import '../index.css';

const ImageFigure = (props) => {
  
  const data = props.data;
  const img = (data.link) ? 
      <img src={data.src} data-link={data.link} alt={data.alt} />:
      <img src={data.src} alt={data.alt} />;

  const caption = (data.figcaption===undefined || data.figcaption==='')? null : <figcaption>{data.figcaption}</figcaption>;

  return (
    <figure>
      {img}
      {caption}
    </figure>
  );
}

export default ImageFigure;