// Suppliers Database
export const suppliers = [
  // Add your suppliers here
  // Example structure:
  // {
  //   id: 'SUP001',
  //   name: 'Supplier Name',
  //   contact: 'Contact Person',
  //   phone: '+92-300-1234567',
  //   email: 'email@supplier.com',
  //   address: 'Address',
  //   category: 'Food',
  //   status: 'Active',
  //   paymentTerms: 'Net 30',
  // },
];

// Customers Database
export const customers = [
  // Add your customers here
  // Example structure:
  // {
  //   id: 'CUST001',
  //   name: 'Customer Name',
  //   phone: '+92-300-1111111',
  //   email: 'email@example.com',
  //   address: 'Customer Address',
  //   petName: 'Pet Name',
  //   petType: 'Dog',
  //   petBreed: 'Breed',
  //   registrationDate: '2024-01-15',
  //   totalPurchases: 0,
  //   lastVisit: '2024-11-05',
  // },
];

// Purchase Records (Stock In)
export const purchaseRecords = [
  // Add your purchase records here
  // Example structure:
  // {
  //   id: 'PUR001',
  //   supplierId: 'SUP001',
  //   supplierName: 'Supplier Name',
  //   date: '2024-10-15',
  //   invoiceNumber: 'INV-2024-1001',
  //   items: [
  //     { productId: 1, productName: 'Product Name', quantity: 100, purchasePrice: 30, total: 3000 },
  //   ],
  //   subtotal: 4600,
  //   tax: 736,
  //   total: 5336,
  //   paymentStatus: 'Paid',
  //   paymentMethod: 'Bank Transfer',
  // },
];

// Sales Transactions
export const salesTransactions = [
  // Add your sales transactions here
  // Example structure:
  // {
  //   id: 'SALE001',
  //   customerId: 'CUST001',
  //   customerName: 'Customer Name',
  //   date: '2024-11-05',
  //   time: '10:30 AM',
  //   items: [
  //     { productId: 1, productName: 'Product Name', barcode: 'CODE', quantity: 2, salePrice: 45.99, total: 91.98 },
  //   ],
  //   subtotal: 104.97,
  //   discount: 10.50,
  //   tax: 15.07,
  //   total: 109.54,
  //   paymentMethod: 'Cash',
  //   cashReceived: 150,
  //   change: 40.46,
  //   status: 'Completed',
  // },
];

// Enhanced Product Data with Business Information
export const enhancedProducts = [
  // Add your products with business details here (used by Inventory Management)
  // Example structure:
  // {
  //   id: 1,
  //   barcode: 'PF001',
  //   sku: 'DOG-FOOD-001',
  //   name: 'Product Name',
  //   category: 'food',
  //   brand: 'Brand Name',
  //   supplierId: 'SUP001',
  //   supplierName: 'Supplier Name',
  //   purchasePrice: 30.00,
  //   salePrice: 45.99,
  //   mrp: 52.00,
  //   margin: 53.3,
  //   quantity: 45,
  //   minStock: 20,
  //   reorderLevel: 30,
  //   unit: 'kg',
  //   lastPurchaseDate: '2024-10-15',
  //   description: 'Product description',
  //   status: 'In Stock',
  //   image: 'image-url',
  // },
];

// Customer Purchase History
export const customerPurchaseHistory = {
  // Add customer purchase history here
  // Example structure:
  // CUST001: [
  //   { saleId: 'SALE001', date: '2024-11-05', amount: 109.54, items: 2 },
  // ],
};
