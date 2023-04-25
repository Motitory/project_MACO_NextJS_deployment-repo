import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import loginImage from '/public/login.png';
import Link from 'next/link';
import mainRequest from '@/utils/request/mainReqeust';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { kakaoInit } from '@/utils/kakao/kakaoinit';
import * as Kakao from 'kakao-sdk';
import dynamic from 'next/dynamic';

const SERVER_URL_SIGN_IN = 'http://localhost:8000/auth/signin';
const SERVER_URL_SIGN_UP = 'http://localhost:8000/auth/signup';

export default function Login() {
  const router = useRouter();
  const [kakao, setKakao] = useState<any>(null);

  useEffect(() => {
    const loadKakaoSDK = async () => {
      const kakaoInstance = await kakaoInit();
      setKakao(kakaoInstance);
    };
    if (typeof window !== 'undefined') {
      loadKakaoSDK();
    }
  }, []);

  const kakaoLogin = useCallback(async () => {
    if (kakao) {
      kakao.Auth.login({
        success: () => {
          kakao.API.request({
            url: '/v2/user/me',
            success: (res: any) => {
              localStorage.setItem('name', res.properties.nickname);
              localStorage.setItem('savedTime', Date.now().toString());
              axios
                .post(SERVER_URL_SIGN_UP, {
                  username: res.kakao_account.email,
                  password: null,
                  nickname: res.properties.nickname,
                  phone_number: res.kakao_account.phone_number,
                })
                .then(() => {
                  router.replace('/');
                })
                .catch(() => {
                  mainRequest
                    .post(SERVER_URL_SIGN_IN, {
                      username: res.kakao_account.email,
                    })
                    .then(() => {
                      router.replace('/');
                    })
                    .catch((err) => {
                      router.replace('/login');
                    });
                });
            },
            fail: (error: any) => {
              console.log(`${error} 로그인 자체가 실패`);
            },
          });
        },
        fail: (error: any) => {
          console.log(`${error} 로그인 자체가 실패`);
        },
      });
    }
  }, [kakao, router]);

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-smoke-light">
        <div className="mx-auto max-w-md rounded bg-gray-200 p-8 shadow-2xl">
          <div className="mb-8 flex w-full justify-center">
            <Image
              src={loginImage}
              alt="Login"
              layout="responsive"
              width={500}
              height={300}
            />
          </div>
          <div className="text-center">
            <button
              className="rounded border border-yellow-600 bg-yellow-500 py-2 px-4 font-bold text-white hover:border-yellow-800 hover:bg-yellow-600"
              onClick={kakaoLogin}
            >
              카카오로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
