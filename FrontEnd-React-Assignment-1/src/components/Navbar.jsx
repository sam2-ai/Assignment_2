import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Settings, Menu, X } from 'lucide-react';
import HealthBadge from './HealthBadge';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: '🏠 Home', href: '/', shortName: 'Home' },
    ...(isAuthenticated ? [{ name: '📊 Dashboard', href: '/dashboard', shortName: 'Dashboard' }] : []),
    { name: '⚙️ Services', href: '/services', shortName: 'Services' },
    { name: '👥 About', href: '/about', shortName: 'About' },
    { name: '📞 Contact', href: '/contact', shortName: 'Contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully! 👋');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
    setUserMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
                DocuFlow<span className="text-blue-600"> Pro</span>
              </span>
              <span className="ml-3 text-lg font-bold text-gray-900 sm:hidden">
                DocuFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive(item.href)
                    ? 'text-blue-700 bg-blue-50 shadow-sm border border-blue-100'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden">{item.shortName}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50 border border-transparent hover:border-blue-100"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden lg:inline">👋 Hi, {user?.firstName || user?.name || 'User'}</span>
                  <span className="lg:hidden">Menu</span>
                  <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl py-2 z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">👤 {user?.firstName || user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <span className="mr-3">📊</span>
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <span className="mr-3">⚙️</span>
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span className="mr-3">🚪</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50">
                  🔑 Log In
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                  ✨ Sign Up
                </Link>
              </>
            )}
            {/* backend health badge */}
            <div className="ml-4 flex items-center">
              <HealthBadge />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {isAuthenticated && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            >
              {!isOpen ? (
                <Menu className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-700 bg-blue-50 shadow-sm border border-blue-100'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 text-base font-medium text-gray-900 border-t border-gray-200 mt-4 pt-4 bg-gray-50 rounded-xl">
                  👋 Hi, {user?.firstName || user?.name || 'User'}!
                  <div className="text-sm text-gray-500 mt-1">{user?.email || 'user@example.com'}</div>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200" 
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">⚙️</span>
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <span className="mr-3">🚪</span>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border-t border-gray-200 mt-4 pt-4" 
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">🔑</span>
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105" 
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3">✨</span>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};



export default Navbar;