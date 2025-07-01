
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TravelRoute } from '@/types';
import { MapPin, Heart, Share, Eye } from 'lucide-react';

interface SavedRoutesProps {
  routes: TravelRoute[];
  onLoadRoute: (route: TravelRoute) => void;
}

const SavedRoutes: React.FC<SavedRoutesProps> = ({ routes, onLoadRoute }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="toss-card p-6">
        <h2 className="text-2xl font-bold text-toss-navy mb-6">저장된 루트</h2>
        
        {routes.length === 0 ? (
          <div className="text-center py-12 text-toss-gray-500">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">저장된 루트가 없습니다</p>
            <p>유튜브 브이로그에서 여행지를 추출하고 나만의 루트를 만들어보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <div key={route.id} className="p-4 border border-toss-gray-200 rounded-lg hover:border-toss-blue transition-colors">
                <div className="mb-3">
                  <h3 className="font-semibold text-toss-gray-900 mb-1">{route.title}</h3>
                  <p className="text-sm text-toss-gray-600 truncate">{route.videoUrl}</p>
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
                  
                  <Button
                    onClick={() => onLoadRoute(route)}
                    size="sm"
                    variant="outline"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    보기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default SavedRoutes;
