import React from 'react';
import { useSocketData } from '../../utils/socket';
import Image from 'next/image';
import { useLanguageResources } from '@/contexts/LanguageContext';

interface Data {
  image: string;
  prediction: any;
}

const SocketAppleChart: React.FC = () => {
  const URL = 'ws://172.21.4.76:8002/apple';
  const dataKeys = ['image', 'prediction'];
  const { data, loading } = useSocketData<Data>(URL, dataKeys);
  const resources = useLanguageResources();

  if (loading) {
    return <div>{resources.loddingMessage}</div>;
  }

  return (
    <div>
      <h2 className="clip-right mb-4 ml-4 mt-8 w-1/5 rounded-l border border-red-300 bg-cyan-200 p-2 text-2xl font-bold">
        {resources.applePricePredictChart} (15kg {resources.basis})
      </h2>
      <Image src={`data:image/png;base64,${data.image}`} alt="사과 가격 예측" />
    </div>
  );
};

export default SocketAppleChart;
