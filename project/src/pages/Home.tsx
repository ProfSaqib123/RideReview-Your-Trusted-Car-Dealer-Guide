import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import DealerCard from '../components/DealerCard';

const states = [
  { code: '', name: 'All States' },
  { code: 'KS', name: 'Kansas' },
  { code: 'IL', name: 'Illinois' },
  { code: 'FL', name: 'Florida' },
  { code: 'CA', name: 'California' },
  { code: 'TX', name: 'Texas' },
  { code: 'NY', name: 'New York' },
];

export default function Home() {
  const { state, filterDealersByState } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const filteredDealers = useMemo(() => {
    let dealers = [...state.dealers];

    // Filter by state
    if (selectedState) {
      dealers = dealers.filter(dealer => dealer.state === selectedState);
    }

    // Filter by search term
    if (searchTerm) {
      dealers = dealers.filter(dealer =>
        dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dealer.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return dealers;
  }, [state.dealers, selectedState, searchTerm]);

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    filterDealersByState(stateCode);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find the Best Car Dealers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Read authentic reviews from real customers and make informed decisions for your next vehicle purchase.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search dealers by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[160px]"
            >
              {states.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          {state.user && (
            <Link
              to="/add-review"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Post Review</span>
            </Link>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredDealers.length} dealer{filteredDealers.length !== 1 ? 's' : ''} found
          {selectedState && ` in ${states.find(s => s.code === selectedState)?.name}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Dealers Grid */}
      {filteredDealers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No dealers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map(dealer => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      )}

      {/* API Endpoints for Testing */}
      <div className="mt-16 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints (for testing)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <a
            href="/api/dealers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            /api/dealers - All dealers
          </a>
          <a
            href="/api/dealers?state=KS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            /api/dealers?state=KS - Kansas dealers
          </a>
          <a
            href="/api/dealer/1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            /api/dealer/1 - Dealer details
          </a>
          <a
            href="/api/review/1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            /api/review/1 - Dealer reviews
          </a>
        </div>
      </div>
    </div>
  );
}