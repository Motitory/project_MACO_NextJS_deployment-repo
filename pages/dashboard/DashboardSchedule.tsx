import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguageResources } from '@/contexts/LanguageContext';

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

const fetchScheduleData = async (): Promise<ScheduleData[]> => {
  const response = await axios.get<ScheduleData[]>(
    '/json/scheduleMockData.json'
  );
  return response.data;
};

const DashboardSchedule = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);
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
        className="mb-4 grid grid-cols-2 gap-2 rounded-lg border border-gray-300 p-4"
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
          <span className="font-semibold">시작 시간:</span> {hour}
          {resources.time} {min}
          {resources.minute}
        </div>
        <div>
          <span className="font-semibold">종료 시간:</span> {endHour}
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(activeSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = activeSchedules.slice(startIndex, endIndex);

  return (
    <div className="my-4">
      {/* <h3 className="mb-4 text-lg font-semibold">동작 중인 스케줄</h3> */}
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
