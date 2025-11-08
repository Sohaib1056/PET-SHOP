import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency, getDiscountedPrice } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    // Optional: Show toast notification
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
              <Tag className="h-3 w-3" />
              <span>{product.discount}% OFF</span>
            </div>
          )}

          {/* Out of Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-hospital-primary uppercase font-semibold mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div>
              {product.discount ? (
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-800">
                    {formatCurrency(discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-full transition ${
                product.stock === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-hospital-primary hover:bg-hospital-dark text-white'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
