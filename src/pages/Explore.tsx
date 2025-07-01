
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { MapPin, Heart, Share, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TravelRoute } from '@/types';

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedRoutes] = useLocalStorage<TravelRoute[]>('travel-routes', []);

  // 저장된 루트와 샘플 루트를 합쳐서 표시
  const sampleRoutes = [
    {
      id: 'sample-1',
      title: '제주도 힐링 여행',
      author: '여행러버',
      likes: 124,
      places: 8,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      videoUrl: 'https://youtube.com/watch?v=sample1',
      createdAt: '2024-01-15',
      isPublic: true,
      actualPlaces: [
        {
          id: 'jeju-1',
          name: '성산일출봉',
          address: '제주특별자치도 서귀포시 성산읍 성산리',
          latitude: 33.4587,
          longitude: 126.9423,
          category: '관광명소'
        },
        {
          id: 'jeju-2',
          name: '우도',
          address: '제주특별자치도 제주시 우도면 연평리',
          latitude: 33.5004,
          longitude: 126.9508,
          category: '관광명소'
        }
      ]
    },
    {
      id: 'sample-2',
      title: '부산 바다 여행',
      author: '바다사랑',
      likes: 89,
      places: 6,
      thumbnail: 'https://images.unsplash.com/photo-1578463071275-0d9b3c10d6ba?w=300&h=200&fit=crop',
      videoUrl: 'https://youtube.com/watch?v=sample2',
      createdAt: '2024-01-10',
      isPublic: true,
      actualPlaces: [
        {
          id: 'busan-1',
          name: '해운대해수욕장',
          address: '부산광역시 해운대구 우동',
          latitude: 35.1587,
          longitude: 129.1603,
          category: '해수욕장'
        },
        {
          id: 'busan-2',
          name: '광안리해수욕장',
          address: '부산광역시 수영구 광안동',
          latitude: 35.1532,
          longitude: 129.1186,
          category: '해수욕장'
        }
      ]
    }
  ];

  // 저장된 루트를 탐색 페이지 형식으로 변환
  const savedRoutesForExplore = savedRoutes.map(route => ({
    id: route.id,
    title: route.title,
    author: '나',
    likes: route.likes,
    places: route.places.length,
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    videoUrl: route.videoUrl,
    createdAt: route.createdAt,
    isPublic: route.isPublic,
    actualPlaces: route.places
  }));

  const allRoutes = [...sampleRoutes, ...savedRoutesForExplore];

  const handleViewRoute = (route: any) => {
    const routeData = {
      id: route.id,
      title: route.title,
      videoUrl: route.videoUrl,
      places: route.actualPlaces || [],
      createdAt: route.createdAt,
      likes: route.likes,
      isPublic: route.isPublic || false
    };

    navigate('/', { 
      state: { 
        loadedRoute: routeData
      }
    });
  };

  const handleShareRoute = (route: any) => {
    const routeData = {
      id: route.id,
      title: route.title,
      videoUrl: route.videoUrl,
      places: route.actualPlaces || [],
      createdAt: route.createdAt,
      likes: route.likes,
      isPublic: route.isPublic || false
    };
    
    const shareUrl = `${window.location.origin}/?shared=${encodeURIComponent(JSON.stringify(routeData))}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "공유 링크가 복사되었습니다",
      description: `"${route.title}" 루트를 다른 사람들과 공유해보세요!`,
    });
  };

  return (
    <div className="min-h-screen bg-toss-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-toss-navy mb-2">여행 루트 탐색</h1>
          <p className="text-toss-gray-600">다른 사용자들이 만든 인기 여행 루트를 둘러보세요!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRoutes.map((route) => (
            <Card key={route.id} className="toss-card overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={route.thumbnail}
                alt={route.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-toss-navy mb-2">{route.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-toss-gray-600 mb-4">
                  <User className="w-4 h-4" />
                  <span>{route.author}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-toss-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {route.places}개 장소
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {route.likes}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewRoute(route)}
                    className="flex-1 py-2 px-4 bg-toss-blue text-white rounded-lg hover:bg-toss-blue/90 transition-colors"
                  >
                    보기
                  </button>
                  <button 
                    onClick={() => handleShareRoute(route)}
                    className="p-2 border border-toss-gray-300 rounded-lg hover:bg-toss-gray-50 transition-colors"
                  >
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {allRoutes.length === 0 && (
          <div className="text-center py-12 text-toss-gray-500">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">표시할 루트가 없습니다</p>
            <p>새로운 여행 루트를 만들어보세요!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
