import React from 'react';
import { Shield, Users, Star, Award, Target, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Trusted Reviews',
      description: 'All reviews are verified and come from real customers who have purchased vehicles from our partner dealerships.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our platform is powered by a community of car buyers sharing their honest experiences and insights.'
    },
    {
      icon: Star,
      title: 'Quality Ratings',
      description: 'Our advanced rating system helps you quickly identify the best dealerships in your area.'
    },
    {
      icon: Award,
      title: 'Excellence Standards',
      description: 'We maintain high standards for dealer partnerships and review authenticity.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Verified Reviews' },
    { number: '500+', label: 'Partner Dealerships' },
    { number: '50+', label: 'States Covered' },
    { number: '4.8/5', label: 'Average Rating' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About DealerReviews</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're committed to helping car buyers make informed decisions by providing access to 
          authentic reviews and ratings from real customers across the nation.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 rounded-lg p-8 mb-16">
        <div className="flex items-center justify-center mb-6">
          <Target className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
          To create transparency in the automotive industry by connecting car buyers with trustworthy 
          dealerships through authentic customer reviews and comprehensive dealer information. We believe 
          that every car purchase should be a positive experience backed by honest insights from fellow consumers.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose DealerReviews?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-4">
                <feature.icon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                DealerReviews was founded in 2020 with a simple yet powerful vision: to make car 
                buying more transparent and trustworthy for everyone. We recognized that purchasing 
                a vehicle is one of the most significant investments people make, yet finding reliable 
                information about dealerships was often challenging.
              </p>
              <p>
                Our platform began as a small project to help friends and family share their 
                dealership experiences. Today, we've grown into a comprehensive platform that 
                serves thousands of car buyers across the United States, helping them connect 
                with reputable dealers and make confident purchasing decisions.
              </p>
              <p>
                We continue to innovate and expand our services, always keeping our core mission 
                at heart: empowering consumers with the information they need to have positive 
                car buying experiences.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-blue-100 rounded-full p-16">
              <Heart className="h-24 w-24 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
            <p className="text-gray-600">
              We believe in open, honest communication and provide clear, unbiased information 
              to help you make informed decisions.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
            <p className="text-gray-600">
              We maintain the highest ethical standards in all our operations and ensure 
              the authenticity of every review on our platform.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">
              We foster a supportive community where car buyers can share experiences 
              and help each other make better purchasing decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}