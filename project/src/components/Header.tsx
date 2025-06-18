import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User, LogOut, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, logout } = useApp();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DealerReviews</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {state.user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {state.user.username}
                  </span>
                </div>
                {state.user.isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {state.user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Logged in as: <span className="font-medium">{state.user.username}</span>
                  </div>
                  {state.user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-md text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}