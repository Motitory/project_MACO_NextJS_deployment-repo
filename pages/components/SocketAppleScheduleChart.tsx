import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useLanguageResources } from '@/contexts/LanguageContext';
import { useSocketData } from '@/utils/socket';

interface Data {
  historical_data: {
    date: string[];
    price: number[];
  };
  prediction_data: {
    date: string[];
    price: number[];
  };
}

interface ScheduleData {
  schedule: {
    day: string;
    time: string;
    amount: string;
  }[];
}

const SocketAppleScheduleChart: React.FC = () => {
  const URL = process.env.NEXT_PUBLIC_WS_URL + ':8002/apple_json';
  const dataKeys = ['prediction'];
  const { data } = useSocketData<Data>(URL, dataKeys);
  const [showModal, setShowModal] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const resources = useLanguageResources();
  console.log('datatata');
  console.log(data);
  console.log(data.historical_data);
  console.log(data.prediction_data);
  if (!data.historical_data || !data.prediction_data) {
    return <div>{resources.loddingMessage}</div>;
  }

  const chartData = {
    labels: [...data.historical_data.date, ...data.prediction_data.date],
    datasets: [
      {
        label: 'Price',
        data: [...data.historical_data.price, ...data.prediction_data.price],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        if (clickedIndex >= data.historical_data.date.length) {
          fetch('/json/watering_schedule.json')
            .then((response) => response.json())
            .then((jsonData) => {
              setScheduleData(jsonData);
              setShowModal(true);
            });
        }
      }
    },
  };

  return (
    <div>
      <h2 className="clip-right mb-4 ml-4 mt-8 w-1/5 rounded-l border border-red-300 bg-cyan-200 p-2 text-2xl font-bold">
        {resources.applePricePredictChart} (15kg {resources.basis})
      </h2>
      <Line data={chartData} options={options} />
      {showModal && (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold">
              {resources.irrigationSchedule}
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4">{resources.dayOfWeek}</th>
                  <th className="border-b py-2 px-4">{resources.time}</th>
                  <th className="border-b py-2 px-4">mL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {scheduleData?.schedule.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{item.day}</td>
                    <td className="py-2 px-4">{item.time}</td>
                    <td className="py-2 px-4">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2 flex-1 rounded bg-blue-500 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-700"
              >
                {resources.update}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 flex-1 rounded bg-red-500 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:bg-red-700"
              >
                {resources.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocketAppleScheduleChart;
