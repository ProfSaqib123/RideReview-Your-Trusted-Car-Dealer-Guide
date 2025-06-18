import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123 Business Center Drive', 'Suite 100', 'Kansas City, KS 66101']
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['(555) 123-4567', 'Toll-free: (800) 555-0123']
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info@dealerreviews.com', 'support@dealerreviews.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
    }
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or need help? We're here to assist you. Reach out to us using any of the methods below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <info.icon className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Response Guarantee</h3>
            <p className="text-gray-700 mb-3">
              We pride ourselves on providing excellent customer service. Here's what you can expect:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Email responses within 4 hours during business hours</li>
              <li>• Phone support available Monday through Friday</li>
              <li>• Dedicated support for dealer partnerships</li>
              <li>• Technical support for platform issues</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="dealer">Dealer Partnership</option>
                <option value="review">Review Issue</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please provide details about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="mb-2">
              <strong>Privacy Notice:</strong> Your information is secure with us. We never share your contact 
              details with third parties and only use them to respond to your inquiry.
            </p>
            <p>
              For urgent matters, please call us directly at (555) 123-4567 during business hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}