
import { Place, TravelRoute } from '@/types';

export const getMockPlaces = (videoUrl: string): Place[] => {
  // Mock data based on different video URLs
  if (videoUrl.includes('jeju') || videoUrl.includes('제주')) {
    return [
      {
        id: '1',
        name: '협재 해수욕장',
        address: '제주특별자치도 제주시 한림읍 협재리',
        latitude: 33.3942,
        longitude: 126.2394,
        category: '해변',
        description: '제주 서쪽의 아름다운 해변'
      },
      {
        id: '2',
        name: '오설록 티뮤지엄',
        address: '제주특별자치도 서귀포시 안덕면 신화역사로 15',
        latitude: 33.3061,
        longitude: 126.2889,
        category: '박물관',
        description: '차와 관련된 문화 공간'
      },
      {
        id: '3',
        name: '성산일출봉',
        address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
        latitude: 33.4586,
        longitude: 126.9423,
        category: '관광지',
        description: '제주의 대표적인 일출 명소'
      },
      {
        id: '4',
        name: '한라산',
        address: '제주특별자치도 제주시 1100로',
        latitude: 33.3617,
        longitude: 126.5292,
        category: '산',
        description: '제주도의 최고봉'
      }
    ];
  } else if (videoUrl.includes('busan') || videoUrl.includes('부산')) {
    return [
      {
        id: '5',
        name: '해운대 해수욕장',
        address: '부산광역시 해운대구 우동',
        latitude: 35.1587,
        longitude: 129.1604,
        category: '해변',
        description: '부산의 대표적인 해변'
      },
      {
        id: '6',
        name: '감천문화마을',
        address: '부산광역시 사하구 감내2로 203',
        latitude: 35.0977,
        longitude: 129.0107,
        category: '문화마을',
        description: '컬러풀한 산복도로 마을'
      },
      {
        id: '7',
        name: '광안리 해수욕장',
        address: '부산광역시 수영구 광안해변로',
        latitude: 35.1532,
        longitude: 129.1189,
        category: '해변',
        description: '야경이 아름다운 해변'
      },
      {
        id: '8',
        name: '자갈치시장',
        address: '부산광역시 중구 자갈치해안로 52',
        latitude: 35.0969,
        longitude: 129.0306,
        category: '시장',
        description: '부산의 대표 수산시장'
      }
    ];
  } else {
    // Default Seoul places
    return [
      {
        id: '9',
        name: '경복궁',
        address: '서울특별시 종로구 사직로 161',
        latitude: 37.5796,
        longitude: 126.9770,
        category: '궁궐',
        description: '조선왕조의 법궁'
      },
      {
        id: '10',
        name: '명동',
        address: '서울특별시 중구 명동',
        latitude: 37.5636,
        longitude: 126.9834,
        category: '쇼핑',
        description: '서울의 대표 쇼핑거리'
      },
      {
        id: '11',
        name: '남산타워',
        address: '서울특별시 용산구 남산공원길 105',
        latitude: 37.5512,
        longitude: 126.9882,
        category: '관광지',
        description: '서울의 랜드마크'
      }
    ];
  }
};

export const mockRoutes: TravelRoute[] = [
  {
    id: 'route-1',
    title: '제주도 힐링 여행',
    videoUrl: 'https://youtube.com/jeju-healing',
    places: getMockPlaces('jeju'),
    createdAt: '2024-01-15',
    isPublic: true,
    likes: 42
  },
  {
    id: 'route-2',
    title: '부산 바다 여행',
    videoUrl: 'https://youtube.com/busan-sea',
    places: getMockPlaces('busan'),
    createdAt: '2024-01-20',
    isPublic: true,
    likes: 38
  }
];
