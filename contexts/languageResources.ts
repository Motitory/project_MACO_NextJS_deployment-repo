import next from 'next/types';

export const resources = {
  ko: {
    lang: 'ko',
    // navbar2.tsx에서 사용하는 리소스
    logoutAlert: '로그아웃 되었습니다.',
    // --------------------------------------------
    // index.tsx에서 사용하는 리소스
    loginTimeout: '로그인 시간이 만료되었습니다.',
    agriWhat: 'アグリードとは？',
    smartFarmSystem: '「スマートファーム管理システム」',
    bigDataAI: 'ビッグデータとAIを使って環境による生長分析し、',
    userEasyCultivate: 'ユーザーが簡単に栽培できるサービスです。',
    qualityResourceSave: '품질 향상 및 자원 절약',
    qualityResourceSaveContent:
      '또한, 스마트팜 기술을 활용하면 농작물의 품질을 향상시키고 농작물에 필요한 물, 비료 및 농약의 사용량을 줄일 수 있습니다. 이러한 혁신적인 방식으로 농업과 환경의 지속 가능성을 높일 수 있습니다.',
    ecoFriendlySmartFarm: '환경 친화적인 스마트팜',
    newParadigm: '친환경적인 농업의 새로운 패러다임',
    newParadigmContent:
      '스마트팜은 식물의 성장 환경을 최적화하여 농작물의 품질 향상 및 자원 절약을 실현할 수 있는 차세대 농업 기술입니다. 이를 통해 환경에 미치는 부정적 영향을 줄이고, 지속 가능한 농업 발전을 이루어낼 수 있습니다. 함께 스마트팜으로 더 나은 미래를 만들어가요!',
    smartFarmIntroVideo: '스마트팜 소개 영상',
    controller: '컨트롤러',
    convenienceFeatures: '편리한 기능',
    convenienceFeaturesContent:
      '컨트롤러 기능을 이용하여 스마트팜을 쉽고 편리하게 관리할 수 있습니다.',
    dashboard: '대시보드',
    dashboardSubtitle: '한눈에 확인',
    dashboardContent:
      '대시보드를 통해 스마트팜의 상태를 한눈에 확인할 수 있습니다.',
    statistic: '통계',
    statisticSubtitle: '데이터 분석',
    statisticContent: '통계를 통해 스마트팜의 데이터를 분석할 수 있습니다.',
    qna: 'QnA',
    qnaSubtitle: '질문과 답변',
    qnaContent:
      '질문과 답변을 통해 스마트팜에 대한 궁금증을 해결할 수 있습니다.',
    //--------------------------------------------
    // login.js에서 사용하는 리소스
    kakaoLogin: '카카오로그인',
    kakaoLoginFail: '로그인 자체가 실패',
    // --------------------------------------------
    // dashboard/manualcontrol
    deviceList: '기기 목록',
    deviceLoadingMessage: '기기 목록을 불러오는 중입니다.',
    deviceNumber: '기기번호',
    deviceAddress: '위치',
    irrigate: '관수',
    irrigateTime: '관수 시간',
    fertilize: '액비',
    deviceManualControl: '기기 수동 조작',
    time: '시간',
    minute: '분',
    operate: '작동',
    start: '시작',
    stop: '정지',
    loddingMessage: '로딩중입니다..',
    measureLength: '길이 측정',
    liveVideo: '실시간 영상',
    operateFailAlert: '기기 조작에 실패했습니다.',
    operateStopMessage: '기기 가동이 정지되었습니다.',
    operateComplete: '기기 조작이 성공적으로 완료되었습니다.',
    lostDevice: '기기를 찾을 수 없습니다.',
    closeModal: '닫기',
    // --------------------------------------------
    // dashboard
    manualControl: '수동 조작',
    viewDetail: '상세 보기',
    realtimeView: '실시간 보기',
    dailyInjection: '일별 분사량',
    schedual: '스케줄',
    device: '장치',
    recommandTemp: '추천 온도(25℃)',
    recommandHumid: '추천 습도(70%)',
    asMany: '만큼',
    picture: '사진',
    video: '영상',
    showPicture: '사진 보기',
    showVideo: '영상 보기',
    addWater: '수분량이 부족합니다. 물을 더 주어야합니다.',
    upper: '올려야합니다.',
    lower: '내려야합니다.',
    // --------------------------------------------
    // schedule
    mon: '월',
    tue: '화',
    wed: '수',
    thu: '목',
    fri: '금',
    sat: '토',
    sun: '일',
    on: '켜짐',
    off: '꺼짐',
    startTime: '시작 시간',
    endTime: '종료 시간',
    amount: '양',
    dayOfWeek: '요일',
    updateApplied: '수정이 적용되었습니다.',
    // --------------------------------------------
    // graph
    tempGraph: '온도 그래프',
    chooseChart: '차트 선택',
    tempChart: '온도 차트',
    humidChart: '습도 차트',
    growChart: '생장 차트',
    growPredictChart: '생장 과정 예측 차트',
    applePricePredictChart: '사과 가격 예측 차트',
    pearPricePredictChart: '배 가격 예측 차트',
    temp: '온도',
    humid: '습도',
    length: '길이',
    month: '월',
    date: '일',
    hour: '시',
    basis: '기준',
    noOperationData: '작동 이력이 없습니다.',
    mmmonth: 'MM월',
    week: '주차',
    lastWeek: '이전 주',
    nextWeek: '다음 주',
    injectionBasis: '1분 당 : 0.5L 분사 기준',
    irrigationSchedule: '관수 스케줄',
    JsonPredictionChart: '가격 예측 차트',
    JsonPredictionChartTitle: '토마토 가격 예측 차트',
    // --------------------------------------------
    // qna
    write: '글쓰기',
    privateContent: '비공개 게시글입니다.',
    title: '글 제목',
    contentNumber: '글 번호',
    writer: '작성자',
    content: '내용',
    update: '수정',
    delete: '삭제',
    goList: '목록으로',
    titlePlaceholder: '제목을 입력해주세요.',
    contentPlaceholder: '내용을 입력해주세요.',
    public: '공개',
    private: '비공개',
    // --------------------------------------------
    close: '닫기',
  },
  ja: {
    lang: 'ja',
    // navbar2.tsx에서 사용하는 리소스
    logoutAlert: 'ログアウトされました。',
    // --------------------------------------------
    // index.tsx에서 사용하는 리소스
    loginTimeout: 'ログイン時間が切れました。',
    agriWhat: 'アグリードとは？',
    smartFarmSystem: '「スマートファーム管理システム」',
    bigDataAI: 'ビッグデータとAIを使用して生育環境の分析を行い、',
    userEasyCultivate: 'ユーザーが簡単に作物を栽培できるサービスです。',
    qualityResourceSave: '品質向上とリソースの節約',
    qualityResourceSaveContent:
      'さらに、スマートファーム技術を活用することで、作物の品質を向上させ、作物に必要な水、肥料、農薬の使用量を減らすことができます。このような革新的な方法で、農業の持続可能性を高めることができます。',
    ecoFriendlySmartFarm: '環境に優しいスマートファーム',
    newParadigm: '環境に優しい農業の新しいパラダイム',
    newParadigmContent:
      'スマートファームは、作物の成長環境を最適化し、農作物の品質向上と資源節約を実現できる次世代農業技術です。 これにより、環境への悪影響を減らし、持続可能な農業の発展を実現することができます。一緒にスマートファームでより良い未来を作りましょう！',
    smartFarmIntroVideo: 'スマートファーム紹介ビデオ',
    controller: 'コントローラー',
    convenienceFeatures: '「便利な機能」',
    convenienceFeaturesContent:
      'コントローラー機能を利用してスマートファームを簡単かつ便利に管理することができます',
    dashboard: 'ダッシュボード',
    dashboardSubtitle: '一目で確認',
    dashboardContent:
      'ダッシュボードを通じてスマートファームの状態を一目で確認することができます。',
    statistic: '統計',
    statisticSubtitle: 'データ分析',
    statisticContent:
      '統計を通じてスマートファームのデータを分析することができます。',
    qna: 'QnA',
    qnaSubtitle: '質問と回答',
    qnaContent:
      '質問と回答を通じてスマートファームに関する疑問を解決することができます。',
    //--------------------------------------------
    // login.js에서 사용하는 리소스
    kakaoLogin: 'カカオログイン',
    kakaoLoginFail: 'ログイン自体が失敗',
    // --------------------------------------------
    // dashboard/manualcontrol
    deviceList: 'デバイスリスト',
    deviceLoadingMessage: 'デバイスリストを読み込んでいます。',
    deviceNumber: 'デバイス番号',
    deviceAddress: '位置',
    irrigate: '灌水',
    irrigateTime: '灌水時間',
    fertilize: '液肥',
    deviceManualControl: 'デバイス手動操作',
    time: '時間',
    minute: '分',
    operate: '作動',
    start: '開始',
    stop: '停止',
    loddingMessage: 'ローディング中です。',
    measureLength: '長さ測定',
    liveVideo: 'ライブビデオ',
    operateFailAlert: 'デバイス操作に失敗しました。',
    operateStopMessage: 'デバイスの動作が停止されました。',
    operateComplete: 'デバイス操作が正常に完了しました。',
    lostDevice: 'デバイスが見つかりません。',
    closeModal: '閉じる',
    // --------------------------------------------
    // dashboard
    manualControl: '手動操作',
    viewDetail: '詳細を見る',
    realtimeView: 'リアルタイムビュー',
    dailyInjection: '日別水やり量',
    schedual: 'スケジュール',
    device: 'デバイス',
    recommandTemp: '推奨温度(25℃)',
    recommandHumid: '推奨湿度(70%)',
    asMany: 'だけ',
    picture: '写真',
    video: 'ビデオ',
    showPicture: '写真を見る',
    showVideo: 'ビデオを見る',
    addWater: '水分量が不足しています。水をもっと与える必要があります。',
    upper: '上げる必要があります。',
    lower: '下げる必要があります。',
    // --------------------------------------------
    // schedule
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
    sat: '土',
    sun: '日',
    on: 'オン',
    off: 'オフ',
    startTime: '開始時間',
    endTime: '終了時間',
    amount: '量',
    dayOfWeek: '曜日',
    updateApplied: '修正が適用されました。',
    // --------------------------------------------
    // graph
    tempGraph: '温度グラフ',
    chooseChart: 'グラフ選択',
    tempChart: '温度グラフ',
    humidChart: '湿度グラフ',
    growChart: '生長グラフ',
    growPredictChart: '生長過程予測グラフ',
    applePricePredictChart: 'リンゴ価格予測グラフ',
    pearPricePredictChart: '梨価格予測グラフ',
    temp: '温度',
    humid: '湿度',
    length: '長さ',
    month: '月',
    date: '日',
    hour: '時',
    basis: '基準',
    noOperationData: '操作履歴がありません。',
    mmmonth: 'MM月',
    week: '週',
    lastWeek: '前の週',
    nextWeek: '次の週',
    injectionBasis: '1分当たり : 0.5L 注入基準',
    irrigationSchedule: '灌水スケジュール',
    JsonPredictionChart: '価格予測グラフ',
    JsonPredictionChartTitle: 'トマト価格予測グラフ',
    // --------------------------------------------
    // qna
    write: '投稿',
    privateContent: '非公開の投稿です。',
    title: 'タイトル',
    contentNumber: '投稿番号',
    writer: '作成者',
    content: '内容',
    update: '修正',
    delete: '削除',
    goList: 'リストに戻る',
    titlePlaceholder: 'タイトルを入力してください。',
    contentPlaceholder: '内容を入力してください。',
    public: '公開',
    private: '非公開',
    // --------------------------------------------
    close: '閉じる',
  },
};
