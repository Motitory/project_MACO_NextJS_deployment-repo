import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import 'chart.js/auto';
import authRequest from '@/utils/request/authRequest';

interface EnvironmentData {
  id: number;
  temperature: number;
  humidity: number;
  soil_humid: number;
  grow: number;
  created_at: string;
}

const getBackgroundColor = (
  dateString: string,
  amColor: string,
  pmColor: string
) => {
  const date = new Date(dateString);
  const hour = date.getHours();
  return hour >= 0 && hour < 12 ? amColor : pmColor;
};

const createChartData = (
  data: EnvironmentData[],
  dataKey: keyof EnvironmentData,
  borderColor: string
) => {
  const labels = data.map((item) => item.created_at);
  const chartData = data.map((item) => item[dataKey]);
  const backgroundColors = data.map((item) =>
    getBackgroundColor(
      item.created_at,
      'rgba(212, 229, 60, 0.7)',
      'rgba(98, 91, 178, 0.7)'
    )
  );

  return {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: backgroundColors,
        borderColor,
        borderWidth: 1,
        fill: false,
      },
    ],
  };
};

const EnvironmentGrowthChart: React.FC = () => {
  const [envData, setEnvData] = useState<EnvironmentData[]>([]);
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authRequest.get<EnvironmentData[]>(
          `http://localhost:8000/envir`
        );
        setEnvData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const recentEnvData = envData.slice(-24);

  type ChartInfo = {
    title: string;
    key: keyof EnvironmentData;
    borderColor: string;
  };

  const charts: ChartInfo[] = [
    {
      title: '온도',
      key: 'temperature',
      borderColor: 'rgba(255, 159, 64, 1)',
    },
    {
      title: '습도',
      key: 'humidity',
      borderColor: 'rgba(100, 149, 237, 1)',
    },
  ];

  const growFilteredData = envData.filter((item) => item.grow != 0);

  const incrementChartIndex = () => {
    setChartIndex((prevIndex) => (prevIndex + 1) % charts.length);
  };

  const decrementChartIndex = () => {
    setChartIndex(
      (prevIndex) => (prevIndex - 1 + charts.length) % charts.length
    );
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{charts[chartIndex].title}</h2>
      <div className="flex items-center justify-between">
        <FaArrowLeft onClick={decrementChartIndex} />
        <Line
          data={createChartData(
            recentEnvData,
            charts[chartIndex].key,
            charts[chartIndex].borderColor
          )}
        />
        <FaArrowRight onClick={incrementChartIndex} />
      </div>
      <h2 className="mb-4 mt-8 text-2xl font-bold">생장률 그래프</h2>
      <Line
        data={createChartData(
          growFilteredData,
          'grow',
          'rgba(75, 192, 192, 1)'
        )}
      />
    </div>
  );
};

export default EnvironmentGrowthChart;
