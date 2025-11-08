import React, { useState } from 'react';
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import { products as initialProducts, categories } from '../data/products';
import { formatCurrency } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const Admin = () => {
  const { orders } = useCart();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateStock = (productId, newStock) => {
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your pet shop inventory and orders</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-b-2 border-pet-blue text-pet-blue'
                  : 'text-gray-600 hover:text-pet-blue'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-b-2 border-pet-blue text-pet-blue'
                  : 'text-gray-600 hover:text-pet-blue'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 font-semibold whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-b-2 border-pet-blue text-pet-blue'
                  : 'text-gray-600 hover:text-pet-blue'
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">Total Orders</h3>
                <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">Total Products</h3>
                <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">Low Stock Items</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {lowStockProducts}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Total
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">
                            {order.id}
                          </td>
                          <td className="py-3 px-4">{order.fullName}</td>
                          <td className="py-3 px-4 font-semibold">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No orders yet</p>
              )}
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts > 0 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  ⚠️ Low Stock Alert
                </h3>
                <p className="text-red-700">
                  {lowStockProducts} product{lowStockProducts > 1 ? 's' : ''} running
                  low on stock. Please restock soon.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pet-blue"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 bg-pet-blue text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Product
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Stock
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Rating
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-pet-blue bg-opacity-20 text-pet-blue px-3 py-1 rounded-full text-sm font-semibold">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={product.stock}
                              onChange={(e) =>
                                handleUpdateStock(
                                  product.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className={`w-20 px-2 py-1 border rounded text-center ${
                                product.stock < 10
                                  ? 'border-red-500 text-red-600'
                                  : 'border-gray-300'
                              }`}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="flex items-center space-x-1">
                            <span className="font-semibold">{product.rating}</span>
                            <span className="text-yellow-400">★</span>
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Order ID
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Items
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Payment
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4 font-mono text-sm">{order.id}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold">{order.fullName}</p>
                            <p className="text-sm text-gray-600">{order.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">{order.items.length} items</td>
                        <td className="py-4 px-4 font-semibold">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="capitalize">{order.paymentMethod}</span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              // In a real app, this would update the order status
                              console.log('Update status:', e.target.value);
                            }}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-pet-blue"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No orders yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
