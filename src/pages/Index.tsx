import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import UrlInput from '@/components/UrlInput';
import PlacesList from '@/components/PlacesList';
import MapComponent from '@/components/MapComponent';
import RouteActions from '@/components/RouteActions';
import SavedRoutes from '@/components/SavedRoutes';
import { Place, TravelRoute } from '@/types';
import { getMockPlaces } from '@/utils/mockData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<TravelRoute | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedRoutes, setSavedRoutes] = useLocalStorage<TravelRoute[]>('travel-routes', []);
  const [showSavedRoutes, setShowSavedRoutes] = useState(false);
  const { toast } = useToast();

  // Handle loaded route from navigation state
  useEffect(() => {
    if (location.state?.loadedRoute) {
      setCurrentRoute(location.state.loadedRoute);
      setShowSavedRoutes(false);
      // Clear the state to prevent re-loading on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handle shared route from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedRoute = urlParams.get('shared');
    
    if (sharedRoute) {
      try {
        const route = JSON.parse(decodeURIComponent(sharedRoute));
        setCurrentRoute(route);
        // URL에서 shared 파라미터 제거
        window.history.replaceState({}, document.title, window.location.pathname);
        toast({
          title: "공유된 루트를 불러왔습니다",
          description: `"${route.title}" 루트를 확인해보세요!`,
        });
      } catch (error) {
        console.error('Failed to parse shared route:', error);
      }
    }
  }, [toast]);

  const handleUrlSubmit = async (url: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const places = getMockPlaces(url);
      const newRoute: TravelRoute = {
        id: `route-${Date.now()}`,
        title: getRouteTitle(url),
        videoUrl: url,
        places,
        createdAt: new Date().toISOString().split('T')[0],
        isPublic: false,
        likes: 0
      };
      
      setCurrentRoute(newRoute);
      setShowSavedRoutes(false);
      
      toast({
        title: "장소 추출 완료!",
        description: `${places.length}개의 장소를 발견했습니다.`,
      });
    } catch (error) {
      toast({
        title: "오류가 발생했습니다",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRouteTitle = (url: string): string => {
    if (url.includes('jeju') || url.includes('제주')) return '제주도 힐링 여행';
    if (url.includes('busan') || url.includes('부산')) return '부산 바다 여행';
    return '서울 도심 투어';
  };

  const handlePlaceEdit = (places: Place[]) => {
    if (currentRoute) {
      setCurrentRoute({ ...currentRoute, places });
    }
  };

  const handleAddPlace = () => {
    console.log('handleAddPlace called - this should be handled by AddPlaceDialog');
  };

  const handleDeletePlace = (placeId: string) => {
    if (currentRoute) {
      const updatedPlaces = currentRoute.places.filter(place => place.id !== placeId);
      handlePlaceEdit(updatedPlaces);
    }
  };

  const handleSaveRoute = (title: string) => {
    if (!currentRoute) return;
    
    const routeToSave = { ...currentRoute, title };
    const existingIndex = savedRoutes.findIndex(route => route.id === routeToSave.id);
    
    if (existingIndex >= 0) {
      const updatedRoutes = [...savedRoutes];
      updatedRoutes[existingIndex] = routeToSave;
      setSavedRoutes(updatedRoutes);
    } else {
      setSavedRoutes([routeToSave, ...savedRoutes]);
    }
    
    setCurrentRoute(routeToSave);
  };

  const handleShareRoute = () => {
    if (!currentRoute) return;
    
    const shareUrl = `${window.location.origin}?route=${encodeURIComponent(JSON.stringify(currentRoute))}`;
    console.log('Share URL:', shareUrl);
  };

  const handleLoadRoute = (route: TravelRoute) => {
    setCurrentRoute(route);
    setShowSavedRoutes(false);
  };

  return (
    <div className="min-h-screen bg-toss-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentRoute && !showSavedRoutes ? (
          <div className="space-y-8">
            <UrlInput onSubmit={handleUrlSubmit} loading={loading} />
            
            <div className="text-center">
              <button
                onClick={() => setShowSavedRoutes(true)}
                className="text-toss-blue hover:text-toss-blue/80 font-medium"
              >
                저장된 루트 보기 ({savedRoutes.length})
              </button>
            </div>
          </div>
        ) : showSavedRoutes ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSavedRoutes(false)}
                className="text-toss-blue hover:text-toss-blue/80 font-medium"
              >
                ← 돌아가기
              </button>
            </div>
            <SavedRoutes routes={savedRoutes} onLoadRoute={handleLoadRoute} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentRoute(null)}
                className="text-toss-blue hover:text-toss-blue/80 font-medium"
              >
                ← 새로운 루트 만들기
              </button>
              <button
                onClick={() => setShowSavedRoutes(true)}
                className="text-toss-blue hover:text-toss-blue/80 font-medium"
              >
                저장된 루트 보기
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <PlacesList
                  places={currentRoute.places}
                  onPlaceEdit={handlePlaceEdit}
                  onAddPlace={handleAddPlace}
                  onDeletePlace={handleDeletePlace}
                />
                <RouteActions
                  route={currentRoute}
                  onSave={handleSaveRoute}
                  onShare={handleShareRoute}
                />
              </div>
              
              <div>
                <MapComponent places={currentRoute.places} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
