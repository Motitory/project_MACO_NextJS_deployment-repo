import React, { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import authRequest from '@/utils/request/authRequest';
import { MachineData } from '@/interfaces/machineData';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import { useQuery } from 'react-query';
import Image, { ImageLoaderProps } from 'next/image';
import { useLanguageResources } from '@/contexts/LanguageContext';

const baseURL = process.env.NEXT_PUBLIC_LOCAL_HTTP_URL;

const sizeFeedURL = `${baseURL}:8001/size_feed`;
const videoFeedURL = `${baseURL}:8001/video_feed`;

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 128px)',
  backgroundColor: '#f7fafc',
  padding: theme.spacing(4),
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 8,
  padding: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
}));

const ManualControlWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  flexGrow: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(4),
  },
}));

const VideoWrapper = styled('div')(({ theme }) => ({
  flexGrow: 1,
  width: '100vw',
  height: '40vh', // 높이를 40vh로 설정하여 화면의 절반보다 작게 차지하도록 변경
  marginTop: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginTop: 0,
  },
}));

const Video = styled('iframe')({
  border: 'none',
  width: '100%',
  height: '100%',
});

const DividerWrapper = styled('div')({
  width: '100%',
  margin: '16px 0',
});

const myLoader = (
  { src, width, quality }: ImageLoaderProps,
  isMeasuringLength: boolean
): string => {
  const baseQuality = quality || 75;

  if (isMeasuringLength) {
    return `${sizeFeedURL}?w=${width}&q=${baseQuality}`;
  } else {
    return `${videoFeedURL}?w=${width}&q=${baseQuality}`;
  }
};
console.log(sizeFeedURL);
console.log(videoFeedURL);

type ActionType =
  | { type: 'UPDATE_MACHINE_DATA'; key: keyof MachineData; value: any }
  | { type: 'INIT_MACHINE_DATA'; data: MachineData }
  | { type: 'RESET_MACHINE_DATA' };

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case 'UPDATE_MACHINE_DATA':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'INIT_MACHINE_DATA':
      return {
        ...action.data,
      };
    case 'RESET_MACHINE_DATA':
      return {
        ...state,
        rwtime1: 0,
        rwtime2: 0,
        rcval1: 0,
        rcval2: 0,
        rctime: 0,
      };
    default:
      return state;
  }
};

const ManualControl = () => {
  const router = useRouter();
  const { device } = router.query;
  const [isOperating, setIsOperating] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMeasuringLength, setIsMeasuringLength] = useState(false);
  const resources = useLanguageResources();

  const fetchMachineData = async () => {
    try {
      const response = await authRequest.get<MachineData[]>(
        `http://localhost:8000/manual`
      );
      const deviceData = response.data.find((data) => data.device === device);
      if (deviceData) {
        return deviceData;
      } else {
        console.error(`${resources.lostDevice}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    data: machineData,
    refetch: refetchMachineData,
    isLoading,
  } = useQuery(['machineData', device], fetchMachineData, {
    enabled: !!device, // device 값이 있을 경우에만 쿼리 실행
    refetchInterval: 10000, // 10초마다 데이터 갱신
    refetchOnWindowFocus: false, // 창 포커스 변경시 새로고침 방지
  });

  const [state, dispatch] = useReducer(reducer, {});

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // setIsMeasuringLength(false);
  };

  const toggleVideo = () => {
    setIsMeasuringLength(!isMeasuringLength);
    setIsVideoLoading(true);
  };

  useEffect(() => {
    if (machineData) {
      dispatch({
        type: 'INIT_MACHINE_DATA',
        data: machineData,
      });
      // isOperating 상태 업데이트
      if (
        machineData.rwtime1 > 0 ||
        machineData.rwtime2 > 0 ||
        machineData.rctime > 0
      ) {
        setIsOperating(true);
      } else {
        setIsOperating(false);
      }
    }
  }, [machineData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof MachineData
  ) => {
    if (machineData && !isOperating) {
      const target = event.target as HTMLInputElement;
      dispatch({
        type: 'UPDATE_MACHINE_DATA',
        key,
        value: key.startsWith('rcval')
          ? target.checked
            ? 1
            : 0
          : parseInt(target.value),
      });
    }
  };

  const handleToggleButton = async () => {
    if (machineData) {
      try {
        const data = isOperating
          ? {
              device: machineData.device,
              rwtime1: 0,
              rwtime2: 0,
              rcval1: 0,
              rcval2: 0,
              rctime: 0,
            }
          : {
              device: machineData.device,
              rwtime1: state.rwtime1,
              rwtime2: state.rwtime2,
              rcval1: state.rcval1,
              rcval2: state.rcval2,
              rctime: state.rctime,
            };
        await authRequest.patch(
          `http://localhost:8000/manual/${machineData.id}`,
          data
        );
        console.log(`machineId : ${machineData.id} `);
        setIsOperating((prevIsOperating) => !prevIsOperating);
        console.log(
          isOperating
            ? `${resources.operateStopMessage}`
            : `${resources.operateComplete}`,
          data
        );
        // alert(
        //   isOperating
        //     ? `${resources.operateStopMessage}`
        //     : `${resources.operateComplete}`
        // );
        handleOpenModal();
      } catch (error) {
        console.error(`${resources.operateFailAlert}`, error);
        // alert(`${resources.operateFailAlert}`);
      }
    }
  };

  if (isLoading || !machineData) {
    return <div>${resources.loddingMessage}</div>;
  }

  return (
    <CustomContainer>
      <Typography variant="h4" gutterBottom align="center">
        {`${machineData.device}${resources.deviceManualControl}`}
      </Typography>
      <ContentWrapper>
        <ManualControlWrapper>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label={`${resources.irrigate} 1 : ${resources.time}(${resources.minute})`}
              type="number"
              // value={state.rwtime1 || ''}
              value={state.rwtime1}
              onChange={(event) => handleInputChange(event, 'rwtime1')}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                disabled: isOperating,
              }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label={`${resources.irrigate} 2 : ${resources.time}(${resources.minute})`}
              type="number"
              value={state.rwtime2}
              onChange={(event) => handleInputChange(event, 'rwtime2')}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                disabled: isOperating,
              }}
            />
          </Box>
          <Box display="flex" justifyContent="center" marginBottom={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rcval1 === 1}
                  onChange={(event) => handleInputChange(event, 'rcval1')}
                  disabled={isOperating}
                />
              }
              label={`${resources.fertilize} 1`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.rcval2 === 1}
                  onChange={(event) => handleInputChange(event, 'rcval2')}
                  disabled={isOperating}
                />
              }
              label={`${resources.fertilize} 2`}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label={`${resources.fertilize} ${resources.operate} ${resources.time}`}
              type="number"
              value={state.rctime}
              onChange={(event) => handleInputChange(event, 'rctime')}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                disabled: isOperating,
              }}
            />
          </Box>
          <DividerWrapper>
            <Divider />
          </DividerWrapper>
          <button
            onClick={handleToggleButton}
            className={`absolute bottom-0 w-full ${
              isOperating ? 'bg-red-600' : 'bg-green-600'
            } py-2 font-bold text-white`}
          >
            {isOperating
              ? `${resources.operate} ${resources.stop}`
              : `${resources.operate} ${resources.start}`}
          </button>
        </ManualControlWrapper>
      </ContentWrapper>
      {openModal && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="w-full max-w-4xl rounded-lg bg-white p-4" // max-w-4xl 또는 더 큰 크기로 조정
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-3xl font-bold">
              {' '}
              {/* text-3xl로 텍스트 크기를 증가 */}
              {isMeasuringLength
                ? `${resources.measureLength}`
                : `${resources.liveVideo}`}
            </h2>
            {/* <div className="mb-4 flex justify-center">
              <Image
                loader={(props) => myLoader(props, isMeasuringLength)}
                src={isMeasuringLength ? sizeFeedURL : videoFeedURL}
                alt={
                  isMeasuringLength
                    ? `${resources.measureLength}`
                    : `${resources.liveVideo}`
                }
                onLoad={() => setIsVideoLoading(false)}
                width={800} // 가로 크기 증가
                height={600} // 세로 크기 증가
                className="object-cover"
              />
            </div> */}
            <video
              className="my-4 h-auto w-full" // This will make the video responsive and add vertical margin
              loop
              autoPlay
              // controls // It's a good idea to include controls
            >
              <source src="/operation_2x.mp4" type="video/mp4" />
            </video>
            <div className="flex justify-end space-x-2">
              {' '}
              {/* 버튼을 오른쪽 정렬 */}
              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={() => setOpenModal(false)}
              >
                {resources.closeModal}
              </button>
              <button
                className={
                  isMeasuringLength
                    ? 'rounded bg-orange-600 px-4 py-2 text-white'
                    : 'rounded bg-pink-600 px-4 py-2 text-white'
                }
                // onClick={toggleVideo}
              >
                {isMeasuringLength
                  ? `${resources.liveVideo}`
                  : `${resources.measureLength}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomContainer>
  );
};

export default ManualControl;
