import React from 'react';
import { Star, User } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="bg-pet-blue rounded-full p-2">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{review.user}</h4>
            <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-sm">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
