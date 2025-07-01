
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Place } from '@/types';
import { MapPin, Search } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface AddPlaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlace: (place: Place) => void;
}

const AddPlaceDialog: React.FC<AddPlaceDialogProps> = ({ open, onOpenChange, onAddPlace }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (open) {
      // 카카오 맵 API 로드 확인
      const checkKakaoMap = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            setMapLoaded(true);
            initializeMap();
          });
        } else {
          // 카카오 맵이 로드되지 않았으면 잠시 후 재시도
          setTimeout(checkKakaoMap, 100);
        }
      };
      
      checkKakaoMap();
    }
  }, [open]);

  const initializeMap = () => {
    if (mapContainer.current && window.kakao && window.kakao.maps) {
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      mapInstance.current = map;
    }
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert('카카오 맵 API가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setLoading(true);
    console.log('장소 검색 시작:', searchTerm);
    
    // 기존 마커들 제거
    clearMarkers();
    
    // 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places();
    
    ps.keywordSearch(searchTerm, (data: any[], status: any) => {
      console.log('검색 결과:', { data, status });
      setLoading(false);
      
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data.slice(0, 5)); // 최대 5개 결과만 표시
        
        // 첫 번째 결과로 지도 중심 이동
        if (data.length > 0 && mapInstance.current) {
          const coords = new window.kakao.maps.LatLng(data[0].y, data[0].x);
          mapInstance.current.setCenter(coords);
          
          // 검색 결과에 마커 표시
          data.slice(0, 5).forEach((place, index) => {
            const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: mapInstance.current
            });
            
            // 마커 배열에 추가
            markersRef.current.push(marker);
            
            // 정보창 생성
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px; font-size:12px; color:#333;">
                <strong>${place.place_name}</strong><br/>
                ${place.address_name || place.road_address_name}
              </div>`
            });

            // 마커 클릭 이벤트
            window.kakao.maps.event.addListener(marker, 'click', function() {
              infoWindow.open(mapInstance.current, marker);
            });
          });
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setSearchResults([]);
        alert('검색 결과가 없습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        setSearchResults([]);
        alert('검색 중 오류가 발생했습니다.');
      }
    });
  };

  const handleSelectPlace = (result: any) => {
    const newPlace: Place = {
      id: `place-${Date.now()}`,
      name: result.place_name,
      address: result.address_name || result.road_address_name,
      latitude: parseFloat(result.y),
      longitude: parseFloat(result.x),
      category: result.category_group_name || '기타'
    };

    console.log('선택된 장소:', newPlace);
    onAddPlace(newPlace);
    onOpenChange(false);
    
    // 상태 초기화
    setSearchTerm('');
    setSearchResults([]);
    clearMarkers();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>장소 추가</DialogTitle>
          <DialogDescription>
            카카오맵에서 장소를 검색하여 추가할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="장소명이나 주소를 입력하세요 (예: 강남역, 홍대입구)"
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading || !searchTerm.trim() || !mapLoaded}
            >
              {loading ? '검색중...' : <Search className="w-4 h-4" />}
            </Button>
          </div>

          {!mapLoaded && (
            <div className="text-center py-4 text-sm text-gray-500">
              카카오 맵을 로드하는 중...
            </div>
          )}

          <div 
            ref={mapContainer}
            className="w-full h-64 rounded-lg border border-gray-200 bg-gray-100"
          />

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">검색 결과 ({searchResults.length}개)</h4>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:border-toss-blue cursor-pointer transition-colors"
                  onClick={() => handleSelectPlace(result)}
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-toss-blue mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm">{result.place_name}</h5>
                      <p className="text-xs text-gray-600 truncate">
                        {result.address_name || result.road_address_name}
                      </p>
                      {result.category_group_name && (
                        <span className="inline-block px-2 py-1 text-xs bg-toss-blue/10 text-toss-blue rounded-md mt-1">
                          {result.category_group_name}
                        </span>
                      )}
                      {result.phone && (
                        <p className="text-xs text-gray-500 mt-1">{result.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchResults.length === 0 && searchTerm && !loading && (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">검색 결과가 없습니다.</p>
              <p className="text-xs">다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaceDialog;
