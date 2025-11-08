# 🐾 Pet Shop Desktop Application

A modern Pet Shop management software built with React, Tailwind CSS, and Electron. Part of the **Abbottabad Pet Hospital Management System**.

## ✨ Features

### 🏪 Business Management
- 💰 **Point of Sale (POS)** - Barcode scanning, billing, receipt printing
- 📦 **Product Management** - Full inventory control with purchase/sale prices
- 🚚 **Supplier Management** - Track suppliers and purchase records
- 👥 **Customer Management** - Customer database with purchase history
- 📊 **Sales Reports** - Daily/monthly reports with CSV export

### 🛒 Shopping & Orders
- 🛍️ **Product Catalog** - Browse, search, filter products
- 🛒 **Shopping Cart** - Add, remove, and update quantities
- 💳 **Checkout** - Complete order processing with delivery details
- 📦 **Order Tracking** - View order history and status

### 💼 Administration
- 📊 **Dashboard** - Real-time statistics and analytics
- 👨‍💼 **Inventory Control** - Stock alerts, reorder levels
- 📈 **Business Analytics** - Top products, payment breakdowns
- 💾 **LocalStorage** - All data stored locally (no server required)
- 🖥️ **Desktop Application** - Runs as standalone software (Electron)
- 🎨 **Pet Hospital Theme** - Matches the Laboratory Dashboard design

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run as Desktop Application (Recommended):
   ```bash
   npm run electron:dev
   ```

3. Or run in Browser (Development):
   ```bash
   npm run dev
   ```
   Then open `http://localhost:3000`

### Build Desktop Application

```bash
npm run electron:build
```

This will create installable executables in the `release/` folder:
- **Windows**: `.exe` installer and portable version
- **macOS**: `.dmg` installer
- **Linux**: `.AppImage` and `.deb` packages

## 🛠️ Tech Stack

- **Frontend:** React 18 (JSX)
- **Styling:** Tailwind CSS (Pet Hospital Theme)
- **Desktop Framework:** Electron
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Build Tool:** Vite
- **State Management:** React Context API
- **Data Storage:** LocalStorage (browser-based persistence)

## 📁 Project Structure

```
pet-shop-app/
├── electron/
│   └── main.cjs              # Electron main process
├── src/
│   ├── components/           # Reusable components
│   │   ├── Sidebar.jsx       # Desktop sidebar navigation
│   │   ├── Header.jsx        # Top header with search
│   │   ├── ProductCard.jsx   # Product display
│   │   └── ...
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Dashboard
│   │   ├── POS.jsx           # Point of Sale
│   │   ├── ProductManagement.jsx  # Inventory
│   │   ├── SupplierManagement.jsx # Suppliers
│   │   ├── CustomerManagement.jsx # Customers
│   │   ├── Reports.jsx       # Sales reports
│   │   ├── Shop.jsx          # Shopping portal
│   │   ├── Cart.jsx          # Shopping cart
│   │   ├── Orders.jsx        # Order tracking
│   │   └── ...
│   ├── context/              # Context API
│   │   ├── CartContext.jsx   # Shopping cart state
│   │   └── BusinessContext.jsx # Business data
│   ├── data/                 # Data files
│   │   ├── products.js       # Product catalog
│   │   └── businessData.js   # Business entities
│   ├── utils/                # Helper functions
│   ├── App.jsx               # Main app component
│   └── index.css             # Global styles
├── public/                   # Static assets
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

## 🎨 Design Features

- **Pet Hospital Theme** - Matches Abbottabad Pet Hospital Management System
- **Primary Color**: Teal Green (#00B894)
- **Sidebar Navigation** - Like Laboratory Dashboard
- **Dashboard Cards** - Color-coded statistics (Blue, Orange, Green, Purple)
- **Modern UI** - Clean, professional medical software aesthetic
- **Responsive Layout** - Works on all screen sizes

## 🔮 Integration with Pet Hospital

This Pet Shop module is designed to integrate with the Pet Hospital Management System:
- **Shared Design Language** - Consistent UI/UX across modules
- **LocalStorage Data** - Can be migrated to central database
- **API Ready** - Context structure supports backend integration
- **User Authentication** - Ready for hospital user system
- **Pet Profile Integration** - Can link products to patient records
- **Inventory Sync** - Can sync with hospital pharmacy inventory

## 📚 Documentation

- **README.md** - Main project documentation
- **QUICK_START.md** - Quick setup and usage guide
- **DESKTOP_APP_GUIDE.md** - Comprehensive desktop app manual
- **BUSINESS_FEATURES.md** - Complete business management features guide
- **PROJECT_SUMMARY.md** - Project overview and transformation summary

## 🎯 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Overview with statistics and recent activity |
| Point of Sale | `/pos` | POS system with barcode scanning and billing |
| Shop | `/shop` | Customer shopping portal with filters |
| Products | `/inventory` | Product and inventory management |
| Suppliers | `/suppliers` | Supplier management and tracking |
| Customers | `/customers` | Customer database with purchase history |
| Reports | `/reports` | Daily and monthly sales reports |
| Orders | `/orders` | Order tracking and management |

## 📝 License

This project is part of the Pet Hospital Management System.

---

Made with ❤️ for pets and their owners
