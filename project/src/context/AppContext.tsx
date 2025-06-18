import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, Review, Dealer } from '../types';
import { mockDealers, mockReviews, mockCarMakes, mockCarModels } from '../data/mockData';

interface AppContextType {
  state: AppState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  signup: (userData: any) => boolean;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  filterDealersByState: (state: string) => void;
  analyzeSentiment: (text: string) => { sentiment: 'positive' | 'negative' | 'neutral'; score: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'FILTER_BY_STATE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  user: null,
  dealers: mockDealers,
  reviews: mockReviews,
  carMakes: mockCarMakes,
  carModels: mockCarModels,
  selectedState: '',
  isLoading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_REVIEW':
      const newReview = action.payload;
      const updatedDealers = state.dealers.map(dealer => 
        dealer.id === newReview.dealerId 
          ? { ...dealer, reviews: [...dealer.reviews, newReview] }
          : dealer
      );
      return {
        ...state,
        reviews: [...state.reviews, newReview],
        dealers: updatedDealers,
      };
    case 'FILTER_BY_STATE':
      return { ...state, selectedState: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (username: string, password: string): boolean => {
    // Mock authentication - in real app, this would call an API
    if (username === 'admin' && password === 'admin') {
      dispatch({ 
        type: 'LOGIN', 
        payload: { 
          id: '1', 
          username: 'admin', 
          email: 'admin@dealership.com',
          firstName: 'Admin',
          lastName: 'User',
          isAdmin: true 
        } 
      });
      return true;
    } else if (username === 'user' && password === 'user') {
      dispatch({ 
        type: 'LOGIN', 
        payload: { 
          id: '2', 
          username: 'user', 
          email: 'user@example.com',
          firstName: 'Test',
          lastName: 'User',
          isAdmin: false 
        } 
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const signup = (userData: any): boolean => {
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isAdmin: false,
    };
    dispatch({ type: 'LOGIN', payload: newUser });
    return true;
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const sentiment = analyzeSentiment(reviewData.content);
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      sentiment: sentiment.sentiment,
      sentimentScore: sentiment.score,
    };
    dispatch({ type: 'ADD_REVIEW', payload: newReview });
  };

  const filterDealersByState = (selectedState: string) => {
    dispatch({ type: 'FILTER_BY_STATE', payload: selectedState });
  };

  const analyzeSentiment = (text: string): { sentiment: 'positive' | 'negative' | 'neutral'; score: number } => {
    // Mock sentiment analysis - in real app, this would use IBM Watson NLU or similar
    const positiveWords = ['excellent', 'great', 'amazing', 'fantastic', 'good', 'helpful', 'smooth', 'satisfied'];
    const negativeWords = ['terrible', 'awful', 'bad', 'horrible', 'poor', 'disappointing', 'slow', 'rude'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    const totalSentimentWords = positiveCount + negativeCount;
    if (totalSentimentWords === 0) {
      return { sentiment: 'neutral', score: 0 };
    }
    
    const score = (positiveCount - negativeCount) / totalSentimentWords;
    
    if (score > 0.2) return { sentiment: 'positive', score };
    if (score < -0.2) return { sentiment: 'negative', score };
    return { sentiment: 'neutral', score };
  };

  return (
    <AppContext.Provider value={{
      state,
      login,
      logout,
      signup,
      addReview,
      filterDealersByState,
      analyzeSentiment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}