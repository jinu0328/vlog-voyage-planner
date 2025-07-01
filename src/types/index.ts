
export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
  description?: string;
}

export interface TravelRoute {
  id: string;
  title: string;
  videoUrl: string;
  places: Place[];
  createdAt: string;
  isPublic: boolean;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  type: 'record' | 'edit' | 'share';
}
