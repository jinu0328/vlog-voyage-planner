
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TravelRoute } from '@/types';
import { MapPin, Heart, Share, Eye, Users, Calendar, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');

  // 샘플 인기 루트 데이터 (실제로는 API에서 가져올 데이터)
  const popularRoutes: TravelRoute[] = [
    {
      id: 'popular-1',
      title: '제주도 힐링 여행 🌊',
      videoUrl: 'https://youtube.com/watch?v=sample1',
      places: [
        { id: '1', name: '협재해수욕장', address: '제주특별자치도 제주시 한림읍', latitude: 33.394, longitude: 126.239, category: '해변', videoTimestamp: '00:02:15', distanceToNext: 12.5, travelTime: 25 },
        { id: '2', name: '성산일출봉', address: '제주특별자치도 서귀포시 성산읍', latitude: 33.458, longitude: 126.942, category: '관광지', videoTimestamp: '00:08:30', distanceToNext: 15.2, travelTime: 30 },
        { id: '3', name: '우도', address: '제주특별자치도 제주시 우도면', latitude: 33.500, longitude: 126.950, category: '섬', videoTimestamp: '00:15:45' }
      ],
      createdAt: '2024-01-15',
      isPublic: true,
      likes: 127,
      theme: '힐링',
      season: '여름',
      ageGroup: '20-30대'
    },
    {
      id: 'popular-2', 
      title: '부산 바다 여행 🌊',
      videoUrl: 'https://youtube.com/watch?v=sample2',
      places: [
        { id: '4', name: '해운대해수욕장', address: '부산광역시 해운대구', latitude: 35.158, longitude: 129.160, category: '해변', videoTimestamp: '00:01:30', distanceToNext: 3.2, travelTime: 15 },
        { id: '5', name: '광안리해수욕장', address: '부산광역시 수영구', latitude: 35.153, longitude: 129.118, category: '해변', videoTimestamp: '00:12:20', distanceToNext: 8.1, travelTime: 20 },
        { id: '6', name: '감천문화마을', address: '부산광역시 사하구', latitude: 35.097, longitude: 129.010, category: '문화마을', videoTimestamp: '00:25:10' }
      ],
      createdAt: '2024-01-20',
      isPublic: true,
      likes: 89,
      theme: '액티비티',
      season: '여름',
      ageGroup: '전연령'
    },
    {
      id: 'popular-3',
      title: '서울 도심 투어 🏙️',
      videoUrl: 'https://youtube.com/watch?v=sample3',
      places: [
        { id: '7', name: '경복궁', address: '서울특별시 종로구', latitude: 37.579, longitude: 126.977, category: '궁궐', videoTimestamp: '00:03:45', distanceToNext: 2.1, travelTime: 10 },
        { id: '8', name: '북촌한옥마을', address: '서울특별시 종로구', latitude: 37.582, longitude: 126.983, category: '한옥마을', videoTimestamp: '00:18:20', distanceToNext: 1.5, travelTime: 8 },
        { id: '9', name: '명동', address: '서울특별시 중구', latitude: 37.563, longitude: 126.982, category: '쇼핑', videoTimestamp: '00:28:15' }
      ],
      createdAt: '2024-01-25',
      isPublic: true,
      likes: 156,
      theme: '문화',
      season: '가을',
      ageGroup: '가족'
    }
  ];

  // 필터링된 루트
  const filteredRoutes = popularRoutes.filter(route => {
    return (selectedTheme === 'all' || route.theme === selectedTheme) &&
           (selectedSeason === 'all' || route.season === selectedSeason) &&
           (selectedAge === 'all' || route.ageGroup === selectedAge);
  });

  const handleViewRoute = (route: TravelRoute) => {
    navigate('/', { state: { loadedRoute: route } });
  };

  const handleShareRoute = (route: TravelRoute) => {
    const shareUrl = `${window.location.origin}?shared=${encodeURIComponent(JSON.stringify(route))}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "공유 링크가 복사되었습니다",
      description: "다른 사람들과 여행 루트를 공유해보세요!",
    });
  };

  return (
    <div className="min-h-screen bg-toss-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-toss-navy mb-2">인기 여행 루트 탐색</h1>
          <p className="text-toss-gray-600">다른 여행자들이 만든 인기 루트를 둘러보고 참고해보세요</p>
        </div>

        {/* 필터링 옵션 */}
        <Card className="toss-card p-6 mb-8">
          <h3 className="text-lg font-semibold text-toss-navy mb-4">필터</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-toss-gray-700 mb-2">테마</label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <SelectValue placeholder="테마 선택" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="힐링">힐링</SelectItem>
                  <SelectItem value="액티비티">액티비티</SelectItem>
                  <SelectItem value="문화">문화</SelectItem>
                  <SelectItem value="미식">미식</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-toss-gray-700 mb-2">계절</label>
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <SelectValue placeholder="계절 선택" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="봄">봄</SelectItem>
                  <SelectItem value="여름">여름</SelectItem>
                  <SelectItem value="가을">가을</SelectItem>
                  <SelectItem value="겨울">겨울</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-toss-gray-700 mb-2">연령대</label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <SelectValue placeholder="연령대 선택" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="20-30대">20-30대</SelectItem>
                  <SelectItem value="가족">가족</SelectItem>
                  <SelectItem value="전연령">전연령</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* 인기 루트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="toss-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-toss-gray-900 mb-2">{route.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {route.theme && (
                    <span className="inline-block px-2 py-1 text-xs bg-toss-blue/10 text-toss-blue rounded-md">
                      {route.theme}
                    </span>
                  )}
                  {route.season && (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md">
                      {route.season}
                    </span>
                  )}
                  {route.ageGroup && (
                    <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md">
                      {route.ageGroup}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {route.places.slice(0, 3).map((place, index) => (
                  <div key={place.id} className="flex items-center gap-2 text-sm text-toss-gray-600">
                    <span className="w-5 h-5 bg-toss-blue/20 text-toss-blue rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="truncate">{place.name}</span>
                    {place.videoTimestamp && (
                      <span className="text-xs text-blue-600">({place.videoTimestamp})</span>
                    )}
                  </div>
                ))}
                {route.places.length > 3 && (
                  <div className="text-xs text-toss-gray-500 pl-7">
                    +{route.places.length - 3}개 장소 더보기
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-toss-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {route.places.length}개 장소
                </span>
                <span>{route.createdAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-toss-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {route.likes}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewRoute(route)}
                    size="sm"
                    variant="outline"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    보기
                  </Button>
                  <Button
                    onClick={() => handleShareRoute(route)}
                    size="sm"
                    variant="ghost"
                  >
                    <Share className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12 text-toss-gray-500">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">선택한 조건에 맞는 루트가 없습니다</p>
            <p>다른 필터 조건을 선택해보세요!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
