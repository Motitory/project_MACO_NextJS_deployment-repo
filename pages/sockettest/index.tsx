import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSocketData } from '../../utils/socket';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

interface Data {
  image: string;
  recommended: {
    temperature: number;
    humidity: number;
  };
  prediction: string;
}

const SocketTest = () => {
  const URL = 'ws://172.21.4.223:8002/grow';
  const dataKeys = ['image', 'recommended', 'prediction'];
  const { data, loading } = useSocketData<Data>(URL, dataKeys);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    if (!loading && data && data.prediction) {
      const parsedPrediction = JSON.parse(data.prediction);
      const dateData = parsedPrediction.date.map(
        (dateStr: string) =>
          new Date(
            parseInt(dateStr.slice(0, 4)),
            parseInt(dateStr.slice(4, 6)) - 1,
            parseInt(dateStr.slice(6, 8))
          )
      );
      const lengthData = parsedPrediction.length.map((value: any) =>
        parseFloat((value as number).toFixed(4))
      );

      setChartData({
        labels: dateData,
        datasets: [
          {
            label: '성장률 예측',
            data: lengthData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            pointRadius: 5,
          },
        ],
      });
    }
  }, [data, loading]);

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div>
      <img src={`data:image/png;base64,${data.image}`} alt="그래프 이미지" />
      <h2>추천 온도: {data.recommended.temperature.toFixed(2)}°C</h2>
      <h2>추천 습도: {data.recommended.humidity.toFixed(2)}%</h2>

      <h2>7일 성장률 예측</h2>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              y: {
                ticks: {
                  callback: (value: string | number) => {
                    if (typeof value === 'number') {
                      return value.toFixed(4);
                    }
                    return value;
                  },
                },
              },
              x: {
                type: 'time',
                adapters: {
                  date: {
                    zone: 'utc',
                  },
                },
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MMM d',
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default SocketTest;
