import { useEffect, useState } from 'react';

const SocketTest = () => {
  const [data, setData] = useState({
    image: '',
    // recommended: {},
    prediction: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const URL = 'ws://172.21.4.223:8002/apple';
    const socket = new WebSocket(URL);

    socket.addEventListener('open', () => {
      console.log('소켓 연결 성공');
    });

    socket.addEventListener('message', (message) => {
      try {
        const parsedData = JSON.parse(message.data);

        if (
          parsedData.hasOwnProperty('image') &&
          // parsedData.hasOwnProperty('recommended') &&
          parsedData.hasOwnProperty('prediction')
        ) {
          const imageData = parsedData.image;
          // const recommendedData = parsedData.recommended;
          const predictionData = parsedData.prediction;

          setData({
            image: imageData,
            // recommended: recommendedData,
            prediction: predictionData,
          });
          setLoading(false);
          console.log(data);
        } else {
          console.error('올바르지 않은 데이터 형식:', message.data);
        }
      } catch (error) {
        console.error('JSON 파싱 오류:', error, message.data);
      }
    });

    socket.addEventListener('close', () => {
      console.log('소켓 연결 종료');
    });

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      socket.close();
    };
  }, []);

  if (loading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div>
      <img src={`data:image/png;base64,${data.image}`} alt="그래프 이미지" />
      <pre>{JSON.stringify(data.recommended, null, 2)}</pre>
      <pre>{JSON.stringify(data.prediction, null, 2)}</pre>
    </div>
  );
};

export default SocketTest;
