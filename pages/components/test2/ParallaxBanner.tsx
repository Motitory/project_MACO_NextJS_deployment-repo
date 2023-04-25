import React, { useEffect, useState } from 'react';

interface ParallaxBannerProps {
  image: string;
  height: string;
  strength?: number;
  children?: React.ReactNode;
}

const ParallaxBanner: React.FC<ParallaxBannerProps> = ({
  image,
  height,
  strength = 100,
  children,
}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          transform: `translate3d(0, -${
            scrollPosition * (strength / 100)
          }px, 0)`,
          position: 'absolute',
        }}
      ></div>
      {children}
    </div>
  );
};

export default ParallaxBanner;
