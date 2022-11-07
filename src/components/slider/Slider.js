import React, { useState } from 'react';
import Carousel from './Carousel';
import "./Slider.css"

export default function Slider({images}) {
    const [index, setIndex] = useState(0);
    const [width, setWidth] = useState(0);
    const [xPosition, setXPosition] = useState(0);

    const handleClickPrev = () => { 
        if (index === 0) return;
        setIndex(index - 1);
        setXPosition(xPosition + width);
    };
    
    const handleClicknext = () => {
        if (index === images.length - 1) {
            setIndex(0);
            setXPosition(0);
        } else {
            setIndex(index + 1);
            setXPosition(xPosition - width);
        }
    };

    const resizePage = () => {
            setXPosition(xPosition);
    }

    return (
        <div className="slider">
            <Carousel
                images={images}
                setWidth={setWidth}
                xPosition={xPosition}
                resizePage={resizePage}
                handleClickPrev={handleClickPrev}
                handleClicknext={handleClicknext}
            />
        </div>
    );
}