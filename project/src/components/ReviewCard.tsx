import React from 'react';
import { Star, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSentimentIcon = () => {
    switch (review.sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSentimentColor = () => {
    switch (review.sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{review.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>By {review.userName}</span>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
          </div>
          <span className="text-sm font-medium text-gray-700">{review.rating}/5</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center space-x-1 text-gray-600">
          <span className="font-medium">Vehicle:</span>
          <span>{review.carYear} {review.carMake} {review.carModel}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <span className="font-medium">Purchase Date:</span>
          <span>{new Date(review.purchaseDate).toLocaleDateString()}</span>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor()}`}>
          {getSentimentIcon()}
          <span className="capitalize">{review.sentiment}</span>
          <span>({(review.sentimentScore * 100).toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
}