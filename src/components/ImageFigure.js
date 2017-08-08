import * as React from 'react';
import '../index.css';

const ImageFigure = (props) => {
  
  const data = props.data;

  return (
    <figure>
      <img src={data.src} alt={data.alt} />
      <figcaption>{data.figcaption}</figcaption>
    </figure>
  );
}

export default ImageFigure;
