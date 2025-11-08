import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  suppliers as initialSuppliers,
  customers as initialCustomers,
  purchaseRecords as initialPurchases,
  salesTransactions as initialSales,
  enhancedProducts as initialProducts,
  customerPurchaseHistory as initialHistory,
} from '../data/businessData';

const BusinessContext = createContext();

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within BusinessProvider');
  }
  return context;
};

// Alias for backward compatibility
export const useBusiness = useBusinessContext;

export const BusinessProvider = ({ children }) => {
  // Load data from localStorage or use initial data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('petShopProducts');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('petShopSuppliers');
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('petShopCustomers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [purchaseRecords, setPurchaseRecords] = useState(() => {
    const saved = localStorage.getItem('petShopPurchases');
    return saved ? JSON.parse(saved) : initialPurchases;
  });

  const [salesTransactions, setSalesTransactions] = useState(() => {
    const saved = localStorage.getItem('petShopSales');
    return saved ? JSON.parse(saved) : initialSales;
  });

  const [customerHistory, setCustomerHistory] = useState(() => {
    const saved = localStorage.getItem('petShopCustomerHistory');
    return saved ? JSON.parse(saved) : initialHistory;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('petShopProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('petShopSuppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('petShopCustomers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('petShopPurchases', JSON.stringify(purchaseRecords));
  }, [purchaseRecords]);

  useEffect(() => {
    localStorage.setItem('petShopSales', JSON.stringify(salesTransactions));
  }, [salesTransactions]);

  useEffect(() => {
    localStorage.setItem('petShopCustomerHistory', JSON.stringify(customerHistory));
  }, [customerHistory]);

  // Product Management
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateStock = (id, quantity, operation = 'add') => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newQuantity =
            operation === 'add' ? p.quantity + quantity : p.quantity - quantity;
          return { ...p, quantity: Math.max(0, newQuantity) };
        }
        return p;
      })
    );
  };

  // Supplier Management
  const addSupplier = (supplier) => {
    const newSupplier = {
      ...supplier,
      id: `SUP${String(suppliers.length + 1).padStart(3, '0')}`,
    };
    setSuppliers([...suppliers, newSupplier]);
    return newSupplier;
  };

  const updateSupplier = (id, updates) => {
    setSuppliers(suppliers.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSupplier = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  // Customer Management
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: `CUST${String(customers.length + 1).padStart(3, '0')}`,
      registrationDate: new Date().toISOString().split('T')[0],
      totalPurchases: 0,
      lastVisit: new Date().toISOString().split('T')[0],
    };
    setCustomers([...customers, newCustomer]);
    setCustomerHistory({ ...customerHistory, [newCustomer.id]: [] });
    return newCustomer;
  };

  const updateCustomer = (id, updates) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
    const newHistory = { ...customerHistory };
    delete newHistory[id];
    setCustomerHistory(newHistory);
  };

  // Purchase Management (Stock In)
  const addPurchaseRecord = (purchase) => {
    const newPurchase = {
      ...purchase,
      id: `PUR${String(purchaseRecords.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
    };
    
    // Update product stock
    purchase.items.forEach((item) => {
      updateStock(item.productId, item.quantity, 'add');
      // Update last purchase info
      updateProduct(item.productId, {
        lastPurchaseDate: newPurchase.date,
        lastPurchaseQuantity: item.quantity,
        purchasePrice: item.purchasePrice,
      });
    });

    setPurchaseRecords([...purchaseRecords, newPurchase]);
    return newPurchase;
  };

  // Sales Management (POS)
  const addSaleTransaction = (sale) => {
    const newSale = {
      ...sale,
      id: `SALE${String(salesTransactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Completed',
    };

    // Update product stock (reduce)
    sale.items.forEach((item) => {
      updateStock(item.productId, item.quantity, 'subtract');
    });

    // Update customer records
    if (sale.customerId) {
      const customer = customers.find((c) => c.id === sale.customerId);
      if (customer) {
        updateCustomer(sale.customerId, {
          totalPurchases: customer.totalPurchases + sale.total,
          lastVisit: newSale.date,
        });

        // Update customer purchase history
        const history = customerHistory[sale.customerId] || [];
        setCustomerHistory({
          ...customerHistory,
          [sale.customerId]: [
            ...history,
            {
              saleId: newSale.id,
              date: newSale.date,
              amount: sale.total,
              items: sale.items.length,
            },
          ],
        });
      }
    }

    setSalesTransactions([...salesTransactions, newSale]);
    return newSale;
  };

  // Search Functions
  const searchProducts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.barcode.toLowerCase().includes(lowercaseQuery) ||
        p.sku.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getProductByBarcode = (barcode) => {
    return products.find((p) => p.barcode === barcode);
  };

  const searchCustomers = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lowercaseQuery) ||
        c.phone.includes(query) ||
        c.id.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Statistics
  const getTodaySales = () => {
    const today = new Date().toISOString().split('T')[0];
    return salesTransactions
      .filter((s) => s.date === today)
      .reduce((sum, s) => sum + s.total, 0);
  };

  const getMonthSales = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return salesTransactions
      .filter((s) => {
        const saleDate = new Date(s.date);
        return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
      })
      .reduce((sum, s) => sum + s.total, 0);
  };

  const getLowStockProducts = () => {
    return products.filter((p) => p.quantity <= p.reorderLevel);
  };

  const getTopSellingProducts = (limit = 10) => {
    const productSales = {};
    salesTransactions.forEach((sale) => {
      sale.items.forEach((item) => {
        productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
      });
    });

    return Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([productId, quantity]) => ({
        product: products.find((p) => p.id === parseInt(productId)),
        quantity,
      }))
      .filter((item) => item.product);
  };

  const value = {
    // Data
    products,
    suppliers,
    customers,
    purchaseRecords,
    salesTransactions,
    customerHistory,
    
    // Product actions
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    
    // Supplier actions
    addSupplier,
    updateSupplier,
    deleteSupplier,
    
    // Customer actions
    addCustomer,
    updateCustomer,
    deleteCustomer,
    
    // Purchase actions
    addPurchaseRecord,
    
    // Sales actions
    addSaleTransaction,
    
    // Search actions
    searchProducts,
    getProductByBarcode,
    searchCustomers,
    
    // Statistics
    getTodaySales,
    getMonthSales,
    getLowStockProducts,
    getTopSellingProducts,
  };

  return (
    <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>
  );
};
