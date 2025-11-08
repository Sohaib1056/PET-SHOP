import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  LogOut,
  X,
  Store,
  PawPrint,
  CreditCard,
  Boxes,
  Users,
  TruckIcon,
  FileText,
} from 'lucide-react';

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { path: '/pos', icon: CreditCard, label: 'Point of Sale', id: 'pos' },
    { path: '/shop', icon: Store, label: 'Shop', id: 'shop' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders', id: 'orders' },
    { path: '/inventory', icon: Boxes, label: 'Inventory', id: 'inventory' },
    { path: '/suppliers', icon: TruckIcon, label: 'Suppliers', id: 'suppliers' },
    { path: '/customers', icon: Users, label: 'Customers', id: 'customers' },
    { path: '/reports', icon: FileText, label: 'Reports', id: 'reports' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="w-64 bg-hospital-primary h-screen fixed left-0 top-0 z-50 flex flex-col shadow-xl lg:hidden transform transition-transform">
        {/* Header */}
        <div className="p-6 border-b border-white border-opacity-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2">
              <PawPrint className="h-6 w-6 text-hospital-primary" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg">Pet Shop</h1>
              <p className="text-xs opacity-80">Hospital Module</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-6 py-3 transition-all ${
                  active
                    ? 'bg-white bg-opacity-20 border-l-4 border-white text-white font-semibold'
                    : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10 border-l-4 border-transparent'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-white border-opacity-20">
          <button className="flex items-center space-x-3 text-white text-opacity-80 hover:text-white transition w-full">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
