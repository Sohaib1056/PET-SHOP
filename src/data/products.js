import { Cookie, Gamepad2, Scissors, Pill, Sparkles } from 'lucide-react';
import React from 'react';

export const categories = [
  { 
    id: 'food', 
    name: 'Pet Food', 
    icon: React.createElement(Cookie, { className: 'h-8 w-8 text-blue-600' }), 
    color: 'pet-blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    hoverBg: 'hover:bg-blue-100'
  },
  { 
    id: 'toys', 
    name: 'Toys', 
    icon: React.createElement(Gamepad2, { className: 'h-8 w-8 text-pink-600' }), 
    color: 'pet-pink',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    hoverBg: 'hover:bg-pink-100'
  },
  { 
    id: 'grooming', 
    name: 'Grooming', 
    icon: React.createElement(Scissors, { className: 'h-8 w-8 text-purple-600' }), 
    color: 'pet-purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    hoverBg: 'hover:bg-purple-100'
  },
  { 
    id: 'medicine', 
    name: 'Medicine', 
    icon: React.createElement(Pill, { className: 'h-8 w-8 text-green-600' }), 
    color: 'pet-green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    hoverBg: 'hover:bg-green-100'
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    icon: React.createElement(Sparkles, { className: 'h-8 w-8 text-amber-600' }), 
    color: 'pet-cream',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    hoverBg: 'hover:bg-amber-100'
  },
];

export const products = [
  // Add your products here
  // Example structure:
  // {
  //   id: 1,
  //   name: 'Product Name',
  //   category: 'food',
  //   price: 45.99,
  //   image: 'image-url',
  //   description: 'Product description',
  //   rating: 4.8,
  //   reviews: 342,
  //   stock: 45,
  //   featured: true,
  // },
];

export const offers = [
  // Add your offers/promotions here
  // Example:
  // {
  //   id: 'offer1',
  //   title: 'New Customer Special',
  //   description: 'Get 20% off your first order!',
  //   code: 'WELCOME20',
  //   discount: 20,
  //   minAmount: 50,
  // },
];

export const reviews = {
  // Add product reviews here
  // Example:
  // 1: [
  //   { user: 'Customer Name', rating: 5, comment: 'Great product!', date: '2024-01-15' },
  // ],
};
