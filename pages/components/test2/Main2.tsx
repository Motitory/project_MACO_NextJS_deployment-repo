import flower from '@/public/Main2Photo/flower-background.jpg';
import { useEffect, useState } from 'react';

export default function Main2(props: any) {
  // const [scrollPosition, setScrollPosition] = useState<number>(0);

  // const handleScroll = () => {
  //   setScrollPosition(window.pageYOffset);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // const opacity = Math.min(1, Math.max(0, (scrollPosition - 400) / 400));
  // const translateY = Math.max(0, (scrollPosition - 400) * 0.5);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${flower.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // opacity,
            // transform: `translateY(${translateY}px)`,
          }}
        ></div>
        <div
          className="absolute top-64 right-32 z-10"
          // style={{ opacity: opacity2 }}
        >
          <p className="text-4xl font-semibold text-white">2번째 메인페이지</p>
          <br />
          <p className="text-4xl font-semibold text-white">응원합니다.</p>
        </div>
      </div>
    </>
  );
}
