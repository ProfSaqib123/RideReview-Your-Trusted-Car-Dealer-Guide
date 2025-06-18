import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function APIEndpoints() {
  const { endpoint } = useParams<{ endpoint: string }>();
  const { state, analyzeSentiment } = useApp();

  const renderResponse = () => {
    switch (endpoint) {
      case 'dealers':
        const stateParam = new URLSearchParams(window.location.search).get('state');
        const filteredDealers = stateParam 
          ? state.dealers.filter(d => d.state === stateParam)
          : state.dealers;
        return {
          success: true,
          data: filteredDealers,
          count: filteredDealers.length
        };

      case 'dealer':
        const dealerId = window.location.pathname.split('/').pop();
        const dealer = state.dealers.find(d => d.id === dealerId);
        if (!dealer) {
          return { success: false, error: 'Dealer not found' };
        }
        return {
          success: true,
          data: dealer
        };

      case 'review':
        const reviewDealerId = window.location.pathname.split('/').pop();
        const dealerForReviews = state.dealers.find(d => d.id === reviewDealerId);
        if (!dealerForReviews) {
          return { success: false, error: 'Dealer not found' };
        }
        return {
          success: true,
          data: {
            dealerId: reviewDealerId,
            dealer: dealerForReviews.name,
            reviews: dealerForReviews.reviews,
            count: dealerForReviews.reviews.length
          }
        };

      case 'sentiment':
        const text = new URLSearchParams(window.location.search).get('text') || 'This is a great dealership with excellent service!';
        const analysis = analyzeSentiment(text);
        return {
          success: true,
          data: {
            text: text,
            sentiment: analysis.sentiment,
            score: analysis.score,
            confidence: Math.abs(analysis.score),
            analysis: {
              positive_words: text.toLowerCase().includes('great') || text.toLowerCase().includes('excellent') ? ['great', 'excellent'] : [],
              negative_words: text.toLowerCase().includes('bad') || text.toLowerCase().includes('terrible') ? ['bad', 'terrible'] : [],
              neutral_words: ['dealership', 'service']
            }
          }
        };

      default:
        return {
          success: false,
          error: 'API endpoint not found',
          available_endpoints: [
            '/api/dealers - Get all dealers',
            '/api/dealers?state=KS - Get dealers by state',
            '/api/dealer/1 - Get specific dealer',
            '/api/review/1 - Get reviews for dealer',
            '/api/sentiment?text=your_text - Analyze sentiment'
          ]
        };
    }
  };

  const response = renderResponse();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">API Response</h1>
            <p className="text-sm text-gray-600">
              Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">{window.location.pathname}</code>
            </p>
            {window.location.search && (
              <p className="text-sm text-gray-600 mt-1">
                Query: <code className="bg-gray-100 px-2 py-1 rounded">{window.location.search}</code>
              </p>
            )}
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
            <pre className="text-green-400 text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Available API Endpoints</h3>
            <div className="space-y-2 text-sm">
              <div>
                <code className="bg-white px-2 py-1 rounded mr-2">/api/dealers</code>
                <span className="text-gray-600">Get all dealers</span>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded mr-2">/api/dealers?state=KS</code>
                <span className="text-gray-600">Get dealers by state (KS, IL, FL, etc.)</span>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded mr-2">/api/dealer/1</code>
                <span className="text-gray-600">Get specific dealer details</span>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded mr-2">/api/review/1</code>
                <span className="text-gray-600">Get reviews for specific dealer</span>
              </div>
              <div>
                <code className="bg-white px-2 py-1 rounded mr-2">/api/sentiment?text=your_text</code>
                <span className="text-gray-600">Analyze sentiment of text</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}