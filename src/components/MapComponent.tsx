
import React from 'react';
import { Card } from '@/components/ui/card';
import { Place } from '@/types';
import { MapPin, Navigation } from 'lucide-react';

interface MapComponentProps {
  places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  // Calculate center point of all places
  const getMapCenter = () => {
    if (places.length === 0) return { lat: 37.5665, lng: 126.9780 }; // Seoul default
    
    const avgLat = places.reduce((sum, place) => sum + place.latitude, 0) / places.length;
    const avgLng = places.reduce((sum, place) => sum + place.longitude, 0) / places.length;
    
    return { lat: avgLat, lng: avgLng };
  };

  const center = getMapCenter();

  return (
    <Card className="toss-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-toss-navy">지도</h3>
        <div className="flex items-center gap-2 text-sm text-toss-gray-600">
          <Navigation className="w-4 h-4" />
          {places.length}개 장소
        </div>
      </div>

      <div className="relative bg-toss-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        {/* Mock Map Interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Mock Map Grid */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="border-b border-toss-gray-300" style={{ height: '20px' }} />
            ))}
          </div>
          
          {/* Mock Places Markers */}
          {places.map((place, index) => {
            // Mock positioning based on place coordinates (simplified)
            const x = Math.min(Math.max((place.longitude - center.lng + 0.1) * 2000 + 200, 20), 380);
            const y = Math.min(Math.max(-(place.latitude - center.lat - 0.05) * 2000 + 200, 20), 360);
            
            return (
              <div
                key={place.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-toss-blue text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-lg border-2 border-white">
                    {index + 1}
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-toss-navy text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {place.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-toss-navy"></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mock Route Lines */}
          {places.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {places.slice(0, -1).map((place, index) => {
                const nextPlace = places[index + 1];
                const x1 = Math.min(Math.max((place.longitude - center.lng + 0.1) * 2000 + 200, 20), 380);
                const y1 = Math.min(Math.max(-(place.latitude - center.lat - 0.05) * 2000 + 200, 20), 360);
                const x2 = Math.min(Math.max((nextPlace.longitude - center.lng + 0.1) * 2000 + 200, 20), 380);
                const y2 = Math.min(Math.max(-(nextPlace.latitude - center.lat - 0.05) * 2000 + 200, 20), 360);
                
                return (
                  <line
                    key={`line-${index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#0064FF"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    opacity="0.7"
                  />
                );
              })}
            </svg>
          )}
        </div>

        {places.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-toss-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>장소를 추가하면 지도에 표시됩니다</p>
            </div>
          </div>
        )}

        {/* Mock Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded border shadow hover:bg-toss-gray-50 flex items-center justify-center text-lg font-bold">
            +
          </button>
          <button className="w-8 h-8 bg-white rounded border shadow hover:bg-toss-gray-50 flex items-center justify-center text-lg font-bold">
            -
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MapComponent;
