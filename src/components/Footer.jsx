import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-8 w-8 text-pet-blue" />
              <span className="text-2xl font-bold text-white">
                Pet<span className="text-pet-blue">Shop</span>
              </span>
            </div>
            <p className="text-sm">
              Your one-stop destination for all your pet's needs. Quality products,
              competitive prices, and exceptional service.
            </p>
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 hover:text-pet-blue cursor-pointer transition" />
              <Twitter className="h-5 w-5 hover:text-pet-blue cursor-pointer transition" />
              <Instagram className="h-5 w-5 hover:text-pet-blue cursor-pointer transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-pet-blue transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-pet-blue transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-pet-blue transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-pet-blue transition">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop?category=food" className="hover:text-pet-blue transition">
                  Pet Food
                </Link>
              </li>
              <li>
                <Link to="/shop?category=toys" className="hover:text-pet-blue transition">
                  Toys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=grooming" className="hover:text-pet-blue transition">
                  Grooming
                </Link>
              </li>
              <li>
                <Link to="/shop?category=medicine" className="hover:text-pet-blue transition">
                  Medicine
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-pet-blue transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Pet Street, Animal City</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@petshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} PetShop - Part of Pet Hospital System. All rights reserved.
          </p>
          <p className="mt-2">
            Made with <span className="text-red-500">❤️</span> for pets and their owners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
