import React from 'react';
import './Slide.scss';

const Slide = (props) => {
   
    return (
        <div className='slide'>
            <div className='img' style={{backgroundImage: `url(${props.largeImageURL})`}}></div>
        </div>
    )
}

export default Slide;