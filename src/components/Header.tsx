
import React from 'react';
import { Map } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-toss-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-toss-blue rounded-lg flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-toss-navy">여행로그</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-toss-gray-700 hover:text-toss-blue font-medium">홈</a>
            <a href="#routes" className="text-toss-gray-700 hover:text-toss-blue font-medium">내 루트</a>
            <a href="#explore" className="text-toss-gray-700 hover:text-toss-blue font-medium">탐색</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
