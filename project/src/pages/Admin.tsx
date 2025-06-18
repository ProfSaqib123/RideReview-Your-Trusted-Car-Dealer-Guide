import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, Car, MessageSquare, BarChart3, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Admin() {
  const { state, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'cars' | 'models' | 'reviews'>('overview');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!state.user || !state.user.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = {
    totalDealers: state.dealers.length,
    totalReviews: state.reviews.length,
    totalCarMakes: state.carMakes.length,
    totalCarModels: state.carModels.length,
    averageRating: state.reviews.length > 0 
      ? (state.reviews.reduce((acc, review) => acc + review.rating, 0) / state.reviews.length).toFixed(1)
      : 0
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'cars', label: 'Car Makes', icon: Car },
    { id: 'models', label: 'Car Models', icon: Settings },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {state.user.username}</p>
        </div>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from the admin panel?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Dealers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDealers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Car Makes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCarMakes}</p>
                </div>
                <Car className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Car Models</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCarModels}</p>
                </div>
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
            <div className="space-y-4">
              {state.reviews.slice(0, 5).map(review => (
                <div key={review.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{review.title}</span>
                      <span className="text-sm text-gray-500">by {review.userName}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.content.substring(0, 100)}...</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{review.rating}/5</div>
                    <div className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cars' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Car Makes</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Car Make</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {state.carMakes.map(make => (
                  <tr key={make.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {make.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {make.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'models' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Car Models</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Car Model</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Make
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {state.carModels.map(model => {
                  const make = state.carMakes.find(m => m.id === model.makeId);
                  return (
                    <tr key={model.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {make?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {model.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {model.year}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {model.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">All Reviews</h2>
          <div className="space-y-4">
            {state.reviews.map(review => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{review.title}</h4>
                    <p className="text-sm text-gray-600">
                      by {review.userName} • {review.rating}/5 stars
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      review.sentiment === 'positive' 
                        ? 'bg-green-100 text-green-800'
                        : review.sentiment === 'negative'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {review.sentiment}
                    </span>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{review.content}</p>
                <div className="text-xs text-gray-500">
                  Vehicle: {review.carYear} {review.carMake} {review.carModel} • 
                  Dealer: {state.dealers.find(d => d.id === review.dealerId)?.name} • 
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}