import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bell, Menu, X, LogOut, Settings, UserCircle, PanelLeftClose, PanelLeft, PawPrint } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ onMenuToggle, isMobileMenuOpen, isSidebarCollapsed = false, onSidebarToggle }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white backdrop-blur-lg border-b border-gray-200 h-20 fixed top-0 left-0 right-0 z-40 shadow-lg transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Left Section - Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {/* Logo with Sidebar Toggle Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-hospital-primary via-teal-500 to-teal-600 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Sidebar Toggle Icon */}
            <button
              onClick={onSidebarToggle}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? (
                <PanelLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <PanelLeftClose className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-white/40"></div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white rounded-xl p-2 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <PawPrint className="h-7 w-7 text-hospital-primary" />
              </div>
              {!isSidebarCollapsed && (
                <div className="text-white">
                  <h1 className="font-bold text-lg leading-tight tracking-tight">Pet Shop</h1>
                  <p className="text-xs opacity-90 font-medium leading-tight">Management System</p>
                </div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-hospital-primary to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7 text-white" />
            ) : (
              <Menu className="h-7 w-7 text-white" />
            )}
          </button>
        </div>

        {/* Right Section - Enhanced */}
        <div className="flex items-center space-x-2 ml-4">
          {/* Notifications with Badge */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl hover:bg-hospital-light transition-all duration-300 group hover:scale-105"
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-hospital-primary transition-colors duration-300" />
              <span className="absolute top-1.5 right-1.5 bg-gradient-to-r from-orange-400 to-red-500 h-2.5 w-2.5 rounded-full animate-pulse-slow shadow-lg"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {/* Notification Items */}
                  <div className="px-4 py-3 hover:bg-hospital-light transition-colors duration-200 border-b border-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">New Order Received</p>
                        <p className="text-xs text-gray-600 mt-0.5">Order #12345 has been placed</p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 hover:bg-hospital-light transition-colors duration-200 border-b border-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Bell className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">Low Stock Alert</p>
                        <p className="text-xs text-gray-600 mt-0.5">5 products are running low on stock</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 hover:bg-hospital-light transition-colors duration-200 border-b border-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">New Customer</p>
                        <p className="text-xs text-gray-600 mt-0.5">John Doe registered as a new customer</p>
                        <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-100">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-sm text-hospital-primary hover:text-hospital-dark font-semibold w-full text-center transition-colors duration-200"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart with Enhanced Badge */}
          <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-hospital-light transition-all duration-300 group hover:scale-105">
            <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-hospital-primary transition-colors duration-300" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-hospital-primary to-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-scaleIn">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* User Profile - Enhanced with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 pl-4 ml-2 border-l border-gray-200 hover:bg-hospital-light rounded-xl px-3 py-1.5 transition-all duration-300 group"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full border-2 border-hospital-primary shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-800 group-hover:text-hospital-primary transition-colors duration-300">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 font-medium capitalize">{user?.role}</p>
              </div>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-hospital-light text-hospital-dark text-xs font-semibold rounded-full">
                    {user?.role}
                  </span>
                </div>
                
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-hospital-light transition-colors duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  <UserCircle className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">My Profile</span>
                </Link>
                
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-hospital-light transition-colors duration-200"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Settings</span>
                </Link>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2.5 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
