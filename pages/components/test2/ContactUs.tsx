import Image from 'next/image';
import flower from '@/public/Main2Photo/flower-background.jpg';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ContactUs(props: any) {
  const router = useRouter();
  return (
    <>
      {/* <div className="h-[320px] bg-[url('/Main2Photo/flower-small-background.png')] bg-scroll"></div> */}
      <div className="relative flex h-96 items-center justify-center overflow-hidden bg-slate-500">
        <Image
          src={flower}
          alt="하단 배경"
          placeholder="blur"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute">
          <p className="text-4xl font-semibold text-white">
            대한민국 스마트팜 선두주자, Maco
          </p>
          <br />
          <p className="text-center text-2xl text-slate-200">
            효율적인 농업을 위하여
          </p>
          <p className="text-center text-2xl text-slate-200">
            Maco가 곁에 있겠습니다.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="h-12 w-52 items-center border text-xl text-white hover:bg-slate-500">
              <Link href="/login">Contact us</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
