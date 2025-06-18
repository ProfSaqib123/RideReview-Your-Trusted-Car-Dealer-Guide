import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DealerDetails from './pages/DealerDetails';
import AddReview from './pages/AddReview';
import Admin from './pages/Admin';
import APIEndpoints from './pages/APIEndpoints';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dealer/:id" element={<DealerDetails />} />
              <Route path="/add-review" element={<AddReview />} />
              <Route path="/add-review/:dealerId" element={<AddReview />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/api/:endpoint/*" element={<APIEndpoints />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;