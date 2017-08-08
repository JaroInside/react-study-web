import * as React from 'react';
import { ImageFigure } from '../components';
import $ from 'jquery';
import data from '../static/About/data' 

class About extends React.Component {

  componentDidMount() {
    $('figure').hover(
      function(){
        $(this).siblings().fadeTo(0, 0.3);
        $(this).children('figcaption').stop().show();
      },
       function() {
        $(this).siblings().fadeTo(0, 1);
        $(this).children('figcaption').stop().hide();
      }
    );
  }

  componentWillUnmount() {
    
  }

  render() {
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
}

export default About;
