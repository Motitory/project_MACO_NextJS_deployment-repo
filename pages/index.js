import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const StyledCarousel = styled(Carousel)`
  height: 200vh;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-attachment: fixed;
  .slide {
    opacity: 0.78;
    transition: opacity 1s ease-in-out;
  }

  .slide.selected {
    opacity: 1;
  }
`;

const SlideImage = styled.img`
  height: 100vh;
  object-fit: cover;
`;

const ScrollSection = styled.div`
  height: 200vh;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0px 200px;
`;

export default function Home() {
  return (
    <div>
      <StyledCarousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={false}
        emulateTouch={false}
        swipeable={true}
        dynamicHeight={false}
        showArrows={false}
        showIndicators={false}
        transitionTime={0}
      >
        <div>
          <SlideImage src="/main-page.jpg" alt="Farm 1" />
        </div>
        <div>
          <SlideImage src="/farm2.jpg" alt="Farm 2" />
        </div>
        <div>
          <SlideImage src="/forest.jpg" alt="Farm 3" />
        </div>
      </StyledCarousel>
      {/* <ScrollSection>로고</ScrollSection> */}
    </div>
  );
}
