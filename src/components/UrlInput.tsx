
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onSubmit(sampleUrl);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="toss-card p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-toss-navy mb-4">
            유튜브 브이로그에서 여행지 추출하기
          </h2>
          <p className="text-toss-gray-600 text-lg">
            여행 브이로그 URL을 입력하면 영상 속 장소들을 자동으로 찾아드려요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="toss-input flex-1"
              disabled={loading}
            />
            <Button 
              type="submit" 
              className="toss-button whitespace-nowrap"
              disabled={loading || !url.trim()}
            >
              {loading ? '분석 중...' : '장소 추출'}
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-toss-gray-700 mb-3">
            샘플 링크로 체험해보세요
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: '제주도 힐링 여행', url: 'https://youtube.com/jeju-healing' },
              { title: '부산 바다 여행', url: 'https://youtube.com/busan-sea' },
              { title: '서울 도심 투어', url: 'https://youtube.com/seoul-city' }
            ].map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample.url)}
                className="p-3 text-left border border-toss-gray-300 rounded-lg hover:border-toss-blue hover:bg-toss-blue/5 transition-colors"
                disabled={loading}
              >
                <div className="text-sm font-medium text-toss-gray-800">
                  {sample.title}
                </div>
                <div className="text-xs text-toss-gray-500 mt-1 truncate">
                  {sample.url}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UrlInput;
