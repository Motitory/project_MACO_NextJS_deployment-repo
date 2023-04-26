// import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { faSearch, faVideo } from '@fortawesome/free-solid-svg-icons';
import profileImage from '/public/login.png';
// import DirectlyControlLine from './DirectlyControlLine';
// import ScheduleMain from './ScheduleMain';
// import RecentSevenDays from './RecentSevenDays';

import DashboardDirectControl from './DashboardDirectControl';
import DashboardSchedule from './DashboardSchedule';
import DashboardChart from './DashboardChart';
import DashboardOperationHistory from './DashboardOperationHistory';
import GrowthRateChart from '../components/EnvironmentGrowChart';
import SocketGrowImage from '../components/SocketGrowChart';
import RecommendedValues from '@/pages/components/RecommendedValues';

export default function ControlView() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem('kakao-Name') !== 'undefined' ||
  //     localStorage.getItem('name')
  //   ) {
  //     console.log('사용자 있음.');
  //   } else {
  //     // router.replace('/');
  //   }
  // }, []);

  return (
    <div className="flex h-full w-full flex-col p-4 md:flex-row">
      <div className="flex w-full flex-col md:mr-4 md:w-2/5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">수동 조작</h2>
          <Link href="/dashboard/manualcontrol">
            <button className="bg-blue-500 px-4 py-2 text-white">
              <ZoomInIcon /> 상세보기
            </button>
          </Link>
        </div>
        <DashboardDirectControl />
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">스케줄</h2>
          <Link href="/dashboard/ScheduleMain">
            <button className="bg-blue-500 px-4 py-2 text-white">
              <ZoomInIcon /> 상세보기
            </button>
          </Link>
        </div>
        <DashboardSchedule />
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-3/5">
        <div className="flex items-center justify-between">
          <RecommendedValues />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">통계</h2>
          <div>
            <button
              className="mr-2 bg-orange-500 px-4 py-2 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faVideo} /> 실시간 보기
            </button>
            <Link href="/statistic">
              <button className="bg-blue-500 px-4 py-2 text-white">
                <ZoomInIcon /> 상세보기
              </button>
            </Link>
          </div>
        </div>
        {/* <DashboardChart /> */}
        <GrowthRateChart />
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">AI 예측 그래프</h2>
          <Link href="/sockettest">
            <button className="bg-blue-500 px-4 py-2 text-white">
              <ZoomInIcon /> 상세보기
            </button>
          </Link>
        </div>
        <div className="mt-4">
          <SocketGrowImage />
        </div>
      </div>
      {/* <DashboardOperationHistory /> */}
      {/* <button
        className="bg-blue-500 px-4 py-2 text-white"
        onClick={() => setIsModalOpen(true)}
      >
        실시간 보기
      </button> */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-2xl font-bold">실시간 영상</h2>
            <div className="mb-4">
              {isVideoLoading && (
                <p className="mb-2 text-center">로딩 중입니다...</p>
              )}
              <img
                src="http://172.21.4.223:8001/video_feed"
                alt="실시간 영상"
                onLoad={() => setIsVideoLoading(false)}
              />
            </div>
            <button
              className="bg-red-600 px-4 py-2 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
