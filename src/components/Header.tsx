import React from 'react';
import { CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 bg-white dark:bg-gray-800 shadow-sm mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <CheckSquare size={24} className="text-blue-500 mr-2" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">TodoStreak</h1>
        </div>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;