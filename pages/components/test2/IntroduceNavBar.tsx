import Image from 'next/image';
import flower from '@/public/Main2Photo/flower-background.jpg';
import farm from '/public/farm.jpg';
import farm2 from '/public/farm2.jpg';
import farmmain from '/public/farmmain.jpg';
import forest from 'public/forest.jpg';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function IntroduceNavBar(props: any) {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true, // 이미지를 가운데 정렬
    // centerPadding: '0px 20px', // 좌우 여백 설정
  };

  const sliderRef = useRef<Slider | null>(null);

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <>
      <div className="h-1/2 w-full overflow-hidden bg-white">
        <div className="">
          <div className="text-center">저희들의 스마트팜은?</div>
          <div className="my-4 flex flex-row justify-around">
            <p onClick={() => goToSlide(0)}>직접관수</p>
            <p onClick={() => goToSlide(1)}>컨트롤러</p>
            <p onClick={() => goToSlide(2)}>PC & 모바일</p>
          </div>
          {/* <div className="h-0 border-t-2 border-gray-400"></div> */}
        </div>
        <div className="carousel">
          {/* <Slider {...settings} ref="{slider}"> */}
          <Slider {...settings} ref={sliderRef}>
            <div>
              <div className="flex flex-row">
                <Image
                  src={farm}
                  alt="Flower Background"
                  className="h-1/2 w-1/2"
                />
                <div className="flex w-1/2 items-center justify-center bg-slate-100">
                  <div className="flex flex-col justify-center">
                    <div className="my-8 text-center font-semibold">
                      직접관수
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src={farm}
                        alt="Flower Background"
                        className="mb-8 w-1/3"
                      />
                    </div>
                    <div className="flex justify-center">
                      <p>
                        한퓨어 안전 조제 시스템(SDS)은
                        <br />
                        최첨단 시스템(ICT)을 갖춘 탕전실로 한의사의
                        <br />
                        처방에 따라 오류 없는 정확한 한약을 조재합니다.
                      </p>
                    </div>
                    <div className="mt-8 flex justify-center">
                      <button className="h-12 w-32 items-center rounded-3xl bg-green-500 text-xl text-white">
                        <Link href="/login">Contact us</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row">
                <Image
                  src={farm2}
                  alt="Flower Background"
                  className="h-5/6 w-1/2"
                />
                <div className="flex w-1/2 items-center justify-center bg-slate-100">
                  <div className="flex flex-col justify-center">
                    <div className="my-8 text-center font-semibold">
                      컨트롤러
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src={farm2}
                        alt="Flower Background"
                        className="mb-8 w-1/3"
                      />
                    </div>
                    <div className="flex justify-center">
                      <p>
                        한퓨어 안전 조제 시스템(SDS)은
                        <br />
                        최첨단 시스템(ICT)을 갖춘 탕전실로 한의사의
                        <br />
                        처방에 따라 오류 없는 정확한 한약을 조재합니다.
                      </p>
                    </div>
                    <div className="mt-8 flex justify-center">
                      <button className="h-12 w-32 items-center rounded-3xl bg-green-500 text-xl text-white">
                        <Link href="/login">Contact us</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-row">
                <Image src={flower} alt="Flower Background" className="w-1/2" />
                <div className="flex w-1/2 items-center justify-center bg-slate-100">
                  <div className="flex flex-col justify-center">
                    <div className="my-8 text-center font-semibold">
                      PC & 모바일
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src={flower}
                        alt="Flower Background"
                        className="mb-8 w-1/3"
                      />
                    </div>
                    <div className="flex justify-center">
                      <p>
                        한퓨어 안전 조제 시스템(SDS)은
                        <br />
                        최첨단 시스템(ICT)을 갖춘 탕전실로 한의사의
                        <br />
                        처방에 따라 오류 없는 정확한 한약을 조재합니다.
                      </p>
                    </div>
                    <div className="mt-8 flex justify-center">
                      <button className="h-12 w-32 items-center rounded-3xl bg-green-500 text-xl text-white">
                        <Link href="/login">Contact us</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
