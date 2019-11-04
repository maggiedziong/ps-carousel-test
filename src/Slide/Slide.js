import React from 'react';
import './Slide.scss';

const Slide = (props) => {
    return (
        <div className='slide'>
            <div className='img' style={{backgroundImage: `url(${props.largeImageURL})`}}></div>
            <div>
                <span className='title'>User: {props.user}</span>
            </div>
        </div>
    )
}

export default Slide;