import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Star, MessageSquare } from 'lucide-react';
import { Dealer } from '../types';

interface DealerCardProps {
  dealer: Dealer;
}

export default function DealerCard({ dealer }: DealerCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{dealer.name}</h3>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{dealer.phone}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            {renderStars(dealer.rating)}
          </div>
          <div className="text-sm text-gray-600">{dealer.rating.toFixed(1)}/5.0</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">{dealer.reviews.length} reviews</span>
        </div>
        <Link
          to={`/dealer/${dealer.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}