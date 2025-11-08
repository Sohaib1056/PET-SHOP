# 🚀 Quick Start Guide - Pet Shop Desktop App

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run as Desktop Application
```bash
npm run electron:dev
```

The application will launch in a desktop window automatically.

**Alternative - Browser Mode:**
```bash
npm run dev
```
Then open `http://localhost:3000`

### 3. Build Desktop Installers
```bash
npm run electron:build
```

Find installers in the `release/` folder:
- Windows: `.exe` files
- macOS: `.dmg` file  
- Linux: `.AppImage` and `.deb` files

## 📱 Application Features

### Customer Features
- **Browse Products**: View all pet products with images, prices, and ratings
- **Search & Filter**: Find products by name, category, price range, and ratings
- **Product Details**: View detailed information, reviews, and recommendations
- **Shopping Cart**: Add products, update quantities, and manage cart
- **Checkout**: Complete orders with delivery details and payment options
- **Order Tracking**: View order history and track delivery status

### Admin Features
- **Dashboard**: View sales statistics, total orders, and inventory alerts
- **Product Management**: Add, edit, delete products and update stock levels
- **Order Management**: View all orders and update order status
- **Analytics**: Monitor revenue, popular products, and low-stock items

## 🎨 Design Theme

### Pet Hospital Theme Colors
- **Primary Green** (#00B894): Main brand color (matches Laboratory Dashboard)
- **Sidebar Green** (#0D9488): Navigation sidebar
- **Status Blue** (#3B82F6): Information cards
- **Status Orange** (#F59E0B): Pending/Warning cards
- **Status Green** (#10B981): Success/Completed cards
- **Status Purple** (#A855F7): Revenue/Analytics cards

### Layout Features
- **Sidebar Navigation** - Similar to Laboratory Dashboard
- **Dashboard Cards** - Color-coded statistics
- **Header Bar** - Search and notifications
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Desktop App** - Runs as standalone software

## 🔧 Technology Stack

- **Frontend Framework**: React 18
- **Desktop Framework**: Electron (standalone app)
- **Styling**: Tailwind CSS (Pet Hospital theme)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Data Storage**: LocalStorage (persistent)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📂 Project Structure

```
pet-shop-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── FilterSidebar.jsx
│   │   └── ReviewCard.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   └── Admin.jsx
│   ├── context/         # React Context
│   │   └── CartContext.jsx
│   ├── data/            # Mock data
│   │   └── products.js
│   ├── utils/           # Helper functions
│   │   └── helpers.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json
```

## 🛣️ Routes

- `/` - Home page
- `/shop` - Product listing with filters
- `/shop?category=food` - Products by category
- `/shop?search=toy` - Product search results
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/orders` - Order history and tracking
- `/admin` - Admin dashboard

## 💾 Data Storage

### LocalStorage (Current)

All data stored locally in the browser/app:
- **Shopping Cart** - `localStorage.getItem('petShopCart')`
- **Order History** - `localStorage.getItem('petShopOrders')`
- **Product Data** - Pre-loaded from `src/data/products.js`

### Data Persistence

✅ Data persists across app restarts  
✅ No server required  
✅ Works offline  
✅ Instant access  

### View Your Data

Open Developer Tools (F12) → Application → Local Storage

### Future Integration

Ready to connect with Pet Hospital backend:
- Node.js + Express API
- MongoDB database
- Real-time inventory sync

## 🔮 Future Enhancements

- User authentication and profiles
- Real-time inventory sync
- Payment gateway integration
- Pet Hospital data integration
- AI-based product recommendations
- Wishlist functionality
- Dark mode
- Email notifications
- Live chat support

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port (3001, 3002, etc.)

### Dependencies Installation Failed
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Build Errors
Make sure you have Node.js v16 or higher:
```bash
node --version
```

## 📞 Support

For issues or questions about the Pet Shop application, please refer to the README.md or contact the development team.

---

**Happy Shopping! 🐾**
