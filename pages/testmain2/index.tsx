import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
// import Header from '@/components/common/Header';
import { Fragment, useEffect, useState } from 'react';
import flower from '@/public/Main2Photo/flower-background.jpg';
import { useRouter } from 'next/router';
// import Product from '../components/test2/Product';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLocation } from 'react-router-dom';
import Main1 from '../components/test2/Main1';
import Main2 from '../components/test2/Main2';
import IntroduceNavBar from '../components/test2/IntroduceNavBar';
import News from '../components/test2/News';
import ContactUs from '../components/test2/ContactUs';
import { Section } from 'react-scroll-section';

const inter = Inter({ subsets: ['latin'] });

export default function Main(props: any) {
  const router = useRouter();
  const { data, status } = useSession();
  // <div className="scroll-snap-y h-screen w-full overflow-y-scroll">
  //   {/* <NavBar></NavBar> */}
  //   <Main1 className="scroll-snap-start h-screen w-full" />
  //   <Main2 className="scroll-snap-start h-screen w-full" />
  //   <div className="scroll-snap-start h-screen w-full">
  //     <IntroduceNavBar className="h-1/2 w-full" />
  //     <News className="h-1/2 w-full" />
  //   </div>
  //   <ContactUs className="scroll-snap-start h-screen w-full" />
  // </div>
  return (
    <div>
      <Section id="Main1">
        <Main1 />
      </Section>

      <Section id="Main2">
        <Main2 />
      </Section>

      <Section id="IntroduceNavBar">
        <IntroduceNavBar />
      </Section>

      <Section id="News">
        <News />
      </Section>

      <Section id="ContactUs">
        <ContactUs />
      </Section>
    </div>
  );
}
