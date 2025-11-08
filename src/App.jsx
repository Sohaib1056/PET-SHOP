import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BusinessProvider } from './context/BusinessContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import POS from './pages/POS';
import ProductManagement from './pages/ProductManagement';
import SupplierManagement from './pages/SupplierManagement';
import CustomerManagement from './pages/CustomerManagement';
import Reports from './pages/Reports';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <BusinessProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Route - Login */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes - Main App */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex min-h-screen bg-bg-light">
                      {/* Desktop Sidebar */}
                      <div className="hidden lg:block">
                        <Sidebar />
                      </div>

                      {/* Mobile Sidebar */}
                      <MobileSidebar
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                      />

                      {/* Main Content Area */}
                      <div className="flex-1 lg:ml-64">
                        <Header
                          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          isMobileMenuOpen={isMobileMenuOpen}
                        />
                        
                        {/* Main Content */}
                        <main className="mt-16 p-6">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/pos" element={<POS />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/inventory" element={<ProductManagement />} />
                            <Route path="/suppliers" element={<SupplierManagement />} />
                            <Route path="/customers" element={<CustomerManagement />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/admin" element={<Admin />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;
