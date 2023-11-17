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
import { useLanguageResources } from '@/contexts/LanguageContext';

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function ControlView() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMeasuringLength, setIsMeasuringLength] = useState(false);
  const resources = useLanguageResources();
  const baseURL = process.env.NEXT_PUBLIC_LOCAL_HTTP_URL;

  const sizeFeedURL = `${baseURL}:8001/size_feed`;
  const videoFeedURL = `${baseURL}:8001/video_feed`;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // setIsMeasuringLength(false);
  };

  const toggleVideo = () => {
    setIsMeasuringLength(!isMeasuringLength);
    setIsVideoLoading(true);
  };

  const myLoader = (
    { src, width, quality }: ImageLoaderProps,
    isMeasuringLength: boolean
  ): string => {
    const baseQuality = quality || 75;

    if (isMeasuringLength) {
      return `${sizeFeedURL}?w=${width}&q=${baseQuality}`;
    } else {
      return `${videoFeedURL}?w=${width}&q=${baseQuality}`;
    }
  };
  console.log(sizeFeedURL);
  console.log(videoFeedURL);

  return (
    <div className="flex h-full w-full flex-col bg-[#ebede6] p-4 md:flex-row">
      <div className="flex w-full flex-col md:mr-4 md:w-2/5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{resources.manualControl}</h2>
          <Link href="/dashboard/manualcontrol">
            <button className="bg-blue-500 px-4 py-2 text-white">
              <ZoomInIcon /> {resources.viewDetail}
            </button>
          </Link>
        </div>
        <DashboardDirectControl />
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{resources.schedual}</h2>
          <Link href="/dashboard/ScheduleMain">
            <button className="bg-blue-500 px-4 py-2 text-white">
              <ZoomInIcon /> {resources.viewDetail}
            </button>
          </Link>
        </div>
        <DashboardSchedule />
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-3/5">
        <div className="flex items-center justify-between">
          <RecommendedValues />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{resources.statistic}</h2>
          <div>
            <button
              className="mr-2 bg-orange-500 px-4 py-2 text-white"
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon icon={faVideo} /> {resources.realtimeView}
            </button>
            <Link href="/statistic">
              <button className="bg-blue-500 px-4 py-2 text-white">
                <ZoomInIcon /> {resources.viewDetail}
              </button>
            </Link>
          </div>
        </div>
        <GrowthRateChart />

        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{resources.dailyInjection}</h2>
        </div>
        <div className="mt-4">
          <DashboardOperationHistory />
        </div>
      </div>

      {openModal && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="w-full max-w-4xl rounded-lg bg-white p-4" // max-w-4xl 또는 더 큰 크기로 조정
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-3xl font-bold">
              {' '}
              {/* text-3xl로 텍스트 크기를 증가 */}
              {isMeasuringLength
                ? `${resources.measureLength}`
                : `${resources.liveVideo}`}
            </h2>
            <div className="mb-4 flex justify-center">
              <Image
                loader={(props) => myLoader(props, isMeasuringLength)}
                src={isMeasuringLength ? sizeFeedURL : videoFeedURL}
                alt={
                  isMeasuringLength
                    ? `${resources.measureLength}`
                    : `${resources.liveVideo}`
                }
                onLoad={() => setIsVideoLoading(false)}
                width={800} // 가로 크기 증가
                height={600} // 세로 크기 증가
                className="object-cover"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {' '}
              {/* 버튼을 오른쪽 정렬 */}
              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={() => setOpenModal(false)}
              >
                {resources.closeModal}
              </button>
              <button
                className={
                  isMeasuringLength
                    ? 'rounded bg-orange-600 px-4 py-2 text-white'
                    : 'rounded bg-pink-600 px-4 py-2 text-white'
                }
                // onClick={toggleVideo}
              >
                {isMeasuringLength
                  ? `${resources.liveVideo}`
                  : `${resources.measureLength}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
