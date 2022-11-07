import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  max-width: 450px;
  border-radius: 10px;
  @media screen and (max-width: 770px) {
    max-width: 770px;
  }
`;
const Slide = styled.div`
  display: flex;
  flex: 1 1 auto
  height: 450px;
  transition: transform 0.6s ease-in-out;
  transform: ${props => `translateX(${props.xPosition}px)`};
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;
function Carousel({
    images,
    setWidth,
    xPosition,
    resizePage,
    handleClickPrev,
    handleClicknext,
}) {
    const slideRef = useRef();

    useEffect(() => {

        function  handleResize() {
            if (slideRef.current) {
                const width = slideRef.current.clientWidth;
                setWidth(width);
                resizePage()
            }
        }

        if (slideRef.current) {
            const width = slideRef.current.clientWidth;
            setWidth(width);
        }
        window.addEventListener("resize", handleResize);
    }, [setWidth]);

    return (
        <Wrapper>
            <Slide xPosition={xPosition} ref={slideRef}>
                {images.map((img, i) => (
                <img src={img} alt={i} key={i} />
                ))}
            </Slide>
            <Buttons
                handleClickPrev={handleClickPrev}
                handleClicknext={handleClicknext}
            />
        </Wrapper>
    );
}
export default Carousel;
