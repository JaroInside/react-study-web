import * as React from 'react';
import '../index.css';

const ImageFigure = (props) => {
  
  const data = props.data;
  const img = (data.link)?<a href={data.link} target="_blank" rel="noopener noreferrer">
        <img src={data.src} alt={data.alt} />
      </a>:<img src={data.src} alt={data.alt} />;

  return (
    <figure>
      {img}
      <figcaption>{data.figcaption}</figcaption>
    </figure>
  );
}

export default ImageFigure;