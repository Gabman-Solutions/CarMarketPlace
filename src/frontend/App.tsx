import { useState } from 'react';
import Navbar from './components/Navbar';
import BuyComponent from './components/BuyComponent';
import SellComponet from './components/SellComponet';
import Favorites from './components/Favorites/Favorites';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activePage, setActivePage] = useState('buy');

  const renderPage = () => {
    switch(activePage) {
      case 'buy':
        return <BuyComponent isDark={isDark} />;
      case 'sell':
        return <SellComponet isDark={isDark} />;
      case 'favorites':
        return <Favorites isDark={isDark} />;
      default:
        return <BuyComponent isDark={isDark} />;
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <main className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} min-h-screen w-full transition-colors duration-300`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;


