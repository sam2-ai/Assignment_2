import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getHealth } from '../services/backend';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">D</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                Document<span className="text-primary-600">Optimizer</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-primary-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-primary-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Log In
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Sign Up
            </Link>
            {/* backend health badge */}
            <div className="ml-4 flex items-center">
              <HealthBadge />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            >
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-primary-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-primary-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-primary-50 transition-all duration-200" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
            <Link to="/signup" className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md block text-center" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

function HealthBadge() {
  const [status, setStatus] = useState({ server: 'unknown', db: 'unknown' });

  useEffect(() => {
    let mounted = true;

    const fetchStatus = () => {
      getHealth()
        .then((s) => {
          if (mounted) setStatus(s);
        })
        .catch(() => {
          if (mounted) setStatus({ server: 'down', db: 'disconnected' });
        });
    };

    fetchStatus();
    const id = setInterval(fetchStatus, 15000); // refresh every 15s
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const dbOk = status.db === 'connected';

  return (
    <div className="flex items-center text-sm text-gray-700">
      <span className={`inline-block h-2 w-2 rounded-full mr-2 ${dbOk ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="hidden sm:inline">DB: {status.db}</span>
    </div>
  );
}

export default Navbar;