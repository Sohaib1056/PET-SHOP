import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, getDiscountedPrice } from '../utils/helpers';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
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
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-pet-blue mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemPrice = getDiscountedPrice(item.price, item.discount);
              const itemTotal = itemPrice * item.quantity;

              return (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-semibold text-gray-800 hover:text-pet-blue mb-1 block"
                      >
                        {item.name}
                      </Link>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-600 mb-2">
                          Size: {item.selectedSize}
                        </p>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-800">
                          {formatCurrency(itemPrice)}
                        </span>
                        {item.discount && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(item.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.selectedSize)
                          }
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.min(item.stock, item.quantity + 1),
                              item.selectedSize
                            )
                          }
                          className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-lg font-bold text-gray-800">
                        {formatCurrency(itemTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {formatCurrency(getCartTotal())}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {getCartTotal() >= 75 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatCurrency(9.99)
                    )}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>
                      {formatCurrency(
                        getCartTotal() + (getCartTotal() >= 75 ? 0 : 9.99)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {getCartTotal() < 75 && (
                <div className="bg-pet-blue bg-opacity-10 border border-pet-blue rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-700">
                    Add <span className="font-semibold">{formatCurrency(75 - getCartTotal())}</span> more to get{' '}
                    <span className="font-semibold text-pet-blue">FREE SHIPPING</span>!
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-pet-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-400 transition mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-pet-blue hover:underline font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
