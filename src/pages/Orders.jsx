import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, formatDate } from '../utils/helpers';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useCart();
  const [highlightedOrderId, setHighlightedOrderId] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      setHighlightedOrderId(orderId);
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightedOrderId(null), 3000);
    }
  }, [searchParams]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <Link
            to="/shop"
            className="inline-block bg-pet-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Success Message for New Orders */}
        {highlightedOrderId && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6 flex items-center space-x-4">
            <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-1">
                Order Placed Successfully! 🎉
              </h3>
              <p className="text-green-700">
                Your order <span className="font-mono font-semibold">{highlightedOrderId}</span> has been confirmed.
              </p>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
                order.id === highlightedOrderId ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="text-lg font-mono font-bold text-gray-800">
                      {order.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                  <div>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-semibold">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}`}
                      className="flex gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-semibold text-gray-800 hover:text-pet-blue"
                        >
                          {item.name}
                        </Link>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-pet-blue flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">
                      Delivery Address
                    </p>
                    <p className="text-gray-700">{order.fullName}</p>
                    <p className="text-gray-700">{order.address}</p>
                    <p className="text-gray-700">
                      {order.city}, {order.state} {order.zipCode}
                    </p>
                    <p className="text-gray-700 mt-2">
                      Phone: {order.phone}
                    </p>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === 'Pending' ||
                          order.status === 'Shipped' ||
                          order.status === 'Delivered'
                            ? 'bg-pet-blue text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        Order<br />Placed
                      </p>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 mx-2">
                      <div
                        className={`h-full ${
                          order.status === 'Shipped' || order.status === 'Delivered'
                            ? 'bg-pet-blue'
                            : 'bg-gray-300'
                        }`}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === 'Shipped' || order.status === 'Delivered'
                            ? 'bg-pet-blue text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        <Truck className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        Shipped
                      </p>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 mx-2">
                      <div
                        className={`h-full ${
                          order.status === 'Delivered' ? 'bg-pet-blue' : 'bg-gray-300'
                        }`}
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          order.status === 'Delivered'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
