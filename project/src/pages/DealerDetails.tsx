import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Star, Plus, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ReviewCard from '../components/ReviewCard';

export default function DealerDetails() {
  const { id } = useParams<{ id: string }>();
  const { state } = useApp();
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  const dealer = state.dealers.find(d => d.id === id);

  if (!dealer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dealer Not Found</h2>
          <p className="text-gray-600 mb-6">The dealer you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dealers</span>
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const sortedReviews = [...dealer.reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const averageRating = dealer.reviews.length > 0
    ? dealer.reviews.reduce((acc, review) => acc + review.rating, 0) / dealer.reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: dealer.reviews.filter(r => r.rating === rating).length,
    percentage: dealer.reviews.length > 0 
      ? (dealer.reviews.filter(r => r.rating === rating).length / dealer.reviews.length) * 100 
      : 0
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dealers</span>
        </Link>
      </div>

      {/* Dealer Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{dealer.name}</h1>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zip}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{dealer.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{dealer.email}</span>
              </div>
              {dealer.website && (
                <div className="flex items-center space-x-3 text-gray-600">
                  <Globe className="h-5 w-5" />
                  <a 
                    href={dealer.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="text-center lg:text-right">
            <div className="mb-4">
              <div className="flex items-center justify-center lg:justify-end space-x-1 mb-2">
                {renderStars(averageRating)}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}/5.0
              </div>
              <div className="text-gray-600">
                Based on {dealer.reviews.length} review{dealer.reviews.length !== 1 ? 's' : ''}
              </div>
            </div>
            {state.user && (
              <Link
                to={`/add-review/${dealer.id}`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Write a Review</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Rating Breakdown */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Customer Reviews ({dealer.reviews.length})
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          {sortedReviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="text-gray-400 mb-4">
                <Star className="h-16 w-16 mx-auto" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h4>
              <p className="text-gray-600 mb-6">Be the first to review this dealership!</p>
              {state.user && (
                <Link
                  to={`/add-review/${dealer.id}`}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Write First Review</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}