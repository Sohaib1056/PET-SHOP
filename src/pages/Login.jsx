import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShoppingBag, Shield, Zap, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, defaultUsers } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.username, formData.password, formData.rememberMe);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (username, password) => {
    setFormData(prev => ({ ...prev, username, password }));
    setShowDemo(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-hospital-primary via-hospital-secondary to-hospital-dark relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          {/* Logo */}
          <div className="mb-8 animate-fadeIn">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <img src="/logo.svg" alt="Pet Shop Logo" className="w-24 h-24" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold mb-4 text-center animate-slideInLeft">
            Pet Shop Management
          </h1>
          <p className="text-xl text-center mb-12 text-white/90 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            Professional Pet Store Solution
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 max-w-lg w-full">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              <ShoppingBag className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">Inventory</h3>
              <p className="text-sm text-white/80">Complete stock management</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
              <Zap className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">Fast POS</h3>
              <p className="text-sm text-white/80">Quick sales processing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
              <Shield className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-sm text-white/80">Protected data storage</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 animate-slideInRight" style={{ animationDelay: '0.5s' }}>
              <Heart className="w-10 h-10 mb-3" />
              <h3 className="font-semibold mb-1">Customer Care</h3>
              <p className="text-sm text-white/80">Build lasting relationships</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-bg-light to-white p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-hospital-primary to-hospital-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <img src="/logo.svg" alt="Pet Shop Logo" className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Pet Shop Management</h2>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scaleIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-primary focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-primary focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-hospital-primary border-gray-300 rounded focus:ring-hospital-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowDemo(!showDemo)}
                  className="text-sm text-hospital-primary hover:text-hospital-dark font-medium"
                >
                  Demo Accounts
                </button>
              </div>

              {/* Demo Accounts Box */}
              {showDemo && (
                <div className="bg-gradient-to-r from-hospital-primary/10 to-teal-500/10 border-2 border-hospital-primary rounded-xl p-5 animate-fadeIn shadow-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-10 h-10 bg-hospital-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Quick Login</p>
                      <p className="text-xs text-gray-600">Select a demo account below</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {defaultUsers.map(user => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleDemoLogin(user.username, user.password)}
                        className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-hospital-light border border-gray-200 hover:border-hospital-primary hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-gray-800 group-hover:text-hospital-primary transition-colors">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{user.username}</span>
                              <span className="mx-1">•</span>
                              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{user.password}</span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-700' 
                              : user.role === 'manager'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.role.toUpperCase()}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    💡 Click any account to login instantly
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-hospital-primary to-hospital-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Secure login powered by Pet Shop Management System
              </p>
            </div>
          </div>

          {/* Version Info */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Version 2.0 Professional Edition
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
