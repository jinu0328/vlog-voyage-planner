
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Place } from '@/types';
import { MapPin, Navigation } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapComponentProps {
  places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!window.kakao || !mapContainer.current) return;

    // 카카오 지도 초기화
    const center = places.length > 0 
      ? { lat: places[0].latitude, lng: places[0].longitude }
      : { lat: 37.5665, lng: 126.9780 }; // 서울 기본 좌표

    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: places.length > 1 ? 8 : 5
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);
    mapInstance.current = map;

    // 마커와 정보창 추가
    places.forEach((place, index) => {
      const markerPosition = new window.kakao.maps.LatLng(place.latitude, place.longitude);
      
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map
      });

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px; font-size:12px; color:#333;">
          <strong>${index + 1}. ${place.name}</strong><br/>
          ${place.address}
        </div>`
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
      });
    });

    // 지도 범위 조정
    if (places.length > 1) {
      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach(place => {
        bounds.extend(new window.kakao.maps.LatLng(place.latitude, place.longitude));
      });
      map.setBounds(bounds);
    }

  }, [places]);

  return (
    <Card className="toss-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-toss-navy">지도</h3>
        <div className="flex items-center gap-2 text-sm text-toss-gray-600">
          <Navigation className="w-4 h-4" />
          {places.length}개 장소
        </div>
      </div>

      <div 
        ref={mapContainer}
        className="w-full h-96 rounded-lg border border-toss-gray-200"
        style={{ height: '400px' }}
      >
        {places.length === 0 && (
          <div className="flex items-center justify-center h-full bg-toss-gray-50">
            <div className="text-center text-toss-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>장소를 추가하면 지도에 표시됩니다</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapComponent;
