// import { LogData } from '@/pages/old_boards/interface/logData';
// import { Line } from 'react-chartjs-2';
import Image from 'next/image';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { UMachine } from '@/pages/old_boards/interface/umachine';
import authRequest from '@/utils/request/authRequest';
import { useQuery } from 'react-query';
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  isThisWeek,
} from 'date-fns';
import { ko, ja } from 'date-fns/locale';
import { UMachine } from '@/interfaces/umachine';
import { useLanguageResources } from '@/contexts/LanguageContext';

type OperationTimesByDay = {
  [day: string]: {
    wtime1: number;
    wtime2: number;
    ctime: number;
  };
};

const fetchLogs = async () => {
  const machineResponse = await authRequest.get<UMachine[]>(
    'http://localhost:8000/machine'
  );
  const logPromises = machineResponse.data.map(async (machine) => {
    const logResponse = await authRequest.get<string>(
      `http://localhost:8000/manual/log/${machine.device}`
    );
    console.log(logResponse.data);
    const logEntries = logResponse.data
      .split('\n')
      .filter((entry) => entry.length > 0);
    const parsedLogEntries = logEntries.map((entry) => {
      const [timestamp, json] = entry.split(' - ');
      return {
        ...JSON.parse(json),
        timestamp,
      };
    });
    return parsedLogEntries;
  });

  const allLogs = await Promise.all(logPromises);
  const logs = allLogs.find((logs) => logs.length > 0) || [];

  // 가동 시간을 계산하고, 일별로 분류합니다.
  const operationTimesByDay = logs.reduce<OperationTimesByDay>((acc, log) => {
    const day = new Date(log.timestamp).toISOString().split('T')[0];
    if (!(day in acc)) {
      acc[day] = {
        wtime1: 0,
        wtime2: 0,
        ctime: 0,
      };
    }
    acc[day].wtime1 += Number(log.wtime1) * 0.5;
    acc[day].wtime2 += Number(log.wtime2) * 0.5;
    acc[day].ctime += Number(log.ctime) * 0.5;
    return acc;
  }, {});

  return operationTimesByDay;
};

const getWeekRange = (date: Date) => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);

  return { start, end };
};

const DashboardOperationHistory = () => {
  const [week, setWeek] = useState(new Date());
  const {
    data: operationTimesByDay,
    isLoading,
    isError,
  } = useQuery<OperationTimesByDay>('operationLog', fetchLogs);

  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState('video'); // photo 또는 video

  const resources = useLanguageResources();
  const currentLocal = resources.lang == 'ko' ? ko : ja;

  if (isLoading) {
    return <div>{resources.loddingMessage}</div>;
  }

  if (isError || !operationTimesByDay) {
    return <div>{resources.noOperationData}</div>;
  }

  const { start: startDay, end: endDay } = getWeekRange(week);

  const isThisWeekSelected = isThisWeek(week);

  const eachDayOfTheWeek = eachDayOfInterval({ start: startDay, end: endDay });

  const labels = eachDayOfTheWeek.map((day) =>
    format(day, 'MM-dd, eee', { locale: currentLocal })
  );

  const operationTypes: ('wtime1' | 'wtime2' | 'ctime')[] = [
    'wtime1',
    'wtime2',
    'ctime',
  ];

  const datasets = [
    `${resources.irrigate}1`,
    `${resources.irrigate}2`,
    `${resources.fertilize}`,
  ].map((type, i) => {
    const data = eachDayOfTheWeek.map((day) => {
      const dayString = format(day, 'yyyy-MM-dd');
      return operationTimesByDay[dayString]
        ? operationTimesByDay[dayString][operationTypes[i]]
        : 0;
    });

    return {
      label: type,
      data: data,
      fill: false,
      backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.2)`,
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const weekString = `${format(startDay, 'MM')}${resources.month} ${
    Math.floor((startDay.getDate() - 1) / 7) + 1
  }${resources.week}`; // 주 정보를 문자열로 변환합니다.

  // 모달창을 닫는 함수
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBarClick = (event: any, array: any) => {
    if (array.length > 0) {
      // 클릭한 막대가 있을 경우
      const index = array[0].index; // 클릭한 막대의 인덱스를 가져옵니다.
      const datasetIndex = array[0].datasetIndex; // 클릭한 막대의 데이터셋 인덱스를 가져옵니다.

      const clickedDate = eachDayOfTheWeek[index];
      const formattedDate = format(clickedDate, 'yyyy-MM-dd');

      setSelectedDate(formattedDate);

      setIsModalOpen(true); // 모달을 엽니다.
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* <h1 className="mb-4 text-xl font-bold">일별 가동 시간</h1> */}
      <div className="flex justify-between">
        <button
          className="rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700"
          onClick={() =>
            setWeek(new Date(week.getTime() - 7 * 24 * 60 * 60 * 1000))
          }
        >
          {resources.lastWeek}
        </button>
        <button
          className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
            isThisWeekSelected ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() =>
            !isThisWeekSelected &&
            setWeek(new Date(week.getTime() + 7 * 24 * 60 * 60 * 1000))
          }
        >
          {resources.nextWeek}
        </button>
      </div>
      <h6 className="">({resources.injectionBasis})</h6>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: weekString, // 그래프 제목을 설정합니다.
            },
          },
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return value + 'L'; // value 뒤에 'L' 문자열을 추가합니다.
                },
              },
            },
          },
          onClick: handleBarClick, // 막대를 클릭했을 때의 동작을 설정합니다.
        }}
      />
      {isModalOpen && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">
                {selectedDate}{' '}
                {showContent === 'photo' ? resources.picture : resources.video}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                {resources.close}
              </button>
            </div>

            {showContent === 'photo' ? (
              <div className="my-4">
                <Image
                  src="/plant.png"
                  alt="Farm"
                  width={640}
                  height={480}
                  className="object-cover"
                />
              </div>
            ) : (
              <video
                className="my-4 h-auto w-full" // This will make the video responsive and add vertical margin
                loop
                autoPlay
                controls // It's a good idea to include controls
              >
                <source src="/operation_video.mp4" type="video/mp4" />
              </video>
            )}

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className={`rounded px-4 py-2 ${
                  showContent === 'photo'
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-200'
                }`}
                onClick={() => setShowContent('photo')}
              >
                {resources.showPicture}
              </button>
              <button
                className={`rounded px-4 py-2 ${
                  showContent === 'video'
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-200'
                }`}
                onClick={() => setShowContent('video')}
              >
                {resources.showVideo}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOperationHistory;
