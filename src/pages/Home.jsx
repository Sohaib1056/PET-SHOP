import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users,
  Activity,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBusiness } from '../context/BusinessContext';
import { products, categories } from '../data/products';
import { formatCurrency } from '../utils/helpers';

const Home = () => {
  const { orders } = useCart();
  const { products: inventoryProducts } = useBusiness();

  // Calculate statistics - Include both old products and inventory products
  const totalProducts = products.length + inventoryProducts.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const completedOrders = orders.filter((o) => o.status === 'Delivered').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const todayRevenue = orders
    .filter((o) => {
      const orderDate = new Date(o.date).toDateString();
      const today = new Date().toDateString();
      return orderDate === today;
    })
    .reduce((sum, order) => sum + order.total, 0);

  // Combine products for display
  const allProducts = [
    ...products,
    ...inventoryProducts.map(product => ({
      id: product.id,
      name: product.name,
      stock: product.quantity || 0,
      featured: false,
    }))
  ];

  const lowStockProducts = allProducts.filter((p) => p.stock < 10);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="animate-fadeIn">
      {/* Dashboard Header - Enhanced */}
      <div className="mb-8 bg-gradient-to-r from-hospital-primary/5 to-purple-500/5 rounded-2xl p-6 backdrop-blur-sm border border-hospital-primary/10">
        <div className="flex items-center justify-between">
          <div className="animate-slideInLeft">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-hospital-primary to-teal-600 bg-clip-text text-transparent mb-2">
              Pet Shop Dashboard
            </h1>
            <p className="text-gray-600 font-medium flex items-center space-x-2">
              <Activity className="h-4 w-4 text-hospital-primary" />
              <span>Monitor your shop operations and performance in real-time</span>
            </p>
          </div>
          <Link
            to="/shop"
            className="bg-gradient-to-r from-hospital-primary to-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105 hover-lift"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Shop Portal</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards - Enhanced with animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift relative overflow-hidden group animate-scaleIn">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <Package className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold opacity-90 bg-white/10 px-3 py-1 rounded-full">TOTAL</div>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-90 mb-1">Total Products</p>
              <p className="text-4xl font-bold mb-2">{totalProducts}</p>
              <p className="text-xs opacity-80 font-medium">📦 In inventory</p>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift relative overflow-hidden group animate-scaleIn" style={{animationDelay: '0.1s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <Clock className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold opacity-90 bg-white/10 px-3 py-1 rounded-full">PENDING</div>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-90 mb-1">Pending Orders</p>
              <p className="text-4xl font-bold mb-2">{pendingOrders}</p>
              <p className="text-xs opacity-80 font-medium">⏳ Awaiting process</p>
            </div>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift relative overflow-hidden group animate-scaleIn" style={{animationDelay: '0.2s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <CheckCircle className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold opacity-90 bg-white/10 px-3 py-1 rounded-full">DONE</div>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-90 mb-1">Completed</p>
              <p className="text-4xl font-bold mb-2">{completedOrders}</p>
              <p className="text-xs opacity-80 font-medium">✅ Successfully delivered</p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift relative overflow-hidden group animate-scaleIn" style={{animationDelay: '0.3s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                <DollarSign className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold opacity-90 bg-white/10 px-3 py-1 rounded-full">REVENUE</div>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-90 mb-1">Total Revenue</p>
              <p className="text-4xl font-bold mb-2">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs opacity-80 font-medium">💰 All time earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Categories Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Quick Actions</h2>
              <p className="text-sm text-gray-600">Navigate to different sections</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className={`${category.bgColor} ${category.borderColor} border-2 rounded-xl p-5 ${category.hoverBg} hover:shadow-xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm text-center">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Quick Stats</h2>
              <p className="text-sm text-gray-600">Overview</p>
            </div>
            <Activity className="h-5 w-5 text-hospital-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2.5 rounded-lg shadow-md">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Total Stock</span>
              </div>
              <span className="font-bold text-xl text-blue-700">
                {allProducts.reduce((sum, p) => sum + (p.stock || 0), 0)}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2.5 rounded-lg shadow-md">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Low Stock</span>
              </div>
              <span className="font-bold text-xl text-orange-600">{lowStockProducts.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2.5 rounded-lg shadow-md">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-800">Total Orders</span>
              </div>
              <span className="font-bold text-xl text-green-700">{totalOrders}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Recent Orders</h2>
            <p className="text-sm text-gray-600">Latest transactions</p>
          </div>
          <Link
            to="/orders"
            className="text-hospital-primary hover:text-hospital-dark font-semibold text-sm"
          >
            View All →
          </Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Activity className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.fullName}</p>
                    <p className="text-sm text-gray-600">
                      Order #{order.id.split('-')[1]} • {order.items.length} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatCurrency(order.total)}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No orders yet</p>
            <Link
              to="/shop"
              className="text-hospital-primary hover:underline text-sm mt-2 inline-block"
            >
              Start shopping
            </Link>
          </div>
        )}
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">⚠️ Low Stock Alert</h3>
              <p className="text-gray-700 mb-4">
                {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''}{' '}
                running low on stock. Please restock soon.
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockProducts.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    {product.name} ({product.stock} left)
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/admin"
              className="bg-hospital-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-hospital-dark transition"
            >
              Manage
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
