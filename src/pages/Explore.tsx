
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { MapPin, Heart, Share, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock popular routes data
  const popularRoutes = [
    {
      id: '1',
      title: '제주도 힐링 여행',
      author: '여행러버',
      likes: 124,
      places: 8,
      thumbnail: 'https://via.placeholder.com/300x200?text=제주도',
      videoUrl: 'https://youtube.com/watch?v=sample1'
    },
    {
      id: '2',
      title: '부산 바다 여행',
      author: '바다사랑',
      likes: 89,
      places: 6,
      thumbnail: 'https://via.placeholder.com/300x200?text=부산',
      videoUrl: 'https://youtube.com/watch?v=sample2'
    },
    {
      id: '3',
      title: '서울 도심 투어',
      author: '도시탐험가',
      likes: 156,
      places: 12,
      thumbnail: 'https://via.placeholder.com/300x200?text=서울',
      videoUrl: 'https://youtube.com/watch?v=sample3'
    }
  ];

  const handleViewRoute = (route: any) => {
    // 홈 페이지로 이동하면서 해당 루트 데이터 전달
    navigate('/', { 
      state: { 
        loadedRoute: {
          id: route.id,
          title: route.title,
          videoUrl: route.videoUrl,
          places: [], // Mock data for places would go here
          createdAt: new Date().toLocaleDateString(),
          likes: route.likes
        }
      }
    });
  };

  const handleShareRoute = (route: any) => {
    const shareUrl = `${window.location.origin}/?route=${route.id}`;
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
          {popularRoutes.map((route) => (
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
      </main>
    </div>
  );
};

export default Explore;
