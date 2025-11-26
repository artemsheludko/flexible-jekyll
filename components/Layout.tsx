
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const Layout: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Check auth status
    setIsAdmin(authService.isAdmin());
  }, [location]); // Re-check on navigation

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const handleLogout = (e: React.MouseEvent) => {
      e.preventDefault();
      authService.logout();
      setIsAdmin(false);
      navigate('/');
  };

  const isEditor = location.pathname.startsWith('/editor');

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-200 border-b ${
        isDark ? 'bg-dark-bg/90 border-dark-border' : 'bg-white/90 border-light-border shadow-sm'
      }`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black transition-colors">
                  <span className="material-symbols-outlined text-[20px] leading-none">terminal</span>
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">Namojo.</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">About</Link>
                {isAdmin && (
                    <Link to="/editor" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors flex items-center gap-1.5 font-bold">
                    Write
                    </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-3">
               {/* Search (Visual Only) */}
               <div className="hidden md:flex items-center relative group">
                  <span className="absolute left-3 text-gray-400 material-symbols-outlined text-[18px] group-focus-within:text-primary-500 transition-colors">search</span>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-dark-card border-none focus:ring-2 focus:ring-primary-500 w-48 transition-all placeholder-gray-400"
                  />
               </div>

              <div className="h-6 w-px bg-gray-200 dark:bg-dark-border mx-1 hidden md:block"></div>

              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors text-gray-500 dark:text-gray-400"
                aria-label="Toggle Theme"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              
              <Link to="/about" className="size-9 rounded-full overflow-hidden border border-gray-200 dark:border-dark-border ml-1">
                  <img 
                    src="https://i.pravatar.cc/150?u=namojo" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer - Hide on Editor */}
      {!isEditor && (
        <footer className="border-t border-light-border dark:border-dark-border py-12 mt-12 bg-white dark:bg-dark-card">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-lg text-gray-900 dark:text-white">Namojo.</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Namojo. 
              </p>
            </div>
            <div className="flex gap-8 items-center">
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
              <span className="text-gray-300">|</span>
              {isAdmin ? (
                  <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">Logout</button>
              ) : (
                  <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Admin</Link>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
