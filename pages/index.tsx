import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import YouTube from 'react-youtube';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { useLanguageResources } from '@/contexts/LanguageContext';

const StyledCarousel = styled(Carousel)`
  height: 200vh;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-attachment: fixed;
  .slide {
    opacity: 0.78;
    transition: opacity 1s ease-in-out;
  }

  .slide.selected {
    opacity: 1;
  }
`;

const SlideImage = styled.img`
  height: 100vh;
  object-fit: cover;
`;

const SectionWrapper = styled.div`
  padding: 40px;
  border-bottom: 1px solid #e5e5e5;
`;

const ScrollSection = styled(SectionWrapper)`
  /* height: 200vh; */
  position: absolute;
  top: 260%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 100px 50px;
  text-align: center;
`;

const Logo = styled.img`
  width: 300px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: lightsteelblue;
  border: 5px solid #a5d6a7;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #666;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
`;

const ContentHeader = styled.div`
  margin-bottom: 40px;
  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 30px;
  width: 80%;
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.5;
  }
`;

const MiddleSectionWrapper = styled(SectionWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f7;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MiddleSectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MiddleSectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MiddleSectionContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
`;

const VideoSection = styled(SectionWrapper)`
  display: flex;
  /* height: 30vh; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
  width: 100%;
  background-color: aliceblue;
`;

const VideoTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

const FeatureSection = styled(SectionWrapper)`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: start;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 2rem;
  box-shadow: 0 0 10px 6px rgba(0, 0, 0.1, 0.1);
  background-color: #eeeeee;
`;

const FeatureTitle = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FeatureSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  text-align: left;
`;

const FeatureCarousel = styled(Carousel)`
  width: 100%;
  /* height: 100%; */
  margin-top: 20px;
  /* background-color: yellow; */
`;

export default function Home() {
  const { logout, isAuthenticated } = useAuth();
  const resources = useLanguageResources();

  useEffect(() => {
    if (!isAuthenticated()) {
      // 인증이 만료되었다면
      alert(`${resources.loginTimeout}`);
      logout();
    }
  }, [isAuthenticated, logout]); // 'isAuthenticated'와 'logout'를 의존성 배열에 추가

  return (
    <div>
      <StyledCarousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={false}
        emulateTouch={false}
        swipeable={true}
        dynamicHeight={true}
        showArrows={false}
        showIndicators={false}
        transitionTime={0}
      >
        <div>
          <SlideImage src="/main-page.jpg" alt="Farm 1" />
        </div>
        <div>
          <SlideImage src="/farm2.jpg" alt="Farm 2" />
        </div>
        <div>
          <SlideImage src="/forest.jpg" alt="Farm 3" />
        </div>
      </StyledCarousel>
      <ScrollSection>
        <Logo src="/maco_logo.jpg" alt="스마트팜 로고" />
        <ContentWrapper>
          <ContentHeader>
            <Title>{resources.agriWhat}</Title>
          </ContentHeader>
          <ContentSection>
            <Subtitle>{resources.smartFarmSystem}</Subtitle>
            <p>{resources.bigDataAI}</p>
            <p>{resources.userEasyCultivate}</p>
          </ContentSection>
          <ContentSection>
            <h3>{resources.qualityResourceSave}</h3>
            <p>{resources.qualityResourceSaveContent}</p>
          </ContentSection>
          <MiddleSectionWrapper>
            <MiddleSectionTitle>
              {resources.ecoFriendlySmartFarm}
            </MiddleSectionTitle>
            <MiddleSectionSubtitle>
              {resources.newParadigm}
            </MiddleSectionSubtitle>
            <MiddleSectionContent>
              {resources.newParadigmContent}
            </MiddleSectionContent>
          </MiddleSectionWrapper>
        </ContentWrapper>
        <VideoSection>
          <VideoTitle>{resources.smartFarmIntroVideo}</VideoTitle>
          <div style={{ width: '100%' }}>
            <YouTube
              videoId="Ual5agBwDyk"
              opts={{
                width: '100%',
                height: '400vh',
                playerVars: {
                  origin:
                    typeof window !== 'undefined' ? window.location.origin : '',
                },
              }}
            />
          </div>
        </VideoSection>
        <FeatureSection>
          <FeatureTitle>{resources.controller}</FeatureTitle>
          <FeatureSubtitle>{resources.convenienceFeatures}</FeatureSubtitle>
          <FeatureDescription>
            {resources.convenienceFeaturesContent}
          </FeatureDescription>
          <FeatureCarousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            stopOnHover={false}
            emulateTouch={false}
            swipeable={true}
            dynamicHeight={true}
            showArrows={false}
            showIndicators={false}
            transitionTime={0}
          >
            <div>
              <Image
                src="/controller_photo/list_of_devices.png"
                alt="Controller 1"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/controller_photo/manual_control.png"
                alt="Controller 2"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/controller_photo/video.png"
                alt="Controller 3"
                width={100}
                height={100}
              />
            </div>
          </FeatureCarousel>
        </FeatureSection>
        <FeatureSection>
          <FeatureTitle>{resources.dashboard}</FeatureTitle>
          <FeatureSubtitle>{resources.dashboardSubtitle}</FeatureSubtitle>
          <FeatureDescription>{resources.dashboardContent}</FeatureDescription>
          <FeatureCarousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            stopOnHover={false}
            emulateTouch={false}
            swipeable={true}
            dynamicHeight={true}
            showArrows={false}
            showIndicators={false}
            transitionTime={0}
          >
            <div>
              <Image
                src="/dashboard_photo/dashboard_view.png"
                alt="dashboard 1"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/dashboard_photo/manual_control_view.png"
                alt="dashboard 2"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/dashboard_photo/operating_time_view.png"
                alt="dashboard 3"
                width={100}
                height={100}
              />
            </div>
          </FeatureCarousel>
        </FeatureSection>
        <FeatureSection>
          <FeatureTitle>{resources.statistic}</FeatureTitle>
          <FeatureSubtitle>{resources.statisticSubtitle}</FeatureSubtitle>
          <FeatureDescription>{resources.statisticContent}</FeatureDescription>
          <FeatureCarousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            stopOnHover={false}
            emulateTouch={false}
            swipeable={true}
            dynamicHeight={true}
            showArrows={false}
            showIndicators={false}
            transitionTime={0}
          >
            <div>
              <Image
                src="/statistic_photo/temperature_graph.png"
                alt="statistic_photo 1"
                width="100"
                height="100"
              />
            </div>
            <div>
              <Image
                src="/statistic_photo/growth_prediction.png"
                alt="statistic_photo 2"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/statistic_photo/apple_price_prediction.png"
                alt="statistic_photo 3"
                width={100}
                height={100}
              />
            </div>
          </FeatureCarousel>
        </FeatureSection>
        <FeatureSection>
          <FeatureTitle>{resources.qna}</FeatureTitle>
          <FeatureSubtitle>{resources.qnaSubtitle}</FeatureSubtitle>
          <FeatureDescription>{resources.qnaContent}</FeatureDescription>
          <FeatureCarousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            stopOnHover={false}
            emulateTouch={false}
            swipeable={true}
            dynamicHeight={true}
            showArrows={false}
            showIndicators={false}
            transitionTime={0}
          >
            <div>
              <Image
                src="/qna_photo/qna_main.png"
                alt="qna 1"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/qna_photo/qna_write.png"
                alt="qna 2"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Image
                src="/qna_photo/qna_update.png"
                alt="qna 3"
                width={100}
                height={100}
              />
            </div>
          </FeatureCarousel>
        </FeatureSection>
      </ScrollSection>
    </div>
  );
}
