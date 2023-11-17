import { useEffect, useState } from 'react';
import { useSocketData } from '@/utils/socket';
import Image from 'next/image';
import { useLanguageResources } from '@/contexts/LanguageContext';

interface Data {
  image: string;
  recommended: {
    temperature: number;
    humidity: number;
  };
  prediction: string;
}

const SocketGrowImage = () => {
  const URL = process.env.NEXT_PUBLIC_WS_URL + ':8002/grow';
  const dataKeys = ['image', 'recommended', 'prediction'];
  const { data, loading } = useSocketData<Data>(URL, dataKeys);
  const resources = useLanguageResources();

  if (loading) {
    return <div>{resources.loddingMessage}</div>;
  }

  return (
    <div>
      <h2 className="clip-right mb-4 ml-4 mt-8 w-1/5 rounded-l border border-orange-300 bg-teal-200 p-2 text-2xl font-bold">
        {resources.growPredictChart}
      </h2>
      <Image
        src={`data:image/png;base64,${data.image}`}
        alt="생장 과정 예측 이미지"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default SocketGrowImage;
