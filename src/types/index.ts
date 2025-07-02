
export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
  description?: string;
  videoTimestamp?: string; // 영상에서 등장한 시간 (예: "00:03:12")
  distanceToNext?: number; // 다음 장소까지의 거리 (km)
  travelTime?: number; // 다음 장소까지 이동 시간 (분)
}

export interface TravelRoute {
  id: string;
  title: string;
  videoUrl: string;
  places: Place[];
  createdAt: string;
  isPublic: boolean;
  likes: number;
  theme?: string; // 테마 (힐링, 액티비티, 문화 등)
  season?: string; // 계절 (봄, 여름, 가을, 겨울)
  ageGroup?: string; // 연령대 (20대, 30대, 가족 등)
}

export interface User {
  id: string;
  name: string;
  type: 'record' | 'edit' | 'share';
}
