
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (open && window.kakao && mapContainer.current) {
      // 지도 초기화
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      mapInstance.current = map;
    }
  }, [open]);

  const handleSearch = () => {
    if (!searchTerm.trim() || !window.kakao) return;

    setLoading(true);
    
    // 장소 검색 객체 생성
    const ps = new window.kakao.maps.services.Places();
    
    ps.keywordSearch(searchTerm, (data: any[], status: any) => {
      setLoading(false);
      
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data.slice(0, 5)); // 최대 5개 결과만 표시
        
        // 첫 번째 결과로 지도 중심 이동
        if (data.length > 0 && mapInstance.current) {
          const coords = new window.kakao.maps.LatLng(data[0].y, data[0].x);
          mapInstance.current.setCenter(coords);
          
          // 마커 표시
          const marker = new window.kakao.maps.Marker({
            position: coords,
            map: mapInstance.current
          });
        }
      } else {
        setSearchResults([]);
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

    onAddPlace(newPlace);
    onOpenChange(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>장소 추가</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="장소명이나 주소를 입력하세요"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading || !searchTerm.trim()}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          <div 
            ref={mapContainer}
            className="w-full h-64 rounded-lg border border-gray-200"
          />

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">검색 결과</h4>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaceDialog;
