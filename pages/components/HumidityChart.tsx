import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import authRequest from '@/utils/request/authRequest';
import { useLanguageResources } from '@/contexts/LanguageContext';

interface HumidityChartData {
  id: number;
  temperature: number;
  humidity: number;
  soil_humid: number;
  grow: number;
  created_at: string;
}

const HumidityChart: React.FC = () => {
  const [data, setData] = useState<HumidityChartData[]>([]);
  const resources = useLanguageResources();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authRequest.get<HumidityChartData[]>(
          `http://localhost:8000/envir`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const createChartData = (
    data: HumidityChartData[],
    dataKey: keyof HumidityChartData,
    borderColor: string
  ) => {
    const labels = data.map((item) => {
      const date = new Date(item.created_at);
      return `${date.getMonth() + 1}${resources.month} ${date.getDate()}${
        resources.date
      } ${date.getHours()}${resources.time}`;
    });
    const chartData = data.map((item) => item[dataKey]);
    const backgroundColors = data.map((item) =>
      getBackgroundColor(
        item.created_at,
        'rgba(135, 206, 250, 0.5)',
        'rgba(95, 158, 160, 0.5)'
      )
    );

    return {
      labels,
      datasets: [
        {
          label: `${resources.humid}(%)`,
          data: chartData,
          backgroundColor: backgroundColors,
          borderColor,
          borderWidth: 1,
          fill: false,
        },
      ],
    };
  };

  const getBackgroundColor = (
    dateString: string,
    amColor: string,
    pmColor: string
  ) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    return hour >= 0 && hour < 12 ? amColor : pmColor;
  };

  const chartData = createChartData(data, 'humidity', 'rgba(100, 149, 237, 1)');

  return (
    <div>
      <h2 className="clip-right mb-4 mt-8 ml-4 w-1/5 rounded-l border border-green-300 bg-green-200 p-2 text-2xl font-bold">
        {resources.humidChart}
      </h2>
      <Line data={chartData} />
    </div>
  );
};

export default HumidityChart;
