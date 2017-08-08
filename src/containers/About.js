import * as React from 'react';
import { ImageFigure } from '../components';
import data from '../static/About/data' 

const About = () => {

  return (
    <main>
      <div className='columns'>
        {data.map((contact, i) => {
          if(data[i].type === 'image') {
            return (
              <ImageFigure data={data[i]} key={i} />
            );
          } else {
            return (
              <ImageFigure data={data[i]} key={i} />
            );
          }
        })}
      </div>
    </main>
  );
}

export default About;
