import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('petShopUser');
    const rememberMe = localStorage.getItem('petShopRememberMe');
    
    if (savedUser && rememberMe === 'true') {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Default credentials (in production, this would be API-based)
  const defaultUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      name: 'Admin User',
      email: 'admin@petshop.com',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=00B894&color=fff'
    },
    {
      id: 2,
      username: 'manager',
      password: 'manager123',
      name: 'Store Manager',
      email: 'manager@petshop.com',
      role: 'manager',
      avatar: 'https://ui-avatars.com/api/?name=Store+Manager&background=00B894&color=fff'
    },
    {
      id: 3,
      username: 'staff',
      password: 'staff123',
      name: 'Staff Member',
      email: 'staff@petshop.com',
      role: 'staff',
      avatar: 'https://ui-avatars.com/api/?name=Staff+Member&background=00B894&color=fff'
    }
  ];

  const login = async (username, password, rememberMe = false) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = defaultUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Save to localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('petShopUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('petShopRememberMe', 'true');
      } else {
        localStorage.removeItem('petShopRememberMe');
      }
      
      // Save current session
      sessionStorage.setItem('petShopUser', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('petShopUser');
    localStorage.removeItem('petShopRememberMe');
    sessionStorage.removeItem('petShopUser');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    defaultUsers, // Expose for demo purposes
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
