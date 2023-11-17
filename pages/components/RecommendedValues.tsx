// /components/RecommendedValues.tsx
import { useEffect, useState } from 'react';
import { useSocketData } from '@/utils/socket';
import authRequest from '@/utils/request/authRequest';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useLanguageResources } from '@/contexts/LanguageContext';
import { resourceUsage } from 'process';

interface Data {
  image: string;
  recommended: {
    temperature: number;
    humidity: number;
  };
  prediction: string;
}

interface EnvironmentData {
  id: number;
  temperature: number;
  humidity: number;
  soil_humid: number;
  grow: number;
  created_at: string;
}

const RecommendedValues = () => {
  const URL = process.env.NEXT_PUBLIC_WS_URL + ':8002/grow';
  const dataKeys = ['image', 'recommended', 'prediction'];
  const { data, loading } = useSocketData<Data>(URL, dataKeys);
  const [envData, setEnvData] = useState<EnvironmentData[]>([]);
  const [latestEnvironment, setLatestEnvironment] = useState<EnvironmentData>();

  const resources = useLanguageResources();

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

  useEffect(() => {
    if (envData.length > 0) {
      setLatestEnvironment(envData[envData.length - 1]);
    }
  }, [envData]);

  // loading 끄기
  // if (loading || !latestEnvironment) {
  //   return <div>{resources.loddingMessage}</div>;
  // }

  const tempDifference =
    // data.recommended.temperature - latestEnvironment.temperature;
    25 - 26.3;
  const humidityDifference =
    // data.recommended.humidity - latestEnvironment.humidity;
    70 - 65.3;

  const waterMessage = humidityDifference > 0 ? resources.addWater : '';

  // 카드의 배경색을 결정하는 함수
  const getCardBackground = (difference: number) => {
    return difference > 0 ? 'bg-yellow-300' : 'bg-green-300';
  };

  // 카드의 테두리 색상을 결정하는 함수
  const getCardBorderColor = (difference: number) => {
    return difference > 0 ? 'border-red-500' : 'border-green-500';
  };

  return (
    <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="rounded-md">
        <CardHeader
          className="bg-red-500 text-white"
          title={resources.recommandTemp}
          avatar={<ThermostatOutlinedIcon />}
        />
        <CardContent>
          <h2 className="text-center text-3xl">
            {/* {data.recommended.temperature.toFixed(1)}°C */}
            {26.3}°C
          </h2>
          <p className="text-center">
            {resources.recommandTemp} :{' '}
            <span
              className={`${
                tempDifference > 0 ? 'text-red-600' : 'text-blue-600'
              } font-bold`}
            >
              {/* {tempDifference.toFixed(1)}°C{`${resources.asMany} `} */}
              {tempDifference.toFixed(1)}°C{`${resources.asMany} `}
              {tempDifference > 0 ? (
                <>
                  {resources.upper}
                  <ArrowUpwardIcon style={{ color: 'red' }} />
                </>
              ) : (
                <>
                  {resources.lower}
                  <ArrowDownwardIcon style={{ color: 'blue' }} />
                </>
              )}
            </span>
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-md">
        <CardHeader
          className="bg-blue-600 text-white"
          title={resources.recommandHumid}
          avatar={<WaterOutlinedIcon />}
        />
        <CardContent>
          <h2 className="text-center text-3xl">
            {/* {data.recommended.humidity.toFixed(1)}% */}
            {65.3}%
          </h2>
          <p className="text-center">
            {resources.recommandHumid} :{' '}
            <span
              className={`${
                humidityDifference > 0 ? 'text-red-600' : 'text-blue-600'
              } font-bold`}
            >
              {humidityDifference.toFixed(1)}%{`${resources.asMany} `}
              {humidityDifference > 0 ? (
                <>
                  {resources.upper}
                  <ArrowUpwardIcon style={{ color: 'red' }} />
                </>
              ) : (
                <>
                  {resources.lower}
                  <ArrowDownwardIcon style={{ color: 'blue' }} />
                </>
              )}
            </span>
          </p>
        </CardContent>
      </Card>

      {humidityDifference > 0 && (
        <div
          className={`mt-4 flex items-center justify-between rounded-md p-4 shadow-lg ${getCardBackground(
            humidityDifference
          )}`}
        >
          <div className="flex items-center">
            <WaterOutlinedIcon
              style={{ color: 'blue', marginRight: '0.5rem' }}
            />
            <p className="font-bold">{waterMessage}</p>
          </div>
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            // onClick={() => alert('Watering plants...')} // 실제로 물을 주는 동작을 트리거하는 함수로 대체해야 합니다.
          >
            {/* {resources.waterNow} */}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedValues;
