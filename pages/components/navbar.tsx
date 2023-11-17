import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLanguage, useLanguageResources } from '@/contexts/LanguageContext'; // LanguageContext를 사용하기 위해 import
// import logo from '@/public/maco_logo.jpg';

type LanguageToggleProps = {
  language: 'ko' | 'ja';
};

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 40px;
  height: 100vh;
  width: 100px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
`;

const LogoContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 120px;

  @media (min-width: 768px) {
    height: 160px;
  }

  @media (min-width: 1024px) {
    height: 200px;
  }
`;

const Logo = styled.img`
  position: absolute;
  height: 120px;
  width: 120px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;

  @media (min-width: 768px) {
    height: 160px;
    width: 160px;
  }

  @media (min-width: 1024px) {
    height: 200px;
    width: 200px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 30px 0;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
  text-decoration: none;
  writing-mode: horizontal-tb;
`;

const LanguageToggle = styled.button<LanguageToggleProps>`
  background-color: ${(props) =>
    props.language === 'ko' ? '#f8d7da' : '#c7dfe9'};
  color: #898787;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.language === 'ko' ? '#f9e0e3' : '#dbeff8'};
  }
`;

const LOGOUT_URL = 'http://localhost:8000/auth/logout';

const Page = () => {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { isLoggedIn, userName } = state;
  const prevIsLoggedIn = useRef(isLoggedIn);
  const { language, setLanguage } = useLanguage(); // 언어 상태와 설정 함수를 가져옵니다.
  const resources = useLanguageResources(); // 현재 언어에 맞는 리소스를 가져옵니다.

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ko' ? 'ja' : 'ko')); // 현재 언어를 토글합니다.
  };

  useEffect(() => {
    if (prevIsLoggedIn.current !== isLoggedIn) {
      if (!isLoggedIn) {
        alert('로그아웃 되었습니다.');
      }
    }
    prevIsLoggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar>
        <NavContainer>
          <Link href="/">
            <LogoContainer>
              <Logo src="/maco_logo.jpg" alt="アグリート" />
            </LogoContainer>{' '}
          </Link>
        </NavContainer>
        <NavLinks>
          <NavItem>
            <NavLink href="#">PageTop</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/dashboard/manualcontrol">Controller</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/dashboard">DashBoard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/statistic">Statistic</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/boards/main">QnA</NavLink>
          </NavItem>
          <NavItem>
            {isLoggedIn ? (
              <>
                <div className="font-bold text-white">{`Hello, ${userName}`}</div>
                <button className="font-bold text-white" onClick={logout}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login">
                <p className="font-bold text-white">Sign In</p>
              </Link>
            )}
          </NavItem>
          <NavItem>
            <LanguageToggle language={language} onClick={toggleLanguage}>
              {language === 'ko' ? '日本語' : '한국어'}
            </LanguageToggle>
          </NavItem>
        </NavLinks>
      </Navbar>
      {/* 나머지 콘텐츠 */}
    </div>
  );
};

export default Page;
