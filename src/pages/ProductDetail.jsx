import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Truck, Shield, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useBusiness } from '../context/BusinessContext';
import { products, reviews as reviewsData } from '../data/products';
import { formatCurrency, getDiscountedPrice, getRecommendedProducts } from '../utils/helpers';
import ReviewCard from '../components/ReviewCard';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: inventoryProducts } = useBusiness();
  
  // Combine products from both sources, same as Shop page
  const allProducts = useMemo(() => [
    ...products,
    ...inventoryProducts.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.salePrice || product.purchasePrice,
      image: product.image || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500',
      description: product.description || 'No description available',
      rating: 4.5,
      reviews: 0,
      stock: product.quantity || 0,
      featured: false,
      barcode: product.barcode,
      sku: product.sku,
      brand: product.brand,
    }))
  ], [inventoryProducts]);
  
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/shop" className="text-pet-blue hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = getDiscountedPrice(product.price, product.discount);
  const productReviews = reviewsData[product.id] || [];
  const recommendedProducts = getRecommendedProducts(allProducts, product, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    // Optional: Show toast notification
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-pet-blue mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <p className="text-sm text-pet-blue uppercase font-semibold mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {product.discount ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-4xl font-bold text-gray-800">
                        {formatCurrency(discountedPrice)}
                      </span>
                      <span className="text-2xl text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {product.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-gray-800">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Package className="h-5 w-5" />
                      <span className="font-semibold">
                        {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-red-600">
                      <Package className="h-5 w-5" />
                      <span className="font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Size:
                  </label>
                  <div className="flex space-x-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 font-semibold transition ${
                          selectedSize === size
                            ? 'border-pet-blue bg-pet-blue text-white'
                            : 'border-gray-300 text-gray-700 hover:border-pet-blue'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Quantity:
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-pet-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-400 transition flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-pet-pink text-white py-3 rounded-lg font-semibold hover:bg-pink-400 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Truck className="h-5 w-5 text-pet-blue" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="h-5 w-5 text-pet-green" />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'description'
                    ? 'border-b-2 border-pet-blue text-pet-blue'
                    : 'text-gray-600'
                }`}
              >
                Description
              </button>
              {product.ingredients && (
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-6 py-4 font-semibold ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-pet-blue text-pet-blue'
                      : 'text-gray-600'
                  }`}
                >
                  Ingredients
                </button>
              )}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-semibold ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-pet-blue text-pet-blue'
                    : 'text-gray-600'
                }`}
              >
                Reviews ({productReviews.length})
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="text-gray-700 leading-relaxed">
                  {product.description}
                </div>
              )}
              {activeTab === 'ingredients' && product.ingredients && (
                <div className="text-gray-700">
                  <h3 className="font-semibold mb-2">Ingredients:</h3>
                  <p>{product.ingredients}</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  {productReviews.length > 0 ? (
                    productReviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">
                      No reviews yet. Be the first to review this product!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
