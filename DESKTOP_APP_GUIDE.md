# 🖥️ Pet Shop Desktop Application Guide

## Overview

This is a **standalone desktop application** built with Electron that runs the Pet Shop module of the Abbottabad Pet Hospital Management System. All data is stored locally using browser's LocalStorage API.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

**As Desktop App (Recommended):**
```bash
npm run electron:dev
```

This will:
- Start the Vite development server
- Launch the Electron window automatically
- Open with developer tools for debugging

**In Browser (Alternative):**
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

## 📦 Building Desktop Installers

### Build for Your Platform

```bash
npm run electron:build
```

This creates installers in the `release/` folder:

**Windows:**
- `Pet Shop - Pet Hospital Setup.exe` (Installer)
- `Pet Shop - Pet Hospital.exe` (Portable)

**macOS:**
- `Pet Shop - Pet Hospital.dmg`

**Linux:**
- `Pet Shop - Pet Hospital.AppImage`
- `pet-shop-app.deb`

### Distribution

The built applications are:
- ✅ **Standalone** - No installation of Node.js required
- ✅ **Portable** - Can run from USB drive (Windows portable version)
- ✅ **Auto-updating** - Can be configured for automatic updates
- ✅ **Offline** - Works without internet connection

## 💾 Data Storage

### LocalStorage Backend

All application data is stored in the browser's LocalStorage:

- **Cart Items** - Persisted across sessions
- **Orders** - Complete order history
- **Product Data** - Pre-loaded from `src/data/products.js`

### Data Location

**Development Mode:**
- Windows: `%APPDATA%\Electron\Local Storage`
- macOS: `~/Library/Application Support/Electron/Local Storage`
- Linux: `~/.config/Electron/Local Storage`

**Production Mode:**
- Windows: `%APPDATA%\Pet Shop - Pet Hospital\Local Storage`
- macOS: `~/Library/Application Support/Pet Shop - Pet Hospital/Local Storage`
- Linux: `~/.config/pet-shop-app/Local Storage`

### Data Management

**View Stored Data:**
1. Open Developer Tools (F12 or Ctrl+Shift+I)
2. Go to Application tab
3. Select Local Storage
4. View `petShopCart` and `petShopOrders`

**Clear All Data:**
```javascript
localStorage.clear()
```

**Export Data (for backup):**
```javascript
// In browser console
const data = {
  cart: localStorage.getItem('petShopCart'),
  orders: localStorage.getItem('petShopOrders')
};
console.log(JSON.stringify(data, null, 2));
```

## 🎨 Pet Hospital Theme

### Design Consistency

The application matches the **Abbottabad Pet Hospital Laboratory Dashboard**:

**Colors:**
- Primary: `#00B894` (Teal Green)
- Sidebar: `#0D9488`
- Status Blue: `#3B82F6`
- Status Orange: `#F59E0B`
- Status Green: `#10B981`
- Status Purple: `#A855F7`

**Layout:**
- Left Sidebar Navigation
- Top Header with Search
- Dashboard Cards with Icons
- White Background (#F5F7FA)

### Sidebar Navigation

- **Dashboard** - Overview and statistics
- **Products** - Browse and search inventory
- **Orders** - View order history
- **Inventory** - Admin panel for stock management
- **Settings** - Application settings

## 🔧 Development

### File Structure

```
pet-shop-app/
├── electron/
│   └── main.cjs          # Electron main process
├── src/
│   ├── components/       # UI components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── pages/            # Application pages
│   │   ├── Home.jsx      # Dashboard
│   │   ├── Shop.jsx      # Product listing
│   │   ├── Cart.jsx
│   │   └── ...
│   ├── context/
│   │   └── CartContext.jsx  # State management
│   ├── data/
│   │   └── products.js      # Product catalog
│   └── utils/
│       └── helpers.js       # Utility functions
└── package.json
```

### Available Scripts

```bash
# Development
npm run dev              # Browser only
npm run electron         # Electron only (requires dev server)
npm run electron:dev     # Both together

# Production
npm run build           # Build web assets
npm run electron:build  # Build desktop app
npm run preview         # Preview production build
```

### Customization

**Change Window Size:**
Edit `electron/main.cjs`:
```javascript
width: 1400,
height: 900,
minWidth: 1024,
minHeight: 768,
```

**Change App Name:**
Edit `package.json`:
```json
"build": {
  "productName": "Your App Name"
}
```

**Add New Products:**
Edit `src/data/products.js` and add to the `products` array.

## 🔐 Security

**LocalStorage Limitations:**
- ⚠️ Data is not encrypted
- ⚠️ Can be accessed by any code running in the app
- ⚠️ Limited to ~5-10MB storage

**Best Practices:**
- Don't store sensitive information (passwords, payment details)
- Use placeholder data for credit cards
- Consider database integration for production use

## 🔌 Backend Integration (Future)

### API-Ready Structure

The application is structured to easily integrate with a backend:

**Current (LocalStorage):**
```javascript
localStorage.setItem('petShopCart', JSON.stringify(cart));
```

**Future (API):**
```javascript
await fetch('/api/cart', {
  method: 'POST',
  body: JSON.stringify(cart)
});
```

### Integration Points

1. **CartContext.jsx** - Replace localStorage with API calls
2. **products.js** - Fetch from `/api/products`
3. **Authentication** - Add login system
4. **Real-time Updates** - WebSocket for inventory sync

## 🐛 Troubleshooting

### Electron Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Data Not Persisting

Check if localStorage is enabled:
```javascript
// In DevTools console
console.log(localStorage);
```

### Build Errors

Ensure you have the required dependencies for your platform:
- **Windows**: Windows SDK
- **macOS**: Xcode Command Line Tools
- **Linux**: `libgtk-3-dev`, `libnotify-dev`

### Port Already in Use

Vite will automatically use the next available port (3001, 3002, etc.)

## 📱 Mobile/Tablet Support

The application is fully responsive:
- Mobile sidebar navigation
- Touch-friendly buttons
- Adaptive layouts

**Run on mobile device:**
1. Start dev server: `npm run dev`
2. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Access from mobile: `http://YOUR_IP:3000`

## 🎓 Training

### For Shop Staff

1. **Dashboard** - View daily statistics
2. **Products** - Search and browse inventory
3. **Orders** - Track customer orders
4. **Cart** - Process new orders

### For Administrators

1. **Inventory Management** - Update stock levels
2. **Product Management** - Add/edit/delete products
3. **Order Management** - Update order status
4. **Reports** - View sales and revenue

## 📞 Support

For issues or questions:
1. Check this guide
2. Review `README.md`
3. Check `QUICK_START.md`
4. Contact your system administrator

---

**Happy Managing! 🐾**

*Part of Abbottabad Pet Hospital Management System*
