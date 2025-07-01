
import React from 'react';
import Header from '@/components/Header';
import SavedRoutes from '@/components/SavedRoutes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TravelRoute } from '@/types';
import { useNavigate } from 'react-router-dom';

const Routes = () => {
  const [savedRoutes] = useLocalStorage<TravelRoute[]>('travel-routes', []);
  const navigate = useNavigate();

  const handleLoadRoute = (route: TravelRoute) => {
    // Navigate to home with the route data
    navigate('/', { state: { loadedRoute: route } });
  };

  return (
    <div className="min-h-screen bg-toss-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SavedRoutes routes={savedRoutes} onLoadRoute={handleLoadRoute} />
      </main>
    </div>
  );
};

export default Routes;
