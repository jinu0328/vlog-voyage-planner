
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TravelRoute } from '@/types';
import { Save, Share, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RouteActionsProps {
  route: TravelRoute;
  onSave: (title: string) => void;
  onShare: () => void;
}

const RouteActions: React.FC<RouteActionsProps> = ({ route, onSave, onShare }) => {
  const [title, setTitle] = useState(route.title);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "제목을 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    onSave(title.trim());
    toast({
      title: "루트가 저장되었습니다",
      description: `"${title}" 루트가 성공적으로 저장되었습니다.`,
    });
  };

  const handleShare = () => {
    onShare();
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "공유 링크가 복사되었습니다",
      description: "다른 사람들과 여행 루트를 공유해보세요!",
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "좋아요를 취소했습니다" : "좋아요를 눌렀습니다",
    });
  };

  return (
    <Card className="toss-card p-6">
      <h3 className="text-xl font-bold text-toss-navy mb-6">루트 관리</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-toss-gray-700 mb-2">
            루트 제목
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="나만의 여행 루트 제목을 입력하세요"
            className="toss-input"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSave}
            className="toss-button flex-1"
            disabled={!title.trim()}
          >
            <Save className="w-4 h-4 mr-2" />
            저장하기
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1"
          >
            <Share className="w-4 h-4 mr-2" />
            공유하기
          </Button>
          
          <Button
            onClick={handleLike}
            variant="outline"
            className={`${isLiked ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {route.likes + (isLiked ? 1 : 0)}
          </Button>
        </div>

        <div className="pt-4 border-t border-toss-gray-200">
          <div className="flex items-center justify-between text-sm text-toss-gray-600">
            <span>장소 개수: {route.places.length}개</span>
            <span>생성일: {route.createdAt}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RouteActions;
