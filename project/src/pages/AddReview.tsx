import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AddReview() {
  const { dealerId } = useParams<{ dealerId: string }>();
  const navigate = useNavigate();
  const { state, addReview } = useApp();
  
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    carMake: '',
    carModel: '',
    carYear: new Date().getFullYear(),
    purchaseDate: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const dealer = state.dealers.find(d => d.id === dealerId);

  if (!state.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You must be logged in to write a review.</p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <span>Login</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!dealer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dealer Not Found</h2>
          <p className="text-gray-600 mb-6">The dealer you're trying to review doesn't exist.</p>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (formData.content.length < 10) {
      setError('Review content must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      addReview({
        dealerId: dealerId!,
        userId: state.user!.id,
        userName: state.user!.username,
        rating: formData.rating,
        title: formData.title,
        content: formData.content,
        carMake: formData.carMake,
        carModel: formData.carModel,
        carYear: formData.carYear,
        purchaseDate: formData.purchaseDate,
      });

      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/dealer/${dealerId}`);
      }, 2000);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'carYear' ? parseInt(value) : value
    }));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <button
          key={i}
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, rating: starValue }))}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
        >
          <Star
            className={`h-8 w-8 ${
              starValue <= (hoverRating || formData.rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          />
        </button>
      );
    });
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for sharing your experience. Your review will help other customers make informed decisions.
          </p>
          <p className="text-gray-500 text-sm">Redirecting to dealer page...</p>
        </div>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to={`/dealer/${dealerId}`}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {dealer.name}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Write a Review</h1>
        <p className="text-gray-600">Share your experience with {dealer.name}</p>
      </div>

      {/* Review Form */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="ml-3 text-sm text-gray-600">
                {formData.rating > 0 && `${formData.rating}/5`}
              </span>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Review Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Summarize your experience..."
            />
          </div>

          {/* Review Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review *
            </label>
            <textarea
              id="content"
              name="content"
              required
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share details about your experience, the service you received, and any other relevant information..."
            />
            <p className="mt-1 text-sm text-gray-500">
              Minimum 10 characters ({formData.content.length}/10)
            </p>
          </div>

          {/* Vehicle Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="carMake" className="block text-sm font-medium text-gray-700 mb-2">
                Car Make
              </label>
              <select
                id="carMake"
                name="carMake"
                value={formData.carMake}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Make</option>
                {state.carMakes.map(make => (
                  <option key={make.id} value={make.name}>{make.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 mb-2">
                Car Model
              </label>
              <input
                type="text"
                id="carModel"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Camry"
              />
            </div>
            <div>
              <label htmlFor="carYear" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                id="carYear"
                name="carYear"
                value={formData.carYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Purchase Date */}
          <div>
            <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Date
            </label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              to={`/dealer/${dealerId}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}