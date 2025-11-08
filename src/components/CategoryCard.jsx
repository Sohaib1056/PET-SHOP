import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const bgColors = {
    'pet-blue': 'bg-pet-blue',
    'pet-pink': 'bg-pet-pink',
    'pet-purple': 'bg-pet-purple',
    'pet-green': 'bg-pet-green',
    'pet-cream': 'bg-pet-cream',
  };

  return (
    <Link to={`/shop?category=${category.id}`}>
      <div
        className={`${bgColors[category.color]} bg-opacity-20 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
      >
        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
