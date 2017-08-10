import * as React from 'react';
import '../index.css';

const ImageFigure = (props) => {
  
  const data = props.data;
  const img = (data.link) ? 
      <img src={data.src} data-link={data.link} alt={data.alt} />:
      <img src={data.src} alt={data.alt} />;

  return (
    <figure>
      {img}
      <figcaption>{data.figcaption}</figcaption>
    </figure>
  );
}

export default ImageFigure;