import React, { useState, useRef, useEffect } from 'react';
import { useBusinessContext } from '../context/BusinessContext';
import {
  Search,
  Scan,
  Plus,
  Minus,
  Trash2,
  User,
  CreditCard,
  DollarSign,
  Printer,
  ShoppingCart,
  X,
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertDialog from '../components/AlertDialog';

const POS = () => {
  const {
    products,
    customers,
    searchProducts,
    getProductByBarcode,
    searchCustomers,
    addSaleTransaction,
  } = useBusinessContext();

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerResults, setCustomerResults] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [cashReceived, setCashReceived] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'error' });

  const barcodeInputRef = useRef(null);
  const receiptRef = useRef(null);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxRate = 16; // 16% tax
  const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
  const total = subtotal - discountAmount + taxAmount;
  const change = paymentMethod === 'Cash' ? Math.max(0, parseFloat(cashReceived || 0) - total) : 0;

  // Handle barcode scan
  const handleBarcodeScan = (barcode) => {
    const product = getProductByBarcode(barcode.toUpperCase());
    if (product) {
      addToCart(product);
      setSearchQuery('');
    } else {
      setAlertConfig({
        title: 'Product Not Found',
        message: `No product found with barcode: ${barcode}`,
        type: 'error'
      });
      setShowAlert(true);
    }
  };

  // Handle product search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchProducts(query);
      setSearchResults(results.slice(0, 10));
    } else {
      setSearchResults([]);
    }
  };

  // Handle customer search
  const handleCustomerSearch = (query) => {
    setCustomerSearch(query);
    if (query.length > 0) {
      const results = searchCustomers(query);
      setCustomerResults(results);
    } else {
      setCustomerResults([]);
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    if (product.quantity <= 0) {
      setAlertConfig({
        title: 'Out of Stock',
        message: `${product.name} is currently out of stock!`,
        type: 'warning'
      });
      setShowAlert(true);
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      if (existing.quantity >= product.quantity) {
        setAlertConfig({
          title: 'Stock Limit Reached',
          message: `Cannot add more than available stock (${product.quantity} units)!`,
          type: 'warning'
        });
        setShowAlert(true);
        return;
      }
      updateQuantity(product.id, existing.quantity + 1);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
    setSearchResults([]);
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);
    if (newQuantity > product.quantity) {
      setAlertConfig({
        title: 'Stock Limit Exceeded',
        message: `Cannot exceed available stock (${product.quantity} units)!`,
        type: 'warning'
      });
      setShowAlert(true);
      return;
    }
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)));
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setShowClearDialog(true);
  };

  const confirmClearCart = () => {
    setCart([]);
    setSelectedCustomer(null);
    setDiscount(0);
    setCashReceived('');
    setShowClearDialog(false);
  };

  // Complete sale
  const completeSale = () => {
    if (cart.length === 0) {
      setAlertConfig({
        title: 'Empty Cart',
        message: 'Please add items to the cart before completing sale!',
        type: 'warning'
      });
      setShowAlert(true);
      return;
    }

    if (paymentMethod === 'Cash' && parseFloat(cashReceived || 0) < total) {
      setAlertConfig({
        title: 'Insufficient Payment',
        message: `Cash received (${formatCurrency(parseFloat(cashReceived || 0))}) is less than total amount (${formatCurrency(total)})!`,
        type: 'error'
      });
      setShowAlert(true);
      return;
    }

    const saleData = {
      customerId: selectedCustomer?.id || null,
      customerName: selectedCustomer?.name || 'Walk-in Customer',
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        barcode: item.barcode,
        quantity: item.quantity,
        salePrice: item.salePrice,
        total: item.salePrice * item.quantity,
      })),
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      paymentMethod,
      cashReceived: paymentMethod === 'Cash' ? parseFloat(cashReceived) : null,
      change: paymentMethod === 'Cash' ? change : null,
    };

    const newSale = addSaleTransaction(saleData);
    setLastSale(newSale);
    setShowReceipt(true);

    // Clear cart after successful sale
    setCart([]);
    setSelectedCustomer(null);
    setDiscount(0);
    setCashReceived('');
  };

  // Print receipt
  const printReceipt = () => {
    const printWindow = window.open('', '_blank');
    const receiptContent = receiptRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${lastSale?.id}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            h3 {
              font-size: 20px;
              margin-bottom: 5px;
            }
            p {
              font-size: 12px;
              margin: 2px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }
            th, td {
              padding: 8px 4px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              font-weight: bold;
              border-bottom: 2px solid #333;
            }
            .text-center {
              text-align: center;
            }
            .text-right {
              text-align: right;
            }
            .font-bold {
              font-weight: bold;
            }
            .border-t {
              border-top: 2px solid #333;
              padding-top: 10px;
              margin-top: 10px;
            }
            .border-b {
              border-bottom: 1px solid #333;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .space-y-2 > * {
              margin: 5px 0;
            }
            .flex {
              display: flex;
            }
            .justify-between {
              justify-content: space-between;
            }
            strong {
              font-weight: bold;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${receiptContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Point of Sale (POS)</h1>
        <p className="text-gray-600">Process sales transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Product Search & Cart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex space-x-4">
              {/* Barcode Search */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Scan Barcode / Search Product
                </label>
                <div className="relative">
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleBarcodeScan(searchQuery);
                      }
                    }}
                    placeholder="Scan barcode or type product name..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-primary"
                  />
                  <Scan className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => addToCart(product)}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center space-x-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.barcode} • Stock: {product.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-hospital-primary">
                          {formatCurrency(product.salePrice)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="bg-hospital-primary text-white px-4 py-3 rounded-lg hover:bg-hospital-dark transition flex items-center space-x-2"
                >
                  <User className="h-5 w-5" />
                  <span>Customer</span>
                </button>
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Selected Customer */}
            {selectedCustomer && (
              <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{selectedCustomer.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedCustomer.phone} • {selectedCustomer.petName} ({selectedCustomer.petType})
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6" />
                <span>Cart ({cart.length} items)</span>
              </h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Cart is empty</p>
                <p className="text-sm text-gray-500">Scan or search products to add them</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.barcode}</p>
                      <p className="text-sm font-semibold text-hospital-primary">
                        {formatCurrency(item.salePrice)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center border border-gray-300 rounded py-1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-2 rounded transition"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        {formatCurrency(item.salePrice * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Bill Summary & Payment */}
        <div className="space-y-6">
          {/* Bill Summary */}
          <div className="bg-white rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bill Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>

              {/* Discount */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Discount (%):</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                  className="w-20 text-right border border-gray-300 rounded px-2 py-1"
                  min="0"
                  max="100"
                />
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount Amount:</span>
                  <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Tax ({taxRate}%):</span>
                <span className="font-semibold">{formatCurrency(taxAmount)}</span>
              </div>

              <div className="border-t-2 border-gray-300 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-hospital-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Cash', 'Card', 'UPI', 'Other'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-lg border-2 transition ${
                      paymentMethod === method
                        ? 'border-hospital-primary bg-hospital-light text-hospital-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Cash Received */}
            {paymentMethod === 'Cash' && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cash Received
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-primary"
                  />
                  <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {cashReceived && (
                  <p className="mt-2 text-sm">
                    <span className="text-gray-600">Change: </span>
                    <span className="font-bold text-green-600">{formatCurrency(change)}</span>
                  </p>
                )}
              </div>
            )}

            {/* Complete Sale Button */}
            <button
              onClick={completeSale}
              disabled={cart.length === 0}
              className={`w-full mt-6 py-4 rounded-lg font-bold text-white transition flex items-center justify-center space-x-2 ${
                cart.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-hospital-primary hover:bg-hospital-dark'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Complete Sale</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Selection Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Select Customer</h2>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => handleCustomerSearch(e.target.value)}
                placeholder="Search by name, phone, or ID..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-hospital-primary"
              />
            </div>

            <div className="space-y-2">
              {(customerSearch ? customerResults : customers).map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowCustomerModal(false);
                    setCustomerSearch('');
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{customer.name}</p>
                      <p className="text-sm text-gray-600">
                        {customer.phone} • {customer.petName} ({customer.petType})
                      </p>
                      <p className="text-xs text-gray-500">{customer.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Purchases</p>
                      <p className="font-bold text-hospital-primary">
                        {formatCurrency(customer.totalPurchases)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && lastSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Receipt</h2>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div ref={receiptRef} className="p-6 border-2 border-gray-200 rounded-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold">Pet Shop</h3>
                <p className="text-sm">Abbottabad Pet Hospital</p>
                <p className="text-xs">Pet Hospital Management System</p>
              </div>

              <div className="border-b py-3 mb-4 text-sm">
                <p>
                  <strong>Sale ID:</strong> {lastSale.id}
                </p>
                <p>
                  <strong>Date:</strong> {lastSale.date} {lastSale.time}
                </p>
                <p>
                  <strong>Customer:</strong> {lastSale.customerName}
                </p>
              </div>

              <div className="mb-4">
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #333' }}>
                      <th style={{ textAlign: 'left', padding: '8px 4px' }}>Item</th>
                      <th style={{ textAlign: 'center', padding: '8px 4px' }}>Qty</th>
                      <th style={{ textAlign: 'right', padding: '8px 4px' }}>Price</th>
                      <th style={{ textAlign: 'right', padding: '8px 4px' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastSale.items.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px 4px' }}>{item.productName}</td>
                        <td style={{ textAlign: 'center', padding: '8px 4px' }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', padding: '8px 4px' }}>{formatCurrency(item.salePrice)}</td>
                        <td style={{ textAlign: 'right', padding: '8px 4px' }}>{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(lastSale.subtotal)}</span>
                </div>
                {lastSale.discount > 0 && (
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-{formatCurrency(lastSale.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(lastSale.tax)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2" style={{ fontSize: '16px', borderTop: '2px solid #333', paddingTop: '10px', marginTop: '10px' }}>
                  <span>Total:</span>
                  <span>{formatCurrency(lastSale.total)}</span>
                </div>
              </div>

              <div className="border-t pt-3 text-sm" style={{ borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                <p>
                  <strong>Payment Method:</strong> {lastSale.paymentMethod}
                </p>
                {lastSale.cashReceived && (
                  <>
                    <p>
                      <strong>Cash Received:</strong> {formatCurrency(lastSale.cashReceived)}
                    </p>
                    <p>
                      <strong>Change:</strong> {formatCurrency(lastSale.change)}
                    </p>
                  </>
                )}
              </div>

              <div className="text-center mt-6 text-xs">
                <p>Thank you for your purchase!</p>
                <p>Visit us again soon 🐾</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              <button
                onClick={printReceipt}
                className="flex-1 bg-hospital-primary text-white px-4 py-3 rounded-lg hover:bg-hospital-dark transition flex items-center justify-center space-x-2"
              >
                <Printer className="h-5 w-5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cart Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message="Are you sure you want to clear the entire cart? This action cannot be undone."
        confirmText="Clear Cart"
        cancelText="Cancel"
        type="warning"
      />

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttonText="OK"
      />
    </div>
  );
};

export default POS;
