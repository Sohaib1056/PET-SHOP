/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pet Hospital Theme Colors
        'hospital-primary': '#00B894',
        'hospital-secondary': '#00A8A8',
        'hospital-sidebar': '#0D9488',
        'hospital-dark': '#047857',
        'hospital-light': '#D1FAE5',
        
        // Pet Shop Colors (for product pages)
        'pet-blue': '#3B82F6',
        'pet-pink': '#EC4899',
        'pet-green': '#10B981',
        
        // Status Colors (from dashboard cards)
        'status-blue': '#3B82F6',
        'status-orange': '#F59E0B',
        'status-green': '#10B981',
        'status-purple': '#A855F7',
        'status-pink': '#EC4899',
        
        // Background Colors
        'bg-light': '#F5F7FA',
        'bg-card': '#FFFFFF',
        'bg-hover': '#F3F4F6',
        
        // Text Colors
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
