import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguageResources } from '@/contexts/LanguageContext';
import { FaStar } from 'react-icons/fa'; // 별 아이콘을 위한 import

type ScheduleData = {
  sc_id: number;
  uid: number;
  sun: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thur: boolean;
  fri: boolean;
  sat: boolean;
  hour: number;
  min: number;
  wval: boolean;
  cval: boolean;
  current_stat: boolean;
  created_at: string;
  updated_at: string;
  set_time: number;
  accumulated_time: number;
  schedule_stat: boolean;
  count: number;
};

type AIScheduleData = {
  day: string;
  time: string;
  amount: string;
};

const fetchScheduleData = async (): Promise<ScheduleData[]> => {
  const response = await axios.get<ScheduleData[]>(
    '/json/scheduleMockData.json'
  );
  return response.data;
};

const DashboardSchedule = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
  const [aiSchedule, setAISchedule] = useState<AIScheduleData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const resources = useLanguageResources();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchScheduleData();
      setScheduleData(data);
    };
    getData();
  }, []);

  useEffect(() => {
    // AI 추천 스케쥴 가져오기
    const fetchAISchedule = async () => {
      try {
        const res = await axios.get<{ schedule: AIScheduleData[] }>(
          '/json/watering_schedule.json'
        );
        console.log('Watering_Schedule');
        setAISchedule(res.data.schedule); // 모든 스케줄을 저장합니다.
      } catch (error) {
        console.error('Error fetching AI schedule:', error);
      }
    };
    fetchAISchedule();
  }, []);

  const activeSchedules = scheduleData.filter(
    (schedule) => schedule.current_stat
  );

  const renderScheduleItem = (schedule: ScheduleData) => {
    const {
      sc_id,
      sun,
      mon,
      tue,
      wed,
      thur,
      fri,
      sat,
      hour,
      min,
      wval,
      cval,
      set_time,
    } = schedule;
    const endTime = (hour * 60 + min + set_time) % 1440;
    const endHour = Math.floor(endTime / 60);
    const endMin = endTime % 60;

    return (
      <div
        key={sc_id}
        className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-gray-300 bg-slate-100 p-4"
      >
        <div className="col-span-2">
          <h4 className="mb-2 text-xl font-semibold">
            {resources.schedual} ID: {sc_id}
          </h4>
        </div>
        <div className="col-span-2">
          <p className="mb-2">
            {sun && `${resources.sun}`} {mon && `${resources.mon}`}{' '}
            {tue && `${resources.tue}`} {wed && `${resources.wed}`}{' '}
            {thur && `${resources.thu}`} {fri && `${resources.fri}`}{' '}
            {sat && `${resources.sat}`}
          </p>
        </div>
        <div>
          <span className="font-semibold">{resources.startTime}:</span> {hour}
          {resources.time} {min}
          {resources.minute}
        </div>
        <div>
          <span className="font-semibold">{resources.endTime}:</span> {endHour}
          {resources.time} {endMin}
          {resources.minute}
        </div>
        <div>
          <span className="font-semibold">{resources.irrigate}:</span>{' '}
          <span
            className={`font-semibold ${
              wval ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {wval ? `${resources.on}` : `${resources.off}`}
          </span>
        </div>
        <div>
          <span className="font-semibold">{resources.fertilize}:</span>{' '}
          <span
            className={`font-semibold ${
              cval ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {cval ? `${resources.on}` : `${resources.off}`}
          </span>
        </div>
      </div>
    );
  };

  const renderAIScheduleItem = (schedule: AIScheduleData) => {
    const { day, time, amount } = schedule;

    return (
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-gray-300 bg-slate-100 p-4">
        <div className="col-span-2">
          <h4 className="mb-2 text-xl font-semibold">
            {resources.schedual} - AI
          </h4>
        </div>
        <div className="col-span-2">
          <p className="mb-2">{day}</p>
        </div>
        <div>
          <span className="font-semibold">{resources.startTime}:</span> {time}
        </div>
        <div>
          <span className="font-semibold">{resources.amount || 'Amount'}:</span>{' '}
          {amount}
        </div>
      </div>
    );
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(activeSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = activeSchedules.slice(startIndex, endIndex);

  return (
    <div className="my-4">
      {/* AI 스케쥴 별 아이콘과 함께 보여주기 */}
      {aiSchedule.map((schedule, index) => (
        <div key={index} className="mb-4 flex items-center">
          <FaStar className="mr-2 text-yellow-500" /> {/* 별 아이콘 */}
          {renderAIScheduleItem(schedule)}
        </div>
      ))}

      {currentSchedules.length > 0 ? (
        currentSchedules.map((schedule) => renderScheduleItem(schedule))
      ) : (
        <p>동작 중인 스케줄이 없습니다.</p>
      )}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 rounded-md border border-gray-300 px-2 py-1 ${
                pageNumber === currentPage ? 'bg-gray-300' : ''
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardSchedule;
