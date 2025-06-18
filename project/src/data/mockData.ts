import { Dealer, Review, CarMake, CarModel, User } from '../types';

export const mockCarMakes: CarMake[] = [
  { id: '1', name: 'Toyota', description: 'Japanese automotive manufacturer known for reliability' },
  { id: '2', name: 'Honda', description: 'Japanese manufacturer famous for efficient engines' },
  { id: '3', name: 'Ford', description: 'American automotive pioneer' },
  { id: '4', name: 'Chevrolet', description: 'American brand under General Motors' },
  { id: '5', name: 'BMW', description: 'German luxury automotive manufacturer' },
  { id: '6', name: 'Mercedes-Benz', description: 'German luxury vehicle manufacturer' },
];

export const mockCarModels: CarModel[] = [
  { id: '1', makeId: '1', name: 'Camry', year: 2024, description: 'Mid-size sedan' },
  { id: '2', makeId: '1', name: 'Corolla', year: 2024, description: 'Compact sedan' },
  { id: '3', makeId: '2', name: 'Civic', year: 2024, description: 'Compact car' },
  { id: '4', makeId: '2', name: 'Accord', year: 2024, description: 'Mid-size sedan' },
  { id: '5', makeId: '3', name: 'F-150', year: 2024, description: 'Full-size pickup truck' },
  { id: '6', makeId: '4', name: 'Silverado', year: 2024, description: 'Full-size pickup truck' },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    dealerId: '1',
    userId: '2',
    userName: 'john_doe',
    rating: 5,
    title: 'Excellent Service!',
    content: 'The staff was incredibly helpful and knowledgeable. They made the car buying process smooth and stress-free.',
    carMake: 'Toyota',
    carModel: 'Camry',
    carYear: 2024,
    purchaseDate: '2024-01-15',
    sentiment: 'positive',
    sentimentScore: 0.9,
    createdAt: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    dealerId: '1',
    userId: '3',
    userName: 'jane_smith',
    rating: 4,
    title: 'Good Experience',
    content: 'Overall satisfied with the purchase. The price was fair and the car is in great condition.',
    carMake: 'Honda',
    carModel: 'Civic',
    carYear: 2023,
    purchaseDate: '2024-02-01',
    sentiment: 'positive',
    sentimentScore: 0.7,
    createdAt: '2024-02-02T14:20:00Z'
  },
  {
    id: '3',
    dealerId: '2',
    userId: '2',
    userName: 'john_doe',
    rating: 3,
    title: 'Average Service',
    content: 'The service was okay but the wait time was longer than expected. The staff could be more attentive.',
    carMake: 'Ford',
    carModel: 'F-150',
    carYear: 2024,
    purchaseDate: '2024-02-10',
    sentiment: 'neutral',
    sentimentScore: 0.1,
    createdAt: '2024-02-11T09:15:00Z'
  },
];

export const mockDealers: Dealer[] = [
  {
    id: '1',
    name: 'Premium Auto Kansas City',
    address: '1234 Main Street',
    city: 'Kansas City',
    state: 'KS',
    zip: '66101',
    phone: '(913) 555-0123',
    email: 'info@premiumautokc.com',
    website: 'https://premiumautokc.com',
    rating: 4.5,
    reviews: mockReviews.filter(r => r.dealerId === '1')
  },
  {
    id: '2',
    name: 'Elite Motors Topeka',
    address: '5678 Commerce Drive',
    city: 'Topeka',
    state: 'KS',
    zip: '66603',
    phone: '(785) 555-0456',
    email: 'sales@elitemotorstopeka.com',
    rating: 4.2,
    reviews: mockReviews.filter(r => r.dealerId === '2')
  },
  {
    id: '3',
    name: 'Metro Car Center',
    address: '9012 Industrial Blvd',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    phone: '(312) 555-0789',
    email: 'contact@metrocarcenter.com',
    rating: 4.0,
    reviews: []
  },
  {
    id: '4',
    name: 'Sunshine Auto Sales',
    address: '3456 Sunset Avenue',
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    phone: '(305) 555-0321',
    email: 'info@sunshineauto.com',
    rating: 4.3,
    reviews: []
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@dealership.com',
    firstName: 'Admin',
    lastName: 'User',
    isAdmin: true
  },
  {
    id: '2',
    username: 'john_doe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    isAdmin: false
  },
  {
    id: '3',
    username: 'jane_smith',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    isAdmin: false
  },
];