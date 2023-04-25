import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Header from '@/components/common/Header';
import { Fragment, useEffect, useState } from 'react';
import flower from '@/public/Main2Photo/flower-background.jpg';
import { useRouter } from 'next/router';
import Product from '@/components/Product';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLocation } from 'react-router-dom';
import Main1 from '@/components/Main1';
import Main2 from '@/components/Main2';
import IntroduceNavBar from '@/components/IntroduceNavBar';
import News from '@/components/News';
import ContactUs from '@/components/ContactUs';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <>
      {/* <NavBar></NavBar> */}
      <Main1 />
      <Main2 />
      <IntroduceNavBar />
      <News />
      <ContactUs />
    </>
  );
}
