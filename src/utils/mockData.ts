
import { Place } from '@/types';

// 가상의 장소 데이터베이스 (URL별로 다른 장소 반환)
export const getMockPlaces = (url: string): Place[] => {
  if (url.includes('jeju') || url.includes('제주')) {
    return [
      {
        id: 'jeju-1',
        name: '협재해수욕장',
        address: '제주특별자치도 제주시 한림읍 협재리',
        latitude: 33.394,
        longitude: 126.239,
        category: '해변',
        description: '제주도 서쪽의 아름다운 해수욕장',
        videoTimestamp: '00:02:15',
        distanceToNext: 12.5,
        travelTime: 25
      },
      {
        id: 'jeju-2',
        name: '성산일출봉',
        address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
        latitude: 33.458,
        longitude: 126.942,
        category: '관광지',
        description: '제주도 대표 일출 명소',
        videoTimestamp: '00:08:30',
        distanceToNext: 15.2,
        travelTime: 30
      },
      {
        id: 'jeju-3',
        name: '우도',
        address: '제주특별자치도 제주시 우도면',
        latitude: 33.500,
        longitude: 126.950,
        category: '섬',
        description: '제주도 부속섬, 아름다운 자연경관',
        videoTimestamp: '00:15:45'
      }
    ];
  }
  
  if (url.includes('busan') || url.includes('부산')) {
    return [
      {
        id: 'busan-1',
        name: '해운대해수욕장',
        address: '부산광역시 해운대구 우동',
        latitude: 35.158,
        longitude: 129.160,
        category: '해변',
        description: '부산의 대표적인 해수욕장',
        videoTimestamp: '00:01:30',
        distanceToNext: 3.2,
        travelTime: 15
      },
      {
        id: 'busan-2',
        name: '광안리해수욕장',
        address: '부산광역시 수영구 광안동',
        latitude: 35.153,
        longitude: 129.118,
        category: '해변',
        description: '광안대교 야경이 아름다운 해수욕장',
        videoTimestamp: '00:12:20',
        distanceToNext: 8.1,
        travelTime: 20
      },
      {
        id: 'busan-3',
        name: '감천문화마을',
        address: '부산광역시 사하구 감내2로 203',
        latitude: 35.097,
        longitude: 129.010,
        category: '문화마을',
        description: '컬러풀한 벽화와 골목이 매력적인 마을',
        videoTimestamp: '00:25:10'
      }
    ];
  }
  
  // 기본값: 서울 관광지
  return [
    {
      id: 'seoul-1',
      name: '경복궁',
      address: '서울특별시 종로구 사직로 161',
      latitude: 37.579,
      longitude: 126.977,
      category: '궁궐',
      description: '조선왕조의 법궁',
      videoTimestamp: '00:03:45',
      distanceToNext: 2.1,
      travelTime: 10
    },
    {
      id: 'seoul-2',
      name: '북촌한옥마을',
      address: '서울특별시 종로구 계동길 37',
      latitude: 37.582,
      longitude: 126.983,
      category: '한옥마을',
      description: '전통 한옥이 보존된 마을',
      videoTimestamp: '00:18:20',
      distanceToNext: 1.5,
      travelTime: 8
    },
    {
      id: 'seoul-3',
      name: '명동',
      address: '서울특별시 중구 명동길',
      latitude: 37.563,
      longitude: 126.982,
      category: '쇼핑',
      description: '서울의 대표적인 쇼핑거리',
      videoTimestamp: '00:28:15'
    }
  ];
};
