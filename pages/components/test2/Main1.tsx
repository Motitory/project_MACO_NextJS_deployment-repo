import { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import farm from '@/public/farmmain.jpg';

export default function Main1(props: any): ReactElement {
  // const [scrollPosition, setScrollPosition] = useState<number>(0);

  // const handleScroll = () => {
  //   setScrollPosition(window.pageYOffset);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // 투명도 계산
  // const opacity1 = Math.max(0, 1 - scrollPosition / 300);
  // const opacity2 = Math.min(1, Math.max(0, (scrollPosition - 300) / 300));

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={farm}
            alt="Flower Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className="absolute left-24 bottom-24 z-10"
          // style={{ opacity: opacity1 }}
        >
          <p className="text-4xl font-semibold text-white">당신의 농사를</p>
          <br />
          <p className="text-2xl font-semibold text-white">응원합니다</p>
        </div>
      </div>
    </>
  );
}
