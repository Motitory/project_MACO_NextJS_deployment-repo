import { useAuth } from '@/contexts/AuthContext';
import { kakaoInit } from '@/utils/kakao/kakaoinit';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useLanguage, useLanguageResources } from '@/contexts/LanguageContext'; // LanguageContext를 사용하기 위해 import

type LanguageToggleProps = {
  language: 'ko' | 'ja';
};

const LanguageToggle = styled.button<LanguageToggleProps>`
  background-color: ${(props) =>
    props.language === 'ko' ? '#c7dfe9' : '#f8d7da'};
  color: #898787;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.language === 'ko' ? '#dbeff8' : '#f9e0e3'};
  }
`;

export default function NavBar() {
  const router = useRouter();
  const { state, login, logout } = useAuth();
  const userName = state.userName;

  console.log(`navbar2: ${userName}`);

  const handleLogout = () => {
    const kakao = kakaoInit();
    if (kakao && kakao.Auth.getAccessToken()) {
      kakao.Auth.logout();
    }
    logout();
    alert(`${resources.logoutAlert}`);
    router.replace('/');
  };

  const { language, setLanguage } = useLanguage(); // 언어 상태와 설정 함수를 가져옵니다.
  const resources = useLanguageResources(); // 현재 언어에 맞는 리소스를 가져옵니다.

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ko' ? 'ja' : 'ko')); // 현재 언어를 토글합니다.
  };

  return (
    <>
      <nav className="bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-6 py-2">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 dark:text-white"
          >
            <Image
              src="/maco_logo.jpg"
              alt="アグリート"
              className="w-16 md:w-20 lg:w-24"
              width={100}
              height={100}
            />
          </Link>
          <div className="block lg:hidden">
            <button className="navbar-toggler">
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden items-center lg:flex">
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-800 hover:text-blue-600 dark:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-blue-600 dark:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  href="/dashboard/manualcontrol"
                  className="text-gray-800 hover:text-blue-600 dark:text-white"
                >
                  Controller
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-blue-600 dark:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/statistic"
                  className="text-gray-800 hover:text-blue-600 dark:text-white"
                >
                  Statistic
                </Link>
              </li>
              <li>
                <Link
                  href="/boards/main"
                  className="text-gray-800 hover:text-blue-600 dark:text-white"
                >
                  QnA
                </Link>
              </li>
              <li>
                {userName ? (
                  <>
                    <div className="text-gray-800 dark:text-white">{`Hello, ${userName}`}</div>
                    <button
                      onClick={handleLogout}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    login
                  </Link>
                )}
              </li>
              <li>
                <LanguageToggle language={language} onClick={toggleLanguage}>
                  {language === 'ko' ? '日本語' : '한국어'}
                </LanguageToggle>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
