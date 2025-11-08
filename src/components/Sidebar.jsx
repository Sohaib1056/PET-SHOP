import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ClipboardList,
  Settings,
  LogOut,
  CreditCard,
  Boxes,
  Users,
  TruckIcon,
  FileText,
  Store,
  BarChart3,
  PawPrint,
} from 'lucide-react';

const Sidebar = () => {
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

  return (
    <div className="w-64 h-screen fixed left-0 top-0 flex flex-col shadow-2xl bg-gradient-to-b from-hospital-primary via-hospital-primary to-hospital-dark">
      {/* Logo Section with enhanced design */}
      <div className="p-6 border-b border-white border-opacity-10 backdrop-blur-sm">
        <div className="flex items-center space-x-3 animate-fadeIn">
          <div className="bg-white rounded-xl p-2.5 shadow-lg hover-scale">
            <PawPrint className="h-7 w-7 text-hospital-primary" />
          </div>
          <div className="text-white">
            <h1 className="font-bold text-xl tracking-tight">Pet Shop</h1>
            <p className="text-xs opacity-90 font-medium">Management System</p>
          </div>
        </div>
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
              className={`flex items-center space-x-3 px-6 py-3.5 mx-3 my-1 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                active
                  ? 'bg-white bg-opacity-20 text-white font-semibold shadow-lg backdrop-blur-sm'
                  : 'text-white text-opacity-85 hover:bg-white hover:bg-opacity-10 hover:text-white'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
              )}
              <Icon className={`h-5 w-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-medium">{item.label}</span>
              {active && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section with enhanced styling */}
      <div className="p-6 border-t border-white border-opacity-10 backdrop-blur-sm">
        <button className="flex items-center justify-center space-x-3 text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 w-full py-3 rounded-xl font-medium hover:shadow-lg group">
          <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
