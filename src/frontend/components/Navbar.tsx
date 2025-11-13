
import { Sun, Moon } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
}

export default function Navbar({ isDark, setIsDark, activePage, setActivePage }: NavbarProps) {
  return (
    <nav className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-blue-800'} shadow-lg sticky top-0 z-50`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => setActivePage('buy')}
              className="text-white font-bold text-2xl hover:text-blue-200 transition"
            >
              CarMarket
            </button>
          </div>

          {/* Centro - Welcome Text */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-bold text-white">
              Welcome to CarMarketPlace
            </h1>
          </div>

          {/* Derecha - Opciones y Theme Toggle */}
          <div className="flex items-center gap-6">
            
            {/* Opciones de navegación */}
            <div className="flex gap-4">
              <button
                onClick={() => setActivePage('buy')}
                className={`px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                  activePage === 'buy'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-blue-600 shadow-lg'
                    : isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
              >
                 Buy
              </button>
              <button
                onClick={() => setActivePage('sell')}
                className={`px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                  activePage === 'sell'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-blue-600 shadow-lg'
                    : isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
              >
                 Sell
              </button>
              <button
                onClick={() => setActivePage('favorites')}
                className={`px-6 py-2 rounded-lg font-semibold transition transform hover:scale-105 ${
                  activePage === 'favorites'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-blue-600 shadow-lg'
                    : isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
              >
                 Favorites
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition transform hover:scale-110 ${
                isDark 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
                  : 'bg-gray-800 hover:bg-gray-900 text-yellow-400'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? (
                <Sun size={24} />
              ) : (
                <Moon size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}