// /components/SocketImage.tsx
import { useEffect, useState } from 'react';
import { useSocketData } from '@/utils/socket';

interface Data {
  image: string;
  recommended: {
    temperature: number;
    humidity: number;
  };
  prediction: string;
}

const SocketGrowImage = () => {
  const URL = 'ws://172.21.4.223:8002/grow';
  const dataKeys = ['image', 'recommended', 'prediction'];
  const { data, loading } = useSocketData<Data>(URL, dataKeys);

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div>
      <img src={`data:image/png;base64,${data.image}`} alt="그래프 이미지" />
    </div>
  );
};

export default SocketGrowImage;
