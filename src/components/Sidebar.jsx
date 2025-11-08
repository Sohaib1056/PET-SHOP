import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`h-screen fixed left-0 top-0 flex flex-col shadow-2xl bg-gradient-to-b from-hospital-primary via-hospital-primary to-hospital-dark transition-all duration-300 z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Empty Header Space - Height matches header */}
      <div className="h-20 border-b border-white border-opacity-10"></div>

      {/* Menu Items */}
      <nav className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-3 px-6'} py-3.5 mx-3 my-1 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                active
                  ? 'bg-white bg-opacity-20 text-white font-semibold shadow-lg backdrop-blur-sm'
                  : 'text-white text-opacity-85 hover:bg-white hover:bg-opacity-10 hover:text-white'
              }`}
            >
              {active && !isCollapsed && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
              )}
              {active && isCollapsed && (
                <div className="absolute inset-0 bg-white bg-opacity-10 rounded-xl"></div>
              )}
              <Icon className={`h-5 w-5 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'} relative z-10`} />
              {!isCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {active && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section with enhanced styling */}
      <div className="p-6 border-t border-white border-opacity-10 backdrop-blur-sm">
        <button 
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
          className={`flex items-center justify-center ${!isCollapsed && 'space-x-3'} text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 w-full py-3 rounded-xl font-medium hover:shadow-lg group`}
        >
          <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
