
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-toss-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-toss-blue rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <Link to="/" className="text-xl font-bold text-toss-navy hover:text-toss-blue transition-colors">
              여행로그
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-toss-blue' : 'text-toss-gray-700 hover:text-toss-blue'
              }`}
            >
              홈
            </Link>
            <Link 
              to="/routes" 
              className={`font-medium transition-colors ${
                isActive('/routes') ? 'text-toss-blue' : 'text-toss-gray-700 hover:text-toss-blue'
              }`}
            >
              내 루트
            </Link>
            <Link 
              to="/explore" 
              className={`font-medium transition-colors ${
                isActive('/explore') ? 'text-toss-blue' : 'text-toss-gray-700 hover:text-toss-blue'
              }`}
            >
              탐색
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-toss-gray-600" />
                  <span className="text-sm text-toss-gray-700">{user?.name}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
